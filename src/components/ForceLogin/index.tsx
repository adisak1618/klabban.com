"use client";
import { signIn, useSession } from "klabban-commerce/auth";

export function FourceLogin() {
  const { status } = useSession();
  if (status === "unauthenticated") {
    signIn();
  }

  return <></>;
}
