"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "../ui/button";

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <span className="text-sm">Signed in as {session.user!.name} </span>
        <br />
        <Button variant="ghost" onClick={() => signOut()} className="text-sm">
          Sign out
        </Button>
      </>
    );
  } else {
    return (
      <>
        <span className="text-sm">Not signed in </span>
        <br />
        <Button variant="ghost" onClick={() => signIn()} className="text-sm">
          Sign in
        </Button>
      </>
    );
  }
}
