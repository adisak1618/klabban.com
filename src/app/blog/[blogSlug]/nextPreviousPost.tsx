"use client";
import { PostBySlugQuery } from "klabban-commerce";
import Link from "next/link";

export default function NextPreviousPostLink(
  props: PostBySlugQuery["post"]
): JSX.Element {
  return (
    <div className="max-w-5xl mx-auto grid grid-cols-2 container px-5 gap-3">
      {props?.previous ? (
        <Link
          className="bg-white/50 py-2 px-6 rounded-lg"
          href={`/blog/${props.previous.slug}`}
        >
          <div className="text-left group cursor-pointer">
            <p className="text-h6 font-medium text-gray-500 inline-block group-hover:underline-hilight pr-3">
              Previous
            </p>
            <p className="text-black font-bold line-clamp-1">
              {props.previous.title}
            </p>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {props?.next ? (
        <Link
          className="bg-white/50 py-2 px-6 rounded-lg"
          href={`/blog/${props.next.slug}`}
        >
          <div className="text-right group cursor-pointer">
            <p className="text-h6 font-medium text-gray-500 inline-block group-hover:underline-hilight pl-3">
              Next
            </p>
            <p className="font-bold line-clamp-1">{props.next.title}</p>
          </div>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
