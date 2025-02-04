import { ingestEtsyProducts } from "./etsy-products";
import { ingestFakeProducts } from "./fake-products";

async function runIngestion(name: string, fn: () => Promise<void>) {
  try {
    console.log(`\n🚀 Starting ${name} ingestion...`);
    await fn();
    console.log(`✅ ${name} ingestion completed successfully!\n`);
  } catch (error) {
    console.error(`❌ Error during ${name} ingestion:`, error);
    console.log(`Moving on to next ingestion task...\n`);
  }
}

async function main() {
  const ingestionTasks = [
    {
      name: "Fake Store",
      fn: () => ingestFakeProducts({ limit: 20 }),
    },
    {
      name: "Etsy",
      fn: () =>
        ingestEtsyProducts({
          keywords: ["handmade jewelry", "vintage clothing"],
          batchSize: 50,
          totalProducts: 200,
        }),
    },
    // Add more ingestion tasks here as needed
  ];

  for (const task of ingestionTasks) {
    await runIngestion(task.name, task.fn);
  }
}

// Only run if this file is being executed directly
if (require.main === module) {
  main().catch((error) => {
    console.error("Fatal error during ingestion:", error);
    process.exit(1);
  });
}
