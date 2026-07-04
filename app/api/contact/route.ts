import { NextResponse, type NextRequest } from "next/server";
import { createContactSubmission } from "@/lib/contact-submissions";
import { DatabaseConnectionError } from "@/lib/mongodb";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    await createContactSubmission(await request.json());
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    if (error instanceof DatabaseConnectionError) {
      return NextResponse.json({ error: error.message }, { status: 503 });
    }

    return NextResponse.json({ error: "Please fill all required fields." }, { status: 400 });
  }
}
