ALTER TABLE "authors" DROP CONSTRAINT "authors_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "tags" DROP CONSTRAINT "tags_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "authors" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "tags" DROP COLUMN "user_id";