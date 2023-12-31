import { Breadcrumb } from "components/Breadcrumb";
import { AnimateCard } from "components/animateCard";
import { BlogSearch } from "components/blogSearch";
import { siteName } from "config/siteConfig";
import { categoriesRequest, categoryRequest } from "klabban-commerce";
import { KlabbanConfig } from "libs/klabbanConfig";

interface PageProps extends PageSearchParams {
  params: {
    categorySlug: string;
  };
}

async function fetchData(slug: string) {
  return await categoryRequest({
    ...KlabbanConfig,
    variables: {
      id: slug,
    },
    option: {
      // cache: "force-cache",
    },
  });
}

export async function generateMetadata({}: PageSearchParams) {
  const { category } = await fetchData("blog");
  return {
    title: `${siteName} | ${category?.name}`,
    description: category?.description
      ?.substring(0, 500)
      ?.replaceAll(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>|\s/g, ""),
    siteName,
    url: `${process.env.BASE_URL}/${category?.slug}`,
    images: [category?.cover?.medium_large],
    locale: "th_TH",
    type: "website",
  };
}

export default async function Page(props: PageProps) {
  const { category } = await fetchData(props.params.categorySlug);
  return (
    <>
      {/* <HeadlineSection
              backgroundImage={
                category?.cover?.sourceUrl || "/images/cover.webp"
              }
              title={category?.name || ""}
              subTitle={category?.description}
            /> */}

      <div className="mx-auto container mt-24  mb-4 lg:container px-5">
        <Breadcrumb
          links={[
            {
              label: "Blog",
              href: "/blog",
            },
            {
              label: category?.name || "",
              href: `/category/${category?.slug}`,
            },
          ]}
        />
      </div>
      <div className="container-content xl:!max-w-7xl py-3">
        <AnimateCard
          priorityLoadImage
          avatarClassName="md:min-w-[400px]"
          avatarImage={category?.cover?.sourceUrl || "/images/cover.webp"}
          content={
            <div className="p-6 relative text-center md:text-left flex flex-col justify-center items-stretch">
              <p className="text-body uppercase leading-[1em] text-text-third tracking-widest">
                Category
              </p>
              <h1 className="text-h4 sm:text-h3 leading-[1.5em] xl:text-h2 uppercase mb-2 font-bold md:leading-[1em] text-text-color drop-shadow-2xl tracking-widest break-words whitespace-break-spaces">
                {category?.name || ""}
              </h1>

              {category?.description && (
                <p className={"text-h6 text-text-secondary py-0 line-clamp-5"}>
                  {category?.description}
                </p>
              )}
            </div>
          }
        />
      </div>
      <BlogSearch
        categoryName={category?.name}
        categorySlug={props.params.categorySlug}
        {...props}
        parentCategoryId={category?.databaseId}
      />
    </>
  );
}

// export const revalidate = 60 * 60 * 24 * 30; // 1 month

export const dynamic = "force-static";

export async function generateStaticParams() {
  const { categories } = await categoriesRequest({
    ...KlabbanConfig,
    variables: {
      first: 1000,
    },
  });

  return (
    categories?.nodes?.map((cateogry) => ({
      categorySlug: cateogry.slug,
    })) || []
  );
}
