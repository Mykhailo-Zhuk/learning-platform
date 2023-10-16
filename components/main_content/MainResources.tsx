'use client';

import { AspectRatio } from '../ui/aspect-ratio';
import { BsFillCalendarCheckFill, BsFillClockFill } from 'react-icons/bs';
import Image from 'next/image';
import { code } from '@/public/images';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

const MainResources = () => {
  const router = useRouter();
  return (
    <section className="grid grid-cols-[auto_400px] gap-5 py-5">
      <div className="flex justify-between bg-gradient-to-r from-slate-500 to-purple-950 text-white p-5 rounded-lg">
        <div className="space-y-3 ">
          <h1 className="font-spartan text-3xl font-bold">Уроки програмування</h1>
          <p>Кожної суботи</p>
          <div className="bg-white w-1/2 min-w-[400px] p-5 text-slate-950 rounded-lg space-y-3">
            <h2>Наступний урок</h2>
            <div className="flex space-x-2 items-center">
              <BsFillCalendarCheckFill size={18} />
              <p>Сб, 09.10</p>
              <BsFillClockFill size={18} />
              <p>17:00 - 19:00</p>
            </div>
          </div>
          <div className="flex space-x-5">
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
        <div className="w-[300px] p-5">
          <AspectRatio ratio={16 / 11}>
            <Image src={code} alt="programming schedule" fill className="rounded-lg" />
          </AspectRatio>
        </div>
      </div>
      <div className="flex flex-col space-y-5">
        <div
          className="space-y-3 p-5 bg-gradient-to-r rounded-lg cursor-pointer max-h-[160px] from-slate-600 to-purple-950 text-white hover:shadow-2xl"
          onClick={() => router.push('textbook')}>
          <h1 className="text-xl">Підручник</h1>
          <h1 className="text-4xl">NOTES</h1>
          <h1 className="text-xl">by STUDENTO</h1>
        </div>
        <div className="space-y-3 p-5 bg-gradient-to-r rounded-lg cursor-pointer max-h-[120px] from-slate-600 to-purple-950 text-white hover:shadow-2xl">
          <h1 className="text-xl">Завдання</h1>
        </div>
      </div>
    </section>
  );
};

export default MainResources;
