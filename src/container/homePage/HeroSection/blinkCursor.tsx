"use client";
import { motion } from "framer-motion";

const cursorVariants = {
  blinking: {
    opacity: [0, 0, 1, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatDelay: 0,
      ease: "linear",
      times: [0, 0.5, 0.5, 1],
    },
  },
};

type CursorBlinkerProps = {
  character?: string;
};

export default function CursorBlinker({ character = "I" }: CursorBlinkerProps) {
  return (
    <motion.div
      variants={cursorVariants}
      animate="blinking"
      className="inline-block "
    >
      {character}
    </motion.div>
  );
}
