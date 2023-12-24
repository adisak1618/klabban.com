"use client";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
const CodeFont = Ubuntu_Mono({
  subsets: ["latin"],
  style: "italic",
  weight: ["700", "400"],
});
import CursorBlinker from "./blinkCursor";
import { useEffect } from "react";
import { Ubuntu_Mono } from "next/font/google";
import clsx from "clsx";

export default function ImTextAnimate() {
  const textIndex = useMotionValue(0);
  // const texts = ["Full Stack Developer", "Freelancer", "Music Lover"];
  const texts = [
    "OTTO",
    "Full Stack Developer💻",
    "Freelancer",
    "Content Creators",
  ];

  useEffect(() => {
    animate(count, 60, {
      type: "tween",
      delay: 1,
      duration: 2,
      ease: "easeIn",
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 0.5,
      onUpdate(latest) {
        if (updatedThisRound.get() === true && latest > 0) {
          updatedThisRound.set(false);
        } else if (updatedThisRound.get() === false && latest === 0) {
          if (textIndex.get() === texts.length - 1) {
            textIndex.set(0);
          } else {
            textIndex.set(textIndex.get() + 1);
          }
          updatedThisRound.set(true);
        }
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const baseText = useTransform(textIndex, (latest) => texts[latest] || "");
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    baseText.get().slice(0, latest)
  );
  const updatedThisRound = useMotionValue(true);
  return (
    <h1 className="flex-1 text-center md:text-left text-[36px] sm:text-[48px] md:text-[60px] lg:text-[90px] font-black font-heading leading-[1em] max-w-4xl">
      <span className="text-primary">I&apos;m a</span>&nbsp;
      <motion.span className={clsx("inline text-text-secondary-color")}>
        {displayText}
      </motion.span>
      &nbsp;
      <CursorBlinker />
    </h1>
  );
}
