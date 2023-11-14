import { PostCard } from "components/PostCard";
import { RandomPostsDocument, initRequestClient } from "klabban-commerce";
import { KlabbanConfig } from "libs/klabbanConfig";
import Link from "next/link";

interface RelatePostProps {
  postId: string;
  categoriesId: string[];
}

export async function RelatePost({ postId, categoriesId }: RelatePostProps) {
  const client = initRequestClient(KlabbanConfig);
  const { randomPosts } = await client.request(RandomPostsDocument, {
    notIn: [postId],
    categoryIn: categoriesId,
    limit: 3,
    includeContent: false,
  });

  return (
    <div>
      <div className="max-w-5xl mx-auto mb-6 container px-5">
        <h2 className="text-h3 font-bold underline-hilight inline-block leading-[44px]">
          เนื้อหาที่เกี่ยวข้อง
        </h2>
      </div>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4 container px-5">
        {randomPosts?.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <PostCard {...post} />
          </Link>
        ))}
      </div>
    </div>
  );
}
