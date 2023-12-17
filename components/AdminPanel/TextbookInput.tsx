"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { fetchToChangeDataOnServer } from "@/lib/utils";
import { toast } from "../ui/use-toast";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TextbookImageInput, TextbookListInput, TextbookTableInput } from "../index";

type Table = {
  title: string;
  headers: string;
  rows: {
    id: number;
    selector: string;
    example: string;
    description: string;
  }[];
};

type List = {
  title: string;
  items: {
    id: number;
    item: string;
  }[];
};

type Image = {
  src: string;
  caption: string;
};

export type FormData = {
  section: string;
  subtitle: string;
  content: string;
  table?: Table;
  list?: List;
  image?: Image;
};

type TypeOfData = string[];

export const styles = {
  inputContainer: "flex flex-col space-y-2",
  inputLabel: "text-[0.8rem] font-medium",
  inputError: "w-full px-3 py-2 border rounded focus:outline-none",
  spanError: "text-[0.8rem] font-medium text-red-500",
};

const TextbookInput = () => {
  const [typeOfData, setTypeOfData] = useState<TypeOfData>([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeOfData.length === 3) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [typeOfData]);

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
      content: "",
      table: {
        title: "",
        headers: "",
        rows: [
          {
            id: 1,
            selector: "",
            example: "",
            description: "",
          },
        ],
      },
      image: {
        src: "",
        caption: "",
      },
      list: {
        title: "",
        items: [
          {
            id: 1,
            item: "",
          },
        ],
      },
    },
  });

  const {
    fields: tableFields,
    append: tableAppend,
    remove: tableRemove,
  } = useFieldArray({
    control,
    name: "table.rows",
  });

  const {
    fields: listFields,
    append: listAppend,
    remove: listRemove,
  } = useFieldArray({
    control,
    name: "list.items",
  });

  const AddAditionalElementHandler = (type: string) => {
    if (!typeOfData.includes(type)) {
      setTypeOfData((prevState) => [...prevState, type]);
    }
  };

  const RemoveAditionalElementHandler = (type: string) => {
    setTypeOfData((prevState) =>
      prevState.includes(type) ? prevState.filter((item) => item !== type) : [...prevState, type],
    );
  };

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const createArrayFromString = (options: string) => {
        return options.split("; ");
      };

      const list = typeOfData.includes("list") && { list: data.list };
      const table = typeOfData.includes("table") && {
        table: { ...data?.table, headers: createArrayFromString(data?.table?.headers) },
      };
      const image = typeOfData.includes("image") && {
        image: { ...data?.image, caption: createArrayFromString(data?.image?.caption) },
      };

      const newSection = {
        [data.section]: {
          subtitle: data.subtitle,
          content: [...createArrayFromString(data.content), list, table, image],
        },
      };

      const response = await fetchToChangeDataOnServer("time", "post", newSection);

      if (response.ok) {
        toast({
          title: "Додано нову секцію:",
          description: <p className="mt-2 w-[340px] rounded-md py-4 font-bold">{data.subtitle}</p>,
        });
      }

      setLoading(false);
      reset();
      setTypeOfData([]);
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
        <div className={inputContainer}>
          <label htmlFor="content" className={inputLabel}>
            Контент
          </label>
          <textarea
            placeholder="CSS розшифровується як Cascading Style Sheets... Розділяти двокрапкою (;)"
            {...register("content", { required: "Це поле є обов'язковим" })}
            className={`${inputError} ${
              errors?.content ? "border-red-500" : "focus:border-accent"
            } resize-y`}></textarea>
          {errors?.content && <span className={spanError}>{errors?.content?.message}</span>}
        </div>
        {typeOfData.includes("table") && (
          <TextbookTableInput
            register={register}
            errors={errors}
            fields={tableFields}
            append={tableAppend}
            remove={tableRemove}
            removeAdditionalElement={RemoveAditionalElementHandler}
          />
        )}

        {typeOfData.includes("list") && (
          <TextbookListInput
            register={register}
            errors={errors}
            fields={listFields}
            append={listAppend}
            remove={listRemove}
            removeAdditionalElement={RemoveAditionalElementHandler}
          />
        )}

        {typeOfData.includes("image") && (
          <TextbookImageInput
            register={register}
            errors={errors}
            removeAdditionalElement={RemoveAditionalElementHandler}
          />
        )}

        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger
              className="hover:bg-accent py-2 px-4 rounded-lg disabled:bg-gray-200 disabled:opacity-50"
              disabled={isDisabled}>
              Додати елемент
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => AddAditionalElementHandler("table")}>
                Таблиця
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => AddAditionalElementHandler("list")}>
                Список
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => AddAditionalElementHandler("image")}>
                Картинка
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex items-center mt-4">
        <Button type="submit">{loading ? "Виконую..." : "Змінити"}</Button>
      </div>
    </form>
  );
};

export default TextbookInput;
