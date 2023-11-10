import { PageContent } from "container/pageDetail/content";

interface CustomPageParams extends PageSearchParams {
  params: {
    pageSlug: string;
  };
}

async function Page(props: CustomPageParams) {
  return (
    <>
      <PageContent slug={props.params.pageSlug} />
    </>
  );
}

export default Page;

export const dynamic = "force-dynamic";
