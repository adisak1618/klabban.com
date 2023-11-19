import { PostCard } from "components/PostCard";
import Link from "next/link";
import { PageCustomUiQuery } from "../../gql/generated";
import { Button } from "components/ui/button";
import clsx from "clsx";

export function EditorPickPosts(
  data: NonNullable<
    NonNullable<PageCustomUiQuery["page"]>["customPageUI"]
  >["popularPosts"]
) {
  return (
    <div
      style={{ order: data?.order || 99 }}
      className={clsx(
        "bg-gradient-to-b from-slate-400 to-slate-600 py-10 relative text-secondary overflow-hidden",
        data?.enableShape && "headline-shape"
      )}
    >
      <div className="container-content text-center mb-6">
        <h2 className="text-h3 md:text-h2 font-title font-bold text-primary">
          {data?.title}
        </h2>
        <p className="text-h6 text-white">{data?.description}</p>
      </div>
      <div className="mx-auto !max-w-5xl my-3 lg:container px-5 md:flex justify-center md:gap-10 xl:gap-20">
        <div className="flex-1">
          <div className="flex flex-wrap justify-center -mx-3">
            {data?.posts?.map((post) => (
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
    </div>
  );
}
