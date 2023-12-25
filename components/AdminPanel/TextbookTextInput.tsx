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
  order: number;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  removeAdditionalElement: (type: string) => void;
};

const TextbookTextInput: React.FC<TextbookTableInputProps> = ({
  order,
  register,
  errors,
  removeAdditionalElement,
}) => {
  const listAppendHandler = () => {};

  const listRemoveHandler = (index: number) => {};

  return (
    <div className="relative hover:outline-1 hover:outline hover:outline-accent group/table rounded-lg p-5">
      <div className={inputContainer}>
        <textarea
          placeholder="CSS розшифровується як Cascading Style Sheets"
          {...register(`content.${order}`, { required: "Це поле є обов'язковим" })}
          className={`${inputError} ${
            errors?.content ? "border-red-500" : "focus:border-accent"
          } resize-y`}></textarea>
        {errors?.content && <span className={spanError}>{errors?.content?.message}</span>}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="opacity-0 group-hover/table:opacity-100 absolute transition-opacity top-0 right-0"
        onClick={() => removeAdditionalElement(`text_${order}`)}>
        <BsTrash3Fill className="text-red-500" />
      </Button>
    </div>
  );
};

export default TextbookTextInput;
