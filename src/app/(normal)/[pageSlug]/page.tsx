import { Breadcrumb } from "components/Breadcrumb";
import { HeadlineSection } from "components/Headline";
import { siteName } from "config/siteConfig";
import { PageProvider } from "klabban-commerce";
import { GutenbergContent } from "klabban-commerce/react";
import { KlabbanConfig } from "libs/klabbanConfig";
interface CustomPageParams extends PageSearchParams {
  params: {
    pageSlug: string;
  };
}

async function fetchData(slug: string) {
  return await PageProvider({
    ...KlabbanConfig,
    slug: slug,
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
  const { Provider, data: page } = await fetchData(props.params.pageSlug);
  return (
    <Provider {...KlabbanConfig}>
      <>
        <div className="container-content pt-6">
          <h1 className="text-h3 font-bold text-center">{page?.title}</h1>
        </div>
        <div className="mx-auto !max-w-5xl mt-6 mb-4 lg:container px-5">
          <Breadcrumb
            links={[
              {
                label: page?.title || "",
                href: `/${page?.databaseId}`,
              },
            ]}
          />
        </div>
        <GutenbergContent
          entryClassName="!my-0"
          className="!my-0"
          content={page?.content || ""}
        />
      </>
    </Provider>
  );
}

export default Page;

export const revalidate = 60 * 60 * 24 * 30; // 1 month
