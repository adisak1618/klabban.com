import { RedirectPreviewUrl } from "components/PreviewModeProvider/redirectPreviewUrl";
import homePage, {
  generateMetadata as pageGenerateMetadata,
} from "./[pageSlug]/page";

export async function generateMetadata() {
  const generateMeta = await pageGenerateMetadata({
    params: {
      pageSlug: "home",
    },
    searchParams: {},
  });
  return {
    ...generateMeta,
    alternates: {
      canonical: `${process.env.BASE_URL}`,
    },
  };
}

async function Page() {
  return (
    <>
      {homePage({
        params: {
          pageSlug: "/",
        },
        searchParams: {},
      })}
      <RedirectPreviewUrl />
    </>
  );
}

export default Page;

// export const revalidate = 60 * 60 * 24 * 30; // 1 month
export const dynamic = "force-static";
