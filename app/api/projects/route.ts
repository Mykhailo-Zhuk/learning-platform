import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@vercel/kv";

export async function GET() {
  const client = createClient({
    url: process.env.kv_REST_API_URL!,
    token: process.env.kv_REST_API_TOKEN!,
  });
  const projects = await client.json.get("projects");

  return NextResponse.json(projects);
}

export async function PUT(req: NextRequest) {
  const client = createClient({
    url: process.env.kv_REST_API_URL!,
    token: process.env.kv_REST_API_TOKEN!,
  });
  const request = await req.json();

  const response = await client.json.set("projects", `$.[?(@.id==${request?.id})]`, request);

  return NextResponse.json({ success: response });
}
