"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";
import Link from "next/link";
import { useStore } from "@/store/store";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

const Homework = () => {
  const [loading, setLoading] = useState(true);
  const homework = useStore((state) => state.homework);
  const getHomework = useStore((state) => state.getHomework);

  console.log(homework);
  useEffect(() => {
    const fetchData = async () => {
      await getHomework();
      setLoading(false);
    };
    fetchData();
  }, [getHomework]);

  const homeworkSlice = homework.slice(-3).reverse();

  let content;

  if (loading) {
    content = <Skeleton className="w-full h-10 rounded-lg"></Skeleton>;
  } else {
    if (homework?.length !== 0) {
      content = homeworkSlice?.map((item) => {
        return (
          <Accordion key={item?.id} type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="px-3 py-3 bg-slate-100">{item?.date}</AccordionTrigger>
              <AccordionContent className="px-3 py-3 bg-slate-300 rounded-b-lg">
                <ol className="list-decimal list-inside">
                  {item?.homework.map((work) => {
                    return (
                      <li key={work?.id} className="mt-2 flex space-x-1 flex-wrap">
                        <p className="font-bold">{work?.action}</p>
                        {work?.listOfThemes
                          ? work?.listOfThemes?.map((theme) => {
                              if (theme?.type === "link") {
                                return (
                                  <Link
                                    key={theme?.id}
                                    href={theme?.link}
                                    className="text-blue-500 flex-shrink-0 pb-1"
                                    target="_blank">
                                    {theme?.title + ", "}
                                  </Link>
                                );
                              }

                              if (theme?.type === "a") {
                                return (
                                  <a
                                    key={theme?.id}
                                    href={theme?.link}
                                    className="text-blue-500 flex-shrink-0 pb-1"
                                    target="_blank">
                                    {theme?.title + ", "}
                                  </a>
                                );
                              }

                              if (theme?.type === "text") {
                                return theme.title + " " + theme.link + ", ";
                              }
                            })
                          : null}
                        {work?.links
                          ? work?.links.map((theme) => {
                              if (theme?.type === "link") {
                                return (
                                  <Link
                                    key={theme?.id}
                                    href={theme?.link}
                                    className="text-blue-500 flex-shrink-0 pb-1"
                                    target="_blank">
                                    {theme?.title + ", "}
                                  </Link>
                                );
                              }

                              if (theme?.type === "a") {
                                return (
                                  <a
                                    key={theme?.id}
                                    href={theme?.link}
                                    className="text-blue-500 flex-shrink-0 pb-1"
                                    target="_blank">
                                    {theme?.title + ", "}
                                  </a>
                                );
                              }

                              if (theme?.type === "text") {
                                return theme.title + " " + theme.link + ", ";
                              }
                            })
                          : null}
                      </li>
                    );
                  })}
                </ol>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      });
    } else {
      content = <p>Виникла помилка або ніякої домашньої роботи не знайдено</p>;
    }
  }

  return (
    <section className="border-t border-t-slate-200 py-5">
      <div className="bg-slate-200 p-5 space-y-2 rounded-lg w-full">
        <div className="flex flex-col md:flex-row space-y-3 md:space-x-3 md:space-y-0 md:justify-between">
          <h1 className="font-bold text-base md:text-xl">Моє домашнє завдання</h1>
          <Button asChild>
            <Link href="/homework">
              Уся домашня <span className="text-xl ml-2">&#62;</span>
            </Link>
          </Button>
        </div>
        {content}
      </div>
    </section>
  );
};

export default Homework;
