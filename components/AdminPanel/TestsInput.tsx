"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { fetchToChangeDataOnServer } from "@/lib/utils";
import { toast } from "../ui/use-toast";

const TestsInput = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      section: "",
      subtitle: "",
      tests: [{ id: 1, description: "", tips: [""], options: [""], result: "", level: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tests",
  });

  const handleAddQuestion = () => {
    append({
      id: fields.length + 1,
      description: "",
      tips: [""],
      options: [""],
      result: "",
      level: "",
    });
  };

  const handleRemoveQuestion = (index: number) => {
    remove(index);
  };

  const onSubmit = async (data: any) => {
    const createOptionsArray = (optionsString: string) => {
      return optionsString.split(",").map((option) => option.trim());
    };

    const newSection = {
      [data.section]: {
        subtitle: data.subtitle,
        tests: data.tests.map(
          (item: {
            id: number;
            description: string;
            options: string;
            tips: string;
            result: string;
            level: string;
          }) => {
            return {
              ...item,
              options: createOptionsArray(item.options),
              tips: createOptionsArray(item.tips),
            };
          },
        ),
      },
    };

    const response = await fetchToChangeDataOnServer("tests", "post", newSection);

    if (response.ok) {
      toast({
        title: "Додано нову секцію із завданнями:",
        description: <p className="mt-2 w-[340px] rounded-md py-4 font-bold">{data.subtitle}</p>,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-screen-md mx-auto">
      <div className="space-y-6 p-6 border rounded-lg shadow-md">
        <div className="flex flex-col space-y-2">
          <label className="text-[0.8rem] font-medium">Назва секції</label>
          <input
            {...register("section", { required: "Це поле є обов'язковим" })}
            placeholder="html_syntax"
            className={`w-full px-3 py-2 border rounded focus:outline-none ${
              errors.section ? "border-red-500" : "focus:border-accent"
            }`}
          />
          {errors.section && (
            <span className="text-[0.8rem] font-medium text-red-500">{errors.section.message}</span>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-[0.8rem] font-medium">Заголовок для секції</label>
          <input
            {...register("subtitle", { required: "Це поле є обов'язковим" })}
            placeholder="Синтаксис HTML, структурованість"
            className={`w-full px-3 py-2 border rounded focus:outline-none ${
              errors.subtitle ? "border-red-500" : "focus:border-accent"
            }`}
          />
        </div>
        {errors.subtitle && (
          <span className="text-[0.8rem] font-medium text-red-500">{errors.subtitle.message}</span>
        )}
        {fields.map((description, index) => {
          const inputStyles = (property: string) =>
            `w-full px-3 py-2 border rounded focus:outline-none ${
              errors?.tests && errors?.tests[index] && `errors?.tests[index]?.${property}`
                ? "border-red-500"
                : "focus:border-accent"
            }`;

          const inputError = (property: string) =>
            errors.tests &&
            errors?.tests[index] &&
            errors?.tests[index]?.description && (
              <span className="text-[0.8rem] font-medium text-red-500">
                {`errors?.tests[index]?.${property}?.message`}
              </span>
            );
          return (
            <div key={description.id} className="space-y-4 p-3">
              <div className="flex flex-col space-y-2">
                <label className="text-[0.8rem] font-medium">Практичне завдання</label>
                <input
                  {...register(`tests.${index}.description`, {
                    required: "Це поле є обов'язковим",
                  })}
                  placeholder="Як користувач, я хочу, щоб фоновий градієнт змінювався автоматично, щоб створити ефект зміни кольорів."
                  className={inputStyles("description")}
                />
                {inputError("description")}
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-[0.8rem] font-medium">Варіанти відповіді</label>
                <input
                  {...register(`tests.${index}.options`, { required: "Це поле є обов'язковим" })}
                  placeholder="Використовуйте @keyframes для анімації градієнта."
                  className={inputStyles("options")}
                />
                {inputError("options")}
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-[0.8rem] font-medium">Варіанти підказок</label>
                <input
                  {...register(`tests.${index}.tips`, { required: "Це поле є обов'язковим" })}
                  placeholder="Використовуйте @keyframes для оголошення анімації."
                  className={inputStyles("tips")}
                />
                {inputError("tips")}
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-[0.8rem] font-medium">Бажаний результат</label>
                <input
                  {...register(`tests.${index}.result`, {
                    required: "Це поле є обов'язковим",
                  })}
                  placeholder="Автоматична зміна фонового градієнта"
                  className={inputStyles("result")}
                />
                {inputError("result")}
                <div className="flex flex-col space-y-2">
                  <label className="text-[0.8rem] font-medium">Складність</label>
                  <select
                    {...register(`tests.${index}.level`, { required: "Оберіть складність" })}
                    className={inputStyles("level")}>
                    <option value="low">Низька</option>
                    <option value="middle">Середня</option>
                    <option value="hard">Висока</option>
                  </select>
                  {inputError("level")}
                </div>
              </div>
              <Button variant="destructive" onClick={() => handleRemoveQuestion(index)}>
                Видалити
              </Button>
            </div>
          );
        })}
        <Button variant="ghost" onClick={handleAddQuestion}>
          Додати
        </Button>
      </div>
      <div className="flex items-center mt-4">
        <Button type="submit">Записати</Button>
      </div>
    </form>
  );
};

export default TestsInput;
