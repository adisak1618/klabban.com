import { GutenbergContent } from "klabban-commerce/react";
import { PostProvider } from "klabban-commerce";
import { KlabbanConfig } from "libs/klabbanConfig";
import { format } from "date-fns";
// import "klabban-commerce/react/index.css";
import { RelatePost } from "./relatePost";
import NextPreviousPostLink from "./nextPreviousPost";
import Link from "next/link";
import { PostTags } from "./tags";

export interface BlogDetailPageProps {
  params: {
    blogSlug: string;
  };
}

export default function BlogDetailPage({
  params,
}: BlogDetailPageProps): JSX.Element {
  return (
    <PostProvider
      {...KlabbanConfig}
      slug={params.blogSlug}
      includeNextPreviousPost
    >
      {({ post }) => (
        <>
          <header className="max-w-5xl mx-auto">
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
                      className="hover:underline-hilight"
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
          </header>
          <main>
            <GutenbergContent
              entryClassName="!my-0"
              content={post?.content || ""}
            />
          </main>
          <div className="space-y-10 py-6 bg-gray-100">
            {post && <PostTags {...post} />}
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
  );
}
