import "server-only";

import { ProductDetails } from "@/components/product-details";
import { SimilarProducts } from "@/components/similar-products";
import { getProductAndSimilarProducts } from "@/lib/db/product";
import { getPlaceholderImage } from "@/utils/images";
import Image from "next/image";
import { notFound } from "next/navigation";

type tParams = Promise<{ slug: string }>;

export default async function ProductPage({ params }: { params: tParams }) {
  const { slug } = await params;
  const { product, similarProducts } = await getProductAndSimilarProducts({
    productId: slug,
  });

  if (!product) return notFound();

  const imageUrl = product.mainImage || "/placeholder-image.jpg";
  const blurDataUrl = await getPlaceholderImage(imageUrl);

  return (
    <main className="font-quicksand container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg dark:bg-gray-200">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-contain mix-blend-darken transition-opacity group-hover:opacity-90 dark:mix-blend-multiply"
            placeholder="blur"
            blurDataURL={blurDataUrl.placeholder}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <ProductDetails product={product} />
      </div>

      <SimilarProducts similarProducts={similarProducts} />
    </main>
  );
}
