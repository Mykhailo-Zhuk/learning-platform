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

const AllHomework = () => {
  const [loading, setLoading] = useState(true);

  const currentGroup = useStore((state) => state.group);
  const initialHomework = useStore((state) => state.homework);
  const getHomework = useStore((state) => state.getHomework);

  const homework = initialHomework.reverse();

  useEffect(() => {
    const fetchData = async () => {
      await getHomework(currentGroup);
      setLoading(false);
    };
    fetchData();
  }, [getHomework, currentGroup]);

  let content;

  if (loading) {
    content = <Skeleton className="w-full h-10 rounded-lg"></Skeleton>;
  } else {
    if (homework?.length !== 0) {
      content = homework?.map((item) => {
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
                              return (
                                <a
                                  key={theme?.id}
                                  href={theme?.link}
                                  className="text-blue-500 flex-shrink-0 pb-1"
                                  target="_blank">
                                  {theme?.title + ","}
                                </a>
                              );
                            })
                          : null}
                        {work?.links
                          ? work?.links.map((theme) => {
                              return (
                                <Link
                                  key={theme?.id}
                                  href={theme?.link}
                                  className="text-blue-500 flex-shrink-0 pb-1">
                                  {theme?.title + ","}
                                </Link>
                              );
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
          <h1 className="font-bold text-base md:text-xl">Усі домашні завдання</h1>
          <Button asChild>
            <Link href="/">
              <span className="text-xl mr-2">&lt;</span> Повернутися
            </Link>
          </Button>
        </div>
        {content}
      </div>
    </section>
  );
};

export default AllHomework;
