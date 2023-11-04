"use client";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import {} from "./api/auth/[...nextauth]/route";
import { useEffect } from "react";
import { useViewer } from "klabban-commerce/react";

export default function Home() {
  const { data, status } = useSession();
  // const tryGetSession = async () => {
  //   const session = await getSession();
  //   console.log("tryGetSession", session);
  // };
  const [{ data: viewer }] = useViewer({});

  // useEffect(() => {
  //   tryGetSession();
  // }, []);

  if (!data) {
    return <button onClick={() => signIn()}>login</button>;
  }

  return (
    <div>
      <p>Hello, {viewer?.viewer?.email}</p>
      <p>status: {status}</p>
      <p>{JSON.stringify(data)}</p>

      <button onClick={() => signOut()}>logout</button>
    </div>
  );
}
