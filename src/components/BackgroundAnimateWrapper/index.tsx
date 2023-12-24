"use client";
import clsx from "clsx";
import { useBackgroundContext } from "components/BackgroundContext";
import { useInView } from "framer-motion";
import { forwardRef, useEffect, useRef } from "react";

type BackgroundAnimateWrapperProps = {
  children: JSX.Element;
  className?: string;
  color: string;
};

type Ref = HTMLDivElement;

export const BackgroundAnimateWrapper = ({
  children,
  className,
  color,
}: BackgroundAnimateWrapperProps) => {
  const { setBackground } = useBackgroundContext();
  const elmRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(elmRef, {
    margin: "-50%",
    amount: 0,
  });
  useEffect(() => {
    isInView && setBackground(color);
  }, [isInView]);

  return (
    <div ref={elmRef} className={clsx(className, "relative")}>
      {children}
    </div>
  );
};
