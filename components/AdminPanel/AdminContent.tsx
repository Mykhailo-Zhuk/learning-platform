"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const AdminContent = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("type");

  useEffect(() => {
    console.log(search);
  }, [searchParams]);

  return (
    <section>
      <div className="flex px-5">AdminContent</div>
    </section>
  );
};

export default AdminContent;
