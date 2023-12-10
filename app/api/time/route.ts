import { NextResponse } from "next/server";
import { createClient } from "@vercel/kv";

export async function GET() {
  const client = createClient({
    url: process.env.kv_REST_API_URL!,
    token: process.env.kv_REST_API_TOKEN!,
  });

  const time = await client.json.get("time");

  return NextResponse.json(time);
}
