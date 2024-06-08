"use client";

import React, { useState } from "react";
import { hand } from "@/public/icons";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";

type HelloTypes = {
  onCourseSelect: (courseType: string) => void;
};

const Hello = ({ onCourseSelect }: HelloTypes) => {
  const { data: session, status } = useSession();

  const username = session?.user.name;
  const guest = status === "unauthenticated" ? "Guest" : username;

  return (
    <section className="flex flex-col md:flex-row w-full items-center md:justify-between p-5 border-t border-t-slate-200">
      <div className="flex">
        <Image src={hand} alt="hand" width={40} height={40} />
        <p className="p-2 font-spartan text-4xl">Hello, {guest}</p>
      </div>
      <div>
        <Select onValueChange={(value) => onCourseSelect(value)} defaultValue="frontEnd">
          <SelectTrigger className="w-[180px]">
            <SelectValue defaultValue="frontEnd" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="frontEnd">Front-end</SelectItem>
            <SelectItem value="react">React</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
};

export default Hello;
