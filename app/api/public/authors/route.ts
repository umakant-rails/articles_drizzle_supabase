import { db } from "@/db/client";
import { authors } from "@/db/schema";
import { NextResponse } from "next/server";

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
