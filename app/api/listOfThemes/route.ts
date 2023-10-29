import { NextResponse } from "next/server";
import { createClient } from "@vercel/kv";

export async function GET() {
  const client = createClient({
    url: process.env.kv_REST_API_URL!,
    token: process.env.kv_REST_API_TOKEN!,
  });

  const listOfThemes = await client.json.get("listOfThemes", "$[*]");

  return NextResponse.json(listOfThemes);
}
