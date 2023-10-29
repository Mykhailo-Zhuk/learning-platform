"use client";

import { useSession } from "next-auth/react";

function AdminDashboard() {
  const { data: session } = useSession();
  // session is always non-null inside this page, all the way down the React tree.
  return (
    <section className="w-full">
      <div className="max-w-[1400px] mx-auto p-5">Admin</div>
    </section>
  );
}

AdminDashboard.auth = true;

export default AdminDashboard;
