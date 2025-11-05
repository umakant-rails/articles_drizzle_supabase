import { db } from "@/db/client";
import { articles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request, context : { params: { id: string } }) {
  try {
    const { id } = await context.params;
    const articleId = await Number(id);
    const result = await db.select().from(articles).where(eq(articles.id, articleId));

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, message: "Article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, article: result[0] });
  } catch (error) {
    console.error("Error fetching author:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const articleId = await Number(id);
    const body = await request.json();
    const { authorId, tagId, title, content } = body;
    console.log("&&&&&&&&&&&&7", body)

    if (!articleId) {
      return NextResponse.json(
        { success: false, message: "Invalid author ID" },
        { status: 400 }
      );
    }

    const updatedAuthor = await db
      .update(articles)
      .set({ authorId, tagId, title, content }) // fields to update
      .where(eq(articles.id, articleId)) // condition
      .returning();

    return NextResponse.json({ success: true, author: updatedAuthor[0] });

  } catch (error) {
    console.error("Error inserting article:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}


export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const articleId = Number(id);

    const deletedArticle = await db
      .delete(articles)
      .where(eq(articles.id, articleId))
      .returning();

    if (deletedArticle.length === 0) {
      return NextResponse.json(
        { success: false, message: "Article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Article deleted successfully",
      author: deletedArticle[0],
    });
  } catch (error) {
    console.error("Error deleting author:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}