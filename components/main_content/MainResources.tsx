"use client";

import { AspectRatio } from "../ui/aspect-ratio";
import { BsFillCalendarCheckFill, BsFillClockFill } from "react-icons/bs";
import Image from "next/image";
import { code } from "@/public/images";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const MainResources = () => {
  const router = useRouter();
  return (
    <section className="flex flex-col lg:grid lg:grid-cols-[auto_minmax(200px,_400px)] gap-5 py-5">
      <div className="flex max-lg:flex-col max-lg:space-y-3 lg:space-x-3 max-lg:items-center justify-between bg-gradient-to-r from-slate-500 to-purple-950 text-white p-5 rounded-lg">
        <div className="space-y-3">
          <h1 className="font-spartan text-3xl font-bold">Уроки програмування</h1>
          <p>Кожної суботи</p>
          <div className="bg-white w-full lg:min-w-[400px] p-5 text-slate-950 rounded-lg space-y-3">
            <h2 className="text-center md:text-left">Наступний урок</h2>
            <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0 items-center">
              <BsFillCalendarCheckFill size={18} />
              <p>Сб, 11.11</p>
              <BsFillClockFill size={18} />
              <p>10:00 - 12:00</p>
            </div>
          </div>
          <div className="flex flex-col space-y-3 md:flex-row md:space-x-5 md:space-y-0">
            <Button
              size="lg"
              className="bg-gradient-to-r from-slate-950 to-purple-950 font-semibold flex-shrink-0">
              Все про курс
            </Button>
            <Button
              size="lg"
              className="bg-gradient-to-r from-slate-950 to-purple-950 font-semibold flex-shrink-0">
              Мій прогрес
            </Button>
          </div>
        </div>
        <div className="w-full min-w-[200px] max-w-[300px] p-1 md:p-5">
          <AspectRatio ratio={16 / 11}>
            <Image src={code} alt="programming schedule" fill className="rounded-lg" />
          </AspectRatio>
        </div>
      </div>
      <div className="flex flex-col space-y-5 md:max-lg:flex-row md:max-lg:space-x-5 md:max-lg:space-y-0">
        <div
          className="flex flex-col space-y-3 items-center lg:items-start p-5 bg-gradient-to-r rounded-lg cursor-pointer max-h-[160px] from-slate-600 to-purple-950 text-white hover:shadow-2xl"
          onClick={() => router.push("textbook")}>
          <h1 className="text-xl">Підручник</h1>
          <h1 className="text-4xl">NOTES</h1>
          <h1 className="text-xl">by STUDENTO</h1>
        </div>
        <div
          className="space-y-3 p-5 bg-gradient-to-r rounded-lg cursor-pointer max-h-[120px] from-slate-600 to-purple-950 text-white hover:shadow-2xl"
          onClick={() => router.push("tasks")}>
          <h1 className="text-xl text-center lg:text-left md:py-4">Завдання</h1>
        </div>
      </div>
    </section>
  );
};

export default MainResources;
