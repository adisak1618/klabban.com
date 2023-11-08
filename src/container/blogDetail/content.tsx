import { Breadcrumb } from "components/Breadcrumb";
import { HeadlineSection } from "components/Headline";
import { format } from "date-fns";
import { PostQuery, PostFragmentFragment } from "klabban-commerce";
import { GutenbergContent } from "klabban-commerce/react";
import Link from "next/link";
import { AuthorCard } from "./author";
import { PostTags } from "./tags";
import { notFound } from "next/navigation";

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

export function BlogContent({
  post,
  isDraftMode = false,
}: {
  post: PostQuery["post"];
  isDraftMode?: boolean;
}) {
  if (!post && !isDraftMode) return notFound();
  return (
    <>
      <HeadlineSection
        className="h-[80vh] md:h-[95vh] !bg-center"
        backgroundImage={post?.featuredImage?.node.sourceUrl || ""}
        backgroundSrcSet={post?.featuredImage?.node.srcSet}
        imageAlt={post?.featuredImage?.node.altText}
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
              {format(new Date(post?.date || new Date()), "MMMM dd, yyyy")} by{" "}
              {post?.author?.node.name}
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
    </>
  );
}
