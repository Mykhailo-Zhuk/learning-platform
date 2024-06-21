const tipsOfPhotos = [
  "Ознайомлюємося із фоткою;",
  "Вирішуємо який саме тег якнайкраще підходить для відтворення того чи іншого елемента;",
  "Переглядаєте у браузері (go live);",
  "Робимо скрін екрану у браузері із результатом виконання коду",
];

const tipsOfGitHubProject = [
  "Заходите на сайт GitHub та підтверджуєте запрошення до приватного репозиторію;",
  "Переходите по силці для отримання завдання на дошці у розділі Projects відповідного проекту Github",
  "Виконуєте крок за кроком вказане завдання",
];

const HomeworkDrawerTips = () => {
  return (
    <>
      <p>
        <b>Якщо практичне це фото:</b>{" "}
      </p>
      <ol className="text-left text-sm list-inside list-decimal">
        {tipsOfPhotos.map((tip, index) => {
          return <li key={index}>{tip}</li>;
        })}
      </ol>
      <p>
        <b>Якщо практичне це проект на GitHub:</b>{" "}
      </p>
      <ol className="text-left text-sm list-inside list-decimal">
        {tipsOfGitHubProject.map((tip, index) => {
          return <li key={index}>{tip}</li>;
        })}
      </ol>
      <p>
        <b>
          У всіх інших випадках необхідно написати код у VS Code та скинути скрін підтвердження його
          виконання (сам код та його відтворення у браузері)
        </b>
      </p>
    </>
  );
};

export default HomeworkDrawerTips;
