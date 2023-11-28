import { fetchDataFromNextServer, fetchPartOfData } from "@/lib/utils";
import { create } from "zustand";

type Store = {
  // tracks: { title: string; url: string }[];
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

  questions: {
    subtitle: string;
    url: string;
    tasks: {
      id: number;
      question: string;
      options: string[];
      correctAnswer: string;
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
    id: number | string;
    subtitle: string;
    url: string;
    definition: string[];
    image?: { url: string; caption: string[] };
    code?: string[];
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
  // addTracks: () => void;
  addListOfThemes: () => void;
  getUsers: () => void;
  getTests: (params: string) => void;
  getProjects: () => void;
  getQuestions: (params: string) => void;
  getDescriptions: (params: string) => void;
  getAdminPanelList: () => void;
};

export const useStore = create<Store>((set, get) => ({
  // tracks: [],
  adminPanelList: [],
  users: [],
  tests: [],
  questions: [],
  descriptions: [],
  projects: [],
  listOfThemes: [],
  // addTracks: async () => {
  //   try {
  //     const response = await fetchDataFromNextServer("tracks");
  //     const data = await response.json();
  //     set({ tracks: data });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
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

      set({ descriptions: data });
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
