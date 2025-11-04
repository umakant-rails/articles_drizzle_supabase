import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { articles, authors, tags, users } from "./schema";

export const usersRelations = relations(users, ({ many }) => ({
  articles: many(articles),
  // tags: many(tags),
  // authors: many(authors),
}));

export const articlesRelations = relations(articles, ({ one }) => ({
  author: one(authors, {
    fields: [articles.authorId],
    references: [authors.id],
  }),
  tag: one(tags, {
    fields: [articles.tagId],
    references: [tags.id],
  }),
}));

export const authorsRelations = relations(authors, ({ many }) => ({
  articles: many(articles),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  articles: many(articles),
}));