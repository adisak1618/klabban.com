"use client";
import { signIn, useSession } from "klabban-commerce/auth";

export function PreviewPost({ slug }: { slug: string }) {
  const { status } = useSession();
  if (status === "unauthenticated") {
    signIn();
  }

  // refresh page on refocus
  // const refreshPageOnRefocusTab = () => {
  //   window && window.location.reload();
  // };
  // useEffect(() => {
  //   addEventListener("focus", refreshPageOnRefocusTab);
  //   return () => {
  //     removeEventListener("focus", refreshPageOnRefocusTab);
  //   };
  // });

  return <></>;
}
