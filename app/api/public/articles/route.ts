import { db } from "@/db/client";
import { articles, authors, tags } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const articlesList = await db.select({
      article: articles,
      author: authors,
      tag: tags,
    }).from(articles)
    .leftJoin(authors, eq(articles.authorId, authors.id))
    .leftJoin(tags, eq(articles.tagId, tags.id));

    return NextResponse.json({ success: true, articles: articlesList });
  } catch (error) {
    console.error("Error inserting article:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
