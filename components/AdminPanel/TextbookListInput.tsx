"use client";

import { v4 as uuidv4 } from "uuid";
import { Errors, List } from "./TextbookInput";
import { styles } from "@/lib/styles";
import { Button } from "../ui/button";
import { BsTrash3Fill } from "react-icons/bs";
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from "react";
import { InputField } from "../index";

const { inputContainer, inputLabel, buttonOpacity, inputHover } = styles;

type TextbookListInputProps = {
  index: number;
  setErrors: Dispatch<SetStateAction<Errors>>;
  removeContent: (index: number) => void;
  onUpdateList: (index: number, list: List) => void;
};

type ListErrors = {
  listTitle: boolean;
  listItems: {
    id: string;
    item: boolean;
  }[];
};

const TextbookListInput: React.FC<TextbookListInputProps> = ({
  index,
  setErrors,
  removeContent,
  onUpdateList,
}) => {
  const [listError, setListError] = useState<ListErrors>({
    listTitle: false,
    listItems: [
      {
        id: uuidv4(),
        item: false,
      },
    ],
  });
  const [list, setList] = useState<List>({
    listTitle: "",
    listItems: [
      {
        id: uuidv4(),
        item: "",
      },
    ],
  });

  const addNewListRowHandler = (e: React.MouseEvent) => {
    e.preventDefault();

    setList((prev) => ({
      ...prev,
      listItems: [
        ...prev.listItems,
        {
          id: uuidv4(),
          item: "",
        },
      ],
    }));

    setListError((prev) => ({
      ...prev,
      listItems: [
        ...prev.listItems,
        {
          id: uuidv4(),
          item: false,
        },
      ],
    }));
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {
      listTitle: false,
      listItems: [
        {
          id: uuidv4(),
          item: false,
        },
      ],
    };

    if (!list.listTitle.trim()) {
      newErrors = { ...newErrors, listTitle: true };
      valid = false;
    }

    list.listItems.forEach((row, index) => {
      let newRowErrors = {
        id: uuidv4(),
        item: false,
      };

      if (!row.item.trim()) {
        newRowErrors = { ...newRowErrors, item: true };
        valid = false;
      }

      newErrors.listItems[index] = newRowErrors;
    });

    setListError(newErrors);

    return valid;
  };

  const debouncedUpdateList = useCallback(
    (updatedList: List) => {
      const isValid = validateForm();

      if (isValid) {
        onUpdateList(index, updatedList);
        setErrors((prev) => ({ ...prev, content: false }));
      } else {
        setErrors((prev) => ({ ...prev, content: true }));
      }
    },
    [validateForm],
  );

  const handleItemChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setList((prev) => ({ ...prev, listTitle: e.target.value }));
      setTimeout(() => debouncedUpdateList({ ...list, listTitle: e.target.value }), 500);
    },
    [list, setList, debouncedUpdateList],
  );

  const handleRowChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, rowIndex: number) => {
      const updatedRows = [...list.listItems];
      updatedRows[rowIndex] = { ...updatedRows[rowIndex], item: e.target.value };
      setList((prev) => ({ ...prev, listItems: updatedRows }));
      setTimeout(() => debouncedUpdateList({ ...list, listItems: updatedRows }), 500);
    },
    [list, setList, debouncedUpdateList],
  );

  return (
    <div className={`relative ${inputHover} group/table p-1`}>
      <p className={inputLabel}>&quot;list&quot;:</p>
      <div className="flex flex-col space-y-2">
        <InputField
          label='"title"'
          name="title"
          value={list.listTitle}
          placeHolder="Наприклад, його можна використовувати для:"
          onChange={handleItemChange}
          onBlur={handleItemChange}
          error={listError?.listTitle}
        />
        <div className={inputContainer}>
          <p className={inputLabel}>&quot;items&quot;:</p>
          <div className="flex w-full flex-col space-y-1 pt-10">
            {list.listItems.map((row, rowIndex) => {
              return (
                <div
                  key={row.id}
                  className={`flex flex-col space-y-2 relative group/row pr-10 ${inputHover}`}>
                  <InputField
                    label='"item":'
                    name="item"
                    placeHolder="Стилізації першої літери або рядка елемента"
                    value={row.item}
                    onChange={(e) => handleRowChange(e, rowIndex)}
                    onBlur={(e) => handleRowChange(e, rowIndex)}
                    error={listError.listItems?.[rowIndex]?.item}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`${buttonOpacity} group-hover/row:opacity-100 top-0 right-0`}
                    onClick={() => {
                      setList((prev) => ({
                        ...prev,
                        listItems: prev.listItems.filter((item) => item.id !== row.id),
                      }));
                    }}>
                    <BsTrash3Fill className="text-red-500" />
                  </Button>
                </div>
              );
            })}
            <div className="flex justify-end">
              <Button variant="ghost" onClick={addNewListRowHandler}>
                Додати
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className={`${buttonOpacity} group-hover/table:opacity-100 top-0 right-0`}
        onClick={() => removeContent(index)}>
        <BsTrash3Fill className="text-red-500" />
      </Button>
    </div>
  );
};

export default TextbookListInput;
