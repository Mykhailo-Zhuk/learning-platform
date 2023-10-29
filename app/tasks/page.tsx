"use client";

import { AsideThemesOfTasks } from "@/components/index";
import Link from "next/link";

const Home = () => {
  return (
    <main className="min-h-screen font-monserat">
      <div className="flex max-[375px]:flex-col min-[375px]:space-x-3 w-full max-w-[1400px] mx-auto px-9 py-1">
        <Link href={"/"} className="hover:bg-accent py-1 px-2 rounded-lg ">
          Головна сторінка ＞
        </Link>
        <p className="p-1">Практичні завдання ＞</p>
      </div>
      <section className="max-md:flex max-md:flex-col grid grid-cols-[400px_auto] gap-5 max-w-[1400px] mx-auto px-5">
        <AsideThemesOfTasks />
        <div className="py-5">
          <h1 className="text-xl">
            Тут ти можеш глянути правила проходження тестів тощо по темах, які є у списку ліворуч.
            Скоро допишу сюди більше інформації.
          </h1>
        </div>
      </section>
    </main>
  );
};

export default Home;
