"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UsersDataList } from "@/store/store";
import Spinner from "../ui/spinner";
import { useEffect, useState } from "react";

type ShowUsersDataProps = { usersData: UsersDataList[] };

const ParentCabinetShowAllUsersData = ({ usersData }: ShowUsersDataProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) return <Spinner drawer />;

  return (
    <Table>
      <TableCaption>Список усіх користувачів</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[350px]">ID</TableHead>
          <TableHead>Ім&apos;я</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Група</TableHead>
          <TableHead>Роль</TableHead>
          <TableHead className="text-right">Пароль</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {usersData?.map((user) => {
          return (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.label}</TableCell>
              <TableCell>{user.group}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell className="text-right">{user.password}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ParentCabinetShowAllUsersData;
