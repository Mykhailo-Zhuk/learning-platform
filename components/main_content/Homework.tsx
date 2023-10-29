"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";
import Link from "next/link";
import { baseURL } from "@/lib/utils";

const Homework = () => {
  return (
    <section className="border-t border-t-slate-200 py-5">
      <div className="bg-slate-200 p-5 space-y-5 rounded-lg w-full">
        <div className="flex flex-col md:flex-row space-y-3 md:space-x-3 md:space-y-0 md:justify-between">
          <h1 className="font-bold text-base md:text-xl">Моє домашнє завдання</h1>
          <Button>
            Уся домашня <span className="text-xl ml-2">&#62;</span>
          </Button>
        </div>

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="px-3 py-3 bg-slate-100">28.10.2023</AccordionTrigger>
            <AccordionContent className="px-3 py-3 bg-slate-300 rounded-b-lg">
              <ol className="list-decimal list-inside">
                <li className="mt-2">
                  Прочитати тему{" "}
                  <a
                    href="https://w3schoolsua.github.io/html/html5_semantic_elements.html"
                    className="text-blue-500">
                    &quot;HTML Семантика&quot;
                  </a>
                  ;
                </li>
                <li className="mt-2">
                  Прочитати теми від{" "}
                  <a
                    href="https://w3schoolsua.github.io/html/html_basic.html#gsc.tab=0"
                    className="text-blue-500">
                    HTML Основні приклади до HTML Параграфи
                  </a>
                  ;
                </li>
                <li className="mt-2">
                  Ознайомитися із практичними завданнями та тестами по темах:{" "}
                  <Link href={`${baseURL}tasks/html_syntax`} className="text-blue-500">
                    Синтаксис та структурованість
                  </Link>
                  ,{" "}
                  <Link href={`${baseURL}tasks/html_semantics`} className="text-blue-500">
                    Семантика
                  </Link>
                  ,{" "}
                  <Link href={`${baseURL}tasks/html_tags`} className="text-blue-500">
                    Теги HTML
                  </Link>
                  ;
                </li>
              </ol>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default Homework;
