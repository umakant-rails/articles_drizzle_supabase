import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { articles, authors, tags, users } from "@/db/schema";
export interface Request { method: string; url: string; }

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
export type UpdateUser = Partial<NewUser> & { id: number };

export type Article = InferSelectModel<typeof articles>;
export type NewArticle = InferInsertModel<typeof articles>;
export type UpdateArticle = Partial<NewArticle> & { id: number };

export type Tag = InferSelectModel<typeof tags>;
export type NewTag = InferInsertModel<typeof tags>;
export type UpdateTag = {id: number, form: FormData | Partial<NewTag>;} //Partial<NewTag> & { id: number };

export type Author = InferSelectModel<typeof authors>;
export type NewAuthor = InferInsertModel<typeof authors>;
export type UpdateAuthor = Partial<NewAuthor> & { id: number };