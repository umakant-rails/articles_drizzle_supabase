import { NextResponse } from "next/server";
import { db } from "@/db/client";
import { authors } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getAdmin } from "@/app/api/auth/getCurrentUser";

export async function GET(request: Response, { params }: { params: { id: string } }) {
  try {
    const authorId = Number(params.id);
    const result = await db.select().from(authors).where(eq(authors.id, authorId));

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, message: "Author not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, author: result[0] });
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
    const {user, response} = await getAdmin();
    if(response) return response;

    const { id } = await context.params;
    const authorId = await Number(id);
    const body = await request.json();
    const { name } = body;

    if (!authorId) {
      return NextResponse.json(
        { success: false, message: "Invalid author ID" },
        { status: 400 }
      );
    }

    const updatedAuthor = await db
      .update(authors)
      .set({ name }) // fields to update
      .where(eq(authors.id, authorId)) // condition
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
    const {user, response} = await getAdmin();
    if(response) return response;
    
    const { id } = await context.params;
    const authorId = Number(id);

    if (isNaN(authorId)) {
      return NextResponse.json(
        { success: false, message: "Invalid author ID" },
        { status: 400 }
      );
    }

    const deletedAuthor = await db
      .delete(authors)
      .where(eq(authors.id, authorId))
      .returning();

    if (deletedAuthor.length === 0) {
      return NextResponse.json(
        { success: false, message: "Author not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Author deleted successfully",
      author: deletedAuthor[0],
    });
  } catch (error) {
    console.error("Error deleting author:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
