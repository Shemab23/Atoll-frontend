import { NextResponse } from "next/server";

export async function GET() {
  // TODO: handle the auth callback
  return NextResponse.json({ ok: true });
}
