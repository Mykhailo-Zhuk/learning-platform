"use client";

import { useEffect, useState } from "react";
import {
  AdminPanelList,
  HomeworkInput,
  ParentsCabinetFormSwicher,
  QuestionsInput,
  TestsInput,
  TextbookInput,
} from "@/components/index";

const Content = ({ params }: { params: { category: string } }) => {
  const [category, setCategory] = useState("");

  useEffect(() => {
    setCategory(params.category);
  }, [params]);

  let content;

  switch (category) {
    case "questions":
      content = <QuestionsInput />;
      break;
    case "tests":
      content = <TestsInput />;
      break;
    case "textbook":
      content = <TextbookInput />;
      break;
    case "homework":
      content = <HomeworkInput />;
      break;
    case "parents-cabinet":
      content = <ParentsCabinetFormSwicher />;
      break;

    default:
      break;
  }

  return (
    <section>
      <div className="max-w-[1400px] max-md:flex max-md:flex-col max-md:space-y-5 mx-auto p-5 grid grid-cols-[minmax(200px,_250px)_auto] gap-x-12 font-lora">
        <AdminPanelList />
        {content}
      </div>
    </section>
  );
};

export default Content;
