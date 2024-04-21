import Link from "next/link";

const Denied = () => {
  return (
    <section className="flex flex-col gap-12 items-center">
      <h1 className="text-5xl">Access Denied</h1>
      <p className="text-3xl max-w-2xl text-center">You are not authorized to view this page.</p>
      <Link href="/" className="text-2xl underline">
        Return to Home Page
      </Link>
    </section>
  );
};

export default Denied;
