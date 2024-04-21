import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@vercel/kv";
export async function GET(req: NextRequest) {
  const client = createClient({
    url: process.env.kv_REST_API_URL!,
    token: process.env.kv_REST_API_TOKEN!,
  });

  const username = req.nextUrl.searchParams.get("username");

  if (username) {
    const personalUserData = await client.json.get(`user:${username}`);

    return NextResponse.json(personalUserData);
  }

  const params = req.nextUrl.searchParams.get("params");

  const user = await client.json.get("users", `$.[?(@.name=="${params}")]`);

  return NextResponse.json(user);
}
