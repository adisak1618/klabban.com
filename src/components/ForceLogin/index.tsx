"use client";
import { signIn, useSession } from "klabban-commerce/auth";
import { useEffect } from "react";

export function FourceLogin() {
  const { status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
  }, [status]);

  return <></>;
}
