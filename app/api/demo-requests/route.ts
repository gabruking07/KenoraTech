import { NextResponse, type NextRequest } from "next/server";
import { ObjectId } from "mongodb";
import { isAuthorizedAdmin } from "@/lib/admin-auth";
import { getMongoDb } from "@/lib/mongodb";

export const runtime = "nodejs";
const clean = (value: unknown, limit = 1000) => typeof value === "string" ? value.trim().slice(0, limit) : "";
export async function POST(request: NextRequest) { try { const body = await request.json(); const projectId = clean(body.projectId, 64), projectTitle = clean(body.projectTitle, 160), name = clean(body.name, 160), email = clean(body.email, 320).toLowerCase(), phone = clean(body.phone, 80); if (!projectId || !projectTitle || !/^\S+@\S+\.\S+$/.test(email) || !phone) return NextResponse.json({ error: "Email, phone number, and project are required." }, { status: 400 }); const db = await getMongoDb(); const recent = await db.collection("demoRequests").countDocuments({ email, projectId, createdAt: { $gte: new Date(Date.now() - 60 * 60 * 1000) } }); if (recent >= 3) return NextResponse.json({ error: "Please wait before sending another request for this demo." }, { status: 429 }); await db.collection("demoRequests").insertOne({ projectId, projectTitle, name, email, company: clean(body.company, 200), phone, message: clean(body.message, 3000), status: "PENDING", createdAt: new Date() }); return NextResponse.json({ ok: true }, { status: 201 }); } catch { return NextResponse.json({ error: "Unable to submit demo request." }, { status: 500 }); } }
export async function GET(request: NextRequest) { if (!isAuthorizedAdmin(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 }); try { const db = await getMongoDb(); const requests = await db.collection("demoRequests").find({}).sort({ createdAt: -1 }).toArray(); return NextResponse.json({ requests: requests.map(({ _id, ...item }) => ({ id: _id.toString(), ...item })) }); } catch { return NextResponse.json({ error: "Unable to load demo requests." }, { status: 500 }); } }

export async function PATCH(request: NextRequest) {
  if (!isAuthorizedAdmin(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  try {
    const body = await request.json();
    const id = clean(body.id, 64);
    const status = clean(body.status, 16).toUpperCase();
    if (!ObjectId.isValid(id) || !["APPROVED", "DECLINED"].includes(status)) return NextResponse.json({ error: "Choose a valid request and decision." }, { status: 400 });
    const db = await getMongoDb();
    const result = await db.collection("demoRequests").findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { status, reviewedAt: new Date() } }, { returnDocument: "after" });
    if (!result) return NextResponse.json({ error: "Demo request not found." }, { status: 404 });
    const { _id, ...updated } = result;
    return NextResponse.json({ request: { id: _id.toString(), ...updated } });
  } catch { return NextResponse.json({ error: "Unable to update demo request." }, { status: 500 }); }
}
