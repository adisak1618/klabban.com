"use client";
import { useViewer } from "klabban-commerce/react";
import { useSession, signIn, signOut } from "klabban-commerce/auth";

export default function Home() {
  const { data, status } = useSession();
  const [{ data: viewer }] = useViewer({});

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
