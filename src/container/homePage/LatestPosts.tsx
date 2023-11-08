"use client";
import { PostCard } from "components/PostCard";
import {
  OrderEnum,
  PostObjectsConnectionOrderbyEnum,
  PostsProvider,
} from "klabban-commerce";
import { KlabbanConfig } from "libs/klabbanConfig";
import Link from "next/link";
import { PageCustomUiQuery } from "../../gql/generated";
import { Button } from "components/ui/button";
import { usePostsQuery } from "klabban-commerce/queryHooks";

export function LastestPosts(
  data: NonNullable<
    NonNullable<PageCustomUiQuery["page"]>["customPageUI"]
  >["lastedPost"]
) {
  const { data: postsData } = usePostsQuery({
    variables: {
      where: {
        orderby: [
          {
            field: PostObjectsConnectionOrderbyEnum.Date,
            order: OrderEnum.Desc,
          },
        ],
      },
      first: 6,
    },
  });
  return (
    <div style={{ order: data?.order }} className="bg-secondary py-10">
      <>
        <div className="container-content text-center mb-6">
          <h2 className="text-h2 font-title font-bold">{data?.title}</h2>
          <p className="text-h6">{data?.description}</p>
        </div>
        <div className="mx-auto !max-w-5xl my-3 lg:container px-5 md:flex justify-center md:gap-10 xl:gap-20">
          <div className="flex-1">
            <div className="flex flex-wrap justify-center -mx-3">
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
          </div>
        </div>
        {data?.cta?.title && (
          <div className="container-content flex justify-center">
            <Link
              className="mx-auto"
              href={data?.cta.url || "#"}
              target={data?.cta.target}
            >
              <Button variant="default">{data?.cta?.title}</Button>
            </Link>
          </div>
        )}
      </>
    </div>
  );
}
