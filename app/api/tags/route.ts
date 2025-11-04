import { NextResponse } from "next/server";
import { db } from "@/db/client";
import { tags } from "@/db/schema";
import { tagsRelations } from "@/db/relations";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const tagsList = await db.select().from(tags);

    return NextResponse.json({ success: true, tags: tagsList });
  } catch (error) {
    console.error("Error inserting article:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: Response) {
  try {
    const body = await request.json();
    const { name } = body;

    // ✅ Insert article with Drizzle ORM
    const newTag = await db
      .insert(tags)
      .values({ name })
      .returning();

    return NextResponse.json({ success: true, tag: newTag[0] });
  } catch (error) {
    console.error("Error inserting article:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}