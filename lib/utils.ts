import { baseUrl } from "@/config";
import { HomeworkResults } from "@/store/store";
import { type ClassValue, clsx } from "clsx";
import { sortBy } from "lodash";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const replacedPartOfText = (text: string) => text.replaceAll(/\\n/g, "\n");

export const replacedSingleQuotes = (text: any) =>
  JSON.parse(JSON.stringify(text).replace(/'/g, '\\"'));

export const fetchDataFromNextServer = (
  endpoint: string,
  method = "get",
  data?: { id: string | number; name: string; password: string; role: "admin" | "student" },
) => {
  return fetch(`${baseUrl}api/${endpoint}`, {
    method,
    body: JSON.stringify(data) ?? null,
  });
};

type Time = {
  start_time?: string;
  end_time?: string;
  date?: string;
  group?: string;
};

export const fetchToChangeDataOnServer = (endpoint: string, data?: any) => {
  return fetch(`${baseUrl}api/${endpoint}`, {
    method: "POST",
    body: JSON.stringify(data) ?? null,
  });
};

export const fetchPartOfData = (endpoint: string, params?: string) => {
  return fetch(`${baseUrl}api/${endpoint}?params=${params}`);
};

export const fetchPersonalHomework = (group: string, homeworkId: string) => {
  return fetch(`${baseUrl}api/homework?group=${group}&homeworkId=${homeworkId}`);
};

export const fetchPersonalHomeworkResults = (username: string) => {
  return fetch(`${baseUrl}api/user?username=${username}`);
};

export function formatGroupName(groupName: string): string {
  // Capitalize the first letter
  let formattedText = groupName.charAt(0).toUpperCase() + groupName.slice(1);

  // Insert a space before any number
  formattedText = formattedText.replace(/(\d+)/g, " $1");

  return formattedText;
}

export function parseDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split(".").map(Number);
  return new Date(year, month - 1, day);
}

const parseDateString = (dateString: string): Date => {
  const [day, month, year] = dateString.split(".").map(Number);
  return new Date(year, month - 1, day);
};

export const sortedHomeworkField = (homework: HomeworkResults[]) => {
  const sortedByDate = homework.sort((a, b) => {
    const dateA = new Date(parseDateString(a.date));
    const dateB = new Date(parseDateString(b.date));
    return dateB.getTime() - dateA.getTime();
  });
  return sortedByDate;
};
