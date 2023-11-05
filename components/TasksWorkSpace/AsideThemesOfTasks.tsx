"use client";

import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { useStore } from "@/store/store";
import { Skeleton } from "../ui/skeleton";

const AsideThemesOfTasks = () => {
  const [loading, setLoading] = useState(true);
  const listOfThemes = useStore((state) => state.listOfThemes);
  const setListOfThemes = useStore((state) => state.addListOfThemes);

  const transformTitle = (title: string) => {
    return title.replaceAll(" ", "_");
  };

  useEffect(() => {
    const fetchData = async () => {
      await setListOfThemes();
      setLoading(false);
    };
    fetchData();
  }, [setListOfThemes]);

  let content;

  if (loading) {
    content = Array.from({ length: 8 }, (_, i) => i + 1).map((_, id) => {
      return <Skeleton key={id} className="w-full h-16 rounded-lg"></Skeleton>;
    });
  } else {
    if (listOfThemes?.length !== 0) {
      content = (
        <Accordion type="single" collapsible className="flex flex-col space-y-1">
          {listOfThemes?.map((theme, index) => {
            return (
              <AccordionItem
                key={transformTitle(theme?.title) + index}
                value={transformTitle(theme?.title)}>
                <AccordionTrigger className="text-2xl text-left px-4 hover:bg-accent rounded-lg">
                  {theme?.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ul>
                    {theme?.subtitles?.map((subtheme) => {
                      return (
                        <Link
                          href={`/tasks/${subtheme?.url}`}
                          className="visited:text-red-400 active:text-blue-500"
                          key={subtheme.id}>
                          <li className="ml-4 px-4 text-xl cursor-pointer hover:bg-accent rounded-lg leading-loose">
                            {subtheme?.subtitle}
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      );
    } else {
      content = <p>Сталася помилка під час завантаження</p>;
    }
  }

  return <div className="flex flex-col space-y-1 pt-5">{content}</div>;
};

export default AsideThemesOfTasks;
