import { BlogPage, BlogSearchPageProps } from "components/blogSearch";

function Page(props: BlogSearchPageProps) {
  return (
    <>
      <div className="bg-gray-100 py-20">
        <div className="max-w-5xl mx-auto container px-5 text-center">
          <h1 className="text-h2 md:text-h1 font-bold text-center inline-block leading-[90px] text-gray-800">
            เรื่องราวของเรา
          </h1>
          <p className="text-h6 text-gray-800 font-medium max-w-3xl mx-auto">
            In many countries, as well as in Thailand, biking is not the focus
            of either online gambling providers or the player community.
          </p>
        </div>
      </div>
      <BlogPage {...props} pagePath="/blog" />
    </>
  );
}

export default Page;
