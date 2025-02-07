import { db } from "@/db";
import { products } from "@/db/schema/products";
import { getPlaceholderImage } from "@/utils/images";
import Image from "next/image";
import Link from "next/link";
import { LuStar } from "react-icons/lu";

export const metadata = {
  title: "Shop | Your App Name",
  description: "Browse our products",
};

export default async function ShopPage() {
  const productList = await db.select().from(products);

  // Pre-generate placeholders in parallel
  const productsWithPlaceholders = await Promise.all(
    productList.map(async (product) => ({
      ...product,
      placeholder: product.mainImage
        ? (await getPlaceholderImage(product.mainImage)).placeholder
        : undefined,
    })),
  );

  return (
    <div className="font-quicksand min-h-screen bg-gray-100/20 p-8 dark:bg-gray-700">
      <h1 className="mb-8 text-3xl font-bold">Our Products</h1>
      <div className="grid grid-cols-1 gap-8 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
        {productsWithPlaceholders.map((product) => (
          <Link
            href={`/shop/${product.id}`}
            key={product.id}
            className="group transition-transform hover:scale-[1.02]"
          >
            <div className="flex flex-col gap-3 rounded-lg">
              {product.mainImage && (
                <div className="aspect-w-1 aspect-h-1 relative h-40 overflow-hidden rounded-xl">
                  <Image
                    src={product.mainImage}
                    alt={product.name}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    quality={85}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={product.placeholder}
                    className="object-contain mix-blend-darken transition-opacity group-hover:opacity-90"
                    fill
                    unoptimized={!product.mainImage.startsWith("/")}
                  />
                </div>
              )}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="truncate font-semibold">{product.name}</h2>
                  <div className="flex items-center gap-1">
                    <LuStar className="h-4 w-4 text-black" />
                    <span className="text-sm font-semibold">
                      {product.rating}
                    </span>
                  </div>
                </div>

                <p className="text-sm font-semibold">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
