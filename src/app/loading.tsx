import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-6">
      {/* Page Title */}
      <Skeleton className="mb-6 h-8 w-1/3" />

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="flex flex-col space-y-3">
            {/* Product Image */}
            <Skeleton className="h-[200px] w-full rounded-lg" />
            {/* Product Name */}
            <Skeleton className="h-4 w-3/4" />
            {/* Price */}
            <Skeleton className="h-4 w-1/4" />
            {/* Rating */}
            <Skeleton className="h-4 w-1/6" />
          </div>
        ))}
      </div>
    </div>
  );
}
