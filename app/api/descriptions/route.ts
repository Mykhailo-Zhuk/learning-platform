import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@vercel/kv";

export async function GET(req: NextRequest) {
  const client = createClient({
    url: process.env.kv_REST_API_URL!,
    token: process.env.kv_REST_API_TOKEN!,
  });

  const params = req.nextUrl.searchParams.get("params");

  const listOfThemes = await client.json.get("descriptions", `$.${params}`);

  return NextResponse.json(listOfThemes);
}

export async function POST(req: NextRequest) {
  const client = createClient({
    url: process.env.kv_REST_API_URL!,
    token: process.env.kv_REST_API_TOKEN!,
  });
  const currentDescription = await client.json.get("descriptions");

  const body = await req.json();

  const newDescription = { ...currentDescription, ...body };

  const description = await client.json.set("descriptions", "$", newDescription);

  return NextResponse.json({ success: description });
}
