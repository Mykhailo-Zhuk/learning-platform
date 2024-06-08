"use client";

import { studento_logo } from "@/public/images";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const CabinetNavigation = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const activeCategory = type === "homeworks" ? 1 : 0;

  return (
    <div className="px-5 flex flex-col gap-4 font-lora">
      <div>
        <Image src={studento_logo} alt="studento_logo" title="Studento IT Academy logo" />
        <h1 className="text-3xl font-bold uppercase">Батьківський кабінет</h1>
      </div>
      <div>
        <p className="text-sm text-gray-400">Виберіть категорію</p>
        <ul className="text-xl gap-1">
          <li
            className={`px-3 py-2 my-1 hover:bg-gray-200 ${
              activeCategory === 1 && "bg-gray-100"
            } rounded-lg cursor-pointer`}>
            <Link href="?type=homeworks">Домашнє завдання</Link>
          </li>
          <li
            className={`px-3 py-2 my-1 hover:bg-gray-200 ${
              activeCategory === 0 && "bg-gray-100"
            } rounded-lg cursor-pointer`}>
            <Link href="?type=recording">Записи занять</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CabinetNavigation;
