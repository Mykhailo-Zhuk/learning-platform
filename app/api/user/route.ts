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
  const incomingHomeworksList = body.homeworkIsDone;

  const existingHomeworksFromDb = await client.json.get(
    `user:${body.username}`,
    "$.homeworkIsDone",
  );

  const updateUsersList = (
    existingHomeworksFromDb: HomeworkResults[],
    incomingHomeworksList: HomeworkResults[],
  ) => {
    // Step 1: Update existing links
    const updatedUsers = existingHomeworksFromDb.map((existingHomework) => {
      const homeworkToChange = incomingHomeworksList.find(
        (currentHomework) => currentHomework.homeworkId === existingHomework.homeworkId,
      );

      if (homeworkToChange) {
        return homeworkToChange;
      }

      return existingHomework;
    });

    // Step 2: Add new links that don't exist in current links
    incomingHomeworksList.forEach((currentHomework) => {
      const existingHomework = existingHomeworksFromDb.find(
        (existingHomework) => existingHomework.homeworkId === currentHomework.homeworkId,
      );

      if (!existingHomework) {
        updatedUsers.push(currentHomework);
      }
    });

    return updatedUsers;
  };

  await client.json.set(
    `user:${body.username}`,
    "$.homeworkIsDone",
    updateUsersList(existingHomeworksFromDb[0], incomingHomeworksList),
  );

  return NextResponse.json({ ok: true });
}
