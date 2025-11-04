import { NextResponse } from "next/server";
import { db } from "@/db/client";
import { tags } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: Response, { params }: { params: { id: string } }) {
  try {
    const tagId = Number(params.id);
    const result = await db.select().from(tags).where(eq(tags.id, tagId));

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, message: "Tag not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, tag: result[0] });
  } catch (error) {
    console.error("Error fetching tag:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const tagId = await Number(id);
    const body = await request.json();
    const { name } = body;

    if (!tagId) {
      return NextResponse.json(
        { success: false, message: "Invalid tag ID" },
        { status: 400 }
      );
    }

    const updatedTag = await db
      .update(tags)
      .set({ name }) // fields to update
      .where(eq(tags.id, tagId)) // condition
      .returning();

    return NextResponse.json({ success: true, tag: updatedTag[0] });

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
    const tagId = Number(id);
    console.log(tagId, "================================")

    if (isNaN(tagId)) {
      return NextResponse.json(
        { success: false, message: "Invalid tag ID" },
        { status: 400 }
      );
    }

    const deletedTag = await db
      .delete(tags)
      .where(eq(tags.id, tagId))
      .returning();

    if (deletedTag.length === 0) {
      return NextResponse.json(
        { success: false, message: "Tag not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Tag deleted successfully",
      tag: deletedTag[0],
    });
  } catch (error) {
    console.error("Error deleting tag:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
