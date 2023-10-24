import { BlogPage } from "components/blogSearch";

interface PageProps extends PageSearchParams {
  params: {
    categorySlug: string;
  };
}

export default function Page(props: PageProps) {
  return (
    <>
      <div className=" py-6">
        <div className="max-w-5xl mx-auto container px-5 text-center">
          <h1 className="text-h1 font-bold text-center inline-block leading-[90px] uppercase text-gray-600 drop-shadow-lg underline-hilight underline-hilight-hover">
            {props.params.categorySlug}
          </h1>
        </div>
      </div>
      <BlogPage
        categoryName={props.params.categorySlug}
        {...props}
        pagePath={`/category/${props.params.categorySlug}`}
      />
    </>
  );
}
