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
      const userToChange = incomingHomeworksList.find(
        (currentUser) => currentUser.homeworkId === existingHomework.homeworkId,
      );

      if (userToChange) {
        return userToChange;
      }

      return existingHomework;
    });

    // Step 2: Add new links that don't exist in current links
    incomingHomeworksList.forEach((currentUser) => {
      const existingHomework = existingHomeworksFromDb.find(
        (existingHomework) => existingHomework.homeworkId === currentUser.homeworkId,
      );

      if (!existingHomework) {
        updatedUsers.push(currentUser);
      }
    });

    return updatedUsers;
  };

  await client.json.set(
    `user:${body.username}`,
    "$.homeworkIsDone",
    updateUsersList(existingHomeworksFromDb, incomingHomeworksList),
  );

  return NextResponse.json({ ok: true });
}
