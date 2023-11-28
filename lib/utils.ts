import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const baseURL = "https://learning-platform-dusky.vercel.app/"; //"http://localhost:3000/";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const fetchDataFromNextServer = (
  endpoint: string,
  method = "get",
  data?: { id: string | number; name: string; password: string; role: "admin" | "student" },
) => {
  return fetch(`${baseURL}api/${endpoint}`, {
    method,
    body: JSON.stringify(data) ?? null,
  });
};

export const fetchToChangeDataOnServer = (
  endpoint: string,
  method = "post",
  data?: {
    id: number;
    title: string;
    description: string;
    skills: string;
    votes: number;
    participants: string[];
  },
) => {
  return fetch(`${baseURL}api/${endpoint}`, {
    method,
    body: JSON.stringify(data) ?? null,
  });
};

export const fetchPartOfData = (endpoint: string, params?: string) => {
  return fetch(`${baseURL}api/${endpoint}?params=${params}`);
};
