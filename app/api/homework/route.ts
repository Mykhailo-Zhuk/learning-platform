import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@vercel/kv";

export async function GET(req: NextRequest) {
  const client = createClient({
    url: process.env.kv_REST_API_URL!,
    token: process.env.kv_REST_API_TOKEN!,
  });

  const params = req.nextUrl.searchParams.get("params");

  const homework = await client.json.get(`homework:${params}`);

  return NextResponse.json(homework);
}

type Homework = {
  homework: object[];
  id?: string | number;
  date: string;
  group?: string;
};

export async function POST(req: NextRequest) {
  const client = createClient({
    url: process.env.kv_REST_API_URL!,
    token: process.env.kv_REST_API_TOKEN!,
  });

  const body: Homework = await req.json();

  const groupField = body.group;

  const bodyWithoutGroupField = { ...body };
  delete bodyWithoutGroupField.group;

  const currentHomeworks: Homework[] = await client.json.get(`homework:${groupField}`);

  const isCurrentHomeworkExist = currentHomeworks.find(
    (elem) => elem.date === bodyWithoutGroupField.date,
  );

  if (isCurrentHomeworkExist) {
    const updatedHomeworks = currentHomeworks.map((elem) =>
      elem.date === bodyWithoutGroupField.date ? bodyWithoutGroupField : elem,
    );

    await client.json.set(`homework:${groupField}`, "$", updatedHomeworks);

    return NextResponse.json({
      msg: `Домашнє завдання за ${isCurrentHomeworkExist.date} було переписано`,
      updated: true,
    });
  } else {
    const newHomeworks = [...currentHomeworks, bodyWithoutGroupField];

    await client.json.set(`homework:${groupField}`, "$", newHomeworks);

    return NextResponse.json({ done: true });
  }
}
