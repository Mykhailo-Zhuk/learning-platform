import { fetchPartOfData, fetchPersonalHomeworkResults } from "@/lib/utils";
import { create } from "zustand";

export type Members = {
  [key: string]: string;
};

export const GROUP_2_MEMBERS: Members[] = [
  { id: "LEARNING-P-4190122849", username: "B_Dimbrov", firstName: "Богдан" },
  { id: "LEARNING-P-4526715349", username: "n3ko16", firstName: "Олександр" },
  { id: "LEARNING-P-4248810698", username: "Kirill01294", firstName: "Кирило" },
  { id: "LEARNING-P-3618230337", username: "Serrgiychik", firstName: "Сергій" },
  { id: "LEARNING-P-5934919444", username: "Marishun21", firstName: "Маряна" },
  { id: "LEARNING-P-0311369915", username: "flight969", firstName: "Микита" },
  { id: "LEARNING-P-5070308516", username: "tokssi1", firstName: "Дмитро" },
];
export const GROUP_3_MEMBERS: Members[] = [
  { id: "LEARNING-P-2921277120", username: "Kamasentraa", firstName: "Уляна" },
  { id: "LEARNING-P-2452349806", username: "BestBirdEver", firstName: "Марина" },
  { id: "LEARNING-P-8518422349", username: "sanyadrug08", firstName: "Влад" },
  { id: "LEARNING-P-2050830128", username: "Oleksiy251", firstName: "Олексій" },
  { id: "LEARNING-P-4114772449", username: "maksym", firstName: "Максим" },
  { id: "LEARNING-P-4378891671", username: "tab_01234678", firstName: "Тая" },
];

export const INDIVID_ARTHOR: Members[] = [
  { id: "LEARNING-P-2191581885", username: "Ja_wewykyj", firstName: "Артур" },
];

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

export type UsersDataList = {
  id: string | number;
  name: string;
  label?: string;
  group?: string;
  password: string;
  role: "admin" | "student";
};

export type Users = {
  group?: string;
  usersList: UsersDataList[];
};
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
export type HomeWorkItem = {
  id: number | string;
  link?: string;
  title: string;
  type: string;
};
export type Homework = {
  lessonTitle: string;
  id: number | string;
  date: string;
  group: string;
  homework: {
    id: string;
    action: string;
    listOfThemes?: HomeWorkItem[];
    links?: HomeWorkItem[];
  }[];
};
export type LinksData = {
  id: string;
  linkToRecording: string;
  dateOfMeeting: string;
  lessonTitle: string;
};
export type YoutubeLinks = {
  group: string;
  youtube_links: LinksData[];
};

export type HomeworkResults = {
  id: string;
  date: Date | number;
  lessonTitle: string;
  homeworkId: string;
  isCompleted: "Частково" | "Виконав" | "Не виконав";
};

export type PersonalHomeworkResults = {
  username: string;
  group: string;
  type: string;
  homeworkIsDone: HomeworkResults[];
};

type Store = {
  group: string;
  users: UsersDataList[];
  tests: Tests;
  time: Time;
  questions: Questions;
  descriptions: Description;
  listOfThemes: ListOfThemes;
  adminPanelList: AdminList;
  homework: Homework[];
  personalHomeworkResults: PersonalHomeworkResults;
  youtubeLinks: LinksData[];

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
  getYoutubeLinks: (group: string) => void;
};

export const useStore = create<Store>((set, get) => ({
  personalHomeworkResults: {
    username: "",
    group: "",
    type: "",
    homeworkIsDone: [],
  },
  adminPanelList: [],
  time: { start_time: "", end_time: "", date: "", completed: false },
  youtubeLinks: [{ id: "", linkToRecording: "", dateOfMeeting: "", lessonTitle: "" }],
  users: [],
  tests: [],
  questions: [],
  descriptions: [],
  listOfThemes: [],
  homework: [],
  group: "",

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
  getYoutubeLinks: async (group) => {
    try {
      const response = await fetchPartOfData("youtube", group);

      const data = await response.json();

      set({ youtubeLinks: data });
    } catch (error) {
      console.log(error);
    }
  },
}));
