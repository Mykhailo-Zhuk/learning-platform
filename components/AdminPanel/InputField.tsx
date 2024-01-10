import { styles } from "@/lib/styles";
import { ChangeEvent, FocusEvent } from "react";

const { inputContainer, inputLabel, inputError, spanError } = styles;

type InputField = {
  label: string;
  name: string;
  value: string;
  placeHolder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
};
const InputField = ({ label, name, value, onChange, onBlur, error, placeHolder }: InputField) => {
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <div className={inputContainer}>
      <label htmlFor={name} className={inputLabel}>
        {label}
      </label>
      <div className="flex w-full flex-col space-y-1">
        <input
          name={name}
          value={value}
          placeholder={placeHolder ?? ""}
          onChange={onChange}
          onBlur={handleBlur}
          className={`${inputError} ${error ? "border-red-500" : "focus:border-accent"}`}
        />
        {error && <span className={spanError}>Це поле є обов'язковим</span>}
      </div>
    </div>
  );
};

export default InputField;
