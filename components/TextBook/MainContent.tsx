import TagList from "./TagLIst";

const MainContent = () => {
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
