"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { ReactElement, useEffect, useState } from "react";
import { User } from "./ParentsCabinet";
import { fetchPersonalHomework } from "@/lib/utils";
import Spinner from "../ui/spinner";

const ShowExactHomework = ({
  className,
  user,
  homeworkId,
}: {
  className: string;
  user: User;
  homeworkId: string;
}) => {
  const [loading, setLoading] = useState(true);
  const [personalHomework, setPersonalHomework] = useState({});

  const fetchDataHandler = async () => {
    if (user?.label) {
      const response = await fetchPersonalHomework(user?.group, homeworkId);
      console.log(response);
      if (!response.ok) throw new Error("Щось пішло не так під час отримання даних");

      const data = await response.json();
      console.log(data);

      setPersonalHomework(data);
    }
    setLoading(false);
  };

  return (
    <Drawer>
      <DrawerTrigger className={className} onClick={fetchDataHandler}>
        Отримати
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>Cancel</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ShowExactHomework;
