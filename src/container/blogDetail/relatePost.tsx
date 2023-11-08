"use client";
import { PostCard } from "components/PostCard";
import { useRandomPostsQuery } from "klabban-commerce/queryHooks";
import Link from "next/link";

interface RelatePostProps {
  postId: string;
  categoriesId: string[];
}

export function RelatePost({
  postId,
  categoriesId,
}: RelatePostProps): JSX.Element {
  const { data, loading } = useRandomPostsQuery({
    variables: {
      notIn: [postId],
      categoryIn: categoriesId,
      limit: 3,
      includeContent: false,
    },
    fetchPolicy: "cache-first",
    canonizeResults: false,
  });

  if (loading || !data || data.randomPosts.length === 0) return <></>;

  return (
    <div>
      <div className="max-w-5xl mx-auto mb-6 container px-5">
        <h2 className="text-h3 font-bold underline-hilight inline-block leading-[44px]">
          เนื้อหาที่เกี่ยวข้อง
        </h2>
      </div>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4 container px-5">
        {data?.randomPosts?.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <PostCard {...post} />
          </Link>
        ))}
      </div>
    </div>
  );
}
