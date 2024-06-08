import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@vercel/kv";
import { HomeworkResults, PersonalHomeworkResults } from "@/store/store";
import { cloneDeep } from "lodash";

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
}

export async function POST(req: NextRequest) {
  const client = createClient({
    url: process.env.kv_REST_API_URL!,
    token: process.env.kv_REST_API_TOKEN!,
  });

  const body: PersonalHomeworkResults = await req.json();
  const onlyHomeworkToMerge = body.homeworkIsDone;

  if (onlyHomeworkToMerge) {
    const onlyInitialHomeworkResults = await client.json.get(
      `user:${body.username}`,
      "$.homeworkIsDone",
    );

    const findSameHomework = onlyInitialHomeworkResults[0].findIndex(
      (homework: HomeworkResults) => homework.homeworkId === onlyHomeworkToMerge[0].homeworkId,
    );

    if (findSameHomework !== -1) {
      const deepCloneHomeworkResults = cloneDeep(onlyInitialHomeworkResults)[0];

      deepCloneHomeworkResults[findSameHomework] = onlyHomeworkToMerge[0];

      await client.json.set(`user:${body.username}`, `$.homeworkIsDone`, deepCloneHomeworkResults);

      return NextResponse.json({ ok: true });
    }
  }

  await client.json.arrinsert(
    `user:${body.username}`,
    `$.homeworkIsDone`,
    0,
    ...onlyHomeworkToMerge,
  );

  return NextResponse.json({ ok: true });
}
