import { BlogSearch } from "components/blogSearch";
import { pageRequest } from "klabban-commerce";
import { KlabbanConfig } from "libs/klabbanConfig";
import { Breadcrumb } from "components/Breadcrumb";
import { AnimateCard } from "components/animateCard";
import { siteName } from "config/siteConfig";

async function fetchData(slug: string) {
  return await pageRequest({
    ...KlabbanConfig,
    variables: {
      id: slug,
    },
  });
}

export async function generateMetadata({}: PageSearchParams) {
  const { page } = await fetchData("blog");
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
      canonical: `${process.env.BASE_URL}/blog`,
    },
  };
}

async function Page(props: PageSearchParams) {
  const { page } = await fetchData("blog");
  return (
    <div className="bg-bgLight">
      <div className="container mx-auto pt-24 pb-4">
        <Breadcrumb
          links={[
            {
              label: "Blog",
              href: "/blog",
            },
          ]}
        />
      </div>

      <div className="container-content xl:!max-w-7xl">
        <AnimateCard
          priorityLoadImage
          avatarClassName="md:min-w-[350px] xl:min-w-[500px]"
          avatarImage={
            page?.featuredImage?.node.sourceUrl || "/images/cover.webp"
          }
          avatarSrcSetImage={page?.featuredImage?.node.srcSet}
          content={
            <div className="p-6 relative text-center md:text-left flex flex-col justify-center md:min-h-[320px]">
              <p className="text-body uppercase leading-[1em] text-text-third tracking-widest">
                Category
              </p>
              <h1 className="text-h2 uppercase mb-2 font-bold leading-[1em] text-text-color drop-shadow-2xl tracking-widest">
                {page?.title || "Blog"}
              </h1>

              {page?.content && (
                <p className={"text-h6 text-text-secondary py-0 line-clamp-5"}>
                  {page?.content.replaceAll(
                    /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g,
                    ""
                  )}
                </p>
              )}
            </div>
          }
        />
      </div>
      <BlogSearch {...props} parentCategoryId={null} />
    </div>
  );
}

export default Page;

export const dynamic = "force-static";
