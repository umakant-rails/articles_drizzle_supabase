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

export async function POST(request: Request) {
  try {
    let body = await request.json();
    const {title, content, authorId, tagId, userId} = body;
   
    if (!title || !authorId || !tagId) {
      return NextResponse.json(
        { success: false, message: "title, authorId and tagId are required" },
        { status: 400 }
      );
    }

    const [newArticle] = await db
      .insert(articles)
      .values({title, content, authorId, tagId, userId})
      .returning();

    return NextResponse.json({ success: true, article: newArticle });
  } catch (error) {
    console.error("Error inserting article:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
