import {
  PageIdType,
  PageQuery,
  initRequestClient,
  pageRequest,
} from "klabban-commerce";
import { draftMode } from "next/headers";
import { Breadcrumb } from "components/Breadcrumb";
import { GutenbergContent } from "klabban-commerce/react";
import { HeadlineSection } from "components/Headline";
import { PageCustomUiDocument, PageCustomUiQuery } from "../../gql/generated";
// import { HeroBlock } from "container/homePage/heroBlock";
// import { Slideshow } from "container/homePage/slideshow";
// import { TopCategories } from "container/homePage/TopCategories";
// import { EditorPickPosts } from "container/homePage/EditorPickPosts";
// import { LastestPosts } from "container/homePage/LatestPosts";
import { MainMenu } from "components/MainMenu";
import { KlabbanConfig } from "libs/klabbanConfig";
import { getTokenByRefreshToken } from "libs/refreshToken";
import { notFound } from "next/navigation";
import { FourceLogin } from "components/ForceLogin";

export async function getPageData({ slug }: { slug: string }) {
  const { isEnabled } = draftMode();
  const token = isEnabled ? await getTokenByRefreshToken() : null;
  try {
    const headers = token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {};

    const client = initRequestClient({
      ...KlabbanConfig,
      option: {
        headers,
      },
    });

    const [pageResult, data] = await Promise.all([
      pageRequest({
        ...KlabbanConfig,
        variables: {
          id: slug || "/",
          asPreview: token ? true : false,
          idType: Number.isNaN(Number(slug || "/"))
            ? PageIdType.Uri
            : PageIdType.DatabaseId,
        },
        option: {
          headers,
        },
      }),
      client.request(PageCustomUiDocument, {
        id: slug,
        preview: false,
        idType: Number.isNaN(Number(slug || "/"))
          ? PageIdType.Uri
          : PageIdType.DatabaseId,
      }),
    ]);

    return {
      page: pageResult.page,
      customUI: data.page,
    };
  } catch (error) {
    return {
      page: undefined,
      customUI: undefined,
    };
  }
}

export async function PageContent({ slug }: { slug: string }) {
  const { isEnabled } = draftMode();
  const { customUI, page } = await getPageData({ slug });

  if (!page && !isEnabled) return notFound();
  return (
    <>
      {isEnabled && <FourceLogin />}
      <MainMenu light={customUI?.customPageUI?.mainContent?.lightNavigation} />

      <div>
        <div className="flex flex-col">
          {customUI?.customPageUI?.mainContent?.enable && (
            <div
              style={{
                order: customUI?.customPageUI?.mainContent?.order || 99,
              }}
            >
              {customUI?.customPageUI?.mainContent?.headerStyle !== "simple" &&
                customUI?.customPageUI?.mainContent?.showHeader && (
                  <HeadlineSection
                    className="h-[80vh] md:h-[40vh] !bg-center"
                    backgroundImage={page?.featuredImage?.node?.sourceUrl || ""}
                    backgroundSrcSet={page?.featuredImage?.node?.srcSet}
                    imageAlt={page?.featuredImage?.node?.altText}
                    title={page?.title || ""}
                    hideSubTitle
                  />
                )}
              {customUI?.customPageUI?.mainContent?.headerStyle === "simple" &&
                customUI?.customPageUI?.mainContent?.showHeader && (
                  <div className="container-content pt-6">
                    <h1 className="text-h3 font-bold text-center">
                      {page?.title}
                    </h1>
                  </div>
                )}
              {customUI?.customPageUI?.mainContent?.showBreadcrumbs && (
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
          {/* {customUI?.customPageUI?.parallax?.enable && (
            <HeroBlock {...customUI?.customPageUI?.parallax} />
          )}
          {customUI?.customPageUI?.slideshow?.enable && (
            <Slideshow {...customUI?.customPageUI?.slideshow} />
          )}
          {customUI?.customPageUI?.topCategories?.enable && (
            <TopCategories {...customUI?.customPageUI?.topCategories} />
          )}
          {customUI?.customPageUI?.popularPosts?.enable && (
            <EditorPickPosts {...customUI?.customPageUI?.popularPosts} />
          )}
          {customUI?.customPageUI?.lastedPost?.enable && (
            <LastestPosts {...customUI?.customPageUI?.lastedPost} />
          )} */}
        </div>
      </div>
    </>
  );
}
