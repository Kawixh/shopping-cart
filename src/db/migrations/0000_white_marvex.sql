CREATE TYPE "public"."product_source" AS ENUM('etsy', 'fake_store', 'bestbuy');--> statement-breakpoint
CREATE TABLE "shopping_cart_product_sources" (
	"id" text PRIMARY KEY NOT NULL,
	"product_id" text NOT NULL,
	"source" "product_source" NOT NULL,
	"source_id" text NOT NULL,
	"ingested_at" timestamp DEFAULT now() NOT NULL,
	"last_updated_at" timestamp DEFAULT now() NOT NULL,
	"raw_data" json NOT NULL
);
--> statement-breakpoint
CREATE TABLE "shopping_cart_products" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"price" real NOT NULL,
	"currency" varchar(3) DEFAULT 'USD' NOT NULL,
	"main_image" text,
	"thumbnail_image" text,
	"images" json DEFAULT '[]'::json,
	"category" text,
	"rating" real DEFAULT 0,
	"review_count" real DEFAULT 0,
	"in_stock" boolean DEFAULT true,
	"metadata" json DEFAULT '{}'::json,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "shopping_cart_product_sources" ADD CONSTRAINT "shopping_cart_product_sources_product_id_shopping_cart_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."shopping_cart_products"("id") ON DELETE cascade ON UPDATE no action;