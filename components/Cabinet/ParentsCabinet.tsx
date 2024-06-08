"use client";

import { useEffect, useState } from "react";
import { CabinetNavigation, HomeworksWorkspace, YoutubeLinksWorkspace } from "../index";
import { useStore } from "@/store/store";
import Spinner from "../ui/spinner";
import { useSearchParams } from "next/navigation";

export type User =
  | {
      name: string;
      role: string;
      label: string;
      group: string;
    }
  | undefined;

type ParentsCabinetProps = {
  user: User;
};

const ParentsCabinet = ({ user }: ParentsCabinetProps) => {
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  // Youtube links
  const youtubeLinks = useStore((state) => state.youtubeLinks);
  const getYoutubeLinks = useStore((state) => state.getYoutubeLinks);

  // Homework
  const personalHomeworkResults = useStore((state) => state.personalHomeworkResults);
  const getPersonalHomeworkResults = useStore((state) => state.getPersonalHomeworkResults);

  useEffect(() => {
    const fetchData = async () => {
      if (type === "homeworks") {
        await getPersonalHomeworkResults(user?.label!);
      }
      if (type === "recording") {
        await getYoutubeLinks(user?.group!);
      }

      setLoading(false);
    };
    fetchData();
  }, [type, user?.group, user?.label]);

  let content;

  if (type === "homeworks") {
    content = <HomeworksWorkspace user={user} data={personalHomeworkResults.homeworkIsDone} />;
  }

  if (type === "recording") {
    content = <YoutubeLinksWorkspace data={youtubeLinks.youtube_links} />;
  }

  return (
    <section>
      <div className="max-w-[1440px] mx-auto p-5">
        <div className="grid grid-cols-[1fr_3fr]">
          <CabinetNavigation />
          {loading ? <Spinner /> : content}
        </div>
      </div>
    </section>
  );
};

export default ParentsCabinet;
