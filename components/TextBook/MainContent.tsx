import { css_bem, html_syntax } from "@/public/images";
import TagList from "./TagLIst";

const MainContent = () => {
  console.log(JSON.stringify(css_bem));
  return (
    <section className="flex flex-col space-y-5 py-5">
      <h1 className="text-xl">
        Тут ти можеш глянути шпаргалку по темах, які є у списку ліворуч. Скоро допишу сюди більше
        інформації.
      </h1>
      <TagList />
    </section>
  );
};

export default MainContent;
