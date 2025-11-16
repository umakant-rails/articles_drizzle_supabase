import { db } from "@/db/client";
import { articles } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/api/auth/getCurrentUser";


export async function GET(request: Request, context : { params: { id: string } }) {
  try {
    const {user, response} = await getCurrentUser();
    if(response) return response;

    const { id } = await context.params;
    const articleId = await Number(id);
    const userId = user?.id as number;
    let result = null;
    console.log(userId)
    if(user?.roleId === 1){
      result = await db.select()
        .from(articles)
        .where(eq(articles.id, articleId));
    } else {
      result = await db.select()
        .from(articles)
        .where(and(
          eq(articles.id, articleId),
          eq(articles.userId, userId)
        ));
    }
   
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

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const {user, response} = await getCurrentUser();
    if(response) return response;

    const { id } = await context.params;
    const articleId = await Number(id);
    const body = await request.json();
    const { authorId, tagId, title, content } = body;
    const userId = user?.id as number;
    let updatedArticle = null;

    if (!articleId) {
      return NextResponse.json(
        { success: false, message: "Invalid article Id." },
        { status: 400 }
      );
    }
    if(user?.roleId === 1){
      updatedArticle = await db
        .update(articles)
        .set({ authorId, tagId, title, content })
        .where(eq(articles.id, articleId))
        .returning();
    } else {
      updatedArticle = await db
        .update(articles)
        .set({ authorId, tagId, title, content })
        .where(and(
          eq(articles.id, articleId),
          eq(articles.userId, userId)
        ))
    }

    return NextResponse.json({ success: true, author: updatedArticle[0] });

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
    const {user, response} = await getCurrentUser();
    if(response) return response;

    const { id } = await context.params;
    const articleId = Number(id);
    const userId = user?.id as number;
    let deletedArticle = null;

    if(user?.roleId === 1){
      deletedArticle = await db
        .delete(articles)
        .where(eq(articles.id, articleId))
        .returning();
      } else {
        deletedArticle = await db
        .delete(articles)
        .where(and(
          eq(articles.id, articleId),
          eq(articles.userId, userId)
        )).returning();
      }

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
    console.error("Error deleting article:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}