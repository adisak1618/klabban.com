"use client";
import { signIn, useSession } from "klabban-commerce/auth";
import { useEffect } from "react";

export function FourceLogin() {
  const { status } = useSession();

  useEffect(() => {
    console.log("status", status);
    if (status === "unauthenticated") {
      signIn();
    }
  }, [status]);

  return <></>;
}
