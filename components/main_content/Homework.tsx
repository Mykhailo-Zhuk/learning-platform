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
import { HomeworkReadingOutput, HomeworkWrittingOutput } from "../index";
import Spinner from "../ui/spinner";

const Homework = () => {
  const [loading, setLoading] = useState(true);

  const currentGroup = useStore((state) => state.group);
  const homework = useStore((state) => state.homework);
  const getHomework = useStore((state) => state.getHomework);

  useEffect(() => {
    const fetchData = async () => {
      await getHomework(currentGroup);
      setLoading(false);
    };
    fetchData();
  }, [currentGroup]);

  const homeworkSlice = homework && homework?.slice(-3).reverse();

  let content;

  if (loading) {
    content = <Spinner drawer />;
  } else if (homeworkSlice?.length === 0 || homeworkSlice === null) {
    content = <p>Виникла помилка або ніякої домашньої роботи не знайдено</p>;
  } else {
    content = homeworkSlice?.map((item) => {
      const readingTasks = item?.homework.filter((readingTask) => readingTask?.listOfThemes);
      const writingTasks = item?.homework.filter((writingTask) => writingTask?.links);
      const writtingTasksByText = writingTasks[0].links?.filter((link) => link?.type === "text");
      const writtingTasksByPhotos = writingTasks[0].links?.filter((link) => link?.type === "photo");
      const writtingTasksByLinks = writingTasks[0].links?.filter(
        (link) => link?.type === "link" || link?.type === "a",
      );

      return (
        <Accordion key={item?.id} type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="px-3 py-3 bg-slate-100">{item?.date}</AccordionTrigger>
            <AccordionContent className="px-3 py-3 bg-slate-300 rounded-b-lg">
              {readingTasks?.length !== 0 && (
                <>
                  <p className="font-bold text-nowrap">{readingTasks[0].action}</p>
                  <ol className="list-decimal list-inside">
                    {readingTasks.map((reading) => {
                      return (
                        <HomeworkReadingOutput
                          key={reading.id}
                          listOfThemes={reading.listOfThemes}
                        />
                      );
                    })}
                  </ol>
                </>
              )}
              {writingTasks && (
                <>
                  <p className="font-bold text-nowrap pt-2">{writingTasks[0].action}</p>
                  {writtingTasksByText?.length !== 0 && (
                    <ol className="list-decimal list-inside">
                      {writtingTasksByText?.map((writting) => {
                        return (
                          <HomeworkWrittingOutput
                            key={writting?.id}
                            id={writting?.id}
                            type={writting?.type}
                            title={writting?.title}
                            link={writting?.link}
                          />
                        );
                      })}
                    </ol>
                  )}
                  {writtingTasksByPhotos?.length !== 0 && (
                    <div className="flex space-x-2 bg-slate-200 mt-2 p-1 rounded-lg shadow-lg">
                      <p className="font-bold">Фото: </p>
                      {writtingTasksByPhotos?.map((writting) => {
                        return (
                          <HomeworkWrittingOutput
                            key={writting?.id}
                            id={writting?.id}
                            type={writting?.type}
                            title={writting?.title}
                            link={writting?.link}
                          />
                        );
                      })}
                    </div>
                  )}
                  {writtingTasksByLinks?.length !== 0 && (
                    <div className="flex space-x-2 bg-slate-200 p-1 mt-2 rounded-lg shadow-lg">
                      <p className=" font-bold">Силки: </p>
                      {writtingTasksByLinks?.map((writting) => {
                        return (
                          <HomeworkWrittingOutput
                            key={writting?.id}
                            id={writting?.id}
                            type={writting?.type}
                            title={writting?.title}
                            link={writting?.link}
                          />
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      );
    });
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
