import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import {
  OrderEnum,
  PostIdType,
  PostObjectsConnectionOrderbyEnum,
  PostRequest,
  PostsDocument,
  initRequestClient,
} from "klabban-commerce";
import { KlabbanConfig } from "libs/klabbanConfig";
// import "klabban-commerce/react/index.css";
import { siteName } from "config/siteConfig";
import NextPreviousPostLink from "container/blogDetail/nextPreviousPost";
import { RelatePost } from "container/blogDetail/relatePost";
import { PreviewPost } from "container/blogDetail/preview";
import { BlogContent } from "container/blogDetail/content";

export interface BlogDetailPageProps {
  params: {
    blogSlug: string;
  };
}

// const option: RequestConfig = {};

async function fetchPost(slug: string) {
  return await PostRequest({
    ...KlabbanConfig,
    variables: {
      id: slug,
      idType: Number.isNaN(Number(slug))
        ? PostIdType.Slug
        : PostIdType.DatabaseId,
      includeNextPreviousPost: true,
      includeTags: true,
      asPreview: false,
    },
  });
}

export async function generateMetadata({ params }: BlogDetailPageProps) {
  const { post } = await fetchPost(params.blogSlug);
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
  const { isEnabled } = draftMode();
  const { post } = await fetchPost(params.blogSlug);
  // console.log("post", post);

  return (
    <>
      <>
        {isEnabled && (
          <PreviewPost slug={params.blogSlug} isEnabled={isEnabled} />
        )}
        {!isEnabled && <BlogContent post={post} />}

        {post && (
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

export const revalidate = 60 * 60 * 24 * 30; // 1 month
// export const revalidate = true;
// export const runtime = "edge";
export const fetchCache = "force-cache";
// const dynamic = "force-static";
export async function generateStaticParams() {
  const client = initRequestClient({
    ...KlabbanConfig,
  });
  const postsData = await client.request(PostsDocument, {
    where: {
      orderby: [
        {
          field: PostObjectsConnectionOrderbyEnum.Date,
          order: OrderEnum.Desc,
        },
      ],
    },
    first: 6,
  });

  return (
    postsData.posts?.nodes.map((post) => ({
      blogSlug: post.slug,
    })) || []
  );
}
