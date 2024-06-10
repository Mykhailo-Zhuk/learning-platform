"use client";

import { AiFillMessage } from "react-icons/ai";
import { BsTelegram } from "react-icons/bs";
import { Button } from "../ui/button";
import { useStore } from "@/store/store";
import Link from "next/link";

const telegramGroupLinks = [
  { group: "group3", link: "https://web.telegram.org/a/#-4284472340" },
  { group: "group2", link: "https://web.telegram.org/a/#-4170575798" },
  { group: "arthor", link: "https://web.telegram.org/a/#-4137793068" },
];

const References = () => {
  const currentGroup = useStore((state) => state.group);

  const groupLink = () => {
    const currentTelegram = telegramGroupLinks.find((telegram) => telegram.group === currentGroup);
    return currentTelegram?.link;
  };

  return (
    <section className="flex space-x-5 border-t border-t-slate-200 py-5">
      <div className="flex flex-col space-y-3 max-w-sm bg-slate-200 p-5 rounded-lg">
        <div className="flex space-x-3">
          <AiFillMessage size={80} />
          <div className="flex flex-col space-y-3">
            <h1 className="font-semibold">Чат групи в телеграмі</h1>
            <p>Зв&apos;язок із викладачем та групою для швидкого вирішення питань</p>
          </div>
        </div>

        <Button asChild className="w-full rounded-lg bg-blue-500">
          <Link href={groupLink()! || "#"} target="_blank" className="flex space-x-3">
            <BsTelegram size={18} /> <p>Приєднатись</p>
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default References;
