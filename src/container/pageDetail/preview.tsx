"use client";

import { PageContent } from "./content";
import { PageIdType } from "klabban-commerce";
import { signIn, useSession } from "klabban-commerce/auth";
import { usePageQuery } from "klabban-commerce/queryHooks";
import {
  redirect,
  useParams,
  useSearchParams,
  usePathname,
} from "next/navigation";

export function PreviewPage({
  slug,
  isEnabled,
}: {
  slug: string;
  isEnabled: boolean;
}) {
  const path = usePathname();
  const searchParams = useSearchParams();
  const paramsString = searchParams.toString();
  const { status } = useSession();
  const { data } = usePageQuery({
    variables: {
      id: slug,
      idType: Number.isNaN(Number(slug))
        ? PageIdType.Uri
        : PageIdType.DatabaseId,
    },
    fetchPolicy: "network-only",
  });
  if (!searchParams.get("preview") && !isEnabled) return null;
  if (searchParams.get("preview") === "true" && status === "unauthenticated") {
    signIn();
  }
  if (searchParams.get("preview") === "true" && !isEnabled) {
    redirect(
      `/api/draft-mode/enable?redirect=${path}${
        paramsString ? `?${paramsString}` : ""
      }`
    );
  }

  // if (status === "unauthenticated") return <div></div>;
  return <PageContent page={data?.page} />;
}
