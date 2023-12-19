import { BackgroundProvider } from "components/BackgroundContext";
import { MainMenu } from "components/MainMenu";

import { HeroSection } from "container/homePage/HeroSection";
import { MyServicesSection } from "container/homePage/MyServices";
import { ProjectsSection } from "container/homePage/Projects";

async function Page() {
  return (
    <BackgroundProvider>
      <>
        <MainMenu light />

        <HeroSection />
        <MyServicesSection />
        <ProjectsSection />
      </>
    </BackgroundProvider>
  );
}

export default Page;

export const dynamic = "force-static";
