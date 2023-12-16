import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@vercel/kv";

export async function GET() {
  const client = createClient({
    url: process.env.kv_REST_API_URL!,
    token: process.env.kv_REST_API_TOKEN!,
  });

  const homework = await client.json.get("homework");

  return NextResponse.json(homework);
}

export async function POST(req: NextRequest) {
  const client = createClient({
    url: process.env.kv_REST_API_URL!,
    token: process.env.kv_REST_API_TOKEN!,
  });
  const currentHomework = await client.json.get("homework");

  const body = await req.json();

  const newHomework = { ...currentHomework, ...body };

  const homework = await client.json.set("homework", "$", newHomework);

  return NextResponse.json({ success: true });
}
