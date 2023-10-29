"use client";

import { AsideThemesOfTasks, TasksSurface } from "@/components/index";
import Link from "next/link";

const Subtasks = ({ params }: { params: { subtasks: string } }) => {
  return (
    <main className="w-full font-monserat ">
      <div className="flex max-[375px]:flex-col min-[375px]:space-x-3 w-full max-w-[1400px] mx-auto px-9 py-1">
        <Link href={"/"} className="hover:bg-accent max-sm:text-sm py-1 px-2 rounded-lg">
          Головна сторінка ＞
        </Link>
        <p className="p-1 max-sm:text-sm">Практичні завдання ＞</p>
      </div>
      <section className="max-md:flex max-md:flex-col grid w-full grid-cols-[300px_auto] max-w-[1400px] mx-auto px-5 gap-5">
        <AsideThemesOfTasks />
        <TasksSurface params={params.subtasks} />
      </section>
    </main>
  );
};

export default Subtasks;
