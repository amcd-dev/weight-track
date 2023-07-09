import '@/styles/globals.css'
import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import TopNav from "@/components/nav/topNav";

export default function App({ Component, pageProps }) {
  return (
      <UserProvider>
          <TopNav />
          <Component {...pageProps} />
      </UserProvider>
  );
}