"use client";

import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { BsTrash3Fill } from "react-icons/bs";
import { useState } from "react";
import { fetchToChangeDataOnServer } from "@/lib/utils";
import { toast } from "../ui/use-toast";
import { v4 as uuidv4 } from "uuid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Theme = {
  id: string;
  link: string;
  title: string;
  type?: string;
};

type HomeworkItem = {
  id: number;
  action: string;
  listOfThemes?: Theme[];
  links?: Theme[];
};

type FormData = {
  date: string;
  reading: HomeworkItem;
  writting: HomeworkItem;
};

const styles = {
  inputContainer: "flex flex-col space-y-2",
  inputLabel: "text-[0.8rem] font-medium",
  inputError: "w-full px-3 py-2 border rounded focus:outline-none",
  spanError: "text-[0.8rem] font-medium text-red-500",
};

const HomeworkInput: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      date: "",
      reading: {
        id: 1,
        action: "Прочитати теми: ",
        listOfThemes: [{ id: uuidv4(), link: "", title: "", type: "text" }],
      },

      writting: {
        id: 2,
        action: "Ознайомитися із практичними завданнями та тестами по темах: ",
        links: [{ id: uuidv4(), link: "", title: "", type: "text" }],
      },
    },
  });
  const {
    fields: readingFields,
    append: readingAppend,
    remove: readingRemove,
  } = useFieldArray({
    control,
    name: "reading.listOfThemes",
  });

  const {
    fields: writtingFields,
    append: writtingAppend,
    remove: writtingRemove,
  } = useFieldArray({
    control,
    name: "writting.links",
  });

  const AppendReadingListHandler = () => {
    readingAppend({ id: uuidv4(), link: "", title: "", type: "text" });
  };
  const AppendWrittingListHandler = () => {
    writtingAppend({ id: uuidv4(), link: "", title: "", type: "text" });
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setLoading(true);
      const newHomework = {
        id: uuidv4(),
        date: data.date,
        homework: [data.reading, data.writting],
      };
      const response = await fetchToChangeDataOnServer("homework", "post", newHomework);

      if (response.ok) {
        toast({
          title: "Додано домашнє по наступним темам:",
          description: (
            <p className="mt-2 w-[340px] rounded-md py-4">
              Читання: {data.reading.listOfThemes?.map((theme) => theme.title)}; Практичне:{" "}
              {data.writting.links?.map((link) => link.title)};
            </p>
          ),
        });
      }
      setLoading(false);
      reset();
    } catch (error) {
      toast({
        title: "Помилка під час надсилання даних",
      });
      console.log(error);
    }
  };

  const { inputContainer, inputLabel, inputError, spanError } = styles;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-screen-md mx-auto">
      <div className="space-y-4 p-6 border rounded-lg shadow-md">
        <div className={inputContainer}>
          <label htmlFor="date" className={inputLabel}>
            Дата:
          </label>
          <input
            placeholder="28.11.2023"
            {...register("date", { required: "Це поле є обов'язковим" })}
            className={`${inputError} ${errors?.date ? "border-red-500" : "focus:border-accent"}`}
          />
          {errors.date && <span className={spanError}>{errors.date?.message}</span>}

          <label htmlFor="reading.action" className={inputLabel}>
            Читання:
          </label>
          <input
            {...register("reading.action", { required: "Це поле є обов'язковим" })}
            className={`${inputError} ${
              errors?.reading?.action ? "border-red-500" : "focus:border-accent"
            }`}
          />
          {errors.reading?.action && (
            <span className={spanError}>{errors.reading?.action?.message}</span>
          )}
        </div>
        {/* Читання */}
        {readingFields.map((fields, index) => {
          return (
            <div
              key={fields.id}
              className="relative flex flex-col space-y-3 p-5 hover:outline hover:outline-1 hover:outline-accent rounded-lg group">
              <div className={inputContainer}>
                <label htmlFor={`reading.listOfThemes.${index}.title`} className={inputLabel}>
                  Назва
                </label>
                <input
                  {...register(`reading.listOfThemes.${index}.title`, {
                    required: "Це поле є обов'язковим",
                  })}
                  placeholder="HTML Семантика"
                  className={`${inputError} ${
                    errors?.reading?.listOfThemes?.[index]
                      ? "border-red-500"
                      : "focus:border-accent"
                  }`}
                />
                {errors.reading?.listOfThemes?.[index]?.title && (
                  <span className={spanError}>
                    {errors.reading?.listOfThemes?.[index]?.title?.message}
                  </span>
                )}
              </div>

              <div className={inputContainer}>
                <label htmlFor={`reading.listOfThemes.${index}.link`} className={inputLabel}>
                  Силка | Текст
                </label>
                <input
                  {...register(`reading.listOfThemes.${index}.link`)}
                  placeholder="https://w3schoolsua.github.io/html/html5_semantic_elements.html"
                  className={`${inputError} ${
                    errors?.reading?.listOfThemes?.[index]
                      ? "border-red-500"
                      : "focus:border-accent"
                  }`}
                />
                {errors.reading?.listOfThemes?.[index]?.link && (
                  <span className={spanError}>
                    {errors.reading?.listOfThemes?.[index]?.link?.message}
                  </span>
                )}
              </div>
              <div className="flex justify-end">
                <Select
                  onValueChange={(type) => setValue(`reading.listOfThemes.${index}.type`, type)}>
                  <SelectTrigger className="w-fit">
                    <SelectValue placeholder="Тип" />
                  </SelectTrigger>
                  <SelectContent className="min-w-fit">
                    <SelectItem value="text">Текст</SelectItem>
                    <SelectItem value="a">Зовнішня силка</SelectItem>
                    <SelectItem value="link">Внутрішня силка</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 absolute transition-opacity -top-3 right-0"
                onClick={() => readingRemove(index)}>
                <BsTrash3Fill className="text-red-500" />
              </Button>
            </div>
          );
        })}
        <div className="flex justify-end space-x-3">
          <Button variant="ghost" onClick={AppendReadingListHandler}>
            Додати
          </Button>
        </div>
        <div className={inputContainer}>
          <label htmlFor="writting.action" className={inputLabel}>
            Практичні:
          </label>
          <input
            {...register("writting.action", { required: "Це поле є обов'язковим" })}
            className={`${inputError} ${
              errors?.writting?.action ? "border-red-500" : "focus:border-accent"
            }`}
          />
          {errors?.writting?.action && (
            <span className={spanError}>{errors?.writting?.action.message}</span>
          )}
        </div>

        {/* Практичні */}
        {writtingFields.map((fields, index) => {
          return (
            <div
              key={fields.id}
              className="relative flex flex-col space-y-3 p-5 hover:outline-1 hover:outline hover:outline-accent rounded-lg group">
              <div className={inputContainer}>
                <label htmlFor={`writting.links.${index}.title`} className={inputLabel}>
                  Назва
                </label>
                <input
                  {...register(`writting.links.${index}.title`, {
                    required: "Це поле є обов'язковим",
                  })}
                  placeholder="HTML Семантика"
                  className={`${inputError} ${
                    errors.writting?.links?.[index]?.title
                      ? "border-red-500"
                      : "focus:border-accent"
                  }`}
                />
                {errors.writting?.links?.[index]?.title && (
                  <span className={spanError}>
                    {errors.writting?.links?.[index]?.title?.message}
                  </span>
                )}
              </div>
              <div className={inputContainer}>
                <label htmlFor={`writting.links.${index}.link`} className={inputLabel}>
                  Силка | Текст
                </label>
                <input
                  {...register(`writting.links.${index}.link`)}
                  placeholder="tasks/html_semantics"
                  className={`${inputError} ${
                    errors?.writting?.links?.[index]?.link
                      ? "border-red-500"
                      : "focus:border-accent"
                  }`}
                />
                {errors.writting?.links?.[index]?.link && (
                  <span className={spanError}>
                    {errors.writting?.links?.[index]?.link?.message}
                  </span>
                )}
              </div>
              <div className="flex justify-end">
                <Select onValueChange={(type) => setValue(`writting.links.${index}.type`, type)}>
                  <SelectTrigger className="w-fit">
                    <SelectValue placeholder="Тип" />
                  </SelectTrigger>
                  <SelectContent className="min-w-fit">
                    <SelectItem value="text">Текст</SelectItem>
                    <SelectItem value="a">Зовнішня силка</SelectItem>
                    <SelectItem value="link">Внутрішня силка</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 absolute transition-opacity -top-3 right-0"
                onClick={() => writtingRemove(index)}>
                <BsTrash3Fill className="text-red-500" />
              </Button>
            </div>
          );
        })}
        <div className="flex justify-end space-x-3">
          <Button variant="ghost" onClick={AppendWrittingListHandler}>
            Додати
          </Button>
        </div>
        <div className="flex items-center mt-4">
          <Button type="submit">{loading ? "Виконую..." : "Записати"}</Button>
        </div>
      </div>
    </form>
  );
};
export default HomeworkInput;
