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
import { notFound } from "next/navigation";
import { siteName } from "config/siteConfig";

export interface BlogDetailPageProps {
  params: {
    blogSlug: string;
  };
}

async function fetchPost(slug: string) {
  return await PostProvider({
    ...KlabbanConfig,
    slug: slug,
    queryOption: {
      includeNextPreviousPost: true,
      includeTags: true,
    },
  });
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

export async function generateMetadata({ params }: BlogDetailPageProps) {
  const { data: post } = await fetchPost(params.blogSlug);
  return {
    title: `${siteName} | ${post?.title}`,
    description: post?.excerpt?.replaceAll(
      /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g,
      ""
    ),
    siteName,
    url: `${process.env.BASE_URL}/blog/${post?.slug}`,
    images: [post?.featuredImage?.node.medium],
    locale: "th_TH",
    type: "website",
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { Provider, data: post } = await fetchPost(params.blogSlug);

  if (!post) return notFound();
  return (
    <>
      <Provider>
        <>
          <HeadlineSection
            className="h-[80vh] md:h-[95vh] !bg-center"
            backgroundImage={post?.featuredImage?.node.sourceUrl || ""}
            backgroundSrcSet={post.featuredImage?.node.srcSet}
            imageAlt={post.featuredImage?.node.altText}
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
                  {format(new Date(post?.date || new Date()), "MMMM dd, yyyy")}{" "}
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
      </Provider>
    </>
  );
}

export const revalidate = 360000;
