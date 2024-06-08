"use client";

import { HomeWorkItem } from "@/store/store";
import Link from "next/link";

const HomeworkReadingOutput = ({ listOfThemes }: { listOfThemes?: HomeWorkItem[] }) => {
  return (
    <li className="mt-2 bg-slate-200 p-1 rounded-lg shadow-lg">
      {listOfThemes
        ? listOfThemes?.map((theme) => {
            if (["link", "a"].includes(theme?.type)) {
              return (
                <Link
                  key={theme?.id}
                  href={theme?.link}
                  className="text-blue-500 flex-shrink-0 pb-1"
                  target="_blank">
                  {theme?.title + ", "}
                </Link>
              );
            }

            if (theme?.type === "text") {
              return <span key={theme?.id}>{theme?.title + " " + theme?.link + ", "}</span>;
            }
          })
        : null}
    </li>
  );
};

export default HomeworkReadingOutput;
