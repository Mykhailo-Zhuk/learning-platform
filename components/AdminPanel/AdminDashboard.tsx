"use client";

import { useSession } from "next-auth/react";
import { AdminPanelList, ChangeDateForm, ChangeTimeForm } from "../index";

function AdminDashboard() {
  const { data: session } = useSession();
  return (
    <section className="w-full">
      <div className="max-w-[1400px] mx-auto p-5 grid grid-cols-[minmax(200px,_250px)_auto] gap-6">
        <AdminPanelList />
        <div className="flex flex-col p-5 bg-accent rounded-lg">
          <h1 className="text-center mb-6">
            Тут можна розмітисти інформацію про період часу від останнії змін тощо
          </h1>
          <div className="flex justify-around px-5">
            <ChangeTimeForm />
            <ChangeDateForm />
          </div>
        </div>
      </div>
    </section>
  );
}

AdminDashboard.auth = true;

export default AdminDashboard;
