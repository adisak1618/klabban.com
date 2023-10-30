import { Breadcrumb } from "components/Breadcrumb";
import { HeadlineSection } from "components/Headline";
import { NormalHeadlineSection } from "components/Headline/simple";
import { MainMenu } from "components/MainMenu";
import { AnimateCard } from "components/animateCard";
import { BlogSearch } from "components/blogSearch";
import { CategoryProvider } from "klabban-commerce";
import { KlabbanConfig } from "libs/klabbanConfig";
import { Suspense } from "react";

interface PageProps extends PageSearchParams {
  params: {
    categorySlug: string;
  };
}

export default function Page(props: PageProps) {
  return (
    <>
      <CategoryProvider {...KlabbanConfig} slug={props.params.categorySlug}>
        {({ category }) => (
          <>
            {/* <HeadlineSection
              backgroundImage={
                category?.cover?.sourceUrl || "/images/cover.jpg"
              }
              title={category?.name || ""}
              subTitle={category?.description}
            /> */}

            <div className="mx-auto !max-w-5xl mt-6 mb-4 lg:container px-5">
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
                avatarClassName="md:min-w-[400px]"
                avatarImage={category?.cover?.sourceUrl || "/images/cover.jpg"}
                content={
                  <div className="p-6 relative text-center md:text-left flex flex-col justify-center">
                    <p className="text-body uppercase leading-[1em] text-text-third tracking-widest">
                      Category
                    </p>
                    <h1 className="text-h2 uppercase mb-2 font-bold leading-[1em] text-text-color drop-shadow-2xl tracking-widest">
                      {category?.name || ""}
                    </h1>

                    {category?.description && (
                      <p
                        className={
                          "text-h6 text-text-secondary mx-auto py-0 max-w-2xl line-clamp-5"
                        }
                      >
                        {category?.description}
                      </p>
                    )}
                  </div>
                }
              />
            </div>

            <Suspense>
              <BlogSearch
                categoryName={category?.name}
                categorySlug={props.params.categorySlug}
                {...props}
                pagePath={`/category/${props.params.categorySlug}`}
                parentCategoryId={category?.databaseId}
              />
            </Suspense>
          </>
        )}
      </CategoryProvider>
    </>
  );
}

export const revalidate = 60 * 60;
