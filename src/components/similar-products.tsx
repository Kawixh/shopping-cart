import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/db/schema";
import { getPlaceholderImage } from "@/utils/images";
import Image from "next/image";
import Link from "next/link";

interface SimilarProductsProps {
  similarProducts: Product[];
}

const ImageWithPlaceholder = async ({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) => {
  const { placeholder } = await getPlaceholderImage(src);

  return (
    <div className="aspect-w-1 aspect-h-1 relative h-40 overflow-hidden rounded-xl dark:bg-gray-200">
      <Image
        src={src}
        alt={alt}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        quality={85}
        loading="lazy"
        placeholder="blur"
        blurDataURL={placeholder}
        className="object-contain mix-blend-darken transition-opacity group-hover:opacity-90 dark:mix-blend-multiply"
        fill
        unoptimized={!src.startsWith("/")}
      />
    </div>
  );
};

export function SimilarProducts({ similarProducts }: SimilarProductsProps) {
  return (
    <div className="mt-12">
      <h2 className="mb-4 text-2xl font-semibold">Similar Products</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {similarProducts.map((similarProduct) => (
          <div className="group relative" key={similarProduct.id}>
            <div className="absolute h-full w-full rounded-lg bg-black transition-opacity duration-300 group-hover:opacity-100 dark:bg-red-500"></div>

            <Link href={`/shop/${similarProduct.id}`}>
              <Card className="relative z-10 flex h-full flex-col gap-3 p-2 transition-all duration-300 group-hover:-translate-x-2 group-hover:-translate-y-2 group-hover:shadow-[6px_6px_10px_rgba(0,0,0,0.3)]">
                <CardContent className="m-0 p-0">
                  <ImageWithPlaceholder
                    src={similarProduct.mainImage || ""}
                    alt={similarProduct.name}
                  />
                </CardContent>

                <CardHeader className="m-0 p-0">
                  <CardTitle className="m-0 flex flex-col gap-1 p-0 text-sm font-semibold">
                    {similarProduct.name}
                    <span className="text-sm text-gray-500">
                      ${similarProduct.price}
                    </span>
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
