import { siteName } from "config/siteConfig";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { PageIdType, PageProvider, initRequestClient } from "klabban-commerce";
import { KlabbanConfig } from "libs/klabbanConfig";
import { PageContent } from "container/pageDetail/content";
import { PreviewPage } from "container/pageDetail/preview";
import { PageCustomUiDocument } from "../../gql/generated";
import { MainMenu } from "components/MainMenu";

interface CustomPageParams extends PageSearchParams {
  params: {
    pageSlug: string;
  };
}

async function fetchData(slug: string) {
  return await PageProvider({
    ...KlabbanConfig,
    variables: {
      id: slug || "/",
      idType: Number.isNaN(Number(slug || "/"))
        ? PageIdType.Uri
        : PageIdType.DatabaseId,
    },
  });
}

export async function generateMetadata({ params }: CustomPageParams) {
  const { data: page } = await fetchData(params.pageSlug);
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

async function Page(props: CustomPageParams) {
  const { isEnabled } = draftMode();
  const { data: page } = await fetchData(props.params.pageSlug);
  const client = initRequestClient(KlabbanConfig);
  const data = await client.request(PageCustomUiDocument, {
    id: props.params.pageSlug,
    preview: false,
  });
  return (
    <>
      <MainMenu light={data.page?.customPageUI?.mainContent?.lightNavigation} />

      <PreviewPage slug={props.params.pageSlug} isEnabled={isEnabled} />
      {/* <PageContent page={page} pageCustomUI={data.page} /> */}
      {!isEnabled && <PageContent page={page} pageCustomUI={data.page} />}
    </>
  );
}

export default Page;

export const revalidate = 60 * 60 * 24 * 30; // 1 month
export async function generateStaticParams() {
  return [];
}
