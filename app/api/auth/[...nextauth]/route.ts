import { db } from "@/db/client";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { compare } from "bcrypt";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { User } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<User | null> {
        const rows = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email))
          .limit(1);

        const user = rows[0];
        if (!user) return null;

        const valid = await compare(credentials.password, user.password);
        if (!valid) return null;

        // ✅ return required fields
        return {
          id: user.id,
          email: user.email,
          username: user.username,
          roleId: user.roleId
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as number;
        token.username = user.username;
        token.roleId = user.roleId;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as number;
        session.user.username = token.username;
        session.user.roleId = token.roleId;
        session.user.email = token.email as string;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions);
export const { auth, signIn, signOut, handlers } = handler;
export { handler as GET, handler as POST };
