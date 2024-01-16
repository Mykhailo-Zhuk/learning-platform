"use client";

import { styles } from "@/lib/styles";
import { Button } from "../ui/button";
import { BsTrash3Fill } from "react-icons/bs";
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from "react";
import { Errors, Code } from "./TextbookInput";
import { InputField } from "../index";

const { buttonOpacity, inputHover, inputContainer, inputError, inputLabel, spanError } = styles;

type TextbookCodeInputProps = {
  index: number;
  setErrors: Dispatch<SetStateAction<Errors>>;
  removeContent: (index: number) => void;
  updateCodeInput: (index: number, field: Code) => void;
};

type CodeInputErrors = {
  codeValue: boolean;
  language: boolean;
};

const TextbookCodeInput: React.FC<TextbookCodeInputProps> = ({
  index,
  setErrors,
  updateCodeInput,
  removeContent,
}) => {
  const [codeInputError, setCodeInputError] = useState<CodeInputErrors>({
    codeValue: false,
    language: false,
  });

  const [codeInput, setCodeInput] = useState<Code>({ codeValue: "", language: "js" });

  const validateForm = () => {
    let valid = true;

    let newErrors = {
      codeValue: false,
      language: false,
    };

    if (!codeInput.codeValue.trim()) {
      newErrors = { ...newErrors, codeValue: true };
      valid = false;
    }

    if (!codeInput.language.trim()) {
      newErrors = { ...newErrors, language: true };
      valid = false;
    }

    setCodeInputError((prev) => ({ ...prev, ...newErrors }));

    return valid;
  };

  const debouncedUpdateText = useCallback(
    (updatedText: Code) => {
      const isValid = validateForm();
      if (isValid) {
        updateCodeInput(index, updatedText);
        setErrors((prev) => ({ ...prev, content: false }));
      } else {
        setErrors((prev) => ({ ...prev, content: true }));
      }
    },
    [validateForm, index, setErrors, updateCodeInput],
  );

  const handleItemChange = useCallback(
    (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setCodeInput((prev) => ({ ...prev, [name]: value }));
      setTimeout(() => debouncedUpdateText({ ...codeInput, [name]: value }), 500);
    },
    [setCodeInput, debouncedUpdateText, codeInput],
  );

  return (
    <div className={`${inputHover} relative group/text`}>
      <p className={inputLabel}>&quot;code&quot;:</p>
      <div className="flex flex-col space-y-2">
        <div className={inputContainer}>
          <label className={inputLabel}>&quot;text&quot;:</label>
          <div className="flex w-full flex-col space-y-1">
            <textarea
              name="codeValue"
              value={codeInput.codeValue}
              placeholder="const codeString = (num) => num + 1;"
              onChange={handleItemChange}
              className={`${inputError} ${
                codeInputError?.codeValue ? "border-red-500" : "focus:border-accent"
              } resize-y h-32`}></textarea>
            {codeInputError?.codeValue && (
              <span className={spanError}>Це поле є обов&apos;язковим</span>
            )}
          </div>
        </div>
        <InputField
          label='"language":'
          name="language"
          value={codeInput.language}
          placeHolder="js"
          onChange={handleItemChange}
          onBlur={handleItemChange}
          error={codeInputError.language}
        />
      </div>
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

export default TextbookCodeInput;
