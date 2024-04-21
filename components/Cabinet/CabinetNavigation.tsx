"use client";

import { studento_logo } from "@/public/images";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

const CabinetNavigation = () => {
  return (
    <div className="px-5 flex flex-col gap-4 font-lora">
      <div>
        <Image src={studento_logo} alt="studento_logo" title="Studento IT Academy logo" />
        <h1 className="text-3xl font-bold uppercase">Батьківський кабінет</h1>
      </div>
      <Select>
        <SelectTrigger className="w-full h-12 bg-sky-600 ouline-none focus:ring-0 placeholder:text-white">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <div>
        <p className="text-sm text-gray-400">Виберіть категорію</p>
        <ul className="text-xl">
          <li className="px-3 py-2 hover:bg-gray-200 rounded-lg cursor-pointer">
            <Link href="?type=homeworks">Домашнє завдання</Link>
          </li>
          <li className="px-3 py-2 hover:bg-gray-200 rounded-lg cursor-pointer">
            <Link href="?type=recording">Записи занять</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CabinetNavigation;
