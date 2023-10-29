"use client";

import { AsideList, MainContent } from "@/components/index";
import Link from "next/link";

const Home = () => {
  return (
    <main className="min-h-screen font-monserat">
      <div className="flex w-full max-w-[1400px] mx-auto px-9">
        <Link href={"/"} className="max-md:text-sm hover:bg-accent py-1 px-2 rounded-lg">
          Головна сторінка ＞
        </Link>
        <p className="p-1 max-md:text-sm ">Підручник ＞</p>
      </div>
      <section className="max-md:flex max-md:flex-col grid grid-cols-[400px_auto] gap-5 max-w-[1400px] mx-auto px-5">
        <AsideList />
        <MainContent />
      </section>
    </main>
  );
};

export default Home;
