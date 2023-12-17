"use client";

import {
  UseFormRegister,
  FieldErrors,
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
} from "react-hook-form";
import { FormData, styles } from "./TextbookInput";
import { Button } from "../ui/button";
import { BsTrash3Fill } from "react-icons/bs";

const { inputContainer, inputLabel, inputError, spanError } = styles;

type TextbookTableInputProps = {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  fields: FieldArrayWithId<FormData, "list.items", "id">[];
  append: UseFieldArrayAppend<FormData, "list.items">;
  remove: UseFieldArrayRemove;
  removeAdditionalElement: (index: string) => void;
};

const TextbookTableInput: React.FC<TextbookTableInputProps> = ({
  register,
  errors,
  fields,
  append,
  remove,
  removeAdditionalElement,
}) => {
  const listAppendHandler = () => {
    append({ id: fields.length + 1, item: "" });
  };

  const listRemoveHandler = (index: number) => {
    remove(index);
  };

  return (
    <div className="relative hover:outline-1 hover:outline hover:outline-accent group/table rounded-lg p-5">
      <p className={`${inputLabel} text-center`}>Список</p>
      <div className={inputContainer}>
        <label htmlFor="list.title" className={inputLabel}>
          Заголовок списку
        </label>
        <input
          placeholder="CSS можна додати до елементів HTML трьома способами:"
          {...register("list.title", { required: "Це поле є обов'язковим" })}
          className={`${inputError} ${
            errors?.list?.title ? "border-red-500" : "focus:border-accent"
          }`}
        />
        {errors?.list?.title && <span className={spanError}>{errors?.list?.title?.message}</span>}
      </div>
      {fields.map((row, index) => {
        return (
          <div
            key={row.id}
            className="relative space-y-3 p-5 hover:outline-1 hover:outline hover:outline-accent rounded-lg group/rows">
            <div className={inputContainer}>
              <label htmlFor={`list.items.${index}.item`} className={inputLabel}>
                Елемент списку
              </label>
              <input
                {...register(`list.items.${index}.item`, {
                  required: "Це поле є обов'язковим",
                })}
                placeholder="Inline (вбудований або рядковий) - використовуючи атрибут style в HTML елементах"
                className={`${inputError} ${
                  errors?.list?.items?.[index]?.item ? "border-red-500" : "focus:border-accent"
                }`}
              />
              {errors?.list?.items?.[index]?.item && (
                <span className={spanError}>{errors?.list?.items?.[index]?.item?.message}</span>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover/rows:opacity-100 absolute transition-opacity -top-3 right-0"
              onClick={() => listRemoveHandler(index)}>
              <BsTrash3Fill className="text-red-500" />
            </Button>
          </div>
        );
      })}
      <Button variant="ghost" onClick={listAppendHandler}>
        Додати
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="opacity-0 group-hover/table:opacity-100 absolute transition-opacity top-0 right-0"
        onClick={() => removeAdditionalElement("list")}>
        <BsTrash3Fill className="text-red-500" />
      </Button>
    </div>
  );
};

export default TextbookTableInput;
