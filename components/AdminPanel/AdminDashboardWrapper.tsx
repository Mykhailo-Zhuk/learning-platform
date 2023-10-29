"use client";

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
  console.log(filterUsers);
  console.log(session);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "authenticated" && filterUsers?.role === "admin") {
    return <AdminDashboard />;
  }

  return (
    <p>
      У вас недостатньо прав для перегляду цієї сторінки.
      <br />
      <a href="/">Повернутися до головної сторінки</a>
    </p>
  );
};

export default AdminDashboardWrapper;
