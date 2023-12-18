import { fetchDataFromNextServer, fetchPartOfData } from "@/lib/utils";
import { create } from "zustand";

type Image = {
  image?: {
    src: string;
    height?: number;
    width?: number;
    blurDataURL?: string;
    blurWidth?: number;
    blurHeight?: number;
    caption?: string[];
  };
};
type Table = {
  table?: {
    title: string;
    headers: string[];
    rows: {
      id: number;
      selector: string;
      example?: string;
      description: string;
    }[];
  };
};
type List = {
  list: [
    {
      id: number;
      item: string;
    },
  ];
};

type Users = { id: string | number; name: string; password: string; role: "admin" | "student" }[];
type Tests = {
  subtitle: string;
  url: string;
  tests: {
    id: number | string;
    description: string;
    options: string[];
    tips: string[];
    result: string;
    extra?: boolean;
  }[];
}[];
type Time = { start_time: string; end_time: string; date: string };
type Questions = {
  subtitle: string;
  url: string;
  tasks: {
    id: number;
    question: string;
    options: string[];
    correctAnswer: string;
    level?: string;
  }[];
}[];
type Projects = {
  id: number;
  title: string;
  description: string;
  skills: string;
  votes: number;
  participants: string[];
}[];
type Description = {
  subtitle: string;
  content: [string, Image, Table, List];
}[];
type ListOfThemes = {
  title: string;
  subtitles: {
    id: number;
    subtitle: string;
    url: string;
  }[];
}[];
type AdminList = { id: number; title: string; url: string }[];
type HomeWorkItem = {
  id: number;
  link: string;
  title: string;
  type: string;
};
type Homework = {
  id: number;
  date: string;
  homework: {
    id: number;
    action: string;
    listOfThemes?: HomeWorkItem[];
    links?: HomeWorkItem[];
  }[];
}[];

type Store = {
  users: Users;
  tests: Tests;
  time: Time;
  questions: Questions;
  projects: Projects;
  descriptions: Description;
  listOfThemes: ListOfThemes;
  adminPanelList: AdminList;
  homework: Homework;

  addListOfThemes: () => void;
  getUsers: () => void;
  getTests: (params: string) => void;
  getProjects: () => void;
  getQuestions: (params: string) => void;
  getDescriptions: (params: string) => void;
  getAdminPanelList: () => void;
  getHomework: () => void;
  getTime: () => void;
};

export const useStore = create<Store>((set, get) => ({
  adminPanelList: [],
  time: { start_time: "", end_time: "", date: "" },
  users: [],
  tests: [],
  questions: [],
  descriptions: [],
  projects: [],
  listOfThemes: [],
  homework: [],

  addListOfThemes: async () => {
    try {
      const response = await fetchPartOfData("listOfThemes");
      const data = await response.json();
      set({ listOfThemes: data });
    } catch (error) {
      console.log(error);
    }
  },
  getUsers: async () => {
    try {
      const response = await fetchPartOfData("users");
      const data = await response.json();

      set({ users: data });
    } catch (error) {
      console.log(error);
    }
  },
  getTests: async (params: string) => {
    try {
      const response = await fetchPartOfData("tests", params);
      const data = await response.json();
      console.log(data);

      set({ tests: data });
    } catch (error) {
      console.log(error);
    }
  },
  getProjects: async () => {
    try {
      const response = await fetchDataFromNextServer("projects");
      const data = await response.json();

      set({ projects: data });
    } catch (error) {
      console.log(error);
    }
  },
  getQuestions: async (params: string) => {
    try {
      const response = await fetchPartOfData("questions", params);
      const data = await response.json();

      set({ questions: data });
    } catch (error) {
      console.log(error);
    }
  },
  getDescriptions: async (params: string) => {
    try {
      const response = await fetchPartOfData("descriptions", params);

      const data = await response.json();
      console.log(data);

      set({ descriptions: data });
    } catch (error) {
      console.log(error);
    }
  },
  getHomework: async () => {
    try {
      const response = await fetchPartOfData("homework");

      const data = await response.json();

      set({ homework: data });
    } catch (error) {
      console.log(error);
    }
  },

  getTime: async () => {
    try {
      const response = await fetchPartOfData("time");

      const data = await response.json();

      set({ time: data });
    } catch (error) {
      console.log(error);
    }
  },

  getAdminPanelList: async () => {
    try {
      const response = await fetchPartOfData("adminPanelList");

      const data = await response.json();

      set({ adminPanelList: data });
    } catch (error) {
      console.log(error);
    }
  },
}));
