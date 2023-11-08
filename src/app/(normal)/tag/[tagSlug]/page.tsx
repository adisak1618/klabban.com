import { Breadcrumb } from "components/Breadcrumb";
import { HeadlineSection } from "components/Headline";
import { MainMenu } from "components/MainMenu";
import { BlogSearch } from "components/blogSearch";
import { siteName } from "config/siteConfig";
import { TagProvider } from "klabban-commerce";
import { KlabbanConfig } from "libs/klabbanConfig";

interface PageProps extends PageSearchParams {
  params: {
    tagSlug: string;
  };
}

async function fetchData(slug: string) {
  return await TagProvider({
    ...KlabbanConfig,
    variables: {
      id: slug,
    },
  });
}

export async function generateMetadata({ params }: PageProps) {
  const { data: tag } = await fetchData(params.tagSlug);
  return {
    title: `${siteName} | หัวข้อ #${tag?.name}`,
    description: tag?.description
      ?.substring(0, 500)
      ?.replaceAll(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>|\s/g, ""),
    siteName,
    url: `${process.env.BASE_URL}/tag/${tag?.slug}`,
    images: [],
    locale: "th_TH",
    type: "website",
  };
}

export default async function Page(props: PageProps) {
  const { Provider, data: tag } = await fetchData(props.params.tagSlug);
  return (
    <>
      <Provider {...KlabbanConfig}>
        <>
          {/* <HeadlineSection
              header={
                <p className="text-body uppercase leading-[1em] text-white tracking-widest">
                  หัวข้อ
                </p>
              }
              backgroundImage={"/images/cover.webp"}
              title={tag?.name || ""}
              imageAlt="Tag cover image"
              subTitle={tag?.description}
              hideSubTitle
            /> */}
          <div className="container-content pt-6">
            <p className="text-body uppercase leading-[1em] text-text-color text-center tracking-widest">
              หัวข้อ
            </p>
            <h1 className="text-h3 font-bold text-center leading-[1em]">
              #{tag?.name}
            </h1>
            <p className="mt-3 mx-auto">{tag?.description}</p>
          </div>
          <div className="mx-auto !max-w-5xl mt-6 mb-4 lg:container px-5">
            <Breadcrumb
              links={[
                {
                  label: "Blog",
                  href: "/blog",
                },
                {
                  label: tag?.name || "",
                  href: `/tag/${tag?.slug}`,
                },
              ]}
            />
          </div>
        </>
      </Provider>
      <BlogSearch
        tagName={props.params.tagSlug}
        {...props}
        pagePath={`/tag/${props.params.tagSlug}`}
      />
    </>
  );
}

export const revalidate = 60 * 60 * 24 * 30; // 1 month
