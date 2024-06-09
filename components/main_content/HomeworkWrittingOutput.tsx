"use client";

import { HomeWorkItem } from "@/store/store";
import { CldImage } from "next-cloudinary";
import Link from "next/link";

const HomeworkWrittingOutput = ({ id, type, link, title }: HomeWorkItem) => {
  if (type === "text") {
    return (
      <li key={id} className="mt-2 bg-slate-200 p-1 rounded-lg shadow-lg">
        {title + (link ? `, ${link} ` : "")}
      </li>
    );
  }

  if (["link", "a"].includes(type)) {
    return (
      <Link
        key={id}
        href={link ? link : "#"}
        className="text-blue-500 flex-shrink-0 pb-1"
        target="_blank">
        {title + ", "}
      </Link>
    );
  }

  if (type === "photo") {
    return (
      <Link key={id} href={link ? link : "#"} className="text-blue-500" target="_blank" download>
        <CldImage
          width={60}
          height={20}
          src={link ? link : "#"}
          alt={title}
          title={title}
          loading="lazy"
          className="max-h-14 overflow-y-hidden"
        />
      </Link>
    );
  }
};

export default HomeworkWrittingOutput;
