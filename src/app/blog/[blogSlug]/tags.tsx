"use client";
import { PostCard } from "components/PostCard";
import { PostBySlugQuery } from "klabban-commerce";
import { useRandomPosts } from "klabban-commerce/react";
import Link from "next/link";

interface RelatePostProps {
  postId: string;
  categoriesId: string[];
}

export function PostTags(props: PostBySlugQuery["post"]): JSX.Element {
  if (props?.tags && props?.tags?.nodes.length === 0) return <></>;

  return (
    <div className="max-w-5xl mx-auto flex gap-4 container px-5 items-center justify-center">
      {props?.tags?.nodes?.map((tag) => (
        <Link
          key={tag.id}
          href={`/tag/${tag.slug}`}
          className="bg-gray-800 px-4 py-1 text-white rounded-full text-caption"
        >
          #{tag.name}
        </Link>
      ))}
    </div>
  );
}
