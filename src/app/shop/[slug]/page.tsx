import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";
import { Product, products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getProductById({
  productId,
}: {
  productId: string;
}): Promise<Product | undefined> {
  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.id, productId));

  return product;
}

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function ProductPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const product = await getProductById({ productId: slug });

  if (!product) notFound();

  const imageUrl = product.mainImage || "/placeholder-image.jpg";

  return (
    <main className="font-quicksand container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <Card className="h-fit">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-3">
                <CardTitle className="text-3xl font-semibold">
                  {product.name}
                </CardTitle>

                <span className="text-primary text-2xl font-bold">
                  ${Number(product.price).toFixed(2)}
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">Categories</span>
              <Badge variant="secondary">{product.category}</Badge>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  Stock Available
                </span>
                <Badge variant={product.inStock ? "secondary" : "destructive"}>
                  {product.inStock ? `In Stock` : "Out of stock"}
                </Badge>
              </div>

              <Button className="w-full" size="lg" disabled={!product.inStock}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
