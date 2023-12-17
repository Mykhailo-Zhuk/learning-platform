"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { fetchToChangeDataOnServer } from "@/lib/utils";
import { toast } from "../ui/use-toast";
import { BsTrash3Fill } from "react-icons/bs";

type Task = {
  id: number;
  question: string;
  level: string;
  options: string;
  correctAnswer: string;
};

type FormData = {
  section: string;
  subtitle: string;
  tasks: Task[];
};

const styles = {
  inputContainer: `flex flex-col space-y-2`,
  inputLabel: "text-[0.8rem] font-medium",
  inputError: "w-full px-3 py-2 border rounded focus:outline-none",
  spanError: "text-[0.8rem] font-medium text-red-500",
};

const QuestionsInput = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      section: "",
      subtitle: "",
      tasks: [{ id: 1, question: "", level: "", options: "", correctAnswer: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tasks",
  });

  const handleAddQuestion = () => {
    append({ id: fields.length + 1, question: "", level: "", options: "", correctAnswer: "" });
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
        tasks: data.tasks.map(
          (item: {
            correctAnswer: string;
            id: number;
            options: string;
            question: string;
            level: string;
          }) => {
            return { ...item, options: createOptionsArray(item.options) };
          },
        ),
      },
    };

    const response = await fetchToChangeDataOnServer("questions", "post", newSection);

    if (response.ok) {
      toast({
        title: "Додано нову секцію із завданнями:",
        description: <p className="mt-2 w-[340px] rounded-md py-4 font-bold">{data.subtitle}</p>,
      });
    }
    reset();
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
          {errors?.subtitle && <span className={spanError}>{errors.subtitle?.message}</span>}
        </div>

        {fields.map((question, index) => {
          return (
            <div
              key={question.id}
              className="relative space-y-3 p-5 hover:outline-1 hover:outline hover:outline-accent rounded-lg group">
              <div className={inputContainer}>
                <label htmlFor={`tasks.${index}.question`} className={inputLabel}>
                  Запитання
                </label>
                <input
                  {...register(`tasks.${index}.question`, {
                    required: "Це поле є обов'язковим",
                  })}
                  placeholder="Яка мета тегу <head> в HTML?"
                  className={`${inputError} ${
                    errors?.tasks?.[index]?.question ? "border-red-500" : "focus:border-accent"
                  }`}
                />
                {errors?.tasks?.[index]?.question && (
                  <span className={spanError}>{errors?.tasks?.[index]?.question?.message}</span>
                )}
              </div>

              <div className={inputContainer}>
                <label htmlFor={`tasks.${index}.options`} className={inputLabel}>
                  Варіанти відповіді
                </label>
                <input
                  {...register(`tasks.${index}.options`, {
                    required: "Це поле є обов'язковим",
                  })}
                  placeholder="Визначення основного вмісту сторінки..."
                  className={`${inputError} ${
                    errors?.tasks?.[index]?.options ? "border-red-500" : "focus:border-accent"
                  }`}
                />
                {errors?.tasks?.[index]?.options && (
                  <span className={spanError}>{errors?.tasks?.[index]?.options?.message}</span>
                )}
              </div>

              <div className={inputContainer}>
                <label htmlFor={`tasks.${index}.correctAnswer`} className={inputLabel}>
                  Правильна відповідь
                </label>
                <input
                  {...register(`tasks.${index}.correctAnswer`, {
                    required: "Це поле є обов'язковим",
                  })}
                  placeholder="Синтаксис HTML, структурованість"
                  className={`${inputError} ${
                    errors?.tasks?.[index]?.correctAnswer ? "border-red-500" : "focus:border-accent"
                  }`}
                />
                {errors?.tasks?.[index]?.correctAnswer && (
                  <span className={spanError}>
                    {errors?.tasks?.[index]?.correctAnswer?.message}
                  </span>
                )}
              </div>

              <div className={inputContainer}>
                <label htmlFor={`tasks.${index}.level`} className={inputLabel}>
                  Складність
                </label>
                <select
                  {...register(`tasks.${index}.level`, { required: "Оберіть складність" })}
                  className={`${inputError} ${
                    errors?.tasks?.[index]?.level ? "border-red-500" : "focus:border-accent"
                  }`}>
                  <option value="low">Низька</option>
                  <option value="middle">Середня</option>
                  <option value="hard">Висока</option>
                </select>
                {errors?.tasks?.[index]?.level && (
                  <span className={spanError}>{errors?.tasks?.[index]?.level?.message}</span>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 absolute transition-opacity -top-3 right-0"
                onClick={() => handleRemoveQuestion(index)}>
                <BsTrash3Fill className="text-red-500" />
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

export default QuestionsInput;
