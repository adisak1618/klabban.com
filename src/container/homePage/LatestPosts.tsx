import { PostCard } from "components/PostCard";
import {
  OrderEnum,
  PostObjectsConnectionOrderbyEnum,
  PostsRequest,
} from "klabban-commerce";
import Link from "next/link";
import { Button } from "components/ui/button";
// import { PostCardSkeleton } from "components/PostCard/skeleton";
// import { usePostsQuery } from "klabban-commerce/queryHooks";
import { KlabbanConfig } from "libs/klabbanConfig";

type LastestPostsProps = {
  first?: number;
  categoryName?: string;
};

export async function LastestPosts({
  first = 8,
  categoryName,
}: LastestPostsProps) {
  const { posts } = await PostsRequest({
    ...KlabbanConfig,
    variables: {
      first,
      includeAuthor: true,
      where: {
        categoryName,
        orderby: [
          {
            field: PostObjectsConnectionOrderbyEnum.Date,
            order: OrderEnum.Desc,
          },
        ],
      },
    },
    option: {
      cache: "force-cache",
    },
  });

  return (
    <>
      {posts?.nodes.map((post) => (
        <Link key={post.id} href={`/blog/${post.slug}`}>
          <PostCard {...post} />
        </Link>
      ))}
    </>
  );
}
