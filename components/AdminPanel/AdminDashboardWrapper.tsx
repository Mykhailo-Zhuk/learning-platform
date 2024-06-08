"use client";

import Spinner from "../ui/spinner";
import AdminDashboard from "./AdminDashboard";
import { useSession } from "next-auth/react";

const AdminDashboardWrapper = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "authenticated" && session?.user.role === "admin") {
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
