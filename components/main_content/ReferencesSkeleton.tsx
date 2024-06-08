import { Skeleton } from "../ui/skeleton";

const ReferencesSkeleton = () => {
  return (
    <section className="flex space-x-5 border-t border-t-slate-200 py-5">
      <div className="max-w-sm p-3 rounded-lg">
        <Skeleton className="h-40 w-96" />
      </div>
    </section>
  );
};

export default ReferencesSkeleton;
