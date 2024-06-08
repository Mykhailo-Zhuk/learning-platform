import { Skeleton } from "../ui/skeleton";

const HomeworkSkeleton = () => {
  return (
    <section className="border-t border-t-slate-200 py-5">
      <div className="p-3 rounded-lg ">
        <Skeleton className="w-full h-52" />
      </div>
    </section>
  );
};

export default HomeworkSkeleton;
