"use client";
import { format } from "date-fns";
import { PostFragmentFragment } from "klabban-commerce";
import Image from "next/image";

export const PostCard = ({
  featuredImage,
  title,
  excerpt,
  date,
  author,
}: PostFragmentFragment) => {
  return (
    <div className="md:hover:bg-secondary border-border shadow-sm md:shadow-none md:hover:shadow-2xl cursor-pointer md:zoom-in h-full rounded-lg overflow-hidden flex flex-col bg-white">
      <div className="relative w-full pb-[60%] bg-third">
        {featuredImage && (
          <Image
            className="absolute left-0 top-0 w-full h-full object-cover object-center"
            alt={featuredImage?.node?.altText || ""}
            src={featuredImage?.node.sourceUrl || ""}
            width={250}
            height={200}
            // srcSet={featuredImage?.node.sourceUrl || ""}
          />
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-h5 md:text-h6 font-bold line-clamp-2 text-text-color break-words">
          {title}
        </h3>
        {excerpt ? (
          <div className="flex-1">
            <p className="line-clamp-2 text-text-third font-light">
              {excerpt?.replaceAll(
                /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g,
                ""
              )}
            </p>
          </div>
        ) : (
          <div className="flex-1"></div>
        )}
        <hr className="border-border !my-2.5" />
        <div className="text-caption text-center leading-4 flex gap-3 text-text-third">
          <p className="">
            By {author?.node.name} On{" "}
            {format(new Date(date || new Date()), "MMMM dd, yyyy")}
          </p>
          {/* <div>|</div>
          <div className="flex gap-3">
            {categories?.nodes.map((category) => (
              <span key={category.id} className="">
                {category.name}
              </span>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};
