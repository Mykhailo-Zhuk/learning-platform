const tipsOfPhotos = [
  "1) Ознайомлюємося із фоткою;",
  "2) Вирішуємо який саме тег якнайкраще підходить для відтворення того чи іншого елемента;",
  "3) Переглядаєте у браузері (go live);",
  "4) Робимо скрін екрану у браузері із результатом виконання коду",
];

const HomeworkDrawerTips = () => {
  return (
    <>
      <p>
        <b>Якщо практичне це фото:</b>{" "}
      </p>
      <ul className="text-left text-sm">
        {tipsOfPhotos.map((tip, index) => {
          return <li key={index}>{tip}</li>;
        })}
      </ul>
    </>
  );
};

export default HomeworkDrawerTips;
