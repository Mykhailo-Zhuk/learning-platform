import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@vercel/kv";

export async function GET() {
  const client = createClient({
    url: process.env.kv_REST_API_URL!,
    token: process.env.kv_REST_API_TOKEN!,
  });

  const time = await client.json.get("time");

  return NextResponse.json(time);
}

export async function POST(req: NextRequest) {
  const client = createClient({
    url: process.env.kv_REST_API_URL!,
    token: process.env.kv_REST_API_TOKEN!,
  });
  const currentTime = await client.json.get("time");

  const body = await req.json();

  const newTime = { ...currentTime, ...body };

  const time = await client.json.set("time", "$", newTime);

  return NextResponse.json({ time, body });
}
