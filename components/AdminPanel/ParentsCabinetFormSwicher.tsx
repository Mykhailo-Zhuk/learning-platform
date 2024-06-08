"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import Spinner from "../ui/spinner";
import {
  ParentsCabineYoutubeInputs,
  ParentsCabinetHomeworkInputs,
  ParentsCabinetNewUsersInputs,
} from "../index";

const ParentsCabinetFormSwicher = () => {
  const [loading, setLoading] = useState(true);

  return (
    <Tabs defaultValue="homework">
      <TabsList>
        <TabsTrigger value="homework">Домашня</TabsTrigger>
        <TabsTrigger value="youtube">Ютуб</TabsTrigger>
        <TabsTrigger value="users">Користувачі</TabsTrigger>
      </TabsList>
      <TabsContent value="homework">
        <ParentsCabinetHomeworkInputs />
      </TabsContent>
      <TabsContent value="youtube">
        <ParentsCabineYoutubeInputs />
      </TabsContent>
      <TabsContent value="users">
        <ParentsCabinetNewUsersInputs />
      </TabsContent>
    </Tabs>
  );
};

export default ParentsCabinetFormSwicher;
