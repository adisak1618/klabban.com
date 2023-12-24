import {
  HTMLMotionProps,
  MotionStyle,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useMediaQuery } from "react-responsive";
import React, { ReactNode, useEffect, useRef } from "react";

type ParallaxBoxProps = HTMLMotionProps<"div"> & {
  style?: React.CSSProperties;
  children?: ReactNode;
  amount?: number;
  offset?: number;
};

export const ParallaxBox = ({
  children,
  style,
  amount = 50,
  offset = 0,
  ...otherProps
}: ParallaxBoxProps) => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 768px)",
  });
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["0 1", "0 0"],
  });
  const withPercent = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const animateY = useTransform(
    scrollYProgress,
    [0, 1],
    [((amount || 0) / 2) * -1 - offset, (amount || 0) / 2 - offset]
  );

  const animateStyle: MotionStyle = isDesktop
    ? {
        y: animateY,
      }
    : {};

  useEffect(() => {
    console.log("wrapperRef", wrapperRef);
  }, [wrapperRef]);

  return (
    <motion.div
      style={{ ...animateStyle, ...style }}
      ref={wrapperRef}
      {...otherProps}
    >
      {children}
    </motion.div>
  );
};
