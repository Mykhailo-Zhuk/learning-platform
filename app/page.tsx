"use client";

import { Hello, TabsRow } from "@/components/index";
import { useState } from "react";

export default function Home() {
  const [courseType, setCourseType] = useState("frontEnd");

  const handleCourseType = (courseType: string) => {
    setCourseType(courseType);
  };

  return (
    <main className="flex min-h-screen w-full max-w-[1400px] font-monserat mx-auto flex-col px-5">
      <Hello onCourseSelect={handleCourseType} />
      <TabsRow selectedCourse={courseType} />
    </main>
  );
}
