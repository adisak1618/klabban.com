"use client";
import { motion } from "framer-motion";

export const FocusLineSVG = ({
  className,
  delay = 0,
  duration = 1,
}: {
  className?: string;
  delay?: number;
  duration?: number;
}) => {
  return (
    <svg
      width="216"
      height="148"
      viewBox="0 0 216 148"
      fill="none"
      // xmlns="http://www.w3.org/2000/svg"
      className={className || ""}
    >
      <motion.path
        d="M202 3.49998C231 76.4998 197.119 109.991 162.203 126.137C146.728 133.293 103.603 122.457 99.8805 112.039C95.0889 98.6271 118.384 96.7792 124.455 115.797C128.634 137.088 107.105 156.779 53.5875 133.293C47.5168 130.629 41.1499 127.89 35.5 124L15.5 112.039C18.2528 111.025 33.1046 104.321 30.1626 104.776C26.3113 105.371 22.5967 106.409 18.46 106.491C13.5659 106.588 9.34472 107.921 4.2256 107.475C-0.266324 107.084 25.0504 128.848 25.0504 128.848"
        stroke="#0E2F3E"
        strokeWidth="3"
        // strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration, delay, ease: "easeInOut" }}
      />
    </svg>
  );
};
