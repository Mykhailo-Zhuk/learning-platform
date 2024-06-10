"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Homework,
  HomeworkSkeleton,
  MainResources,
  MainResourcesSkeleton,
  References,
  ReferencesSkeleton,
} from "./index";
import { useEffect, useState } from "react";
import { useStore } from "@/store/store";
import { formatGroupName } from "@/lib/utils";

type TabsRowTypes = {
  selectedCourse: string;
};

type CourseTypes = {
  [key: string]: string[];
};

const COURSE: CourseTypes = {
  front: ["group2", "group3"],
  react: ["arthor"],
};

const TabsRow = ({ selectedCourse }: TabsRowTypes) => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(COURSE[selectedCourse][0]);

  const getGroup = useStore((state) => state.getGroup);

  useEffect(() => {
    const fetchData = async () => {
      const initialGroup = COURSE[selectedCourse][0];
      getGroup(initialGroup);
      setActiveTab(initialGroup);
      setLoading(false);
    };
    fetchData();
  }, [selectedCourse, getGroup]);

  return (
    <section className="flex w-full p-1 md:p-5 border-t border-t-slate-200">
      <Tabs value={activeTab} className="w-full" onValueChange={(value) => setActiveTab(value)}>
        <div className="flex max-md:justify-center">
          <TabsList>
            {COURSE[selectedCourse].map((group: string) => {
              const formattedGroupName = formatGroupName(group);

              return (
                <TabsTrigger key={group} value={group} onClick={() => getGroup(group)}>
                  {formattedGroupName}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>
        <TabsContent value={activeTab} className="flex flex-col">
          {loading ? (
            <MainResourcesSkeleton />
          ) : (
            <MainResources currentGroup={activeTab} isLoading={loading} />
          )}
          {loading ? <ReferencesSkeleton /> : <References />}
          {loading ? <HomeworkSkeleton /> : <Homework />}
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default TabsRow;
