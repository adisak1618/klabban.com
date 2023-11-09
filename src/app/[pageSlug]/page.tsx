import { siteName } from "config/siteConfig";
import { draftMode } from "next/headers";
import {
  PageIdType,
  PagesDocument,
  initRequestClient,
  pageRequest,
} from "klabban-commerce";
import { KlabbanConfig } from "libs/klabbanConfig";
import { PageContent } from "container/pageDetail/content";
import { PreviewPage } from "container/pageDetail/preview";
import { PageCustomUiDocument } from "../../gql/generated";
import { MainMenu } from "components/MainMenu";
import { FourceLogin } from "components/ForceLogin";
import { getTokenByRefreshToken } from "libs/refreshToken";
import { notFound } from "next/navigation";

interface CustomPageParams extends PageSearchParams {
  params: {
    pageSlug: string;
  };
}

async function fetchData(slug: string, token: string | null) {
  try {
    const headers = token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {};

    const client = initRequestClient({
      ...KlabbanConfig,
      option: {
        headers,
      },
    });

    const [pageResult, data] = await Promise.all([
      pageRequest({
        ...KlabbanConfig,
        variables: {
          id: slug || "/",
          idType: Number.isNaN(Number(slug || "/"))
            ? PageIdType.Uri
            : PageIdType.DatabaseId,
        },
        option: {
          headers,
        },
      }),
      client.request(PageCustomUiDocument, {
        id: slug,
        preview: false,
        idType: Number.isNaN(Number(slug || "/"))
          ? PageIdType.Uri
          : PageIdType.DatabaseId,
      }),
    ]);

    // const data = await client.request(PageCustomUiDocument, {
    //   id: slug,
    //   preview: false,
    //   idType: Number.isNaN(Number(slug || "/"))
    //     ? PageIdType.Uri
    //     : PageIdType.DatabaseId,
    // });
    // const pageResult = await pageRequest({
    //   ...KlabbanConfig,
    //   variables: {
    //     id: slug || "/",
    //     idType: Number.isNaN(Number(slug || "/"))
    //       ? PageIdType.Uri
    //       : PageIdType.DatabaseId,
    //   },
    //   option: {
    //     headers,
    //   },
    // });
    return {
      page: pageResult.page,
      customUI: data.page,
    };
  } catch (error) {
    return {
      page: undefined,
      customUI: undefined,
    };
  }
}

export async function generateMetadata({ params }: CustomPageParams) {
  const { page } = await fetchData(params.pageSlug, null);
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
    alternates: {
      canonical: page?.slug
        ? `${process.env.BASE_URL}/blog/${page?.slug}`
        : undefined,
    },
  };
}

async function Page(props: CustomPageParams) {
  const { isEnabled } = draftMode();
  // const token = isEnabled ? await getTokenByRefreshToken() : null;
  const { page, customUI } = await fetchData(props.params.pageSlug, null);
  // const client = initRequestClient({
  //   ...KlabbanConfig,
  // });
  // const data = await client.request(PageCustomUiDocument, {
  //   id: props.params.pageSlug,
  //   preview: token ? true : false,
  // });
  if (!page && !isEnabled) return notFound();
  return (
    <>
      {isEnabled && <FourceLogin />}
      {/* <PageContent page={page} pageCustomUI={customUI} /> */}
    </>
  );
}

export default Page;

export const revalidate = 60 * 60 * 24 * 30; // 1 month
// export const revalidate = true;

// export const fetchCache = "force-cache";
export const runtime = "nodejs"; // 'nodejs' (default) | 'edge'
export async function generateStaticParams() {
  const client = initRequestClient({ ...KlabbanConfig });
  const { pages } = await client.request(PagesDocument, {
    first: 100,
  });
  return (pages?.nodes || []).map((page) => ({
    pageSlug: page.slug,
  }));
}
