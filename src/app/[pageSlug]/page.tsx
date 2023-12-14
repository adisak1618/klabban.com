import { siteName } from "config/siteConfig";
import { PagesDocument, initRequestClient } from "klabban-commerce";
import { KlabbanConfig } from "libs/klabbanConfig";
import { PageContent, getPageData } from "container/pageDetail/content";

interface CustomPageParams extends PageSearchParams {
  params: {
    pageSlug: string;
  };
}

export async function generateMetadata({ params }: CustomPageParams) {
  const { page } = await getPageData({ slug: params.pageSlug });
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
    openGraph: {
      title: page?.title,
      description: page?.content
        ?.substring(0, 500)
        ?.replaceAll(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>|\s/g, ""),
      url: `${process.env.BASE_URL}/blog/${page?.slug}`,
      siteName: siteName,
      images: [
        {
          url: page?.featuredImage?.node.medium_large,
          width: 800,
          height: 600,
        },
      ],
    },
    alternates: {
      canonical: page?.slug
        ? `${process.env.BASE_URL}/${page?.slug}`
        : undefined,
    },
  };
}

async function Page(props: CustomPageParams) {
  return (
    <>
      <PageContent slug={props.params.pageSlug} />
    </>
  );
}

export default Page;

// export const revalidate = 60 * 60 * 24 * 30; // 1 month
export const dynamic = "force-static";
// 'auto' | 'force-dynamic' | 'error' | 'force-static'
// export const fetchCache = "force-cache";
export const runtime = "nodejs"; // 'nodejs' (default) | 'edge'
export async function generateStaticParams() {
  if (
    process.env.VERCEL_ENV === "preview" ||
    process.env.VERCEL_ENV === "development"
  ) {
    return [];
  }
  const client = initRequestClient({ ...KlabbanConfig });
  const { pages } = await client.request(PagesDocument, {
    first: 1000,
  });
  return (pages?.nodes || [])
    .map((page) => ({
      pageSlug: page.slug,
    }))
    .filter(
      (slug) => !["blog", "about-me", "home"].includes(slug.pageSlug || "")
    );
}
