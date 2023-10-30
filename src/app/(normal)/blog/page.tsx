import { BlogSearch } from "components/blogSearch";
import { PageProvider } from "klabban-commerce";
import { KlabbanConfig } from "libs/klabbanConfig";
import { Breadcrumb } from "components/Breadcrumb";
import { AnimateCard } from "components/animateCard";
import { MainMenu } from "components/MainMenu";
import { Suspense } from "react";

function Page(props: PageSearchParams) {
  return (
    <>
      <div className="container-content mt-3 mb-4">
        <Breadcrumb
          links={[
            {
              label: "Blog",
              href: "/blog",
            },
          ]}
        />
      </div>
      <PageProvider {...KlabbanConfig} slug="blog">
        {({ page }) => (
          <>
            <div className="container-content xl:!max-w-7xl">
              <AnimateCard
                avatarClassName="md:min-w-[350px] xl:min-w-[500px]"
                avatarImage={
                  page?.featuredImage?.node.sourceUrl || "/images/cover.jpg"
                }
                content={
                  <div className="p-6 relative text-center md:text-left flex flex-col justify-center md:min-h-[320px]">
                    <p className="text-body uppercase leading-[1em] text-text-third tracking-widest">
                      Category
                    </p>
                    <h1 className="text-h2 uppercase mb-2 font-bold leading-[1em] text-text-color drop-shadow-2xl tracking-widest">
                      {page?.title || "Blog"}
                    </h1>

                    {page?.content && (
                      <p
                        className={
                          "text-h6 text-text-secondary py-0 line-clamp-5"
                        }
                      >
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
            <Suspense>
              <BlogSearch {...props} pagePath="/blog" parentCategoryId={null} />
            </Suspense>
          </>
        )}
      </PageProvider>
    </>
  );
}

export default Page;

export const revalidate = 60 * 60;
