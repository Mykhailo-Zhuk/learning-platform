import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const baseURL = "https://learning-platform-dusky.vercel.app/"; // "http://localhost:3000/";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// type Markable = string[];

// const codeMarkableWords: Markable = [
//   '<title>',
//   '<style>',
//   '<meta>',
//   '<link>',
//   '<script>',
//   '<base>',
//   '<noscript>',
//   '<template>',
//   '<head>',
//   '<header>',
//   '<nav>',
//   '<section>',
//   '<acticle>',
//   '<aside>',
//   '<footer>',
//   '<details>',
//   '<summary>',
//   '<time>',
//   '<figcation>',
//   '<figure>',
//   '<main>',
//   '<mark>',
//   'height',
//   'width',
//   '<video>',
//   '</video>',
//   '<audio>',
//   '</audio>',
//   'controls',
//   '<source>',
// ];

// const codeMarkableRows: Markable = [
//   `<!DOCTYPE html>[\s\S]*</html>`,
//   `<назва тегу>[\s\S]*</назва тегу>`,
//   `<!-- [\s\S]* -->`,
//   `<h1>[\s\S]*</h1>`,
//   `<p>[\s\S]*</p>;`,
//   `<a[\s\S]*</a>;`,
//   `<img[\s\S]*>;`,
//   `<button>[\s\S]*</button>;`,
//   `<ul>[\s\S]*</ul>;`,
//   `<ol>[\s\S]*</ol>;`,
// ];

export const fetchDataFromKV = (
  endpoint: string,
  method = "get",
  data?: { id: string | number; name: string; password: string; role: "admin" | "student" },
) => {
  return fetch(
    `https://faithful-roughy-43695.kv.vercel-storage.com/json.${
      method !== "get" ? "set" : "get"
    }/${endpoint}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.kv_REST_API_TOKEN}`,
      },
      method,
      body: JSON.stringify(data) ?? null,
    },
  );
};

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
