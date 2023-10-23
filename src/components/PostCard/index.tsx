import { format } from "date-fns";
import { PostFragmentFragment } from "klabban-commerce";

export const PostCard = ({
  featuredImage,
  title,
  date,
}: PostFragmentFragment) => {
  return (
    <div className="bg-white shadow-sm md:hover:shadow-2xl cursor-pointer md:zoom-in h-full rounded-lg border border-white overflow-hidden">
      <div className="relative w-full pb-[56.25%] bg-gray-200">
        {featuredImage && (
          <img
            className="absolute left-0 top-0 w-full h-full object-cover object-center"
            alt={featuredImage?.node?.altText || ""}
            src={featuredImage?.node.sourceUrl || ""}
            srcSet={featuredImage?.node.sourceUrl || ""}
          />
        )}
      </div>
      <div className="p-3 space-y-1">
        <p className="text-h5 font-medium leading-8 line-clamp-2">{title}</p>
        <div className="text-caption text-center leading-4 text-gray-400 flex gap-3">
          <p className="">
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
