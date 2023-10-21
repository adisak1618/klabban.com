"use client";
import { PostCard } from "components/PostCard";
import { usePosts } from "klabban-commerce/react";
import Link from "next/link";

interface RelatePostProps {
  postId: string;
  categoriesId: string[];
}

export default function RelateProducts({
  postId,
  categoriesId,
}: RelatePostProps): JSX.Element {
  const [{ data, fetching, error }, refresh] = usePosts({
    where: {
      notIn: [postId],
      categoryIn: categoriesId,
    },
    first: 3,
    full: false,
  });

  if (fetching || !data || data.posts?.nodes.length === 0) return <></>;

  return (
    <div className="bg-gray-100 py-20">
      <div className="max-w-5xl mx-auto mb-6">
        <h3 className="text-h3 font-bold underline-hilight inline-block leading-[44px]">
          เนื้อหาที่เกี่ยวข้อง
        </h3>
      </div>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.posts?.nodes?.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <PostCard {...post} />
          </Link>
        ))}
      </div>
    </div>
  );
}
