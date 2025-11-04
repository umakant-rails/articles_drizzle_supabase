import { NextResponse } from "next/server";
import { db } from "@/db/client";
import { authors } from "@/db/schema";
import { authorsRelations } from "@/db/relations";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const authorsList = await db.select().from(authors);

    return NextResponse.json({ success: true, authors: authorsList });
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
    const { name, biography } = body;

    const newAuthor = await db
      .insert(authors)
      .values({ name, biography })
      .returning();

    return NextResponse.json({ success: true, author: newAuthor[0] });
  } catch (error) {
    console.error("Error inserting article:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}