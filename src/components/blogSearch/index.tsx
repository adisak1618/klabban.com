import { PostCard } from "components/PostCard";
import Link from "next/link";
import {
  OrderEnum,
  PostObjectsConnectionOrderbyEnum,
  PostsRequest,
  TermObjectsConnectionOrderbyEnum,
  categoriesRequest,
} from "klabban-commerce";
import clsx from "clsx";
import { KlabbanConfig } from "libs/klabbanConfig";

export interface BlogSearchPageProps {
  categorySlug?: string;
  categoryName?: string;
  tagName?: string;
  className?: string;
  parentCategoryId?: number | null;
  limit?: number;
}

export async function BlogSearch({
  categoryName,
  tagName,

  className,
  parentCategoryId,
  categorySlug,
  limit = 1000,
}: BlogSearchPageProps) {
  const { posts } = await PostsRequest({
    ...KlabbanConfig,
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
      first: limit,
      includeAuthor: true,
    },
  });

  const { categories } = await categoriesRequest({
    ...KlabbanConfig,
    variables: {
      where: {
        orderby: TermObjectsConnectionOrderbyEnum.Count,
        hideEmpty: true,
        parent: parentCategoryId,
      },
    },
  });

  return (
    <>
      {(categories?.nodes || []).length > 0 && (
        <>
          <div className="container-content !max-w-7xl mt-6 flex flex-wrap justify-center">
            <h2 className="basis-full text-body uppercase leading-[1em] text-text-third tracking-widest text-center">
              หมวดหมู่ย่อย
            </h2>
            <>
              {categories?.nodes
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

      <p className=" basis-full text-caption leading-[1em] text-text-third tracking-widest text-center pt-3">
        <span className="font-medium">{posts?.pageInfo.total}</span>{" "}
        เนื้อหาในหัวข้อ&nbsp;
        <span className="font-medium">{categoryName || "บทความ"}</span>
      </p>

      <div
        className={clsx(
          "mx-auto !max-w-5xl my-3 lg:container px-5 md:flex justify-center md:gap-10 xl:gap-20",
          className
        )}
      >
        <div className="flex-1">
          {posts?.nodes.length === 0 && (
            <div className="text-h4 bg-secondary text-center py-20 rounded-2xl">
              <p className="text-text-color opacity-50">ไม่มีเนื้อหา</p>
              <p className="text-text-color text-caption opacity-50">
                โปรดลองเข้าดูในหัวข้ออื่น
              </p>
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
        </div>
      </div>
    </>
  );
}
