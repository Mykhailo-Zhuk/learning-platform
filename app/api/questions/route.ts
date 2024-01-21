import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@vercel/kv";

export async function GET(req: NextRequest) {
  const client = createClient({
    url: process.env.kv_REST_API_URL!,
    token: process.env.kv_REST_API_TOKEN!,
  });

  const params = req.nextUrl.searchParams.get("params");
  const questions = await client.json.get("questions", `$.[0].${params}`);
  return NextResponse.json(questions);
}

export async function POST(req: NextRequest) {
  const client = createClient({
    url: process.env.kv_REST_API_URL!,
    token: process.env.kv_REST_API_TOKEN!,
  });
  const currentQuestions = await client.json.get("questions");

  const body = await req.json();
  const replacedDoubleQuete = JSON.parse(JSON.stringify(body).replaceAll("'", '\\"'));

  const newSection = [{ ...currentQuestions[0], ...replacedDoubleQuete }];

  await client.json.set("questions", "$", newSection);

  return NextResponse.json({ done: true });
}
