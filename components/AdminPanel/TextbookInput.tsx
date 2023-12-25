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
import {
  TextbookImageInput,
  TextbookListInput,
  TextbookTableInput,
  TextbookTextInput,
} from "../index";

type Table = {
  title: string;
  headers: string;
  rows: {
    id: number;
    item: string;
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
  content: string[];
  table?: Table;
  list?: List;
  image?: Image;
};

type TypeOfData = string[];

export const styles = {
  inputContainer: "flex space-x-2",
  inputLabel: "text-[0.8rem] font-medium whitespace-nowrap leading-10",
  inputError: "w-full px-3 py-2 border rounded focus:outline-none",
  spanError: "text-[0.8rem] font-medium text-red-500",
};

const TextbookInput = () => {
  const [typeOfData, setTypeOfData] = useState<TypeOfData>(["text_0"]);
  const [loading, setLoading] = useState(false);

  console.log(typeOfData);

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
      content: [],
      table: {
        title: "",
        headers: "",
        rows: [
          {
            id: 1,
            item: "",
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
    setTypeOfData((prevState) => {
      const length = prevState.length;
      return [...prevState, `${type}_${length + 1}`];
    });
  };

  const RemoveAditionalElementHandler = (type: string) => {
    setTypeOfData((prevState) => prevState.filter((item) => item !== type));
  };

  const onSubmit = async (data: any) => {
    console.log(data);
    // try {
    //   setLoading(true);
    //   const createArrayFromString = (options: string) => {
    //     return options.split("; ");
    //   };

    //   const list = typeOfData.includes("list") && { list: data.list };
    //   const table = typeOfData.includes("table") && {
    //     table: { ...data?.table, headers: createArrayFromString(data?.table?.headers) },
    //   };
    //   const image = typeOfData.includes("image") && {
    //     image: { ...data?.image, caption: createArrayFromString(data?.image?.caption) },
    //   };

    //   const newSection = {
    //     [data.section]: {
    //       subtitle: data.subtitle,
    //       content: [...createArrayFromString(data.content), list, table, image],
    //     },
    //   };

    //   const response = await fetchToChangeDataOnServer("time", "post", newSection);

    //   if (response.ok) {
    //     toast({
    //       title: "Додано нову секцію:",
    //       description: <p className="mt-2 w-[340px] rounded-md py-4 font-bold">{data.subtitle}</p>,
    //     });
    //   }

    //   setLoading(false);
    //   reset();
    //   setTypeOfData([]);
    // } catch (error) {
    //   console.log(error);
    // }
  };
  const { inputContainer, inputLabel, inputError, spanError } = styles;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-screen-md mx-auto">
      <div className="space-y-6 p-6 border rounded-lg shadow-md">
        <div className={inputContainer}>
          <label htmlFor="section" className={inputLabel}>
            "[Назва секції]":
          </label>
          <input
            placeholder="syntax_html"
            {...register("section", { required: "Це поле є обов'язковим" })}
            className={`${inputError} ${
              errors?.section ? "border-red-500" : "focus:border-accent"
            }`}
          />
          {errors?.section && <span className={spanError}>{errors?.section?.message}</span>}
        </div>
        <div className={inputContainer}>
          <label htmlFor="subtitle" className={inputLabel}>
            "subtitle":
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
            "content":
          </label>
          <div className="flex w-full flex-col space-y-2">
            {typeOfData.map((type, index) => {
              if (type.includes("text"))
                return (
                  <TextbookTextInput
                    order={index}
                    register={register}
                    errors={errors}
                    removeAdditionalElement={RemoveAditionalElementHandler}
                  />
                );
              // if (type === "table")
              //   return (
              //     <TextbookTableInput
              //       register={register}
              //       errors={errors}
              //       fields={tableFields}
              //       append={tableAppend}
              //       remove={tableRemove}
              //       removeAdditionalElement={RemoveAditionalElementHandler}
              //     />
              //   );
              // if (type === "list")
              //   return (
              //     <TextbookListInput
              //       register={register}
              //       errors={errors}
              //       fields={listFields}
              //       append={listAppend}
              //       remove={listRemove}
              //       removeAdditionalElement={RemoveAditionalElementHandler}
              //     />
              //   );
              // if (type === "image")
              //   return (
              //     <TextbookImageInput
              //       register={register}
              //       errors={errors}
              //       removeAdditionalElement={RemoveAditionalElementHandler}
              //     />
              //   );
            })}
          </div>
        </div>
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger className="hover:bg-accent py-2 px-4 rounded-lg disabled:bg-gray-200 disabled:opacity-50">
              Додати елемент
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => AddAditionalElementHandler("text")}>
                Текст
              </DropdownMenuItem>
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
        <Button type="submit">{loading ? "Виконую..." : "Записати"}</Button>
      </div>
    </form>
  );
};

export default TextbookInput;
