"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChooseProject, Homework, MainResources, References } from "./index";

const TabsRow = () => {
  return (
    <section className="flex w-full p-1 md:p-5 border-t border-t-slate-200">
      <Tabs defaultValue="main" className="w-full">
        <div className="flex max-md:justify-center">
          <TabsList>
            <TabsTrigger value="main">Main content</TabsTrigger>
            <TabsTrigger value="additional">Additional content</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="main" className="flex flex-col">
          <MainResources />
          <References />
          <Homework />
        </TabsContent>
        <TabsContent value="additional">
          <ChooseProject />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default TabsRow;
