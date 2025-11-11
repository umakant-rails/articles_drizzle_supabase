// import NextAuth from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     jwt?: string;
//     user: {
//       id: number;
//       email: string;
//       username: string;
//       roleId: number;
//     }
//   }

//   interface User {
//     id: number;
//     email: string;
//     username: string;
//     roleId: number;
//     token: string;
//     password?: string;
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     jwt?: string;
//     email: string;
//     username: string;
//     roleId: number;
//   }
// }


import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      username: string;
      email: string;
      roleId: number;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: number;
    username: string;
    email: string;
    roleId: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    username: string;
    roleId: number;
  }
}
