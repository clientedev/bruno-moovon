import { pgTable, text, serial, timestamp, integer, boolean } from "drizzle-orm/pg-core";

export const albumsTable = pgTable("albums", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  coverImage: text("cover_image"),
  orderIndex: integer("order_index").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Album = typeof albumsTable.$inferSelect;
export type InsertAlbum = typeof albumsTable.$inferInsert;

export const albumMediaTable = pgTable("album_media", {
  id: serial("id").primaryKey(),
  albumId: integer("album_id").notNull().references(() => albumsTable.id, { onDelete: "cascade" }),
  type: text("type").notNull(), // 'image' | 'video'
  data: text("data").notNull(),   // base64 for images, URL for videos
  caption: text("caption"),
  orderIndex: integer("order_index").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type AlbumMedia = typeof albumMediaTable.$inferSelect;
export type InsertAlbumMedia = typeof albumMediaTable.$inferInsert;

export const heroImagesTable = pgTable("hero_images", {
  id: serial("id").primaryKey(),
  data: text("data").notNull(),  // base64 data URL
  label: text("label"),
  orderIndex: integer("order_index").default(0).notNull(),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type HeroImage = typeof heroImagesTable.$inferSelect;
export type InsertHeroImage = typeof heroImagesTable.$inferInsert;

export const solutionsTable = pgTable("solutions", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  icon: text("icon").default("Shield").notNull(),
  title: text("title").notNull(),
  desc: text("desc").notNull(),
  fullDesc: text("full_desc").notNull(),
  image: text("image").notNull(),
  benefits: text("benefits").array().default([]).notNull(),
  active: boolean("active").default(true).notNull(),
  orderIndex: integer("order_index").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type SolutionRow = typeof solutionsTable.$inferSelect;
export type InsertSolution = typeof solutionsTable.$inferInsert;

export const testimonialsTable = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  author: text("author").notNull(),
  role: text("role").notNull(),
  initials: text("initials").notNull(),
  active: boolean("active").default(true).notNull(),
  orderIndex: integer("order_index").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Testimonial = typeof testimonialsTable.$inferSelect;
export type InsertTestimonial = typeof testimonialsTable.$inferInsert;
