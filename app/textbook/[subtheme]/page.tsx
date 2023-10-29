"use client";

import { AsideList, ThemesContent } from "@/components/index";
import Link from "next/link";

const Subtheme = ({ params }: { params: { subtheme: string } }) => {
  return (
    <main className="w-full font-monserat ">
      <div className="flex w-full max-w-[1400px] mx-auto px-9">
        <Link href={"/"} className="max-md:text-sm hover:bg-accent py-1 px-2 rounded-lg">
          Головна сторінка ＞
        </Link>
        <p className="p-1 max-md:text-sm">Підручник ＞</p>
      </div>
      <section className="max-md:flex max-md:flex-col grid w-full grid-cols-[400px_auto] max-w-[1400px] mx-auto px-5 gap-5">
        <AsideList />
        <ThemesContent params={params.subtheme} />
      </section>
    </main>
  );
};

export default Subtheme;
