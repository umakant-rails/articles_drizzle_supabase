import { pgTable, unique, serial, text, timestamp, foreignKey, integer } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const authors = pgTable("authors", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	biography: text(),
	created_at: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp({ mode: 'string' }).notNull(),
}, (table) => [
	unique("authors_name_unique").on(table.name),
]);

export const tags = pgTable("tags", {
	id: serial().primaryKey().notNull(),
	created_at: timestamp({ mode: 'string' }).defaultNow().notNull(),
	name: text().notNull(),
}, (table) => [
	unique("tags_name_unique").on(table.name),
]);

export const articles = pgTable("articles", {
	id: serial().primaryKey().notNull(),
	title: text().notNull(),
	content: text(),
	author_id: integer().notNull(),
	tag_id: integer().notNull(),
	created_at: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp({ mode: 'string' }).notNull(),
	user_id: integer().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.author_id],
			foreignColumns: [authors.id],
			name: "articles_author_id_authors_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.tag_id],
			foreignColumns: [tags.id],
			name: "articles_tag_id_tags_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.user_id],
			foreignColumns: [users.id],
			name: "articles_user_id_users_id_fk"
		}).onDelete("set null"),
]);

export const users = pgTable("users", {
	id: serial().primaryKey().notNull(),
	username: text().notNull(),
	email: text().notNull(),
	password: text().notNull(),
	created_at: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp({ mode: 'string' }).notNull(),
}, (table) => [
	unique("users_username_unique").on(table.username),
	unique("users_email_unique").on(table.email),
]);
