import { GutenbergContent, PostProvider } from "klabban-commerce/react";
import { KlabbanConfig } from "libs/klabbanConfig";
import { format } from "date-fns";
// import "klabban-commerce/react/index.css";
import { RelatePost } from "./relatePost";
import NextPreviousPostLink from "./nextPreviousPost";

export interface BlogDetailPageProps {
  params: {
    blogSlug: string;
  };
}

export function BlogDetailPage({ params }: BlogDetailPageProps): JSX.Element {
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
              <div className="text-h2 text-center px-7 font-bold leading-[1.14em]">
                {post?.title}
              </div>
              <div className="text-body px-7 text-center leading-4 mt-4 font-medium text-[#787878] flex gap-3 justify-center">
                <p className="">
                  {format(new Date(post?.date || new Date()), "MMMM dd, yyyy")}
                </p>
                <div>|</div>
                <div className="flex gap-3">
                  {post?.categories?.nodes.map((category) => (
                    <span key={category.id} className="">
                      {category.name}
                    </span>
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
          {post && <NextPreviousPostLink {...post} />}
        </>
      )}
    </PostProvider>
  );
}
