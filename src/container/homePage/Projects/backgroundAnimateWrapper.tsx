"use client";
import clsx from "clsx";
import { useBackgroundContext } from "components/BackgroundContext";
import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface BackgroundAnimateWrapperProps {
  children: JSX.Element;
  className?: string;
  color: string;
}

export const BackgroundAnimateWrapper = ({
  children,
  className,
  color,
}: BackgroundAnimateWrapperProps) => {
  const { setBackground } = useBackgroundContext();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    margin: "-50%",
    amount: 0,
  });
  useEffect(() => {
    console.log(color, "isInView", isInView);
    isInView && setBackground(color);
  }, [isInView]);

  return (
    <div ref={ref} className={clsx(className, "relative")}>
      {children}
    </div>
  );
};
