const dev: boolean = process.env.NODE_ENV !== "production";

export const baseUrl: string = dev
  ? "http://localhost:3000/"
  : "https://learning-platform-dusky.vercel.app/";
