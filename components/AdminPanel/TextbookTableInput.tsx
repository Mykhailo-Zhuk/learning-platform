"use client";

import { v4 as uuidv4 } from "uuid";
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from "react";
import { styles } from "@/lib/styles";
import { Button } from "../ui/button";
import { BsTrash3Fill } from "react-icons/bs";
import { Errors, Row, Table } from "./TextbookInput";
import { InputField } from "../index";

const { inputContainer, inputLabel, buttonOpacity, inputHover } = styles;

type TableErrors = {
  tableHeaders: boolean;
  tableRows: [
    {
      id: string;
      item: boolean;
      description: boolean;
    },
  ];
};

type TextbookTableInputProps = {
  index: number;
  setErrors: Dispatch<SetStateAction<Errors>>;
  removeContent: (index: number) => void;
  onUpdateTable: (index: number, field: Table) => void;
};

const TextbookTableInput: React.FC<TextbookTableInputProps> = ({
  onUpdateTable,
  removeContent,
  index,
}) => {
  const [errors, setErrors] = useState<TableErrors>({
    tableHeaders: false,
    tableRows: [
      {
        id: uuidv4(),
        item: false,
        description: false,
      },
    ],
  });

  const [table, setTable] = useState<Table>({
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
  });

  const addNewTableRowHandler = (e: React.MouseEvent) => {
    e.preventDefault();

    setTable((prev) => ({
      ...prev,
      tableRows: [
        ...prev.tableRows,
        {
          id: uuidv4(),
          item: "",
          example: "",
          description: "",
        },
      ],
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors: TableErrors = {
      tableHeaders: false,
      tableRows: [{ id: uuidv4(), item: false, description: false }],
    };

    if (!table.tableHeaders.trim()) {
      newErrors.tableHeaders = true;
      valid = false;
    }

    table.tableRows.forEach((row, index) => {
      const newRowErrors = {
        id: uuidv4(),
        item: false,
        example: false,
        description: false,
      };

      if (!row.item.trim()) {
        newRowErrors.item = true;
        valid = false;
      }

      if (!row.description.trim()) {
        newRowErrors.description = true;
        valid = false;
      }

      newErrors.tableRows[index] = newRowErrors;
    });

    setErrors(newErrors);
    return valid;
  };

  const debouncedUpdateTable = useCallback(
    (updatedTable: Table) => {
      const isValid = validateForm();
      if (isValid) {
        onUpdateTable(index, updatedTable);
        setErrors((prev) => ({ ...prev, content: false }));
      } else {
        setErrors((prev) => ({ ...prev, content: true }));
      }
    },
    [validateForm, onUpdateTable, index, setErrors],
  );

  const handleItemChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, field: string) => {
      setTable((prev) => ({ ...prev, [field]: e.target.value }));
      setTimeout(() => debouncedUpdateTable({ ...table, [field]: e.target.value }), 500);
    },
    [table, setTable, debouncedUpdateTable],
  );

  const handleRowChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, field: string, index: number, row: Row) => {
      const updatedRows = [...table.tableRows];
      updatedRows[index] = { ...row, [field]: e.target.value };
      setTable((prev) => ({ ...prev, tableRows: updatedRows }));
      setTimeout(() => debouncedUpdateTable({ ...table, tableRows: updatedRows }), 500);
    },
    [table, setTable, debouncedUpdateTable],
  );

  return (
    <div className={`relative ${inputHover} group/table p-1`}>
      <p className={inputLabel}>&quot;table&quot;:</p>
      <div className="flex flex-col space-y-2">
        <InputField
          label='"title?":'
          name="title"
          value={table?.tableTitle || ""}
          placeHolder="Всі CSS селектори атрибутів:"
          onChange={(e) => handleItemChange(e, "tableTitle")}
          onBlur={(e) => handleItemChange(e, "tableTitle")}
        />
        <InputField
          label='"headers":'
          name="headers"
          value={table.tableHeaders}
          placeHolder="Розділяти за допомогою ( ; ): Властивості; Опис"
          onChange={(e) => handleItemChange(e, "tableHeaders")}
          onBlur={(e) => handleItemChange(e, "tableHeaders")}
          error={errors?.tableHeaders}
        />
        <div className={inputContainer}>
          <p className={inputLabel}>&quot;rows&quot;:</p>
          <div className="flex w-full flex-col space-y-1 pt-10">
            {table.tableRows.map((row, rowIndex) => {
              return (
                <div
                  key={row.id}
                  className={`flex flex-col space-y-2 relative group/row pr-10 ${inputHover}`}>
                  <InputField
                    label='"item":'
                    name="item"
                    placeHolder="[attribute]"
                    value={row.item}
                    onChange={(e) => handleRowChange(e, "item", rowIndex, row)}
                    onBlur={(e) => handleRowChange(e, "item", rowIndex, row)}
                    error={errors.tableRows?.[rowIndex]?.item}
                  />
                  <InputField
                    label='"example?":'
                    name="example"
                    placeHolder="[target]"
                    value={row.example}
                    onChange={(e) => handleRowChange(e, "example", rowIndex, row)}
                    onBlur={(e) => handleRowChange(e, "example", rowIndex, row)}
                  />
                  <InputField
                    label='"description":'
                    name="description"
                    value={row.description}
                    placeHolder="Обирає всі елементи з атрибутом target"
                    onChange={(e) => handleRowChange(e, "description", rowIndex, row)}
                    onBlur={(e) => handleRowChange(e, "description", rowIndex, row)}
                    error={errors.tableRows?.[rowIndex]?.description}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`${buttonOpacity} group-hover/row:opacity-100 -top-2 right-0`}
                    onClick={() => {
                      setTable((prev) => ({
                        ...prev,
                        tableRows: prev.tableRows.filter((item) => item.id !== row.id),
                      }));
                    }}>
                    <BsTrash3Fill className="text-red-500" />
                  </Button>
                </div>
              );
            })}
            <div className="flex justify-end">
              <Button variant="ghost" onClick={addNewTableRowHandler}>
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

export default TextbookTableInput;
