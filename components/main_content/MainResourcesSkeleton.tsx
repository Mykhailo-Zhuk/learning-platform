import { Skeleton } from "../ui/skeleton";

const MainResourcesSkeleton = () => {
  return (
    <section className="flex flex-col lg:grid lg:grid-cols-[auto_minmax(200px,_400px)] gap-5 py-5">
      <div className="p-3 rounded-lg">
        <Skeleton className="w-full h-64" />
      </div>
      <div className="flex flex-col space-y-5 md:max-lg:flex-row md:max-lg:space-x-5 md:max-lg:space-y-0">
        <div className="p-3 rounded-lg cursor-pointer max-h-[160px]">
          <Skeleton className="w-full h-32" />
        </div>
        <div className="p-3 rounded-lg cursor-pointer max-h-[120px]">
          <Skeleton className="w-full h-20" />
        </div>
      </div>
    </section>
  );
};

export default MainResourcesSkeleton;
