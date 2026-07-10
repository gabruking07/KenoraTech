import { ObjectId } from "mongodb";
import { NextResponse, type NextRequest } from "next/server";
import { isAuthorizedAdmin } from "@/lib/admin-auth";
import { DatabaseConnectionError, getMongoDb } from "@/lib/mongodb";

const allowedTypes = new Set(["services", "team", "testimonials", "settings", "profile"]);

function validType(type: string) {
  return allowedTypes.has(type);
}

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest, { params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  if (!validType(type)) return NextResponse.json({ error: "Unknown content type." }, { status: 404 });
  if (!["services", "testimonials"].includes(type) && !isAuthorizedAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const db = await getMongoDb();
    const items = await db.collection(`admin_${type}`).find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json({
      items: items
        .filter((item) => typeof item.title === "string" && item.title.trim() && typeof item.description === "string" && item.description.trim())
        .map((item) => ({ id: item._id.toString(), title: item.title, description: item.description }))
    });
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
    if (!title || !description) return NextResponse.json({ error: "Both fields are required." }, { status: 400 });

    const db = await getMongoDb();
    const result = await db.collection(`admin_${type}`).insertOne({ title, description, createdAt: new Date() });
    return NextResponse.json({ item: { id: result.insertedId.toString(), title, description } }, { status: 201 });
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
    await db.collection(`admin_${type}`).deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof DatabaseConnectionError ? error.message : "Unable to delete content." }, { status: 500 });
  }
}
