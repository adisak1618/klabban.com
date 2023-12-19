"use client";
import clsx from "clsx";
import { BackgroundAnimateWrapper } from "./backgroundAnimateWrapper";

function isDivInView(divElement: HTMLElement, offset?: number) {
  const rect = divElement.getBoundingClientRect();

  // Check if the DIV is in view
  const inViewVertically = rect.top - (offset || 0) >= 0;

  return !inViewVertically;
}

export const ProjectsSection = () => {
  return (
    <>
      <BackgroundAnimateWrapper
        className={clsx("min-h-[150vh] w-full pt-80 relative text-center")}
        color="#e0e0ac"
      >
        <h1 className="text-h1 font-black font-heading">Project 1</h1>
      </BackgroundAnimateWrapper>
      <BackgroundAnimateWrapper
        className={clsx("min-h-[150vh] w-full pt-80 relative text-center")}
        color="#F5CCA0"
      >
        <h1 className="text-h1 font-black font-heading">Project 2</h1>
      </BackgroundAnimateWrapper>
      <BackgroundAnimateWrapper
        className={clsx("min-h-[150vh] w-full pt-80 relative text-center")}
        color="#9EB384"
      >
        <h1 className="text-h1 font-black font-heading">Project 3</h1>
      </BackgroundAnimateWrapper>
      <BackgroundAnimateWrapper
        className={clsx("min-h-[150vh] w-full pt-80 relative text-center")}
        color="#FFB534"
      >
        <h1 className="text-h1 font-black font-heading">Project 4</h1>
      </BackgroundAnimateWrapper>
    </>
  );
};
