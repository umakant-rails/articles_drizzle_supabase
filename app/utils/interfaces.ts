import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { articles, authors, tags, users } from "@/db/schema";
export interface Request { method: string; url: string; }

export type RegisterForm = {
  email: string;
  username: string;
  password: string;
  roleId: number;
  confirm_password: string;
};

export type RegisterErrors = {
  username?: string;
  email?: string;
  password?: string;
  confirm_password?: string;
};

export type LoginForm = {email: string, password: string}

export type CurrentUser = {id:number, email:string, username: string, roleId: number}
export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
export type UpdateUser = {id: number, form: FormData | Partial<NewUser>;}

export type Article = InferSelectModel<typeof articles>;
export type NewArticle = InferInsertModel<typeof articles>;
export type UpdateArticle = {
  id: number, 
  // authorId: number, 
  // userId: number,
  // tagId?: number | null,
  form: Partial<NewArticle>;
}

export type Tag = InferSelectModel<typeof tags>;
export type NewTag = InferInsertModel<typeof tags>;
export type UpdateTag = {id: number, form: FormData | Partial<NewTag>;}

export type Author = InferSelectModel<typeof authors>;
export type NewAuthor = InferInsertModel<typeof authors>;
export type UpdateAuthor = {id: number, form: FormData | Partial<NewAuthor>;}