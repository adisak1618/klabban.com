import { BackgroundProvider } from "components/BackgroundContext";
import { MainMenu } from "components/MainMenu";

import { HeroSection } from "container/homePage/HeroSection";
import { MyProjectsSection } from "container/homePage/MyProjects";
import { ProjectsSection } from "container/homePage/Mockup";
import { MyServicesSection } from "container/homePage/MyServices";
import { MySkillsSection } from "container/homePage/MySkills";
import { WhatIDoSection } from "container/homePage/WhatIDo";

async function Page() {
  return (
    <BackgroundProvider>
      <>
        <MainMenu light />
        <HeroSection />
        <WhatIDoSection />
        {/* <MySkillsSection /> */}

        <MyProjectsSection />
        <MyServicesSection />
        <ProjectsSection />
      </>
    </BackgroundProvider>
  );
}

export default Page;

export const dynamic = "force-static";
