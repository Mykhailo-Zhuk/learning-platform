'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '../ui/button';

const Homework = () => {
  return (
    <section className="flex space-x-5 border-t border-t-slate-200 py-5">
      <div className="bg-slate-200 p-5 space-y-5 rounded-lg w-full">
        <div className="flex justify-between">
          <h1 className="font-bold text-xl">Моє домашнє завдання</h1>
          <Button>
            Уся домашня <span className="text-xl ml-2">&#62;</span>
          </Button>
        </div>

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="px-3 py-3 bg-slate-100">09.10.2023</AccordionTrigger>
            <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default Homework;
