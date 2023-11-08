// import { initRequestClient } from "klabban-commerce";
// import { KlabbanConfig } from "libs/klabbanConfig";
// import { PageCustomUiDocument } from "../../gql/generated/index";
// import { HeroBlock } from "container/homePage/heroBlock";
// import { Slideshow } from "container/homePage/slideshow";
// import { TopCategories } from "container/homePage/TopCategories";
// import { LastestPosts } from "container/homePage/LatestPosts";
// import { EditorPickPosts } from "container/homePage/EditorPickPosts";

// export default async function Home() {
//   const client = initRequestClient(KlabbanConfig);
//   const data = await client.request(PageCustomUiDocument, {
//     id: "/",
//     preview: false,
//   });

//   return (
//     <div className="flex flex-col-reverse">
//       {data.page?.customPageUI?.parallax?.enable && (
//         <HeroBlock {...data.page?.customPageUI?.parallax} />
//       )}
//       {data.page?.customPageUI?.slideshow?.enable && (
//         <Slideshow {...data.page.customPageUI.slideshow} />
//       )}
//       {data.page && data.page.customPageUI?.topCategories?.enable && (
//         <TopCategories {...data.page.customPageUI.topCategories} />
//       )}
//       {data.page?.customPageUI?.popularPosts?.enable && (
//         <EditorPickPosts {...data.page.customPageUI.popularPosts} />
//       )}
//       {data.page?.customPageUI?.lastedPost?.enable && (
//         <LastestPosts {...data.page.customPageUI?.lastedPost} />
//       )}
//     </div>
//   );
// }

// export const revalidate = 60 * 60 * 24 * 30; // 1 month
// export const dynamic = "force-static";

import { siteName } from "config/siteConfig";
import { draftMode } from "next/headers";
import { PageIdType, pageRequest, initRequestClient } from "klabban-commerce";
import { KlabbanConfig } from "libs/klabbanConfig";
import { PageContent } from "container/pageDetail/content";
import { PreviewPage } from "container/pageDetail/preview";
import { PageCustomUiDocument } from "../../gql/generated";

async function fetchData() {
  const { isEnabled } = draftMode();
  return await pageRequest({
    ...KlabbanConfig,
    variables: {
      id: "/",
      idType: Number.isNaN(Number("/"))
        ? PageIdType.Uri
        : PageIdType.DatabaseId,
      asPreview: isEnabled ? true : false,
    },
  });
}

export async function generateMetadata() {
  const { page } = await fetchData();

  return {
    title: `${siteName} | ${page?.title}`,
    description: page?.content
      ?.substring(0, 500)
      ?.replaceAll(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>|\s/g, ""),
    siteName,
    url: `${process.env.BASE_URL}/${page?.slug}`,
    images: [page?.featuredImage?.node.medium_large],
    locale: "th_TH",
    type: "website",
  };
}

async function Page() {
  const { isEnabled } = draftMode();
  const { page } = await fetchData();
  const client = initRequestClient(KlabbanConfig);
  const data = await client.request(PageCustomUiDocument, {
    id: "/",
    preview: isEnabled ? true : false,
    idType: PageIdType.Uri,
  });
  return (
    <>
      {isEnabled && <PreviewPage slug="/" isEnabled={isEnabled} />}

      {!isEnabled && <PageContent page={page} pageCustomUI={data.page} />}
    </>
  );
}

export default Page;
export const revalidate = 60 * 60 * 24 * 30; // 1 month
export const dynamic = "force-static";
