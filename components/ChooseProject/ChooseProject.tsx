"use client";

import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { useStore } from "@/store/store";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fetchToChangeDataOnServer } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

type Project = {
  project: {
    id: number;
    title: string;
    description: string;
    skills: string;
    votes: number;
    participants: string[];
  };
  handleVote: (
    id: number,
    name: string,
    title: string,
    setIsClicked: Dispatch<SetStateAction<boolean>>,
  ) => void;
};

const participants: { id: string; name: string }[] = [
  { id: "arthor", name: "Артур" },
  { id: "victor", name: "Віктор" },
];

const ProjectCard = ({ project, handleVote }: Project) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 m-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-2">{project.title}</h2>
      <p className="text-gray-700 text-base mb-4">{project.description}</p>
      <p className="text-gray-600 text-sm">{project.skills}</p>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setIsClicked((prevState) => !prevState)}
          className="bg-blue-500 hover:bg-blue-700 flex-shrink-0 text-white font-bold py-2 px-4 rounded">
          Vote
        </button>
        {isClicked && (
          <div className="w-40 transition-all duration-500 overflow-hidden flex justify-center items-center">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <span className="py-2 px-3 hover:bg-accent rounded-lg">Виконавець</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {participants.map((participant) => (
                  <DropdownMenuItem
                    key={participant.id}
                    className="cursor-pointer hover:bg-gray-200 p-2"
                    onClick={() =>
                      handleVote(project.id, participant.name, project.title, setIsClicked)
                    }>
                    {participant.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
        <p className="text-gray-600 text-sm pt-2 flex-shrink-0">Votes: {project.votes}</p>
      </div>
    </div>
  );
};

const ChooseProject = () => {
  const [loading, setLoading] = useState(true);
  const projects = useStore((state) => state.projects);
  const setProjects = useStore((state) => state.getProjects);
  const { toast } = useToast();

  const notification = (name: string, title: string) => {
    return toast({
      title: `${name}, ви обрали наcтупний проект:`,
      description: <p>{title}</p>,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      await setProjects();
      setLoading(false);
    };
    fetchData();
  }, [setProjects]);

  const handleVote = async (
    id: number,
    name: string,
    title: string,
    setIsClicked: Dispatch<SetStateAction<boolean>>,
  ) => {
    setIsClicked((prevState) => !prevState);
    let updatedProject;

    const selectedProject = projects?.filter((proj) => proj.id === id);

    if (selectedProject) {
      updatedProject = {
        ...selectedProject[0],
        votes: selectedProject[0].votes + 1,
        participants: [...selectedProject[0].participants, name],
      };
    }

    notification(name, title);

    try {
      const response = await fetchToChangeDataOnServer("projects", "put", updatedProject);

      const data = await response.json();

      if (response.ok) {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let content;

  if (projects?.length === 0) {
    return <h1 className="text-center py-10">В цьому розділі немає жодних проектів для вибору</h1>;
  }

  if (loading) {
    content = Array.from({ length: 8 }, (_, i) => i + 1).map((_, id) => {
      return <Skeleton key={id} className="h-80 w-96 rounded-lg"></Skeleton>;
    });
  } else {
    content = projects?.map((project) => (
      <ProjectCard key={project.id} project={project} handleVote={handleVote} />
    ));
  }

  return <div className="flex flex-wrap justify-center gap-5">{content}</div>;
};

export default ChooseProject;
