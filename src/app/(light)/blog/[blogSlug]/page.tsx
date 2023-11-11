import { draftMode } from "next/headers";
import {
  OrderEnum,
  PostObjectsConnectionOrderbyEnum,
  PostsDocument,
  initRequestClient,
} from "klabban-commerce";
import { KlabbanConfig } from "libs/klabbanConfig";
// import "klabban-commerce/react/index.css";
import { siteName } from "config/siteConfig";
import NextPreviousPostLink from "container/blogDetail/nextPreviousPost";
import { RelatePost } from "container/blogDetail/relatePost";
import { BlogContent, getPostData } from "container/blogDetail/content";

export interface BlogDetailPageProps {
  params: {
    blogSlug: string;
  };
}

// const option: RequestConfig = {};

export async function generateMetadata({ params }: BlogDetailPageProps) {
  const { post } = await getPostData({ slug: params.blogSlug });
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
    alternates: {
      canonical: post?.slug
        ? `${process.env.BASE_URL}/blog/${post?.slug}`
        : undefined,
    },
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

// export const revalidate = 60 * 60 * 24 * 30; // 1 month
export const dynamic = "force-static";
export const runtime = "nodejs"; // 'nodejs' (default) | 'edge'

export async function generateStaticParams() {
  if (
    process.env.VERCEL_ENV === "preview" ||
    process.env.VERCEL_ENV === "development"
  ) {
    return [];
  }
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
    first: 100,
  });

  return (
    postsData.posts?.nodes.map((post) => ({
      blogSlug: post.slug,
    })) || []
  );
}
