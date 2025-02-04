import { relations } from "drizzle-orm";
import {
  boolean,
  json,
  pgEnum,
  pgTableCreator,
  real,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `shopping_cart_${name}`);

// Enums
export const productSourceEnum = pgEnum("product_source", [
  "etsy",
  "fake_store",
  "bestbuy",
]);

// Tables
export const products = createTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: real("price").notNull(),
  currency: varchar("currency", { length: 3 }).default("USD").notNull(),
  mainImage: text("main_image"),
  thumbnailImage: text("thumbnail_image"),
  images: json("images").$type<string[]>().default([]),
  category: text("category"),
  rating: real("rating").default(0),
  reviewCount: real("review_count").default(0),
  inStock: boolean("in_stock").default(true),
  metadata: json("metadata").$type<Record<string, unknown>>().default({}),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const productSources = createTable("product_sources", {
  id: text("id").primaryKey(),
  productId: text("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  source: productSourceEnum("source").notNull(),
  sourceId: text("source_id").notNull(),
  ingestedAt: timestamp("ingested_at").defaultNow().notNull(),
  lastUpdatedAt: timestamp("last_updated_at").defaultNow().notNull(),
  rawData: json("raw_data").$type<Record<string, unknown>>().notNull(),
});

// Relations
export const productRelations = relations(products, ({ many }) => ({
  sources: many(productSources),
}));

export const productSourceRelations = relations(productSources, ({ one }) => ({
  product: one(products, {
    fields: [productSources.productId],
    references: [products.id],
  }),
}));

// Types
export type Product = typeof products.$inferSelect;
export type ProductSource = typeof productSources.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;
export type InsertProductSource = typeof productSources.$inferInsert;
