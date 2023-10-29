"use client";

import { Hello, TabsRow } from "@/components/index";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full max-w-[1400px] font-monserat mx-auto flex-col px-5">
      <Hello />
      <TabsRow />
    </main>
  );
}
