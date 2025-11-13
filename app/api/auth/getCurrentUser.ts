// import { getServerSession } from "next-auth";
// import { authOptions } from "./[...nextauth]/route";
// import { CurrentUser,  } from "@/app/utils/interfaces";

// export async function getCurrentUser( requireAuth = true ): Promise<CurrentUser | null> {
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.id) {
//     if (requireAuth) throw new Error("Unauthorized");
//     return null;
//   }

//   return session.user ;
// }


import { getServerSession } from "next-auth";
import { authOptions } from "./[...nextauth]/route";
import { NextResponse } from "next/server";
import type { Session } from "next-auth";
import { CurrentUser } from "@/app/utils/interfaces";

export type GetCurrentUserResult ={ user: CurrentUser | null; response: NextResponse | null }; 

export async function getCurrentUser( requireAuth = true ): Promise<GetCurrentUserResult> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return {
      user: null,
      response: NextResponse.json(
        { success: false, message: "User not authenticated." },
        { status: 400 }
      )
    };
  }

  return { user: session.user, response: null };
}

export async function getAdmin( requireAuth = true ): Promise<GetCurrentUserResult> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || session?.user?.roleId !== 1) {
    return {
      user: null,
      response: NextResponse.json(
        { success: false, message: "User not authoriseed for this action." },
        { status: 400 }
      )
    };
  }

  return { user: session.user, response: null };
}