"use client";

import { useEffect, useState } from "react";
import { CabinetNavigation, CabinetWorkspace } from "../index";
import { useStore } from "@/store/store";

export type User =
  | {
      name: string;
      role: string;
      label: string;
      group: string;
    }
  | undefined;

type Props = {
  user: User;
};

const ParentsCabinet = ({ user }: Props) => {
  const [loading, setLoading] = useState(true);
  const personalHomeworkResults = useStore((state) => state.personalHomeworkResults);
  const getPersonalHomeworkResults = useStore((state) => state.getPersonalHomeworkResults);

  useEffect(() => {
    const fetchData = async () => {
      user?.label && (await getPersonalHomeworkResults(user?.label));
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <section>
      <div className="max-w-[1440px] mx-auto p-5">
        <div className="grid grid-cols-[1fr_3fr]">
          <CabinetNavigation />
          <CabinetWorkspace user={user} userData={personalHomeworkResults} />
        </div>
      </div>
    </section>
  );
};

export default ParentsCabinet;
