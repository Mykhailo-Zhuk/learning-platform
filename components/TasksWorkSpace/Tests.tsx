"use client";

import React, { useEffect, useState } from "react";
import { useStore } from "@/store/store";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Spinner from "../ui/spinner";

type Params = { params: string };

const CustomTooltip = (trigger: React.ReactNode, content: React.ReactNode) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{trigger}</TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const Tests = ({ params }: Params) => {
  const [loading, setLoading] = useState(true);
  const practicalTests = useStore((state) => state.tests);
  const setPracticalTests = useStore((state) => state.getTests);

  useEffect(() => {
    const fetchData = async () => {
      await setPracticalTests(params);
      setLoading(false);
    };
    fetchData();
  }, []);

  let content;

  if (loading) {
    content = <Spinner />;
  } else {
    if (practicalTests?.length !== 0) {
      content = practicalTests?.map((practical) => {
        return practical?.tests.map((test, index) => {
          const testCardStyles = `relative max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl ${
            test?.extra ? "bg-blue-200" : ""
          }`;

          return (
            <div key={test?.id} className={testCardStyles}>
              <div className="md:flex">
                <div className="p-8">
                  <div className="flex justify-between pr-7 uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                    <h1>Тема: {practical?.subtitle}</h1>
                    {test?.extra ? <p>Extra</p> : null}
                  </div>
                  <p className="mt-2 text-gray-500 leading-8 text-justify">
                    <span className="bg-accent rounded-full py-2 px-3.5 mr-2">{index + 1}</span>
                    {test?.description}
                  </p>
                  {/* <div className="mt-4">
                    <h4 className="text-gray-500">Options:</h4>
                    <ul className="list-disc list-inside mt-2">
                      {test?.options.map((option, index) => (
                        <li key={index}>{option}</li>
                      ))}
                    </ul>
                  </div> */}
                  <div className="absolute top-0 right-0 p-2">
                    <p className="text-4xl text-center">{index % 2 === 0 ? "A" : "B"}</p>
                  </div>
                  <div className="mt-4 text-justify">
                    <h4 className="text-gray-500">Результат:</h4>
                    {CustomTooltip(
                      <p className="mt-2 text-black">{test?.result}</p>,
                      <ul className="list-disc list-inside p-2 text-sm">
                        {test?.tips.map((tip, index) => (
                          <li key={index}>{tip}</li>
                        ))}
                      </ul>,
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        });
      });
    } else {
      content = (
        <h1 className="text-2xl text-center py-5">
          В цьому розділі немає жодних практичних завдань
        </h1>
      );
    }
  }

  return <div className="max-w-full mx-auto min-md:p-6 flex flex-col space-y-3">{content}</div>;
};

export default Tests;
