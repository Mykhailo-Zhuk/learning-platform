"use client";

import Spinner from "../ui/spinner";
import AdminDashboard from "./AdminDashboard";
import { useSession } from "next-auth/react";

type Role = "admin" | "student";

type User = { id: number | string; name: string; password: string; role: Role };

const AdminDashboardWrapper = () => {
  const { data: session, status } = useSession();

  const users: User[] = [
    { id: "27", name: "Misha", password: "nextauth", role: "admin" },
    { id: "28", name: "Victor", password: "nextauth", role: "student" },
  ];

  const filterUsers = users.find((user) => user.name === session?.user?.name);
  // fetch to check if availible
  //   async function getUsers() {
  //     try {
  //     } catch (err) {}
  //   }

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "authenticated" && filterUsers?.role === "admin") {
    return <AdminDashboard />;
  }

  return (
    <p className="flex max-w-[1400px] mx-auto p-5 flex-col items-center justify-center">
      У вас недостатньо прав для перегляду цієї сторінки.
      <br />
      <a href="/">Повернутися до головної сторінки</a>
    </p>
  );
};

export default AdminDashboardWrapper;
