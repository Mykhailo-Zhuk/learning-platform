import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@vercel/kv";
import { Users, UsersDataList } from "@/store/store";

export async function GET(req: NextRequest) {
  const client = createClient({
    url: process.env.kv_REST_API_URL!,
    token: process.env.kv_REST_API_TOKEN!,
  });

  const username = req.nextUrl.searchParams.get("params");

  if (username) {
    const user = await client.json.get("users", `$.[?(@.name == "${username}")]`);

    return NextResponse.json(user);
  }

  const users = await client.json.get("users");

  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const client = createClient({
    url: process.env.kv_REST_API_URL!,
    token: process.env.kv_REST_API_TOKEN!,
  });

  const body: Users = await req.json();

  const onlyUsersListToMergeCopy = [...body.usersList];

  const existingUsersListFromDb: UsersDataList[] = await client.json.get("users");

  const existingUsersListFromDbCopy = [...existingUsersListFromDb];

  const updateUsersList = (
    existingUserFromDb: UsersDataList[],
    incomingUsersList: UsersDataList[],
  ) => {
    // Step 1: Update existing links
    const updatedUsers = existingUserFromDb.map((existingUser) => {
      const userToChange = incomingUsersList.find(
        (currentUser) => currentUser.label === existingUser.label,
      );

      if (userToChange) {
        return userToChange;
      }

      return existingUser;
    });

    // Step 2: Add new links that don't exist in current links
    incomingUsersList.forEach((currentUser) => {
      const existingUser = existingUserFromDb.find(
        (existingUser) => existingUser.label === currentUser.label,
      );

      if (!existingUser) {
        updatedUsers.push(currentUser);
      }
    });

    return updatedUsers;
  };

  await client.json.set(
    "users",
    "$",
    updateUsersList(existingUsersListFromDbCopy, onlyUsersListToMergeCopy),
  );

  return NextResponse.json({ ok: true });
}
