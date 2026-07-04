import { NextResponse, type NextRequest } from "next/server";
import { createContactSubmission } from "@/lib/contact-submissions";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    await createContactSubmission(await request.json());
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to send message." },
      { status: 400 }
    );
  }
}
