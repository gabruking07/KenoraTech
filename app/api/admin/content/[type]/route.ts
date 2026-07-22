import { GridFSBucket, ObjectId } from "mongodb";
import { NextResponse, type NextRequest } from "next/server";
import { isAuthorizedAdmin } from "@/lib/admin-auth";
import { DatabaseConnectionError, getMongoDb } from "@/lib/mongodb";

type ContentItem = { id: string; title: string; description: string; imageId?: string };

declare global {
  var __adminContentCache: Map<string, { items: ContentItem[]; expiresAt: number }> | undefined;
}

const allowedTypes = new Set(["services", "team", "testimonials", "settings", "profile"]);
const retiredServiceTitles = new Set(["Cloud & DevOps", "Digital Marketing", "Cybersecurity", "SEO Optimization"]);
const publicContentTypes = new Set(["services", "testimonials", "team"]);
const publicContentCache = globalThis.__adminContentCache ?? new Map<string, { items: ContentItem[]; expiresAt: number }>();
globalThis.__adminContentCache = publicContentCache;

function validType(type: string) {
  return allowedTypes.has(type);
}

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest, { params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  if (!validType(type)) return NextResponse.json({ error: "Unknown content type." }, { status: 404 });
  const isAdmin = isAuthorizedAdmin(request);
  const isPublicType = publicContentTypes.has(type);
  if (!isPublicType && !isAdmin) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const cached = !isAdmin && isPublicType ? publicContentCache.get(type) : undefined;
  if (cached && cached.expiresAt > Date.now()) {
    return NextResponse.json({ items: cached.items }, { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } });
  }

  try {
    const db = await getMongoDb();
    // Clean up services that are no longer offered when an administrator opens
    // the service manager. This keeps the website and the database in sync.
    if (type === "services" && isAuthorizedAdmin(request)) {
      await db.collection("admin_services").deleteMany({ title: { $in: [...retiredServiceTitles] } });
      publicContentCache.delete(type);
    }
    const items = await db.collection(`admin_${type}`).find({}).sort({ createdAt: -1 }).toArray();
    const responseItems: ContentItem[] = items
        .filter((item) =>
          typeof item.title === "string" &&
          item.title.trim() &&
          typeof item.description === "string" &&
          item.description.trim() &&
          (type !== "services" || !retiredServiceTitles.has(item.title))
        )
        .map((item) => ({ id: item._id.toString(), title: item.title, description: item.description, imageId: typeof item.imageId === "string" ? item.imageId : undefined }));
    if (isPublicType) publicContentCache.set(type, { items: responseItems, expiresAt: Date.now() + 60_000 });
    return NextResponse.json({ items: responseItems }, { headers: isPublicType ? { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } : undefined });
  } catch (error) {
    return NextResponse.json({ error: error instanceof DatabaseConnectionError ? error.message : "Unable to load content." }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ type: string }> }) {
  if (!isAuthorizedAdmin(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { type } = await params;
  if (!validType(type)) return NextResponse.json({ error: "Unknown content type." }, { status: 404 });

  try {
    const body = await request.json();
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const description = typeof body.description === "string" ? body.description.trim() : "";
    const imageId = typeof body.imageId === "string" && ObjectId.isValid(body.imageId) ? body.imageId : undefined;
    if (!title || !description) return NextResponse.json({ error: "Both fields are required." }, { status: 400 });

    const db = await getMongoDb();
    const result = await db.collection(`admin_${type}`).insertOne({ title, description, imageId, createdAt: new Date() });
    publicContentCache.delete(type);
    return NextResponse.json({ item: { id: result.insertedId.toString(), title, description, imageId } }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof DatabaseConnectionError ? error.message : "Unable to save content." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ type: string }> }) {
  if (!isAuthorizedAdmin(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { type } = await params;
  const id = new URL(request.url).searchParams.get("id") || "";
  if (!validType(type) || !ObjectId.isValid(id)) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  try {
    const db = await getMongoDb();
    const item = await db.collection(`admin_${type}`).findOne({ _id: new ObjectId(id) });
    await db.collection(`admin_${type}`).deleteOne({ _id: new ObjectId(id) });
    publicContentCache.delete(type);
    if (type === "team" && typeof item?.imageId === "string" && ObjectId.isValid(item.imageId)) {
      await new GridFSBucket(db, { bucketName: "team_images" }).delete(new ObjectId(item.imageId)).catch(() => undefined);
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof DatabaseConnectionError ? error.message : "Unable to delete content." }, { status: 500 });
  }
}
