"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export function RedirectPreviewUrl() {
  const router = useRouter();

  const path = usePathname();

  const havePostIdParams = useSearchParams().get("p");
  const havePageIdParams = useSearchParams().get("page_id");
  const havePreviewParams = useSearchParams().get("preview");
  const allParams = useSearchParams().toString();
  useEffect(() => {
    if (path === "/" && havePostIdParams && havePreviewParams) {
      router.replace(
        `/api/draft-mode/enable?redirect=/preview/blog/${havePostIdParams}`
      );
    }
    if (path === "/" && havePageIdParams && havePreviewParams) {
      router.replace(
        `/api/draft-mode/enable?redirect=/preview/page/${havePageIdParams}`
      );
    }
  }, [
    havePostIdParams,
    havePageIdParams,
    havePreviewParams,
    allParams,
    path,
    router,
  ]);
  return <></>;
}
