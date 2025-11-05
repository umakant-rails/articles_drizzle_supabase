import { db } from "@/db/client";
import { articles } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const articlesList = await db.select().from(articles);

    return NextResponse.json({ success: true, articles: articlesList });
  } catch (error) {
    console.error("Error inserting article:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export type NewArticle = {
  title: string;
  content?: string | null;
  authorId: number;
  tagId: number;
  userId?: number | null;
};

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

// export async function POST(request: Response) {
//   try {
//     const body = await request.json();
//     const { name } = body;

//     // ✅ Insert article with Drizzle ORM
//     const newTag = await db
//       .insert(tags)
//       .values({ name })
//       .returning();

//     return NextResponse.json({ success: true, tag: newTag[0] });
//   } catch (error) {
//     console.error("Error inserting article:", error);
//     return NextResponse.json(
//       { success: false, error: (error as Error).message },
//       { status: 500 }
//     );
//   }
// }