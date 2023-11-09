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
import { PageCustomUiQuery, PageCustomUiDocument } from "../../gql/generated";
import { useQuery } from "klabban-commerce/react";

export function PreviewPage({ slug }: { slug: string }) {
  // const path = usePathname();
  // const searchParams = useSearchParams();
  // const paramsString = searchParams.toString();
  const { status } = useSession();
  const { data, loading } = usePageQuery({
    variables: {
      id: slug,
      idType: Number.isNaN(Number(slug))
        ? PageIdType.Uri
        : PageIdType.DatabaseId,
      asPreview: true,
    },
    fetchPolicy: "network-only",
  });

  const { data: customPageUIData, loading: loadingCustomData } = useQuery(
    PageCustomUiDocument,
    {
      variables: {
        id: slug,
        preview: false,
        idType: Number.isNaN(Number(slug))
          ? PageIdType.Uri
          : PageIdType.DatabaseId,
      },
      fetchPolicy: "network-only",
      canonizeResults: true,
    }
  );

  // if (!searchParams.get("preview")) return null;
  if (status === "unauthenticated") {
    signIn();
  }
  // if (searchParams.get("preview") === "true" && !isEnabled) {
  //   redirect(
  //     `/api/draft-mode/enable?redirect=${path}${
  //       paramsString ? `?${paramsString}` : ""
  //     }`
  //   );
  // }

  // if (status === "unauthenticated") return <div></div>;
  return (
    <>
      {!loading && !loadingCustomData && (
        <PageContent page={data?.page} pageCustomUI={customPageUIData?.page} />
      )}
    </>
  );
  return <div>Preivew</div>;
}
