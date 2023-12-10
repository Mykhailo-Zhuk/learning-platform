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

type Store = {
  users: { id: string | number; name: string; password: string; role: "admin" | "student" }[];
  tests: {
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

  time: { start_time: string; end_time: string; date: string };

  questions: {
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

  projects: {
    id: number;
    title: string;
    description: string;
    skills: string;
    votes: number;
    participants: string[];
  }[];

  descriptions: {
    subtitle: string;
    content: [string, Image, Table, List];
  }[];

  listOfThemes: {
    title: string;
    subtitles: {
      id: number;
      subtitle: string;
      url: string;
    }[];
  }[];

  adminPanelList: {
    id: number;
    title: string;
    url: string;
  }[];

  homework: {
    id: number;
    date: string;
    homework: {
      id: number;
      action: string;
      listOfThemes?: {
        id: number;
        link: string;
        title: string;
      }[];
      links?: { id: number; title: string; link: string }[];
    }[];
  }[];

  addListOfThemes: () => void;
  getUsers: () => void;
  getTests: (params: string) => void;
  getProjects: () => void;
  getQuestions: (params: string) => void;
  getDescriptions: (params: string) => void;
  getAdminPanelList: () => void;
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
