import { GutenbergContent } from "klabban-commerce/react";
import { PostFragmentFragment, PostProvider } from "klabban-commerce";
import { KlabbanConfig } from "libs/klabbanConfig";
import { format } from "date-fns";
// import "klabban-commerce/react/index.css";
import { RelatePost } from "./relatePost";
import NextPreviousPostLink from "./nextPreviousPost";
import Link from "next/link";
import { PostTags } from "./tags";
import { HeadlineSection } from "components/Headline";
import { AuthorCard } from "./author";
import { Breadcrumb } from "components/Breadcrumb";
import { MainMenu } from "components/MainMenu";

export interface BlogDetailPageProps {
  params: {
    blogSlug: string;
  };
}

const findRootCategory = (categories: PostFragmentFragment["categories"]) => {
  const RootCategory = categories?.nodes.find(
    (cat) => cat.parentDatabaseId === null
  );
  if (RootCategory)
    return [
      {
        label: RootCategory.name || "",
        href: `/category/${RootCategory.slug}`,
      },
    ];
  return [];
};

export default function BlogDetailPage({
  params,
}: BlogDetailPageProps): JSX.Element {
  return (
    <>
      <MainMenu light />
      <PostProvider
        {...KlabbanConfig}
        slug={params.blogSlug}
        queryOption={{
          includeNextPreviousPost: true,
        }}
      >
        {({ post }) => (
          <>
            {/* <header className="max-w-5xl mx-auto">
          <div className="my-10">
            <div className="text-h4 md:text-h3 lg:text-h2 text-center px-7 font-bold leading-[1.14em] text-black">
              {post?.title}
            </div>
            <div className="text-body px-7 text-center leading-4 mt-4 font-medium text-[#787878] md:flex gap-3 justify-center">
              <p className="border-b pb-3 inline-block border-gray-500 md:border-0 md:pb-0 ">
                {format(new Date(post?.date || new Date()), "MMMM dd, yyyy")}
              </p>
              <div className="hidden md:block">|</div>
              <div className="flex gap-3 mt-3 md:mt-0 justify-center flex-wrap">
                {post?.categories?.nodes.map((category) => (
                  <Link
                    href={`/category/${category.slug}`}
                    key={category.id}
                    className="hover:underline-hilight-secondary"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {post?.featuredImage && (
            <img
              className="w-full h-full object-cover object-center mb-[30px]"
              alt={post?.featuredImage?.node?.altText || ""}
              src={post?.featuredImage?.node.sourceUrl || ""}
              srcSet={post?.featuredImage?.node.sourceUrl || ""}
            />
          )}
        </header> */}

            <HeadlineSection
              className="h-[80vh] md:h-[95vh] !bg-center"
              backgroundImage={post?.featuredImage?.node.sourceUrl || ""}
              title={post?.title || ""}
              subTitle={post?.excerpt}
              hideSubTitle
              footer={
                <div className="">
                  <div className="flex gap-3 mt-3 md:mt-0 justify-center flex-wrap">
                    {post?.categories?.nodes.map((category) => (
                      <Link
                        href={`/category/${category.slug}`}
                        key={category.id}
                        className="bg-white uppercase font-bold hover:bg-opacity-90 px-4 py-1 text-gray-800 rounded-full text-caption"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                  <p className="py-3  text-center md:pb-0 text-caption text-white mt-1">
                    Updated On{" "}
                    {format(
                      new Date(post?.date || new Date()),
                      "MMMM dd, yyyy"
                    )}{" "}
                    by {post?.author?.node.name}
                  </p>
                </div>
              }
            />
            <div className="max-w-5xl mx-auto container px-5 my-3">
              <Breadcrumb
                links={[
                  {
                    href: "/blog",
                    label: "Blog",
                  },
                  ...findRootCategory(post?.categories),
                ]}
              />
            </div>

            <main style={{ fontSize: "20px" }}>
              <GutenbergContent
                entryClassName="!mb-20 !mt-6"
                content={post?.content || ""}
              />
            </main>
            <div className="max-w-5xl mx-auto mb-12 container px-5 grid lg:grid-cols-3 gap-6 overflow-hidden">
              {post?.author && (
                <AuthorCard
                  className="col-span-2 max-w-[450px] mx-auto md:max-w-full"
                  name={post?.author?.node.name || ""}
                  description={post?.author?.node?.description}
                  avatarImage={post?.author?.node?.avatar?.url}
                />
              )}

              {(post?.tags?.nodes || [])?.length > 0 && (
                <div className="py-4 space-y-3 space-x-3">
                  <h4 className=" pb-3 text-h6 inline-block font-bold">Tag:</h4>
                  {post?.tags && <PostTags {...post.tags} />}
                </div>
              )}
            </div>

            <div className="space-y-10 py-6 bg-gray-100 overflow-hidden">
              {post && <NextPreviousPostLink {...post} />}
              {post?.id && (
                <RelatePost
                  postId={post?.databaseId.toString()}
                  categoriesId={
                    post?.categories?.nodes?.map((category) =>
                      category.databaseId.toString()
                    ) || []
                  }
                />
              )}
            </div>
          </>
        )}
      </PostProvider>
    </>
  );
}

export const revalidate = 360000;
