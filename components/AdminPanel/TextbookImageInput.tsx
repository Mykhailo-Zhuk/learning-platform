"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormData, styles } from "./TextbookInput";
import { Button } from "../ui/button";
import { BsTrash3Fill } from "react-icons/bs";

const { inputContainer, inputLabel, inputError, spanError } = styles;

type TextbookTableInputProps = {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  removeAdditionalElement: (index: string) => void;
};

const TextbookTableInput: React.FC<TextbookTableInputProps> = ({
  register,
  errors,
  removeAdditionalElement,
}) => {
  return (
    <div className="relative hover:outline-1 hover:outline hover:outline-accent group/table rounded-lg p-5">
      <p className={`${inputLabel} text-center`}>Картинка</p>
      <div className={inputContainer}>
        <label htmlFor="image.src" className={inputLabel}>
          Посилання
        </label>
        <input
          placeholder="https://html-plus.in.ua/wp-content/uploads/2017/04/box-model.jpg"
          {...register("image.src", { required: "Це поле є обов'язковим" })}
          className={`${inputError} ${
            errors?.image?.src ? "border-red-500" : "focus:border-accent"
          }`}
        />
        {errors?.image?.src && <span className={spanError}>{errors?.image?.src?.message}</span>}
      </div>
      <div className={inputContainer}>
        <label htmlFor="image.caption" className={inputLabel}>
          Допис під зображення
        </label>
        <input
          placeholder="Селектор; Приклад; Опис. Розділяти двокрапкою (;)"
          {...register("image.caption")}
          className={`${inputError} ${
            errors?.image?.caption ? "border-red-500" : "focus:border-accent"
          }`}
        />
        {errors?.image?.caption && (
          <span className={spanError}>{errors?.image?.caption?.message}</span>
        )}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="opacity-0 group-hover/table:opacity-100 absolute transition-opacity top-0 right-0"
        onClick={() => removeAdditionalElement("image")}>
        <BsTrash3Fill className="text-red-500" />
      </Button>
    </div>
  );
};

export default TextbookTableInput;
