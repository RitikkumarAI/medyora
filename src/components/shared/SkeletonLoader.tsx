import { cn } from "@/lib/utils";

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return <div className={cn("animate-pulse rounded-md bg-slate-200", className)} {...props} />;
}

// Pre-configured skeleton layouts for convenience
export function DoctorCardSkeleton() {
  return (
    <div className="flex gap-4 rounded-3xl bg-white p-3 shadow-sm border border-slate-100">
      <Skeleton className="h-[88px] w-[88px] rounded-2xl" />
      <div className="flex flex-1 flex-col py-1 justify-center space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex flex-col justify-between">
      <Skeleton className="h-10 w-10 rounded-full mb-3" />
      <Skeleton className="h-3 w-16 mb-2" />
      <Skeleton className="h-6 w-12" />
    </div>
  );
}

export function ListItemSkeleton() {
  return (
    <div className="flex gap-4 rounded-3xl bg-white p-3 shadow-sm border border-slate-100 items-center">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="flex flex-1 flex-col space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}
