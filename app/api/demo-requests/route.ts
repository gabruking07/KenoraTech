import { NextResponse, type NextRequest } from "next/server";
import { isAuthorizedAdmin } from "@/lib/admin-auth";
import { getMongoDb } from "@/lib/mongodb";

export const runtime = "nodejs";
export async function GET(request: NextRequest) { if (!isAuthorizedAdmin(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 }); try { const db = await getMongoDb(); const requests = await db.collection("demoRequests").find({}).sort({ createdAt: -1 }).toArray(); return NextResponse.json({ requests: requests.map(({ _id, ...item }) => ({ id: _id.toString(), ...item })) }); } catch { return NextResponse.json({ error: "Unable to load demo requests." }, { status: 500 }); } }
