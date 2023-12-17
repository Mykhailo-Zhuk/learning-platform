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
  fields: FieldArrayWithId<FormData, "table.rows", "id">[];
  append: UseFieldArrayAppend<FormData, "table.rows">;
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
  const tableAppendHandler = () => {
    append({
      id: fields.length + 1,
      selector: "",
      example: "",
      description: "",
    });
  };

  const tableRemoveHandler = (index: number) => {
    remove(index);
  };

  return (
    <div className="relative hover:outline-1 hover:outline hover:outline-accent group/table rounded-lg p-5">
      <p className={`${inputLabel} text-center`}>Таблиця</p>
      <div className={inputContainer}>
        <label htmlFor="table.title" className={inputLabel}>
          Назва таблиці
        </label>
        <input
          placeholder="Таблиця селекторів: "
          {...register("table.title", { required: "Це поле є обов'язковим" })}
          className={`${inputError} ${
            errors?.table?.title ? "border-red-500" : "focus:border-accent"
          }`}
        />
        {errors?.table?.title && <span className={spanError}>{errors?.table?.title?.message}</span>}
      </div>
      <div className={inputContainer}>
        <label htmlFor="table.headers" className={inputLabel}>
          Заголовоки таблиці
        </label>
        <input
          placeholder="Селектор; Приклад; Опис. Розділяти двокрапкою (;)"
          {...register("table.headers", { required: "Це поле є обов'язковим" })}
          className={`${inputError} ${
            errors?.table?.headers ? "border-red-500" : "focus:border-accent"
          }`}
        />
        {errors?.table?.headers && (
          <span className={spanError}>{errors?.table?.headers?.message}</span>
        )}
      </div>
      {fields.map((row, index) => {
        return (
          <div
            key={row.id}
            className="relative space-y-3 p-5 hover:outline-1 hover:outline hover:outline-accent rounded-lg group/rows">
            <div className={inputContainer}>
              <label htmlFor={`table.rows.${index}.selector`} className={inputLabel}>
                Назва елементу
              </label>
              <input
                {...register(`table.rows.${index}.selector`, {
                  required: "Це поле є обов'язковим",
                })}
                placeholder="Яка мета тегу <head> в HTML?"
                className={`${inputError} ${
                  errors?.table?.rows?.[index]?.selector ? "border-red-500" : "focus:border-accent"
                }`}
              />
              {errors?.table?.rows?.[index]?.selector && (
                <span className={spanError}>{errors?.table?.rows?.[index]?.selector?.message}</span>
              )}
            </div>

            <div className={inputContainer}>
              <label htmlFor={`table.rows.${index}.example`} className={inputLabel}>
                Приклад
              </label>
              <input
                {...register(`table.rows.${index}.example`, {
                  required: "Це поле є обов'язковим",
                })}
                placeholder="Визначення основного вмісту сторінки..."
                className={`${inputError} ${
                  errors?.table?.rows?.[index]?.example ? "border-red-500" : "focus:border-accent"
                }`}
              />
              {errors?.table?.rows?.[index]?.example && (
                <span className={spanError}>{errors?.table?.rows?.[index]?.example?.message}</span>
              )}
            </div>

            <div className={inputContainer}>
              <label htmlFor={`table.rows.${index}.description`} className={inputLabel}>
                Правильна відповідь
              </label>
              <input
                {...register(`table.rows.${index}.description`, {
                  required: "Це поле є обов'язковим",
                })}
                placeholder="Синтаксис HTML, структурованість"
                className={`${inputError} ${
                  errors?.table?.rows?.[index]?.description
                    ? "border-red-500"
                    : "focus:border-accent"
                }`}
              />
              {errors?.table?.rows?.[index]?.description && (
                <span className={spanError}>
                  {errors?.table?.rows?.[index]?.description?.message}
                </span>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover/rows:opacity-100 absolute transition-opacity -top-3 right-0"
              onClick={() => tableRemoveHandler(index)}>
              <BsTrash3Fill className="text-red-500" />
            </Button>
          </div>
        );
      })}
      <Button variant="ghost" onClick={tableAppendHandler}>
        Додати
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="opacity-0 group-hover/table:opacity-100 absolute transition-opacity top-0 right-0"
        onClick={() => removeAdditionalElement("table")}>
        <BsTrash3Fill className="text-red-500" />
      </Button>
    </div>
  );
};

export default TextbookTableInput;
