"use client";
import { PostCard } from "components/PostCard";
import Link from "next/link";
import {
  OrderEnum,
  PostObjectsConnectionOrderbyEnum,
  TermObjectsConnectionOrderbyEnum,
} from "klabban-commerce";
import { usePostsQuery, useCategoriesQuery } from "klabban-commerce/queryHooks";
import clsx from "clsx";
import { OutlineButton } from "components/Button/outline";
import { PostCardSkeleton } from "../PostCard/skeleton";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export interface BlogSearchPageProps {
  categorySlug?: string;
  categoryName?: string;
  tagName?: string;
  pagePath: string;
  className?: string;
  parentCategoryId?: number | null;
}

const defaultPageSize = 9;

export function BlogSearch({
  categoryName,
  tagName,
  pagePath,
  className,
  parentCategoryId,
  categorySlug,
}: BlogSearchPageProps): JSX.Element {
  const searchParams = useSearchParams();
  const [total, setTotal] = useState(0);
  const before = searchParams.get("before");
  const after = searchParams.get("after");
  const last = !!before ? defaultPageSize : undefined;
  const first = !!after || (!before && !after) ? defaultPageSize : undefined;

  const { data: postsData, loading: loadingPosts } = usePostsQuery({
    variables: {
      where: {
        orderby: [
          {
            field: PostObjectsConnectionOrderbyEnum.Date,
            order: OrderEnum.Desc,
          },
        ],
        categoryName: categorySlug,
        tag: tagName,
      },
      first,
      before,
      last,
      after,
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    pollInterval: 0,
  });

  const { data: categoriesData } = useCategoriesQuery({
    variables: {
      where: {
        orderby: TermObjectsConnectionOrderbyEnum.Count,
        hideEmpty: true,
        parent: parentCategoryId,
      },
    },
    canonizeResults: true,
    pollInterval: 0,
  });

  useEffect(() => {
    setTotal(postsData?.posts?.pageInfo.total || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!postsData?.posts?.pageInfo.total]);
  return (
    <>
      {(categoriesData?.categories?.nodes || []).length > 0 && (
        <>
          <div className="container-content !max-w-7xl mt-6 flex flex-wrap justify-center">
            <h2 className="basis-full text-body uppercase leading-[1em] text-text-third tracking-widest text-center">
              หมวดหมู่ย่อย
            </h2>
            <>
              {categoriesData?.categories?.nodes
                .filter((t) => t.slug !== "uncategorized")
                .map((category) => (
                  <Link
                    href={`/category/${category.slug}`}
                    key={category.id}
                    // className="basis-1/2 md:basis-1/3 lg:basis-1/3 xl:basis-1/4 relative p-3"
                    className="px-3 text-h5 tracking-[0.15em] uppercase font-bold transition-transform hover:scale-105"
                  >
                    {category.name}
                  </Link>
                ))}
            </>
          </div>
          <hr className="my-3 border-border max-w-sm mx-auto" />
        </>
      )}

      {!loadingPosts && (
        <p className=" basis-full text-caption leading-[1em] text-text-third tracking-widest text-center pt-3">
          <span className="font-medium">{total}</span> เนื้อหาในหัวข้อ&nbsp;
          <span className="font-medium">{categoryName || "บทความ"}</span>
        </p>
      )}

      <div
        className={clsx(
          "mx-auto !max-w-5xl my-3 lg:container px-5 md:flex justify-center md:gap-10 xl:gap-20",
          className
        )}
      >
        <div className="flex-1">
          {postsData?.posts?.nodes.length === 0 && (
            <div className="text-h4 bg-secondary text-center py-20 rounded-2xl">
              <p className="text-text-color opacity-50">ไม่มีเนื้อหา</p>
              <p className="text-text-color text-caption opacity-50">
                โปรดลองเข้าดูในหัวข้ออื่น
              </p>
            </div>
          )}
          <div className="flex flex-wrap justify-center -mx-3">
            {loadingPosts &&
              [1, 2, 3, 4, 5, 6].map((index) => (
                <PostCardSkeleton key={index} />
              ))}
            {postsData?.posts?.nodes.map((post) => (
              <Link
                className="basis-full md:basis-1/2 lg:basis-1/3 p-3"
                key={post.id}
                href={`/blog/${post.slug}`}
              >
                <PostCard {...post} />
              </Link>
            ))}
          </div>
          <div className="pb-10">
            <div className="flex justify-between gap-3">
              {postsData?.posts?.pageInfo.hasPreviousPage ? (
                <Link
                  className="hover:bg-white/50 p-2 rounded-md"
                  href={{
                    pathname: pagePath,
                    query: { before: postsData.posts.pageInfo.startCursor },
                  }}
                >
                  <OutlineButton>
                    <div className="flex gap-3 items-center">
                      <svg
                        width="15"
                        height="15"
                        role="img"
                        aria-hidden="true"
                        className="-scale-x-100"
                        enableBackground="new 0 0 19 18"
                        viewBox="0 0 19 18"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="m9.3.3c-.4.4-.4 1 0 1.4l6.3 6.3h-14.6c-.6 0-1 .4-1 1s.4 1 1 1h14.6l-6.3 6.3c-.4.4-.4 1 0 1.4s1 .4 1.4 0l8-8c.1-.1.2-.2.2-.3.1-.1.1-.3.1-.4s0-.3-.1-.4c0-.1-.1-.2-.2-.3l-8-8c-.4-.4-1-.4-1.4 0z"
                          fill="currentColor"
                        ></path>
                      </svg>
                      <p>ก่อนหน้า</p>
                    </div>
                  </OutlineButton>
                </Link>
              ) : (
                <div />
              )}
              {postsData?.posts?.pageInfo.hasNextPage ? (
                <Link
                  className="hover:bg-white/50 p-2 rounded-md"
                  href={{
                    pathname: pagePath,
                    query: { after: postsData?.posts.pageInfo.endCursor },
                  }}
                >
                  <OutlineButton>
                    <div className="flex gap-3 items-center">
                      <p>ต่อไป</p>
                      <svg
                        width="15"
                        height="15"
                        role="img"
                        aria-hidden="true"
                        className=""
                        enableBackground="new 0 0 19 18"
                        viewBox="0 0 19 18"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="m9.3.3c-.4.4-.4 1 0 1.4l6.3 6.3h-14.6c-.6 0-1 .4-1 1s.4 1 1 1h14.6l-6.3 6.3c-.4.4-.4 1 0 1.4s1 .4 1.4 0l8-8c.1-.1.2-.2.2-.3.1-.1.1-.3.1-.4s0-.3-.1-.4c0-.1-.1-.2-.2-.3l-8-8c-.4-.4-1-.4-1.4 0z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                  </OutlineButton>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
