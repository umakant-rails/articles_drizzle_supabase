import { relations } from "drizzle-orm/relations";
import { authors, articles, tags, users } from "./schema";

export const articlesRelations = relations(articles, ({one}) => ({
	author: one(authors, {
		fields: [articles.author_id],
		references: [authors.id]
	}),
	tag: one(tags, {
		fields: [articles.tag_id],
		references: [tags.id]
	}),
	user: one(users, {
		fields: [articles.user_id],
		references: [users.id]
	}),
}));

export const authorsRelations = relations(authors, ({many}) => ({
	articles: many(articles),
}));

export const tagsRelations = relations(tags, ({many}) => ({
	articles: many(articles),
}));

export const usersRelations = relations(users, ({many}) => ({
	articles: many(articles),
}));