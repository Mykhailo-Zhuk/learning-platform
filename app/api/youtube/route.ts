import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@vercel/kv";
import { LinksData, YoutubeLinks } from "@/store/store";

export async function GET(req: NextRequest) {
  const client = createClient({
    url: process.env.kv_REST_API_URL!,
    token: process.env.kv_REST_API_TOKEN!,
  });

  const group = req.nextUrl.searchParams.get("params");
  const youtubeLinks = await client.json.get(`youtube:${group}`);

  return NextResponse.json(youtubeLinks);
}

export async function POST(req: NextRequest) {
  const client = createClient({
    url: process.env.kv_REST_API_URL!,
    token: process.env.kv_REST_API_TOKEN!,
  });

  const body: YoutubeLinks = await req.json();

  const onlyGroupField = body.group;

  const incomingYoutubeLinks: LinksData[] = [...body.youtube_links];

  const existingYoutubeLinks: LinksData[] = await client.json.get(`youtube:${onlyGroupField}`);

  const existingYoutubeLinksCopy = [...existingYoutubeLinks];

  const updateYoutubeLinks = (existingLinks: LinksData[], incomingLinks: LinksData[]) => {
    // Step 1: Update existing links
    const updatedLinks = existingLinks.map((link) => {
      const linkToChange = incomingLinks.find(
        (field) => field.dateOfMeeting === link.dateOfMeeting,
      );

      if (linkToChange) {
        return linkToChange;
      }

      return link;
    });

    // Step 2: Add new links that don't exist in current links
    incomingLinks.forEach((field) => {
      const existingLink = existingLinks.find((link) => link.dateOfMeeting === field.dateOfMeeting);

      if (!existingLink) {
        updatedLinks.push(field);
      }
    });

    return updatedLinks;
  };

  await client.json.set(
    `youtube:${onlyGroupField}`,
    "$",
    updateYoutubeLinks(existingYoutubeLinksCopy, incomingYoutubeLinks),
  );

  return NextResponse.json({
    ok: true,
  });
}
