"use client";
// import Link from "next/link";
import { Switch } from "components/ui/switch";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
// import { useSession } from "klabban-commerce/auth";
// import { useEffect } from "react";

export function PreviewBox({ isEnabled }: { isEnabled: boolean }) {
  // const router = useRouter();
  const path = usePathname();

  // const havePostIdParams = useSearchParams().get("p");
  // const havePageIdParams = useSearchParams().get("page_id");
  // const havePreviewParams = useSearchParams().get("preview");
  const allParams = useSearchParams().toString();

  // useEffect(() => {
  //   if (path === "/" && havePostIdParams && havePreviewParams) {
  //     router.replace(
  //       `/api/draft-mode/enable?redirect=/blog/${havePostIdParams}?${encodeURIComponent(
  //         allParams
  //       )}`
  //     );
  //   }
  //   if (path === "/" && havePageIdParams && havePreviewParams) {
  //     router.replace(
  //       `/api/draft-mode/enable?redirect=/${havePageIdParams}${encodeURIComponent(
  //         `/?${allParams}`
  //       )}`
  //     );
  //   }
  // }, [
  //   havePostIdParams,
  //   havePageIdParams,
  //   havePreviewParams,
  //   allParams,
  //   path,
  //   router,
  // ]);

  return (
    <>
      <div className="fixed z-[9999] bottom-3 right-3 bg-secondary shadow-md border px-3 text-center py-2 rounded-md">
        <h1>preview mode</h1>
        <a
          href={
            isEnabled
              ? `/api/draft-mode/disable?redirect=${path}`
              : `/api/draft-mode/enable?redirect=${path}?${encodeURIComponent(
                  allParams
                )}`
          }
        >
          <Switch checked={isEnabled} onCheckedChange={(isChecked) => {}} />
        </a>
      </div>
    </>
  );
}
