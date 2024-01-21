import { baseUrl } from "@/config";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Cloudinary } from "@cloudinary/url-gen";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const replacedPartOfText = (text: string) => text.replaceAll(/\\n/g, "\n");

export const replacedSingleQuotes = (text: any) =>
  JSON.parse(JSON.stringify(text).replace(/'/g, '\\"'));

// export const cld = new Cloudinary({
//   cloud: {
//     cloudName: "dxcpen44g",
//   },
// });

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

type Project = {
  id: number;
  title: string;
  description: string;
  skills: string;
  votes: number;
  participants: string[];
};

type Time = {
  start_time?: string;
  end_time?: string;
  date?: string;
};
export const fetchToChangeDataOnServer = (
  endpoint: string,
  method = "post",
  data?: Project | Time,
) => {
  return fetch(`${baseUrl}api/${endpoint}`, {
    method,
    body: JSON.stringify(data) ?? null,
  });
};

export const fetchPartOfData = (endpoint: string, params?: string) => {
  return fetch(`${baseUrl}api/${endpoint}?params=${params}`);
};
