import { MainMenu } from "components/MainMenu";
import { Button } from "components/ui/button";
import { HeroSection } from "container/homePage/HeroSection";
import { motion } from "framer-motion";

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
      <HeroSection />
      <div>
        <div className="container mx-auto">
          <h1>asdf</h1>
        </div>
      </div>

      {/* <RedirectPreviewUrl /> */}
    </>
  );
}

export default Page;

// export const revalidate = 60 * 60 * 24 * 30; // 1 month
export const dynamic = "force-static";
