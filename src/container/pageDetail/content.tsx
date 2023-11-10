import { PageQuery } from "klabban-commerce";
import { Breadcrumb } from "components/Breadcrumb";
import { GutenbergContent } from "klabban-commerce/react";
import { HeadlineSection } from "components/Headline";
import { PageCustomUiQuery } from "../../gql/generated";
import { HeroBlock } from "container/homePage/heroBlock";
import { Slideshow } from "container/homePage/slideshow";
import { TopCategories } from "container/homePage/TopCategories";
import { EditorPickPosts } from "container/homePage/EditorPickPosts";
import { LastestPosts } from "container/homePage/LatestPosts";
import { MainMenu } from "components/MainMenu";

export function PageContent({
  page,
  pageCustomUI,
}: {
  page: PageQuery["page"];
  pageCustomUI: PageCustomUiQuery["page"];
}) {
  // if (!page && !isDraftMode) return notFound();
  return (
    <>
      <MainMenu
        light={pageCustomUI?.customPageUI?.mainContent?.lightNavigation}
      />
      {pageCustomUI?.customPageUI?.mainContent?.enable && (
        <div
          style={{
            order: pageCustomUI?.customPageUI?.mainContent?.order || 99,
          }}
        >
          {pageCustomUI?.customPageUI?.mainContent?.headerStyle !== "simple" &&
            pageCustomUI?.customPageUI?.mainContent?.showHeader && (
              <HeadlineSection
                className="h-[80vh] md:h-[40vh] !bg-center"
                backgroundImage={page?.featuredImage?.node?.sourceUrl || ""}
                backgroundSrcSet={page?.featuredImage?.node?.srcSet}
                imageAlt={page?.featuredImage?.node?.altText}
                title={page?.title || ""}
                hideSubTitle
              />
            )}
          {pageCustomUI?.customPageUI?.mainContent?.headerStyle === "simple" &&
            pageCustomUI?.customPageUI?.mainContent?.showHeader && (
              <div className="container-content pt-6">
                <h1 className="text-h3 font-bold text-center">{page?.title}</h1>
              </div>
            )}
          {pageCustomUI?.customPageUI?.mainContent?.showBreadcrumbs && (
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
          )}

          <GutenbergContent
            // entryClassName="!my-0"
            // className="!my-0"
            content={page?.content || ""}
          />
        </div>
      )}
      <div>
        <div className="flex flex-col">
          {pageCustomUI?.customPageUI?.parallax?.enable && (
            <HeroBlock {...pageCustomUI?.customPageUI?.parallax} />
          )}
          {pageCustomUI?.customPageUI?.slideshow?.enable && (
            <Slideshow {...pageCustomUI?.customPageUI.slideshow} />
          )}
          {pageCustomUI?.customPageUI?.topCategories?.enable && (
            <TopCategories {...pageCustomUI?.customPageUI.topCategories} />
          )}
          {pageCustomUI?.customPageUI?.popularPosts?.enable && (
            <EditorPickPosts {...pageCustomUI?.customPageUI?.popularPosts} />
          )}
          {pageCustomUI?.customPageUI?.lastedPost?.enable && (
            <LastestPosts {...pageCustomUI?.customPageUI?.lastedPost} />
          )}
        </div>
      </div>
    </>
  );
}
