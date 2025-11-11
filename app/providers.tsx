'use client';

import { store } from "@/store";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

interface ProvidersProps {
  children: React.ReactNode;
  session: Session | null;
}

export function Providers({ children, session }: ProvidersProps) {
  return (
    <Provider store={store}>
       <SessionProvider session={session}>{children}</SessionProvider>
    </Provider>
  );
}