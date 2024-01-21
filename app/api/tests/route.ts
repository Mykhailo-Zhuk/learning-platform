import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@vercel/kv";
export async function GET(req: NextRequest) {
  const client = createClient({
    url: process.env.kv_REST_API_URL!,
    token: process.env.kv_REST_API_TOKEN!,
  });

  const params = req.nextUrl.searchParams.get("params");

  const questions = await client.json.get("tests", `$.[0].${params}`);

  return NextResponse.json(questions);
}

export async function POST(req: NextRequest) {
  const client = createClient({
    url: process.env.kv_REST_API_URL!,
    token: process.env.kv_REST_API_TOKEN!,
  });
  const currentTests = await client.json.get("tests");

  const body = await req.json();

  const newSection = [{ ...currentTests[0], ...body }];

  await client.json.set("tests", "$", newSection);

  return NextResponse.json({ done: true });
}
