import { db } from "@/db/client";
import { users } from "@/db/schema";
import { hash } from "bcrypt";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, email, roleId, password } = body;

    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);;
    if (existingUser.length > 0) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    const hashed = await hash(password, 10);
    const [registeredUser] = await db.insert(users).values({ username, email, roleId, password: hashed }).returning();;
    return NextResponse.json({ success: true, registeredUser });
  } catch (err) {
    return NextResponse.json({ error: "Failed to register user" }, { status: 500 });
  }
}

