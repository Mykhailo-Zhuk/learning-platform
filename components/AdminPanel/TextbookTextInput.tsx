"use client";

import { styles } from "@/lib/styles";
import { Button } from "../ui/button";
import { BsTrash3Fill } from "react-icons/bs";
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from "react";
import { Errors, Text } from "./TextbookInput";
import { InputField } from "../index";

const { buttonOpacity, inputHover } = styles;

type TextbookTableInputProps = {
  index: number;
  setErrors: Dispatch<SetStateAction<Errors>>;
  removeContent: (index: number) => void;
  updateTextValue: (index: number, value: Text) => void;
};

const TextbookTextInput: React.FC<TextbookTableInputProps> = ({
  index,
  setErrors,
  updateTextValue,
  removeContent,
}) => {
  const [textError, setTextError] = useState(false);
  const [text, setText] = useState({ textValue: "" });

  const validateForm = () => {
    let valid = true;

    if (!text.textValue.trim()) {
      setTextError(true);
      valid = false;
    } else {
      setTextError(false);
    }

    return valid;
  };

  const debouncedUpdateText = useCallback(
    (updatedText: Text) => {
      const isValid = validateForm();
      if (isValid) {
        updateTextValue(index, updatedText);
        setErrors((prev) => ({ ...prev, content: false }));
      } else {
        setErrors((prev) => ({ ...prev, content: true }));
      }
    },
    [validateForm],
  );

  const handleItemChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setText({ textValue: e.target.value });
      setTimeout(() => debouncedUpdateText({ textValue: e.target.value }), 500);
    },
    [setText, debouncedUpdateText],
  );

  return (
    <div className={`${inputHover} relative group/text`}>
      <InputField
        label='"text"'
        name="text"
        value={text.textValue}
        placeHolder="CSS селектори використовуються для пошуку (або вибору) HTML-елементів, які ви хочете стилізувати;"
        onChange={handleItemChange}
        onBlur={handleItemChange}
        error={textError}
      />
      <Button
        variant="ghost"
        size="icon"
        className={`${buttonOpacity} group-hover/text:opacity-100 top-[7px] right-1`}
        onClick={() => removeContent(index)}>
        <BsTrash3Fill className="text-red-500" />
      </Button>
    </div>
  );
};

export default TextbookTextInput;
