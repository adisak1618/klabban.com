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

export function LastestPosts(data: PageCustomUiQuery["page"]) {
  if (!data?.customPageUI?.lastedPost?.enable) return null;
  return (
    <div className="bg-secondary py-10">
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
          },
          first: 6,
        }}
        // queryCategories={false}
        querytags={false}
        queryCategories={false}
      >
        {({ posts }) => (
          <>
            <div className="container-content text-center mb-6">
              <h2 className="text-h2 font-title font-bold">
                {data?.customPageUI?.lastedPost?.title}
              </h2>
              <p className="text-h6">
                {data?.customPageUI?.lastedPost?.description}
              </p>
            </div>
            <div className="mx-auto !max-w-5xl my-3 lg:container px-5 md:flex justify-center md:gap-10 xl:gap-20">
              <div className="flex-1">
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
            {data.customPageUI?.lastedPost?.cta?.title && (
              <div className="container-content flex justify-center">
                <Link
                  className="mx-auto"
                  href={data.customPageUI?.lastedPost?.cta.url || "#"}
                  target={data.customPageUI?.lastedPost?.cta.target}
                >
                  <Button variant="default">
                    {data.customPageUI?.lastedPost?.cta?.title}
                  </Button>
                </Link>
              </div>
            )}
          </>
        )}
      </PostsProvider>
    </div>
  );
}
