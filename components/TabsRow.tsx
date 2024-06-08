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
  frontEnd: ["group2", "group3"],
  react: ["arthor"],
};

const TabsRow = ({ selectedCourse }: TabsRowTypes) => {
  const [loading, setLoading] = useState(true);

  const currentGroup = useStore((state) => state.group);
  const getGroup = useStore((state) => state.getGroup);

  useEffect(() => {
    const fetchData = async () => {
      await getGroup(COURSE[selectedCourse][0]);
      setLoading(false);
    };
    fetchData();
  }, [selectedCourse]);

  return (
    <section className="flex w-full p-1 md:p-5 border-t border-t-slate-200">
      <Tabs defaultValue={COURSE[selectedCourse][0]} className="w-full">
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
        <TabsContent value={currentGroup} className="flex flex-col">
          {loading ? (
            <MainResourcesSkeleton />
          ) : (
            <MainResources key={currentGroup} currentGroup={currentGroup} isLoading={loading} />
          )}
          {loading ? <ReferencesSkeleton /> : <References />}
          {loading ? <HomeworkSkeleton /> : <Homework />}
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default TabsRow;
