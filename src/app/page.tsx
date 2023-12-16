import { MainMenu } from "components/MainMenu";

// import { generateMetadata as pageGenerateMetadata } from "./[pageSlug]/page";

// export async function generateMetadata() {
//   const generateMeta = await pageGenerateMetadata({
//     params: {
//       pageSlug: "home",
//     },
//     searchParams: {},
//   });
//   return {
//     ...generateMeta,
//     alternates: {
//       canonical: `${process.env.BASE_URL}`,
//     },
//   };
// }

async function Page() {
  return (
    <>
      <MainMenu light />
      <div>home page</div>
      {/* <RedirectPreviewUrl /> */}
    </>
  );
}

export default Page;

// export const revalidate = 60 * 60 * 24 * 30; // 1 month
export const dynamic = "force-static";
