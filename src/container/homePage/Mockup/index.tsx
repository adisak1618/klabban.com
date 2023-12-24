import clsx from "clsx";
import { BackgroundAnimateWrapper } from "components/BackgroundAnimateWrapper";
import { LastestPosts } from "../LatestPosts";
import { Button } from "components/ui/button";
import Link from "next/link";

export const ProjectsSection = () => {
  return (
    <>
      {/* <BackgroundAnimateWrapper
        className={clsx("min-h-[400vh] w-full pt-80 relative text-center")}
        color="#EEEED1"
      >
        <h1 className="text-h1 font-black font-heading">Project 1</h1>
      </BackgroundAnimateWrapper> */}
      <BackgroundAnimateWrapper
        className={clsx("w-full container mx-auto py-80 relative")}
        color="#f5f5f7"
      >
        <>
          <div className="flex justify-between mb-6 items-baseline">
            <h1 className="text-h3 font-bold font-heading tracking-tight text-text-secondary-color">
              I also talk and write about Web Development
            </h1>
            <Link href="/blog" className="font-normal text-primary text-xl">
              See All
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-6">
            <LastestPosts first={8} categoryName="technology" />
          </div>
        </>
      </BackgroundAnimateWrapper>
    </>
  );
};
