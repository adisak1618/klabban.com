"use client";
import { useViewerQuery } from "klabban-commerce/queryHooks";
import { useSession, signIn, signOut } from "klabban-commerce/auth";
import { useRef } from "react";

export default function Home() {
  const { data, status } = useSession();
  const { data: viewer } = useViewerQuery({});
  const renderCounter = useRef(0);
  renderCounter.current = renderCounter.current + 1;

  if (!data) {
    return <button onClick={() => signIn()}>login</button>;
  }

  return (
    <div>
      <h1>Renders: {renderCounter.current}</h1>
      <p>Hello, {viewer?.viewer?.email}</p>
      <h1>Renders: {renderCounter.current}</h1>
      <p>status: {status}</p>
      <p>{JSON.stringify(data)}</p>

      <button onClick={() => signOut()}>logout</button>
    </div>
  );
}
