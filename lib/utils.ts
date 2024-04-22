import { baseUrl } from "@/config";
import { type ClassValue, clsx } from "clsx";
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

export const fetchToChangeDataOnServer = (endpoint: string, method = "post", data?: Time) => {
  return fetch(`${baseUrl}api/${endpoint}`, {
    method,
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
  return fetch(`${baseUrl}api/users?username=${username}`);
};
