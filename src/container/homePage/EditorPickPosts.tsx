import { PostCard } from "components/PostCard";
import Link from "next/link";
import { PageCustomUiQuery } from "../../gql/generated";
import { Button } from "components/ui/button";

export function EditorPickPosts(data: PageCustomUiQuery["page"]) {
  if (!data?.customPageUI?.popularPosts?.enable) return null;
  return (
    <div className="bg-gradient-to-b from-slate-400 to-slate-600 py-10 relative headline-shape text-secondary overflow-hidden">
      <div className="container-content text-center mb-6">
        <h2 className="text-h2 font-title font-bold text-primary">
          {data?.customPageUI?.popularPosts?.title}
        </h2>
        <p className="text-h6 text-white">
          {data?.customPageUI?.popularPosts?.description}
        </p>
      </div>
      <div className="mx-auto !max-w-5xl my-3 lg:container px-5 md:flex justify-center md:gap-10 xl:gap-20">
        <div className="flex-1">
          <div className="flex flex-wrap justify-center -mx-3">
            {data?.customPageUI?.popularPosts?.posts?.map((post) => (
              <Link
                className="basis-full md:basis-1/2 lg:basis-1/3 p-3"
                key={post?.slug}
                href={`/blog/${post?.slug}`}
              >
                <PostCard
                  title={post?.title}
                  featuredImage={post?.featuredImage}
                  id={post?.slug || ""}
                  databaseId={0}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
      {data.customPageUI?.popularPosts?.cta?.title && (
        <div className="container-content flex justify-center">
          <Link
            className="mx-auto"
            href={data.customPageUI?.popularPosts?.cta.url || "#"}
            target={data.customPageUI?.popularPosts?.cta.target}
          >
            <Button variant="default">
              {data.customPageUI?.popularPosts?.cta?.title}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
