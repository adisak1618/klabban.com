import { FourceLogin } from "components/ForceLogin";
import { PageContent } from "container/pageDetail/content";
import { draftMode } from "next/headers";

interface CustomPageParams extends PageSearchParams {
  params: {
    pageSlug: string;
  };
}

async function Page(props: CustomPageParams) {
  const { isEnabled } = draftMode();
  return (
    <>
      {isEnabled && <FourceLogin />}
      <PageContent slug={props.params.pageSlug} />
    </>
  );
}

export default Page;

export const dynamic = "force-dynamic";
