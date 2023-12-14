import { siteName } from "config/siteConfig";
import { PagesDocument, initRequestClient } from "klabban-commerce";
import { KlabbanConfig } from "libs/klabbanConfig";
import { PageContent, getPageData } from "container/pageDetail/content";
import { AboutMeHeroBlock } from "components/AboutMeBlock";

export async function generateMetadata() {
  const description =
    "I have developed an e-commerce solution tailored for small businesses aiming to accelerate their growth in the online realm, leveraging cutting-edge Headless-CMS technology.";
  const { page } = await getPageData({ slug: "about-me" });
  return {
    title: `${siteName} | ${page?.title}`,
    description: description,
    url: `${process.env.BASE_URL}/${page?.slug}`,
    images: [page?.featuredImage?.node.medium_large],
    locale: "th_TH",
    type: "website",
    openGraph: {
      title: page?.title,
      description: description,
      siteName: siteName,
      images: [
        {
          url: page?.featuredImage?.node.medium_large,
        },
      ],
    },
    alternates: {
      canonical: `${process.env.BASE_URL}/about-me`,
    },
  };
}

async function Page() {
  return (
    <>
      <AboutMeHeroBlock />
      <PageContent slug="/about-me" hideMenu />
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
    .filter((slug) => !["blog"].includes(slug.pageSlug || ""));
}
