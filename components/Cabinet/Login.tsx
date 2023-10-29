"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "../ui/button";

export default function Login() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user!.name} <br />
        <Button variant="ghost" onClick={() => signOut()}>
          Sign out
        </Button>
      </>
    );
  } else {
    return (
      <>
        Not signed in <br />
        <Button variant="ghost" onClick={() => signIn()}>
          Sign in
        </Button>
      </>
    );
  }
}
