"use client";

import React from 'react';
import {signIn, signOut, useSession} from "next-auth/react";
import {Button} from "@/components/Button";

export const Dashboard = () => {
  const { data: session } = useSession();
  return (
    <>
      { session ? (
        <>
          <img src={session.user?.image as string} alt={session.user?.name as string} className="rounded-full h-20 w-20"/>
          <h1>Welcome back! {session.user?.name}</h1>
          <Button onClick={() => signOut()}>Sign out</Button>
        </>
      ) : (
        <>
          <h1 className="text-3xl text-red-500">You're not logged in</h1>
          <Button onClick={() => signIn('github ')}>Sign in with Github</Button>
        </>
      )}
    </>
  )
}
