"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";
import { useState } from "react";
import { User } from "./ParentsCabinet";
import { fetchPersonalHomework } from "@/lib/utils";
import Spinner from "../ui/spinner";
import { HomeworkWrittingOutput, HomeworkReadingOutput, HomeworkDrawerTips } from "../index";
import { Homework } from "@/store/store";

const ShowExactHomework = ({
  className,
  user,
  homeworkId,
}: {
  className: string;
  user: User;
  homeworkId: string;
}) => {
  const [loading, setLoading] = useState(true);
  const [personalHomework, setPersonalHomework] = useState<Homework>({
    date: "",
    homework: [{ id: "", action: "", listOfThemes: [], links: [] }],
    id: "",
  });

  const fetchDataHandler = async () => {
    if (user?.label) {
      const response = await fetchPersonalHomework(user?.group, homeworkId);

      if (!response.ok) throw new Error("Щось пішло не так під час отримання даних");

      const data = await response.json();

      setPersonalHomework(data[0]);
      setLoading(false);
    }
  };

  const readingTasks = personalHomework.homework.filter((readingTask) => readingTask?.listOfThemes);
  const writingTasks = personalHomework.homework.filter((writingTask) => writingTask?.links);
  const writtingTasksByText = writingTasks[0].links?.filter((link) => link?.type === "text");
  const writtingTasksByPhotos = writingTasks[0].links?.filter((link) => link?.type === "photo");
  const writtingTasksByLinks = writingTasks[0].links?.filter(
    (link) => link?.type === "link" || link?.type === "a",
  );

  let content;

  if (loading) {
    content = <Spinner drawer />;
  } else if (personalHomework?.homework.length === 0 || personalHomework === null) {
    content = <p>Виникла помилка або ніякої домашньої роботи не знайдено</p>;
  } else {
    content = (
      <>
        {readingTasks?.length !== 0 && (
          <>
            <p className="font-bold text-nowrap">{readingTasks[0].action}</p>
            <ol className="list-decimal list-inside">
              {readingTasks.map((reading) => {
                return (
                  <HomeworkReadingOutput key={reading.id} listOfThemes={reading.listOfThemes} />
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
      </>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger className={className} onClick={fetchDataHandler}>
        Отримати
      </DrawerTrigger>

      <DrawerContent className="max-w-screen-md mx-auto p-5 font-lora">
        <DrawerHeader className="px-0 pt-5 pb-1">
          <DrawerTitle>Домашня робота за {personalHomework?.date}</DrawerTitle>
          <DrawerDescription>
            Тут Ви можете ознайомитися із переліком домашньої роботи, яку необхідно було виконати до
            наступного заняття
          </DrawerDescription>
        </DrawerHeader>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <b>Як виконувати?</b>
            </AccordionTrigger>
            <AccordionContent>
              <HomeworkDrawerTips />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="min-h-64 overflow-y-auto overflow-x-hidden">{content}</div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="ghost">Закрити</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ShowExactHomework;
