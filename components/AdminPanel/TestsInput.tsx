"use client";

import React, { useState } from "react";
import { styles } from "@/lib/styles";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { fetchToChangeDataOnServer } from "@/lib/utils";

type Tests = {
  section: string;
  subtitle: string;
  tests: string;
};

const TestsInput = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    section: "",
    subtitle: "",
    tests: "",
  });

  const [data, setData] = useState<Tests>({
    section: "",
    subtitle: "",
    tests: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      section: "",
      subtitle: "",
      tests: "",
    };

    if (!data.section.trim()) {
      newErrors.section = "Це поле є обов'язковим";
      valid = false;
    }

    if (!data.subtitle.trim()) {
      newErrors.subtitle = "Це поле є обов'язковим";
      valid = false;
    }

    if (!data.tests.trim()) {
      newErrors.tests = "Це поле є обов'язковим";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const submitHandler = async (e: React.FormEvent) => {
    try {
      setLoading(true);
      e.preventDefault();
      if (validateForm()) {
        const newSection = {
          [data.section]: {
            subtitle: data.subtitle,
            tests: JSON.parse(data.tests),
          },
        };
        const response = await fetchToChangeDataOnServer("tests", "post", newSection);

        if (response.ok) {
          toast({
            title: "Додано нову секцію із завданнями:",
            description: (
              <p className="mt-2 w-[340px] rounded-md py-4 font-bold">{data.subtitle}</p>
            ),
          });
        }
        setLoading(false);
      } else {
        toast({ title: "Помилка валідації", description: "Не заповнені всі обов'язкові поля" });
      }
    } catch (error) {
      toast({
        title: "Помилка під час надсилання даних",
      });
      console.log(error);
    }
  };

  const { inputContainer, inputLabel, inputError, spanError } = styles;

  return (
    <form onSubmit={submitHandler} className="w-full max-w-screen-md mx-auto">
      <div className="flex flex-col space-y-6 p-6 border rounded-lg shadow-md">
        <div className={inputContainer}>
          <label htmlFor="section" className={inputLabel}>
            &quot;section&quot;:
          </label>
          <input
            placeholder="syntax_html"
            value={data.section}
            onChange={(e) => setData((prev) => ({ ...prev, section: e.target.value }))}
            className={`${inputError} ${
              errors?.section ? "border-red-500" : "focus:border-accent"
            }`}
          />
          {errors.section && <span className={spanError}>{errors.section}</span>}
        </div>
        <div className={inputContainer}>
          <label htmlFor="subtitle" className={inputLabel}>
            &quot;subtitle&quot;:
          </label>
          <input
            placeholder="Як користувачу, я хочу мати сітку з двома колонками, де одна колонка ширша за іншу. Який CSS Grid код необхідно написати для досягнення цього результату?"
            value={data.subtitle}
            onChange={(e) => setData((prev) => ({ ...prev, subtitle: e.target.value }))}
            className={`${inputError} ${
              errors?.subtitle ? "border-red-500" : "focus:border-accent"
            }`}
          />
          {errors.subtitle && <span className={spanError}>{errors.subtitle}</span>}
        </div>
        <div className={inputContainer}>
          <label className={inputLabel}>&quot;tests&quot;</label>
          <div className="flex w-full flex-col space-y-1">
            <textarea
              value={data.tests}
              placeholder='{"id":1,"description":"Як користувачу, я хочу мати сітку з двома колонками, де одна колонка ширша за іншу. Який CSS Grid код необхідно написати для досягнення цього результату?","options":["grid-template-columns: 1fr 2fr;","grid-template-columns: 2fr 1fr;"],"tips":["Використовуйте \"grid-template-columns\"","Вказуйте ширину колонок, наприклад, \"1fr\" та \"2fr\""],"result":"grid-template-columns: 1fr 2fr;","level":"low"}'
              onChange={(e) => setData((prev) => ({ ...prev, tests: e.target.value }))}
              className={`${inputError} ${
                errors?.tests ? "border-red-500" : "focus:border-accent"
              } resize-y h-32`}></textarea>
            {errors.tests && <span className={spanError}>{errors.tests}</span>}
          </div>
        </div>
      </div>
      <div className="flex items-center mt-4">
        <Button type="submit">{loading ? "Виконую..." : "Записати"}</Button>
      </div>
    </form>
  );
};

export default TestsInput;
