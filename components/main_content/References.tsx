'use client';

import { AiFillMessage } from 'react-icons/ai';
import { BsTelegram } from 'react-icons/bs';
import { Button } from '../ui/button';

const References = () => {
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
          <a href="#" className="flex space-x-3">
            <BsTelegram size={18} /> <p>Приєднатись</p>
          </a>
        </Button>
      </div>
    </section>
  );
};

export default References;
