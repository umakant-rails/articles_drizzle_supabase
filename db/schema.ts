import { integer, pgTableCreator, serial, text, timestamp, unique } from "drizzle-orm/pg-core";

export const pgTable = pgTableCreator((name) => `${name}`);
export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    username: text("username").notNull().unique(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
  }
);

export const tags = pgTable("tags", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  name: text("name").notNull().unique(),
});

export const authors = pgTable("authors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  biography: text("biography"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
});

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content"),
  authorId: integer("author_id")
    .notNull()
    .references(() => authors.id, { onDelete: "cascade" }), // foreign key
  tagId: integer("tag_id")
    .notNull()
    .references(() => tags.id, { onDelete: "cascade" }), // foreign key
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
});
