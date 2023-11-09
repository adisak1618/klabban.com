import clsx from "clsx";
import { Skeleton } from "components/ui/skeleton";

export function PostCardSkeleton({ className }: { className?: string }) {
  return (
    <>
      <div className="basis-full md:basis-1/2 lg:basis-1/3 p-3">
        <div className="h-full rounded-lg overflow-hidden flex flex-col">
          <Skeleton className={clsx("relative w-full pb-[60%]", className)} />
          <div className="flex flex-col flex-1 mt-3">
            <Skeleton className={clsx("w-full h-5", className)} />
            <Skeleton className={clsx("w-full h-5 mt-3", className)} />
            <div className={"flex gap-6 justify-between mt-3"}>
              <Skeleton className={clsx("h-8 w-8 rounded-full", className)} />
              <Skeleton className={clsx("flex-1 w-full h-8", className)} />
              <Skeleton className={clsx("flex-1 w-full h-8", className)} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
