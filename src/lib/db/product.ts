import "server-only";

import { db } from "@/db";
import { Product, products } from "@/db/schema";
import { and, eq, not } from "drizzle-orm";

export async function getProductAndSimilarProducts({
  productId,
}: {
  productId: string;
}): Promise<{ product: Product | undefined; similarProducts: Product[] }> {
  try {
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.id, productId));

    if (!product) {
      return { product: undefined, similarProducts: [] };
    }

    const similarProducts = await db
      .select()
      .from(products)
      .where(
        and(
          product.category
            ? eq(products.category, product.category)
            : undefined,
          not(eq(products.id, productId)),
        ),
      )
      .limit(4);

    return { product, similarProducts };
  } catch (error) {
    console.error("Error fetching product and similar products:", error);
    return { product: undefined, similarProducts: [] };
  }
}
