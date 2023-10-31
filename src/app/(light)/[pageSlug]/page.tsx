import { Breadcrumb } from "components/Breadcrumb";
import { HeadlineSection } from "components/Headline";
import { PageProvider } from "klabban-commerce";
import { GutenbergContent } from "klabban-commerce/react";
import { KlabbanConfig } from "libs/klabbanConfig";
interface CustomPageParams extends PageSearchParams {
  params: {
    pageSlug: string;
  };
}

async function Page(props: CustomPageParams) {
  const { Provider, data: page } = await PageProvider({
    ...KlabbanConfig,
    slug: props.params.pageSlug,
  });
  return (
    <Provider {...KlabbanConfig}>
      <>
        <HeadlineSection
          header={
            <p className="text-body uppercase leading-[1em] text-white tracking-widest">
              หัวข้อ
            </p>
          }
          imageAlt={page?.featuredImage?.node.altText}
          backgroundImage={"/images/cover.webp"}
          title={page?.title || ""}
          hideSubTitle
        />
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
        <GutenbergContent content={page?.content || ""} />
      </>
    </Provider>
  );
}

export default Page;
