"use client";
import { PostCard } from "components/PostCard";
import { useRandomPosts } from "klabban-commerce/react";
import Link from "next/link";

interface RelatePostProps {
  postId: string;
  categoriesId: string[];
}

export function RelatePost({
  postId,
  categoriesId,
}: RelatePostProps): JSX.Element {
  const [{ data, fetching, error }, refresh] = useRandomPosts({
    notIn: [postId],
    categoryIn: categoriesId,
    limit: 3,
    includeContent: false,
  });

  if (fetching || !data || data.randomPosts.length === 0) return <></>;

  return (
    <div className="bg-gray-100 pt-20 pb-10">
      <div className="max-w-5xl mx-auto mb-6 container px-5">
        <h3 className="text-h3 font-bold underline-hilight inline-block leading-[44px]">
          เนื้อหาที่เกี่ยวข้อง
        </h3>
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
