"use client";

import { useSession } from "next-auth/react";
import AdminPanelList from "./AdminPanelList";
import AdminContent from "./AdminContent";

function AdminDashboard() {
  const { data: session } = useSession();
  // session is always non-null inside this page, all the way down the React tree.
  return (
    <section className="w-full">
      <div className="max-w-[1400px] mx-auto p-5 grid grid-cols-[minmax(200px,_250px)_auto]">
        <AdminPanelList />
        <AdminContent />
      </div>
    </section>
  );
}

AdminDashboard.auth = true;

export default AdminDashboard;
