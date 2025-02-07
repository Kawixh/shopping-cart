import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-8 p-6 md:flex-row">
      {/* Image Skeleton */}
      <Skeleton className="h-[400px] w-[300px] rounded-lg md:w-[400px]" />

      {/* Product Details Skeleton */}
      <div className="flex-1 space-y-4">
        {/* Title */}
        <Skeleton className="h-6 w-3/4" />

        {/* Price */}
        <Skeleton className="h-6 w-1/4" />

        {/* Description Title */}
        <Skeleton className="h-5 w-1/6" />

        {/* Description Content */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />

        {/* Category and Stock */}
        <div className="flex gap-4">
          <Skeleton className="h-6 w-24 rounded-md" />
          <Skeleton className="h-6 w-16 rounded-md" />
        </div>

        {/* Add to Cart Button */}
        <Skeleton className="h-12 w-40 rounded-lg" />
      </div>
    </div>
  );
}
