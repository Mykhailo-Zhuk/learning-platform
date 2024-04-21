import {
  fetchDataFromNextServer,
  fetchPartOfData,
  fetchPersonalHomeworkResults,
} from "@/lib/utils";
import { create } from "zustand";

type Image = {
  image?: {
    src: string;
    caption?: string[];
  };
};
type Table = {
  table?: {
    title?: string;
    headers: string[];
    rows: {
      id: number | string;
      item: string;
      example?: string;
      description: string;
    }[];
  };
};
type List = {
  list: {
    title: string;
    items: {
      id: string;
      item: string;
    }[];
  };
};

type Users = { id: string | number; name: string; password: string; role: "admin" | "student" }[];
type Tests = {
  subtitle: string;
  url: string;
  tests: {
    id: number | string;
    description: string;
    tips: string[];
    extra?: boolean;
  }[];
}[];
type Time = { start_time: string; end_time: string; date: string; completed: boolean };
type Questions = {
  subtitle: string;
  url: string;
  tasks: {
    id: number | string;
    question: string;
    options: string[];
    correctAnswer: string;
    level?: string;
  }[];
}[];
type Code = {
  code: { codeValue: string; language: string };
};
type Description = {
  subtitle: string;
  content: [string, Image, Table, List, Code];
}[];
type ListOfThemes = {
  title: string;
  subtitles: {
    id: number | string;
    subtitle: string;
    url: string;
  }[];
}[];
type AdminList = { id: number | string; title: string; url: string }[];
type HomeWorkItem = {
  id: number | string;
  link: string;
  title: string;
  type: string;
};
type Homework = {
  id: number | string;
  date: string;
  homework: {
    id: string;
    action: string;
    listOfThemes?: HomeWorkItem[];
    links?: HomeWorkItem[];
  }[];
}[];

export type PersonalHomeworkResults = {
  name: string;
  group: string;
  type: string;
  homeworkIsDone: {
    id: string;
    date: string;
    isCompleted: "Частково" | "Виконав" | "Не виконав";
    lessonTitle: string;
    homeworkId: string;
  }[];
};

type Store = {
  group: string;
  users: Users;
  tests: Tests;
  time: Time;
  questions: Questions;
  descriptions: Description;
  listOfThemes: ListOfThemes;
  adminPanelList: AdminList;
  homework: Homework;
  personalHomeworkResults: PersonalHomeworkResults;

  addListOfThemes: () => void;
  getUsers: () => void;
  getTests: (params: string) => void;
  getQuestions: (params: string) => void;
  getDescriptions: (params: string) => void;
  getAdminPanelList: () => void;
  getHomework: (group: string) => void;
  getTime: (group: string) => void;
  getGroup: (group: string) => void;
  getPersonalHomeworkResults: (username: string) => void;
};

export const useStore = create<Store>((set, get) => ({
  personalHomeworkResults: {
    name: "",
    group: "",
    type: "",
    homeworkIsDone: [],
  },
  adminPanelList: [],
  time: { start_time: "", end_time: "", date: "", completed: false },
  users: [],
  tests: [],
  questions: [],
  descriptions: [],
  listOfThemes: [],
  homework: [],
  group: "group1",

  getGroup: async (group) => {
    set({ group });
  },

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

      set({ tests: data });
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

      set({ descriptions: data });
    } catch (error) {
      console.log(error);
    }
  },
  getHomework: async (group) => {
    try {
      const response = await fetchPartOfData("homework", group);

      const data = await response.json();

      set({ homework: data });
    } catch (error) {
      console.log(error);
    }
  },

  getTime: async (group) => {
    try {
      const response = await fetchPartOfData("time", group);

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
  getPersonalHomeworkResults: async (username) => {
    try {
      const response = await fetchPersonalHomeworkResults(username);

      const data = await response.json();

      set({ personalHomeworkResults: data });
    } catch (error) {
      console.log(error);
    }
  },
}));
