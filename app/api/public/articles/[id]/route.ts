import { db } from "@/db/client";
import { articles, authors, tags } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";


export async function GET(request: Request, context : { params: { id: string } }) {
  try {
    const { id } = await context.params;
    const articleId = await Number(id);
    const result = await db.select({
      id: articles.id,
      title: articles.title,
      content: articles.content,
      authorId: authors.id,
      authorName: authors.name,
      tagId: tags.id,
      tagName: tags.name,
    }).from(articles)
      .leftJoin(authors, eq(articles.authorId, authors.id))
      .leftJoin(tags, eq(articles.tagId, tags.id))
      .where(eq(articles.id, articleId))

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, message: "Article not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, article: result[0] });
  } catch (error) {
    console.error("Error fetching article:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}