"use client";
import { PostBySlugQuery } from "klabban-commerce";
import Link from "next/link";

export default function NextPreviousPostLink(
  props: PostBySlugQuery["post"]
): JSX.Element {
  return (
    <div className="max-w-5xl mx-auto flex justify-between container px-5 gap-3">
      {props?.previous ? (
        <Link
          className="hover:bg-secondary py-3 px-4 rounded-lg"
          href={`/blog/${props.previous.slug}`}
        >
          <div className="text-left group cursor-pointer">
            <p className="text-h6 font-bold text-text-color inline-block leading-[1em]">
              Previous
            </p>
            <p className="text-text-third line-clamp-1 leading-[1em]">
              {props.previous.title}
            </p>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {props?.next ? (
        <Link
          className="hover:bg-secondary py-3 px-4 rounded-lg"
          href={`/blog/${props?.next?.slug}`}
        >
          <div className="text-right group cursor-pointer">
            <p className="text-h6 font-bold text-text-color inline-block leading-[1em]">
              Next
            </p>
            <p className="text-text-third line-clamp-1 leading-[1em]">
              {props?.next?.title}
            </p>
          </div>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
