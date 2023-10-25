import { PostCard } from "components/PostCard";
import Link from "next/link";
import {
  OrderEnum,
  PostObjectsConnectionOrderbyEnum,
  PostsProvider,
  TermObjectsConnectionOrderbyEnum,
} from "klabban-commerce";
import { KlabbanConfig } from "libs/klabbanConfig";
import clsx from "clsx";
import { fi } from "date-fns/locale";

export interface BlogSearchPageProps {
  searchParams: { [key: string]: string | string[] };
  categoryName?: string;
  tagName?: string;
  pagePath: string;
  className?: string;
}

const defaultPageSize = 9;

export function BlogPage({
  searchParams,
  categoryName,
  tagName,
  pagePath,
  className,
}: BlogSearchPageProps): JSX.Element {
  const before = Array.isArray(searchParams.before)
    ? searchParams.before[0]
    : searchParams.before;
  const after = Array.isArray(searchParams.after)
    ? searchParams.after[0]
    : searchParams.after;
  const last = !!before ? defaultPageSize : undefined;
  const first = !!after || (!before && !after) ? defaultPageSize : undefined;

  return (
    <PostsProvider
      {...KlabbanConfig}
      postsQueryOption={{
        where: {
          orderby: [
            {
              field: PostObjectsConnectionOrderbyEnum.Date,
              order: OrderEnum.Desc,
            },
          ],
          categoryName,
          tag: tagName,
        },
        first,
        before,
        last,
        after,
      }}
      categoriesQueryOption={{
        where: {
          orderby: TermObjectsConnectionOrderbyEnum.Count,
        },
      }}
    >
      {({ posts, categories, tags }) => (
        <div
          className={clsx(
            "mx-auto !max-w-5xl mt-6 mb-3 lg:container px-5 md:flex justify-center md:gap-10 xl:gap-20",
            className
          )}
        >
          {/* <div className="md:space-y-6 mb-6 md:block gap-6 flex-wrap hidden">
            <div className="">
              <h3 className="text-h5 md:text-h4 font-bold underline-hilight-secondary inline-block whitespace-nowrap">
                หมวดหมู่
              </h3>
              <div className="flex md:block gap-3">
                {categories?.nodes.map((category) => (
                  <Link
                    href={`/category/${category.slug}`}
                    key={category.id}
                    className="hover:underline block text-gray-800 font-medium"
                  >
                    {category.name} ({category.count || 0})
                  </Link>
                ))}
              </div>
            </div>
            <div className="">
              <h3 className="text-h5 md:text-h4 font-bold underline-hilight-secondary inline">
                หัวข้อ
              </h3>
              <div className="flex md:block gap-3">
                {tags?.nodes.map((tag) => (
                  <Link
                    href={`/tag/${tag.slug}`}
                    key={tag.id}
                    className="hover:underline block text-gray-800 font-medium"
                  >
                    {tag.name} ({tag.count || 0})
                  </Link>
                ))}
              </div>
            </div>
          </div> */}
          <div className="flex-1">
            {posts?.nodes.length === 0 && (
              <div className="text-h4 text-gray-400 text-center py-20 border rounded-2xl border-dashed">
                ไม่มีเนื้อหา
              </div>
            )}
            <div className="flex flex-wrap justify-center -mx-3">
              {posts?.nodes.map((post) => (
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
              <div className="grid grid-cols-2 gap-3">
                {posts?.pageInfo.hasPreviousPage ? (
                  <Link
                    className="hover:bg-white/50 p-2 rounded-md"
                    href={{
                      pathname: pagePath,
                      query: { before: posts.pageInfo.startCursor },
                    }}
                  >
                    <div className="text-left group cursor-pointer">
                      <p className="text-h6 font-medium text-gray-500 inline-block group-hover:underline-hilight">
                        Previous
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
                {posts?.pageInfo.hasNextPage ? (
                  <Link
                    className="hover:bg-white/50 p-2 rounded-md"
                    href={{
                      pathname: pagePath,
                      query: { after: posts.pageInfo.endCursor },
                    }}
                  >
                    <div className="text-right group cursor-pointer">
                      <p className="text-h6 font-medium text-gray-500 inline-block group-hover:underline-hilight">
                        Next
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </PostsProvider>
  );
}
