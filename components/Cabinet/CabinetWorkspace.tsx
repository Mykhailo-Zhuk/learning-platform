"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "./ParentsCabinet";
import { PersonalHomeworkResults } from "@/store/store";
import { Badge } from "../ui/badge";
import ShowExactHomework from "./ShowExactHomework";

export type ColumnData = {
  id: string;
  date: string;
  isCompleted: "Частково" | "Виконав" | "Не виконав";
  lessonTitle: string;
  homeworkId: string;
};

type CabinetWorkspaceTableProps = {
  user: User;
  userData: PersonalHomeworkResults;
};

const CabinetWorkspace = ({ user, userData }: CabinetWorkspaceTableProps) => {
  const data = userData.homeworkIsDone;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<ColumnData>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "isCompleted",
      header: "Статус",
      cell: ({ row }) => {
        if (row.getValue("isCompleted") === "Частково") {
          return (
            <div>
              <Badge variant="secondary">{row.getValue("isCompleted")}</Badge>
            </div>
          );
        } else if (row.getValue("isCompleted") === "Не виконав") {
          return (
            <div>
              <Badge variant="destructive">{row.getValue("isCompleted")}</Badge>
            </div>
          );
        } else {
          return (
            <div>
              <Badge variant="default" className="bg-green-600 hover:bg-green-500">
                {row.getValue("isCompleted")}
              </Badge>
            </div>
          );
        }
      },
    },
    {
      accessorKey: "lessonTitle",
      header: "Назва домашньої",
      cell: ({ row }) => {
        return <div>{row.getValue("lessonTitle")}</div>;
      },
    },
    {
      accessorKey: "homeworkId",
      header: () => <div className="text-right">Переглянути домашню</div>,
      cell: ({ row }) => {
        return (
          <ShowExactHomework
            className="float-right ml-2"
            user={user}
            homeworkId={row.getValue("homeworkId")}
          />
        );
      },
    },
    {
      accessorKey: "date",
      header: () => <div className="text-center">Дата</div>,
      cell: ({ row }) => {
        return <div className="text-center font-medium">{row.getValue("date")}</div>;
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full px-5">
      <div className="flex items-center py-4">
        <Input
          placeholder="Фільтрувати за назвою уроку"
          value={(table.getColumn("lessonTitle")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("lessonTitle")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Немає результатів.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} з{" "}
          {table.getFilteredRowModel().rows.length} рядка(ів) вибрано.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Попередня
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Наступна
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CabinetWorkspace;
