import { Skeleton } from "@/components/ui/skeleton"

const SideBarSkeleton = () => {
  return (
    <div className="w-64 border-r p-6 flex flex-col justify-between">
        <div className="space-y-14">
          <Skeleton className="h-8 w-32" />
          <div className="space-y-8">
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </div>
  )
}

export default SideBarSkeleton