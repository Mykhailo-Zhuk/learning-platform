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
  // TODO: add adaptive style
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
      <div className="max-w-[1400px] max-md:flex max-md:flex-col max-md:space-y-5 mx-auto p-5 grid grid-cols-[minmax(200px,_250px)_auto] gap-x-12">
        <AdminPanelList />
        {content}
      </div>
    </section>
  );
};

export default Content;
