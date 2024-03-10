import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@vercel/kv";

export async function GET(req: NextRequest) {
  const client = createClient({
    url: process.env.kv_REST_API_URL!,
    token: process.env.kv_REST_API_TOKEN!,
  });

  const params = req.nextUrl.searchParams.get("params");

  const time = await client.json.get(`time:${params}`);

  return NextResponse.json(time);
}

export async function POST(req: NextRequest) {
  const client = createClient({
    url: process.env.kv_REST_API_URL!,
    token: process.env.kv_REST_API_TOKEN!,
  });

  const body = await req.json();

  const groupField = body.group;
  const currentTime = await client.json.get(`time:${groupField}`);

  const bodyWithoutGroupField = { ...body };
  delete bodyWithoutGroupField.group;

  const newTime = { ...currentTime, ...bodyWithoutGroupField };

  await client.json.set(`time:${groupField}`, "$", newTime);

  return NextResponse.json({ newTime });
}
