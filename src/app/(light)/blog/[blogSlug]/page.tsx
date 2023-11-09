import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { authOptions, getServerSession } from "klabban-commerce/auth";
import {
  OrderEnum,
  PostIdType,
  PostObjectsConnectionOrderbyEnum,
  PostRequest,
  PostsDocument,
  RefreshTokenDocument,
  initRequestClient,
} from "klabban-commerce";
import { KlabbanConfig } from "libs/klabbanConfig";
// import "klabban-commerce/react/index.css";
import { siteName } from "config/siteConfig";
import NextPreviousPostLink from "container/blogDetail/nextPreviousPost";
import { RelatePost } from "container/blogDetail/relatePost";
import { BlogContent } from "container/blogDetail/content";
import { FourceLogin } from "components/ForceLogin";
import { getTokenByRefreshToken } from "libs/refreshToken";

export interface BlogDetailPageProps {
  params: {
    blogSlug: string;
  };
}

// const option: RequestConfig = {};

async function fetchPost(slug: string, token: string | null) {
  const client = initRequestClient(KlabbanConfig);

  const headers = token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
  return await PostRequest({
    ...KlabbanConfig,
    variables: {
      id: slug,
      idType: Number.isNaN(Number(slug))
        ? PostIdType.Slug
        : PostIdType.DatabaseId,
      includeNextPreviousPost: true,
      includeTags: true,
      asPreview: token ? true : false,
    },
    option: {
      headers,
    },
  });
}

export async function generateMetadata({ params }: BlogDetailPageProps) {
  const { post } = await fetchPost(params.blogSlug, null);
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
  const token = isEnabled ? await getTokenByRefreshToken() : null;

  const { post } = await fetchPost(params.blogSlug, token);

  if (!post && !isEnabled) return notFound();
  return (
    <>
      <>
        <BlogContent post={post} />
        {isEnabled && <FourceLogin />}

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

export const revalidate = 60 * 60 * 24 * 30; // 1 month

export const runtime = "nodejs"; // 'nodejs' (default) | 'edge'

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
    first: 100,
  });

  return (
    postsData.posts?.nodes.map((post) => ({
      blogSlug: post.slug,
    })) || []
  );
}
