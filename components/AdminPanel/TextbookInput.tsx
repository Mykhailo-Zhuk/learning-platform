"use client";

import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { styles } from "@/lib/styles";
import { fetchToChangeDataOnServer } from "@/lib/utils";
import { toast } from "../ui/use-toast";
import { ChangeEvent, useCallback, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InputField,
  TextbookCodeInput,
  TextbookImageInput,
  TextbookListInput,
  TextbookTableInput,
  TextbookTextInput,
} from "../index";

export type Row = {
  id: string;
  item: string;
  example: string;
  description: string;
};

export type Table = {
  tableTitle?: string;
  tableHeaders: string;
  tableRows: Row[];
};

export type List = {
  listTitle: string;
  listItems: {
    id: string;
    item: string;
  }[];
};

export type Image = {
  imageSrc: string;
  imageCaption: string;
};

export type Text = {
  textValue: string;
};

export type Code = {
  codeValue: string;
  language: string;
};

type Content = (Text | Code | Table | List | Image)[];

export type FormData = {
  section: string;
  subtitle: string;
  content: Content;
};

export type Errors = {
  section: boolean;
  subtitle: boolean;
  content: boolean;
};

const TextbookInput = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({
    section: false,
    subtitle: false,
    content: false,
  });
  const [formData, setFormData] = useState<FormData>({
    section: "",
    subtitle: "",
    content: [{ textValue: "" }],
  });

  const textFieldData = { textValue: "" };
  const codeFieldData = { codeValue: "", language: "js" };
  const tableFieldData = {
    tableTitle: "",
    tableHeaders: "",
    tableRows: [
      {
        id: uuidv4(),
        item: "",
        example: "",
        description: "",
      },
    ],
  };

  const imageFieldData = {
    imageSrc: "",
    imageCaption: "",
  };

  const listFieldData = {
    listTitle: "",
    listItems: [
      {
        id: uuidv4(),
        item: "",
      },
    ],
  };

  // Add data fields
  const addDataField = (data: Code | Table | List | Image | Text) => {
    setFormData((prev) => ({
      ...prev,
      content: [...prev.content, data],
    }));
  };

  // Remove elements
  const removeContent = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      content: prev.content.filter((_, i) => i !== index),
    }));
  };

  // Update values
  const onUpdateFieldsHandler = useCallback(
    (index: number, field: Code | Text | Table | List | Image) => {
      setFormData((prev) => ({
        ...prev,
        content: prev.content.map((item, i) => (i === index ? { ...field } : item)),
      }));
    },
    [setFormData],
  );

  const validateForm = useCallback(() => {
    let valid = true;

    const newErrors = {
      section: false,
      subtitle: false,
      content: false,
    };

    if (!formData.section.trim()) {
      newErrors.section = true;
      valid = false;
    }

    if (!formData.subtitle.trim()) {
      newErrors.subtitle = true;
      valid = false;
    }
    if (!formData.content.length) {
      newErrors.content = true;
      valid = false;
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return valid;
  }, [formData, setErrors]);

  const debouncedUpdate = useCallback(
    (field: string) => {
      const isValid = validateForm();

      if (isValid) {
        setErrors((prev) => ({ ...prev, [field]: false }));
      } else {
        setErrors((prev) => ({ ...prev, [field]: true }));
      }
    },
    [validateForm],
  );

  const handleItemChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setFormData((prev) => ({ ...prev, [name]: value }));
      setTimeout(() => {
        debouncedUpdate(name);
      }, 500);
    },
    [setFormData, debouncedUpdate],
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const isValid = validateForm();

    const createArrayFromString = (options: string) => {
      return options.split("; ");
    };

    const newSection = {
      [formData.section]: {
        subtitle: formData.subtitle,
        content: formData.content.map((item) => {
          if ("textValue" in item) {
            return item.textValue;
          }

          if ("listItems" in item) {
            return { list: { title: item.listTitle, items: [...item.listItems] } };
          }

          if ("imageSrc" in item) {
            return {
              image: { src: item.imageSrc, caption: createArrayFromString(item.imageCaption) },
            };
          }

          if ("tableRows" in item) {
            return {
              table: {
                title: item.tableTitle,
                headers: createArrayFromString(item.tableHeaders),
                rows: [...item.tableRows],
              },
            };
          }

          if ("codeValue" in item) {
            return {
              code: {
                codeValue: item.codeValue,
                language: item.language,
              },
            };
          }
        }),
      },
    };

    if (!isValid) {
      toast({
        title: "Помилка валідації",
        description: "Не заповнені всі обов'язкові поля",
      });
      setLoading(false);
      return;
    }
    console.log(newSection);
    try {
      const response = await fetchToChangeDataOnServer("descriptions", "post", newSection);

      if (response.ok) {
        toast({
          title: "Додано нову секцію:",
          description: (
            <p className="mt-2 w-[340px] rounded-md py-4 font-bold">{formData.section}</p>
          ),
        });
      }
    } catch (error) {
      toast({
        title: "Помилка під час надсилання даних",
      });
      console.error(error);
    }

    setFormData({ section: "", subtitle: "", content: [] });
    setLoading(false);
  };

  const { inputContainer, inputLabel } = styles;

  return (
    <form onSubmit={onSubmit} className="w-full max-w-screen-md mx-auto">
      <div className="flex flex-col space-y-6 p-6 border rounded-lg shadow-md">
        <InputField
          label='"section"'
          name="section"
          value={formData.section}
          placeHolder="js_general"
          onChange={(e) => handleItemChange(e)}
          onBlur={(e) => handleItemChange(e)}
          error={errors?.section}
        />
        <InputField
          label='"subtitle"'
          name="subtitle"
          value={formData.subtitle}
          placeHolder="Загальні поняття про Javascript"
          onChange={(e) => handleItemChange(e)}
          onBlur={(e) => handleItemChange(e)}
          error={errors?.subtitle}
        />
        <div className={inputContainer}>
          <p className={inputLabel}>&quot;content&quot;:</p>
          <div className="flex w-full flex-col space-y-2 pt-10">
            {formData.content.map((item, index) => (
              <div key={index}>
                {"textValue" in item && (
                  <TextbookTextInput
                    key={index}
                    setErrors={setErrors}
                    index={index}
                    updateTextValue={onUpdateFieldsHandler}
                    removeContent={removeContent}
                  />
                )}
                {"tableRows" in item && (
                  <TextbookTableInput
                    key={index}
                    index={index}
                    setErrors={setErrors}
                    onUpdateTable={onUpdateFieldsHandler}
                    removeContent={removeContent}
                  />
                )}
                {"listItems" in item && (
                  <TextbookListInput
                    key={index}
                    index={index}
                    setErrors={setErrors}
                    onUpdateList={onUpdateFieldsHandler}
                    removeContent={removeContent}
                  />
                )}
                {"imageSrc" in item && (
                  <TextbookImageInput
                    key={index}
                    index={index}
                    setErrors={setErrors}
                    onUpdateImage={onUpdateFieldsHandler}
                    removeContent={removeContent}
                  />
                )}
                {"codeValue" in item && (
                  <TextbookCodeInput
                    key={index}
                    setErrors={setErrors}
                    index={index}
                    updateCodeInput={onUpdateFieldsHandler}
                    removeContent={removeContent}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger className="hover:bg-accent py-2 px-4 rounded-lg disabled:bg-gray-200 disabled:opacity-50">
              Додати елемент
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => addDataField(textFieldData)}>Текст</DropdownMenuItem>
              <DropdownMenuItem onClick={() => addDataField(tableFieldData)}>
                Таблиця
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => addDataField(listFieldData)}>
                Список
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => addDataField(imageFieldData)}>
                Картинка
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => addDataField(codeFieldData)}>Код</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex items-center mt-4">
        <Button
          type="submit"
          disabled={Object.values(errors).some((item) => item === true) ? true : false}>
          {loading ? "Виконую..." : "Записати"}
        </Button>
      </div>
    </form>
  );
};

export default TextbookInput;
