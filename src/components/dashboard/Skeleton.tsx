import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardSkeleton() {
  return (
    <div className="flex h-screen bg-[#0B0B0F]">
      <div className="flex-1 p-8 space-y-8">
        <div className="space-y-3">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>
        <div className="flex items-center justify-between rounded-xl border p-8">
          <div className="space-y-4">
            <Skeleton className="h-6 w-64" />
            <Skeleton className="h-4 w-96" />
            <Skeleton className="h-8 w-72 rounded-full" />
          </div>
          <Skeleton className="h-32 w-32 rounded-full" />
        </div>
        <div className="grid grid-cols-4 gap-6">
          {[1,2,3,4,5,6,7,8].map((i)=>(
            <div key={i} className="rounded-xl border p-6 space-y-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-8 w-16" />
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}