"use client";

import { AdminPanelList, ChangeDateForm, ChangeTimeForm } from "../index";

function AdminDashboard() {
  return (
    <section className="w-full">
      <div className="max-w-[1400px] max-md:flex max-md:flex-col max-md:space-y-5 mx-auto p-5 grid grid-cols-[minmax(200px,_250px)_auto] gap-6">
        <AdminPanelList />
        <div className="flex max-lg:flex-col min-[624px]:flex-row max-lg:space-y-5 justify-around max-md:p-3 p-5 w-full max-w-[440px] min-[624px]:max-w-[520px] md:max-w-screen-md mx-auto border rounded-lg shadow-md">
          <ChangeTimeForm />
          <ChangeDateForm />
        </div>
      </div>
    </section>
  );
}

AdminDashboard.auth = true;

export default AdminDashboard;
