import { db } from "@/db";
import { products, productSources } from "@/db/schema/products";

async function insertOrUpdateProduct({
  item,
  images,
  keyword,
}: {
  item: any;
  images: any[];
  keyword: string;
}) {
  const productId = `etsy_${item.listing_id}`;

  // Insert or update product source
  await db
    .insert(productSources)
    .values({
      id: productId,
      source: "etsy",
      sourceId: item.listing_id.toString(),
      ingestedAt: new Date(),
      lastUpdatedAt: new Date(),
      rawData: item,
    })
    .onConflictDoUpdate({
      target: productSources.id,
      set: {
        lastUpdatedAt: new Date(),
        rawData: item,
      },
    });

  // Insert or update product
  await db
    .insert(products)
    .values({
      id: productId,
      name: item.title,
      description: item.description,
      price: item.price.amount / item.price.divisor,
      currency: item.price.currency_code,
      mainImage: images[0]?.url_fullxfull || null,
      thumbnailImage: images[0]?.url_170x135 || null,
      images: images.map((img) => img.url_fullxfull),
      category: keyword,
      rating: 0,
      reviewCount: 0,
      inStock: item.quantity > 0,
      metadata: {
        source: "etsy",
        etsy_url: item.url,
        views: item.views,
        favorites: item.num_favorers,
        processing_time: {
          min: item.processing_min,
          max: item.processing_max,
        },
      },
    })
    .onConflictDoUpdate({
      target: products.id,
      set: {
        price: item.price.amount / item.price.divisor,
        inStock: item.quantity > 0,
      },
    });
}

export async function ingestEtsyProducts({
  batchSize = 50,
  totalProducts = 200,
  keywords = ["custom keyword"],
}: {
  batchSize?: number;
  totalProducts?: number;
  keywords?: string[];
}) {
  try {
    for (const keyword of keywords) {
      console.log(`Ingesting Etsy products for keyword: ${keyword}`);

      // Fetch products from Etsy API
      const response = await fetch(
        `https://openapi.etsy.com/v3/application/listings/active?keywords=${encodeURIComponent(
          keyword,
        )}&limit=${batchSize}&offset=0`,
        {
          headers: {
            "x-api-key": process.env.ETSY_API_KEY!,
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Etsy API error: ${response.statusText}`);
      }

      const data = await response.json();

      // Process each product
      for (const item of data.results) {
        // Fetch images for the product
        const imagesResponse = await fetch(
          `https://openapi.etsy.com/v3/application/listings/${item.listing_id}/images`,
          {
            headers: {
              "x-api-key": process.env.ETSY_API_KEY!,
            },
          },
        );

        if (!imagesResponse.ok) {
          console.error(
            `Failed to fetch images for listing ${item.listing_id}`,
          );
          continue;
        }

        const imagesData = await imagesResponse.json();

        // Insert or update the product
        await insertOrUpdateProduct({
          item,
          images: imagesData.results,
          keyword,
        });
      }

      console.log(
        `Completed ingesting ${data.results.length} products for keyword: ${keyword}`,
      );
    }
  } catch (error) {
    console.error("Error ingesting Etsy products:", error);
    throw error;
  }
}
