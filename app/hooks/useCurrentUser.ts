import { useSession } from "next-auth/react";

export function useCurrentUser() {
  const { data: session, status } = useSession();

  if (status === "loading") return null;
  if (!session) return null;

  return session.user;
}
