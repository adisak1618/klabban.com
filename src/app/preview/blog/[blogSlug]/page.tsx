import { draftMode } from "next/headers";
import NextPreviousPostLink from "container/blogDetail/nextPreviousPost";
import { RelatePost } from "container/blogDetail/relatePost";
import { BlogContent, getPostData } from "container/blogDetail/content";

export interface BlogDetailPageProps {
  params: {
    blogSlug: string;
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { isEnabled } = draftMode();
  const { post } = await getPostData({ slug: params.blogSlug });

  return (
    <>
      <>
        <BlogContent slug={params.blogSlug} />

        {post && !isEnabled && (
          <div className="space-y-10 py-6 bg-gray-100 overflow-hidden">
            <NextPreviousPostLink {...post} />
            <RelatePost
              postId={post?.databaseId.toString()}
              categoriesId={
                post?.categories?.nodes?.map((category) =>
                  category.databaseId.toString()
                ) || []
              }
            />
          </div>
        )}
      </>
    </>
  );
}
