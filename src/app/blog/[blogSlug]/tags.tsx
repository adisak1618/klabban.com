"use client";
import { PostFragmentFragment } from "klabban-commerce";
import Link from "next/link";

export function PostTags(tags: PostFragmentFragment["tags"]): JSX.Element {
  if (tags && tags?.nodes.length === 0) return <></>;

  return (
    <>
      {tags?.nodes?.map((tag) => (
        <Link
          key={tag.id}
          href={`/tag/${tag.slug}`}
          className="bg-text-color hover:opacity-90 px-4 py-1 text-white rounded-full text-caption"
        >
          #{tag.name}
        </Link>
      ))}
    </>
  );
}
