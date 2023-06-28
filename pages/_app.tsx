import "./styles.css"
import { useEffect, useState } from "react";

import type { AppProps } from "next/app"
import { SessionProvider, signIn, useSession } from "next-auth/react";

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Auth>
        <Component {...pageProps} />
      </Auth>
    </SessionProvider>
  )
}

function Auth({ children }: { children: JSX.Element }) {
  const { data, status } = useSession();
  const isUser = !!data?.user;

  useEffect(() => {
    if (status !== "loading" && !isUser) {
      signIn("auth0");
    }
  }, [isUser, status]);

  if (isUser) {
    const user = data.user;
    return children;
  }

  return <div></div>;
}
