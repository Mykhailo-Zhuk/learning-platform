"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Homework, MainResources, References } from "./index";
import { useEffect, useState } from "react";
import { useStore } from "@/store/store";

const TabsRow = () => {
  const currentGroup = useStore((state) => state.group);
  const getGroup = useStore((state) => state.getGroup);

  const [loading, setLoading] = useState(true);
  const time = useStore((state) => state.time);
  const getTime = useStore((state) => state.getTime);

  useEffect(() => {
    const fetchData = async () => {
      await getTime(currentGroup);
      setLoading(false);
    };
    fetchData();
  }, [currentGroup]);

  return (
    <section className="flex w-full p-1 md:p-5 border-t border-t-slate-200">
      <Tabs defaultValue="group1" className="w-full">
        <div className="flex max-md:justify-center">
          <TabsList>
            <TabsTrigger value="group1" onClick={() => getGroup("group1")}>
              Group 1
            </TabsTrigger>
            <TabsTrigger value="group2" onClick={() => getGroup("group2")}>
              Group 2
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value={currentGroup} className="flex flex-col">
          <MainResources time={time} loading={loading} />
          <References />
          <Homework />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default TabsRow;
