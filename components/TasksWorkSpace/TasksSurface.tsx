"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Questions, Tests } from "../index";

type Params = { params: string };

const TasksSurface = ({ params }: Params) => {
  return (
    <section className="flex w-full md:px-5 py-5 border-t border-t-slate-200">
      <Tabs defaultValue="tests" className="w-full">
        <TabsList className="max-md:h-20 max-md:w-full">
          <div className="flex max-md:flex-col max-md:justify-center items-center">
            <TabsTrigger value="tests" className="">
              Під час заняття
            </TabsTrigger>
            <TabsTrigger value="questions" className="">
              Для домашньої роботи
            </TabsTrigger>
          </div>
        </TabsList>
        <TabsContent value="tests">
          <Tests params={params} />
        </TabsContent>
        <TabsContent value="questions">
          <Questions params={params} />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default TasksSurface;
