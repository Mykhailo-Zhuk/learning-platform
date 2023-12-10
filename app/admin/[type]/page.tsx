"use client";

import {
  AdminPanelList,
  HomeworkInput,
  QuestionsInput,
  TestsInput,
  TextbookInput,
} from "@/components/index";
import { useEffect, useState } from "react";

const Content = ({ params }: { params: { type: string } }) => {
  const [type, setType] = useState("");

  useEffect(() => {
    setType(params.type);
  }, [params]);

  let content;

  switch (type) {
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

    default:
      break;
  }

  return (
    <section>
      <div className="max-w-[1400px] mx-auto p-5 grid grid-cols-[minmax(200px,_250px)_auto]">
        <AdminPanelList />
        {content}
      </div>
    </section>
  );
};

export default Content;
