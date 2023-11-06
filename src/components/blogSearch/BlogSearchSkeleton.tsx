import { Skeleton } from "components/ui/skeleton";

export function BlogSearchSkeleton() {
  return (
    <>
      {[1, 2, 3, 4, 5, 6].map((key) => (
        <div key={key} className="basis-full md:basis-1/2 lg:basis-1/3 p-3">
          <div className="h-full rounded-lg overflow-hidden flex flex-col">
            <Skeleton className="relative w-full pb-[60%]" />
            <div className="flex flex-col flex-1 mt-3">
              <Skeleton className="w-full h-5" />
              <Skeleton className="w-full h-5 mt-3" />
              <div className="flex gap-6 justify-between mt-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="flex-1 w-full h-8" />
                <Skeleton className="flex-1 w-full h-8" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
