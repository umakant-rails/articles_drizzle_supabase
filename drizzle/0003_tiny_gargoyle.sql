ALTER TABLE "articles" DROP CONSTRAINT "articles_author_id_authors_id_fk";
--> statement-breakpoint
ALTER TABLE "articles" DROP CONSTRAINT "articles_tag_id_tags_id_fk";
--> statement-breakpoint
ALTER TABLE "articles" ALTER COLUMN "title" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "articles" ALTER COLUMN "author_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "articles" ALTER COLUMN "tag_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "articles" ALTER COLUMN "user_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE set null ON UPDATE no action;