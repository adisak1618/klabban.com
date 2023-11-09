import homePage, {
  generateMetadata as pageGenerateMetadata,
} from "../[pageSlug]/page";

export async function generateMetadata() {
  return await pageGenerateMetadata({
    params: {
      pageSlug: "home",
    },
    searchParams: {},
  });
}

async function Page() {
  return homePage({
    params: {
      pageSlug: "home",
    },
    searchParams: {},
  });
}

export default Page;
