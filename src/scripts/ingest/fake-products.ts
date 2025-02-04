import { db } from "@/db";
import { products, productSources } from "@/db/schema/products";
import * as dotenv from "dotenv";

interface FakeProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface IngestOptions {
  limit?: number;
}

async function fetchFakeProducts(): Promise<FakeProduct[]> {
  const response = await fetch("https://fakestoreapi.com/products");
  if (!response.ok) throw new Error("Failed to fetch fake products");
  return response.json();
}

export async function ingestFakeProducts({ limit = 20 }: IngestOptions = {}) {
  try {
    console.log("Fetching fake products...");
    const fakeProducts = await fetchFakeProducts();

    for (const item of fakeProducts.slice(0, limit)) {
      const productId = `fake_${item.id}`;

      // Insert or update product FIRST
      await db
        .insert(products)
        .values({
          id: productId,
          name: item.title,
          description: item.description,
          price: item.price,
          currency: "USD",
          mainImage: item.image,
          thumbnailImage: item.image,
          images: [item.image],
          category: item.category,
          rating: item.rating.rate,
          reviewCount: item.rating.count,
          inStock: true,
          metadata: {
            source: "fake_store",
            original_id: item.id,
          },
        })
        .onConflictDoUpdate({
          target: products.id,
          set: {
            price: item.price,
            rating: item.rating.rate,
            reviewCount: item.rating.count,
          },
        });

      // THEN insert or update product source
      await db
        .insert(productSources)
        .values({
          id: productId,
          productId: productId,
          source: "fake_store",
          sourceId: item.id.toString(),
          ingestedAt: new Date(),
          lastUpdatedAt: new Date(),
          rawData: item as unknown as Record<string, unknown>,
        })
        .onConflictDoUpdate({
          target: productSources.id,
          set: {
            lastUpdatedAt: new Date(),
            rawData: item as unknown as Record<string, unknown>,
          },
        });

      console.log(`Processed product: ${item.title}`);
    }

    console.log("Fake products ingestion completed successfully!");
  } catch (error) {
    console.error("Error during fake products ingestion:", error);
    throw error;
  }
}

// Only run if this file is being executed directly
if (require.main === module) {
  dotenv.config({ path: ".env.local" });
  ingestFakeProducts();
}
