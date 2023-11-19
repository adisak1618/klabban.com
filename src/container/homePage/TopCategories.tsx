import Link from "next/link";
import { PageCustomUiQuery } from "../../gql/generated";
import Image from "next/image";

export function TopCategories(
  data: NonNullable<
    NonNullable<PageCustomUiQuery["page"]>["customPageUI"]
  >["topCategories"]
) {
  return (
    <div style={{ order: data?.order || 99 }} className="pb-0 pt-10 md:py-10">
      <div className="container-content text-center mb-6">
        <h2 className="text-h3 md:text-h2 font-title font-bold">
          {data?.title}
        </h2>
        <p>{data?.description}</p>
      </div>

      <div className="flex flex-wrap md:gap-4 md:justify-center md:container">
        {data?.categories?.map((cateogry) => (
          <Link
            className="inline-block group w-1/2 md:w-[250px] md:zoom-in bg-secondary overflow-hidden md:rounded-md relative"
            href={`/category/${cateogry?.slug}`}
            key={cateogry?.slug}
          >
            <div className="pb-[60%]">
              {cateogry?.cover?.medium_large && (
                <Image
                  className="grayscale group-hover:grayscale-0 absolute w-full h-full"
                  src={cateogry?.cover?.medium_large || ""}
                  // srcSet={cateogry?.cover?.srcSet}
                  width={200}
                  height={150}
                  quality={30}
                  alt={cateogry?.cover?.altText || ""}
                />
              )}
              <div className="absolute w-full h-full bg-black opacity-20 group-hover:opacity-0 transition-opacity" />
              <div className="p-3 text-h5 text-white  font-bold whitespace-pre-wrap break-words absolute w-full h-full flex justify-center items-center">
                <p className="bg-black/50 rounded-lg px-3 drop-shadow-2xl">
                  {cateogry?.name}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
