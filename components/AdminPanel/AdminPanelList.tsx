"use client";

import React, { useEffect, useState } from "react";
import { useStore } from "@/store/store";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";

const AdminPanelList = () => {
  const [loading, setLoading] = useState(true);
  const adminPanelList = useStore((state) => state.adminPanelList);
  const setAdminPanelList = useStore((state) => state.getAdminPanelList);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      await setAdminPanelList();
      setLoading(false);
    };
    fetchData();
  }, []);

  let content;

  if (adminPanelList?.length === 0) {
    content = <p className="text-center">Сталася помилка під час завантаження</p>;
  }

  if (loading) {
    content = Array.from({ length: 3 }, (_, i) => i + 1).map((_, id) => {
      return <Skeleton key={id} className="w-full h-12 rounded-lg"></Skeleton>;
    });
  } else {
    content = (
      <ul className="flex flex-col space-y-3">
        {adminPanelList?.map((item) => {
          return (
            <li
              key={item?.id}
              onClick={() => router.push(`admin?type=${item?.url}`)}
              className="text-xl px-4 py-1 hover:bg-accent rounded-lg cursor-pointer">
              {item.title}
            </li>
          );
        })}
      </ul>
    );
  }
  return <div className="flex flex-col space-y-2">{content}</div>;
};

export default AdminPanelList;
