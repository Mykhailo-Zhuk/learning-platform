import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { ParentsCabinet } from "../../components/index";

export default async function Cabinet() {
  const session = await getServerSession(options);

  if (!session) {
    redirect("api/auth/signin?callbackUrl=/cabinet");
  }

  return <section>{session.user && <ParentsCabinet user={session?.user} />}</section>;
}
