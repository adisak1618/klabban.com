import { Breadcrumb } from "components/Breadcrumb";
import { HeadlineSection } from "components/Headline";
import { BlogSearch } from "components/blogSearch";
import { TagProvider } from "klabban-commerce";
import { KlabbanConfig } from "libs/klabbanConfig";

interface PageProps extends PageSearchParams {
  params: {
    tagSlug: string;
  };
}

export default function Page(props: PageProps) {
  return (
    <>
      <TagProvider {...KlabbanConfig} slug={props.params.tagSlug}>
        {({ tag }) => (
          <>
            <HeadlineSection
              header={
                <p className="text-body uppercase leading-[1em] text-white tracking-widest">
                  หัวข้อ
                </p>
              }
              backgroundImage={"/images/tag-cover.jpg"}
              title={tag?.name || ""}
              subTitle={tag?.description}
              hideSubTitle
            />
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
        )}
      </TagProvider>
      <BlogSearch
        tagName={props.params.tagSlug}
        {...props}
        pagePath={`/tag/${props.params.tagSlug}`}
      />
    </>
  );
}

export const revalidate = 60 * 60;
