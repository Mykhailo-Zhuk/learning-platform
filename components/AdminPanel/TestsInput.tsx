"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { fetchToChangeDataOnServer } from "@/lib/utils";
import { toast } from "../ui/use-toast";
import { BsTrash3Fill } from "react-icons/bs";
import { useState } from "react";

const styles = {
  inputContainer: "flex flex-col space-y-2",
  inputLabel: "text-[0.8rem] font-medium",
  inputError: "w-full px-3 py-2 border rounded focus:outline-none",
  spanError: "text-[0.8rem] font-medium text-red-500",
};

const TestsInput = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
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

  const handleAddTest = () => {
    append({
      id: fields.length + 1,
      description: "",
      tips: [""],
      options: [""],
      result: "",
      level: "",
    });
  };

  const handleRemoveTest = (index: number) => {
    remove(index);
  };

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
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
      setLoading(false);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const { inputContainer, inputLabel, inputError, spanError } = styles;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-screen-md mx-auto">
      <div className="space-y-6 p-6 border rounded-lg shadow-md">
        <div className={inputContainer}>
          <label htmlFor="section" className={inputLabel}>
            Назва секції
          </label>
          <input
            placeholder="syntax_html"
            {...register("section", { required: "Це поле є обов'язковим" })}
            className={`${inputError} ${
              errors?.section ? "border-red-500" : "focus:border-accent"
            }`}
          />
          {errors?.section && <span className={spanError}>{errors?.section?.message}</span>}

          <label htmlFor="subtitle" className={inputLabel}>
            Заголовок для секції
          </label>
          <input
            {...register("subtitle", { required: "Це поле є обов'язковим" })}
            placeholder="Синтаксис HTML, структурованість"
            className={`${inputError} ${
              errors?.subtitle ? "border-red-500" : "focus:border-accent"
            }`}
          />
          {errors?.subtitle && <span className={spanError}>{errors?.subtitle?.message}</span>}
        </div>
        {fields.map((description, index) => {
          return (
            <div
              key={description.id}
              className="relative space-y-3 p-5 hover:outline-1 hover:outline hover:outline-accent rounded-lg group">
              <div className={inputContainer}>
                <label htmlFor={`tests.${index}.description`} className={inputLabel}>
                  Практичне завдання
                </label>
                <input
                  {...register(`tests.${index}.description`, {
                    required: "Це поле є обов'язковим",
                  })}
                  placeholder="Як користувач, я хочу, щоб фоновий градієнт змінювався автоматично, щоб створити ефект зміни кольорів."
                  className={`${inputError} ${
                    errors?.tests?.[index]?.description ? "border-red-500" : "focus:border-accent"
                  }`}
                />
                {errors?.tests?.[index]?.description && (
                  <span className={spanError}>{errors?.tests?.[index]?.description?.message}</span>
                )}
              </div>

              <div className={inputContainer}>
                <label htmlFor={`tests.${index}.options`} className={inputLabel}>
                  Варіанти відповіді
                </label>
                <input
                  {...register(`tests.${index}.options`, {
                    required: "Це поле є обов'язковим",
                  })}
                  placeholder="Використовуйте @keyframes для анімації градієнта."
                  className={`${inputError} ${
                    errors?.tests?.[index]?.options ? "border-red-500" : "focus:border-accent"
                  }`}
                />
                {errors?.tests?.[index]?.options && (
                  <span className={spanError}>{errors?.tests?.[index]?.options?.message}</span>
                )}
              </div>

              <div className={inputContainer}>
                <label htmlFor={`tests.${index}.tips`} className={inputLabel}>
                  Варіанти підказок
                </label>
                <input
                  {...register(`tests.${index}.tips`, {
                    required: "Це поле є обов'язковим",
                  })}
                  placeholder="Використовуйте @keyframes для оголошення анімації."
                  className={`${inputError} ${
                    errors?.tests?.[index]?.tips ? "border-red-500" : "focus:border-accent"
                  }`}
                />
                {errors?.tests?.[index]?.tips && (
                  <span className={spanError}>{errors?.tests?.[index]?.tips?.message}</span>
                )}
              </div>

              <div className={inputContainer}>
                <label htmlFor={`tests.${index}.result`} className={inputLabel}>
                  Бажаний результат
                </label>
                <input
                  {...register(`tests.${index}.result`, {
                    required: "Це поле є обов'язковим",
                  })}
                  placeholder="Автоматична зміна фонового градієнта"
                  className={`${inputError} ${
                    errors?.tests?.[index]?.result ? "border-red-500" : "focus:border-accent"
                  }`}
                />
                {errors?.tests?.[index]?.result && (
                  <span className={spanError}>{errors?.tests?.[index]?.result?.message}</span>
                )}
              </div>

              <div className={inputContainer}>
                <label htmlFor={`tests.${index}.level`} className={inputLabel}>
                  Складність
                </label>
                <select
                  {...register(`tests.${index}.level`, { required: "Це поле є обов'язковим" })}
                  placeholder="Оберіть складність"
                  className={`${inputError} ${
                    errors?.tests?.[index]?.level ? "border-red-500" : "focus:border-accent"
                  }`}>
                  <option value="low">Низька</option>
                  <option value="middle">Середня</option>
                  <option value="hard">Висока</option>
                </select>
                {errors?.tests?.[index]?.level && (
                  <span className={spanError}>{errors?.tests?.[index]?.level?.message}</span>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 absolute transition-opacity -top-3 right-0"
                onClick={() => handleRemoveTest(index)}>
                <BsTrash3Fill className="text-red-500" />
              </Button>
            </div>
          );
        })}
        <Button variant="ghost" onClick={handleAddTest}>
          Додати
        </Button>
      </div>
      <div className="flex items-center mt-4">
        <Button type="submit">{loading ? "Виконую..." : "Записати"}</Button>
      </div>
    </form>
  );
};

export default TestsInput;
