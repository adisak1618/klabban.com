"use client";

import { BlogContent } from "container/blogDetail/content";
import { PostIdType } from "klabban-commerce";
import { signIn, useSession } from "klabban-commerce/auth";
import { usePostQuery } from "klabban-commerce/queryHooks";
import { redirect, useSearchParams, usePathname } from "next/navigation";

export function PreviewPost({ slug }: { slug: string }) {
  const path = usePathname();
  const searchParams = useSearchParams();

  const { status } = useSession();
  const { data } = usePostQuery({
    variables: {
      id: slug,
      idType: Number.isNaN(Number(slug))
        ? PostIdType.Slug
        : PostIdType.DatabaseId,
      asPreview: true,
      includeAuthor: false,
      includeCategories: false,
      includeNextPreviousPost: false,
      includeTags: false,
    },
    fetchPolicy: "network-only",
  });
  // if (!searchParams.get("preview") && !isEnabled) return null;
  if (status === "unauthenticated") {
    signIn();
  }
  if (searchParams.get("preview") === "true" && !isEnabled) {
    redirect(`/api/draft-mode/enable?redirect=${path}`);
  }

  return <BlogContent post={data?.post} />;
}
