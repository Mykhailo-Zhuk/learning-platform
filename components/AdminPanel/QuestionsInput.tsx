"use client";

import React, { useState } from "react";
import { styles } from "@/lib/styles";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { fetchToChangeDataOnServer } from "@/lib/utils";

type Questions = {
  section: string;
  subtitle: string;
  tasks: string;
};

const QuestionsInput = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    section: "",
    subtitle: "",
    tasks: "",
  });

  const [questions, setQuestions] = useState<Questions>({
    section: "",
    subtitle: "",
    tasks: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      section: "",
      subtitle: "",
      tasks: "",
    };

    if (!questions.section.trim()) {
      newErrors.section = "Це поле є обов'язковим";
      valid = false;
    }

    if (!questions.subtitle.trim()) {
      newErrors.subtitle = "Це поле є обов'язковим";
      valid = false;
    }

    if (!questions.tasks.trim()) {
      newErrors.tasks = "Це поле є обов'язковим";
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
          [questions.section]: {
            subtitle: questions.subtitle,
            tasks: JSON.parse(questions.tasks),
          },
        };
        const replacedSingleQuotes = JSON.parse(JSON.stringify(newSection).replace(/'/g, '"'));

        const response = await fetchToChangeDataOnServer("questions", "post", replacedSingleQuotes);

        if (response.ok) {
          toast({
            title: "Додано нову секцію із завданнями:",
            description: (
              <p className="mt-2 w-[340px] rounded-md py-4 font-bold">{questions.subtitle}</p>
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
      setLoading(false);
    }
    setQuestions({ section: "", subtitle: "", tasks: "" });
    setLoading(false);
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
            value={questions.section}
            onChange={(e) => setQuestions((prev) => ({ ...prev, section: e.target.value }))}
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
            placeholder="CSS Grid"
            value={questions.subtitle}
            onChange={(e) => setQuestions((prev) => ({ ...prev, subtitle: e.target.value }))}
            className={`${inputError} ${
              errors?.subtitle ? "border-red-500" : "focus:border-accent"
            }`}
          />
          {errors.subtitle && <span className={spanError}>{errors.subtitle}</span>}
        </div>
        <div className={inputContainer}>
          <label className={inputLabel}>&quot;tasks&quot;</label>
          <div className="flex w-full flex-col space-y-1">
            <textarea
              value={questions.tasks}
              placeholder='[{"id":1,"question":"Як створити контейнер з CSS Grid?","options":["grid-container: true;","display: flex;","display: grid;","grid: true;"],"correctAnswer":"display: grid;","level":"low"}]'
              onChange={(e) => setQuestions((prev) => ({ ...prev, tasks: e.target.value }))}
              className={`${inputError} ${
                errors?.tasks ? "border-red-500" : "focus:border-accent"
              } resize-y h-32`}></textarea>
            {errors.tasks && <span className={spanError}>{errors.tasks}</span>}
          </div>
        </div>
      </div>
      <div className="flex items-center mt-4">
        <Button type="submit">{loading ? "Виконую..." : "Записати"}</Button>
      </div>
    </form>
  );
};

export default QuestionsInput;
