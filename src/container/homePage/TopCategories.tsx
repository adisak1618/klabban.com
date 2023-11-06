import Link from "next/link";
import { PageCustomUiQuery } from "../../gql/generated";

export function TopCategories(data: PageCustomUiQuery["page"]) {
  return (
    <div className="py-10">
      <div className="container-content text-center mb-6">
        <h2 className="text-h6 font-title font-bold">
          {data?.customPageUI?.topCategories?.title}
        </h2>
        <p>{data?.customPageUI?.topCategories?.description}</p>
      </div>

      <div className="flex flex-wrap md:gap-4 md:justify-center md:container">
        {data?.customPageUI?.topCategories?.categories?.map((cateogry) => (
          <Link
            className="inline-block group w-1/2 md:w-[250px] md:zoom-in bg-secondary overflow-hidden md:rounded-md relative"
            href={`/category/${cateogry?.slug}`}
            key={cateogry?.slug}
          >
            <div className="pb-[60%]">
              <img
                className="grayscale group-hover:grayscale-0 absolute w-full h-full"
                src={cateogry?.cover?.sourceUrl}
                alt={cateogry?.cover?.altText}
              />
              <div className="absolute w-full h-full bg-black opacity-20 group-hover:opacity-0 transition-opacity" />
              <p className="p-3 drop-shadow-lg text-h5 text-white font-bold whitespace-pre-wrap break-words absolute w-full h-full flex justify-center items-center">
                {cateogry?.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
