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

type Homework = {
  homework: object[];
  id?: string | number;
  date: string;
};

export async function POST(req: NextRequest) {
  const client = createClient({
    url: process.env.kv_REST_API_URL!,
    token: process.env.kv_REST_API_TOKEN!,
  });
  const currentHomeworks: Homework[] = await client.json.get("homework");

  const body: Homework = await req.json();

  const isCurrentHomeworkExist = currentHomeworks.find((elem) => elem.date === body.date);

  if (isCurrentHomeworkExist) {
    const updatedHomeworks = currentHomeworks.map((elem) =>
      elem.date === body.date ? body : elem,
    );

    await client.json.set("homework", "$", updatedHomeworks);

    return NextResponse.json({
      msg: `Домашнє завдання за ${isCurrentHomeworkExist.date} було переписано`,
      updated: true,
    });
  } else {
    const newHomeworks = [...currentHomeworks, body];

    await client.json.set("homework", "$", newHomeworks);

    return NextResponse.json({ done: true });
  }
}
