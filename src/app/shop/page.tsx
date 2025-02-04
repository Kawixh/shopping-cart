import { db } from "@/db";
import { products } from "@/db/schema/products";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Shop | Your App Name",
  description: "Browse our products",
};

export default async function ShopPage() {
  const productList = await db.select().from(products);

  return (
    <div className="font-quicksand min-h-screen bg-gray-100/20 p-8">
      <h1 className="mb-8 text-3xl font-bold">Our Products</h1>
      <div className="grid grid-cols-1 gap-8 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
        {productList.map((product) => (
          <Link href={`/shop/${product.id}`} key={product.id}>
            <div key={product.id} className="flex flex-col gap-3 rounded-lg">
              {product.mainImage && (
                <div className="aspect-w-1 aspect-h-1 relative h-40">
                  <Image
                    src={product.mainImage}
                    alt={product.name}
                    className="rounded-xl object-contain mix-blend-darken"
                    fill
                  />
                </div>
              )}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="truncate font-semibold">{product.name}</h2>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-black" />
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
