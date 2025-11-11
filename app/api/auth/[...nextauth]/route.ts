import { db } from "@/db/client";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { compare } from "bcrypt";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { User } from "next-auth";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials: any) {
//         if (!credentials?.email || !credentials.password) return null;
//         // const user = await db.query.users.findFirst({
//         //   where: eq(users.email, credentials.email),
//         // });
//         const result = await db.select().from(users).where(eq(users.email, credentials.email));
//         const user = result[0];
//         if (!user) return null;

//         const valid = await compare(credentials.password, user.password);
//         if (!valid) return null;

//         return { id: String(user.id), email: user.email, username: user.username, roleId: user.roleId };
//       },
//     }),
//   ],
//   session: { strategy: "jwt" },
//   pages: { signIn: "/login" },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };



// import NextAuth, { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { db } from "@/db/client";
// import { users } from "@/db/schema";
// import { eq } from "drizzle-orm";
// import bcrypt from "bcrypt";

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
export { handler as GET, handler as POST };






// import NextAuth, { NextAuthOptions, DefaultSession } from "next-auth";
// import CredentialsProvider from 'next-auth/providers/credentials';
// import axiosObj from '@/services/AxoisService';
// import { db } from "@/db/client";
// import { users } from "@/db/schema";
// import { compare } from "bcrypt";
// import { env } from "process";

// interface User {
//   id: string | number;
//   username?: string | null;
//   email?: string | null;
//   role_id?: number;
// }

// declare module "next-auth" {
//   interface Session {
//     jwt?: string;
//     user: {
//       email: string;
//       username: string;
//       role_id: number;
//     } & DefaultSession["user"];
//   }

//   interface User {
//     email: string;
//     username: string;
//     role_id: number;
//     token: string;
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     jwt?: string;
//     email?: string;
//     username?: string;
//     role_id?: number;
//   }
// }

// // ✅ Strongly type your NextAuth options
// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         try {
//           if (!credentials?.email || !credentials?.password) {
//             throw new Error("Email and password are required");
//           }

//           const result = await db.select().from(users).where(eq(users.email, credentials.email));
//           const user = result[0];
//           if (!user) return null;

//           const valid = await compare(credentials.password, user.password);
//           if (!valid) return null;

//           return { 
//             id: String(user.id), 
//             email: user.email, 
//             username: user.username, 
//             roleId: user.roleId,
//             token: process.env.NEXTAUTH_SECRET, 
//           };
          
//           // try {
//           //   const response = await axiosObj.post("/users/login", {
//           //     user: {
//           //       email: credentials.email,
//           //       password: credentials.password,
//           //     },
//           //   });

//           //   const user = response.data?.user;
//           //   const authHeader = response.headers?.authorization;
//           //   const token = authHeader ? authHeader.split(" ")[1] : null;

//           //   if (!user || !token) {
//           //     throw new Error("Invalid login response");
//           //   }

//           //   // Must return a plain object with basic serializable fields
//           //   return {
//           //     id: user.id,
//           //     email: user.email,
//           //     username: user.username,
//           //     role_id: user.role_id,
//           //     token, // Attach token for jwt callback
//           //   };
//         } catch (error) {
//           console.error("❌ Auth error:", error.response?.data || error.message);
//           // You can throw an Error to pass a message to NextAuth error page
//           throw new Error("Invalid email or password");
//         }
//       }
//     }),
//   ],

//   session: {
//     strategy: "jwt",
//     maxAge: 24 * 60 * 60, // 1 day
//   },

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.jwt = (user as any).token;
//         token.email = user.email;
//         token.username = (user as any).username;
//         token.role_id = (user as any).role_id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       // Extend session object
//       (session as any).jwt = token.jwt;
//       session.user = {
//         email: token.email as string,
//         username: token.username as string,
//         role_id: token.role_id as number,
//       } as any;
//       return session;
//     },
//   },

//   pages: {
//     signIn: "/auth/login",
//   },

//   secret: process.env.NEXTAUTH_SECRET,
// };

// // ✅ Export handlers correctly for App Router
// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
