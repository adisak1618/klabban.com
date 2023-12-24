"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useMousePosition } from "./useMousePosition";
import clsx from "clsx";

interface Rectangle {
  id: number;
  size: number;
  rotate: number;
  x: number;
  y: number;
  followDistanceRatio: number;
  opacity: number;
  color: string;
}

export const AnimateBackground: React.FC = () => {
  const [rectangles, setRectangles] = useState<Rectangle[]>([]);

  useEffect(() => {
    if (rectangles.length === 0) {
      const generateRect = Array.from({ length: 30 }).map((_, index) => ({
        id: index,
        size: Math.random() * (30 - 10) + 10, // Size between 10px and 50px
        rotate: Math.random() * 360,
        // x: (Math.random() * window.innerWidth) / 2 + window.innerHeight / 4,
        // y: Math.random() * window.innerHeight * 0.7 + window.innerHeight * 0.15,
        x: Math.random(),
        y: Math.random(),
        followDistanceRatio: Math.random() * 50,
        opacity: (Math.random() * 50) / 100 + 0,
        color: Math.random() > 0.5 ? "bg-[#cdcd6a]" : "bg-primary",
      }));
      console.log("hi2", generateRect);
      setRectangles(generateRect);
    }
  }, []);

  return (
    <motion.div
      initial={{ width: "100%", left: "0%", opacity: 1 }}
      animate={{
        width: `${scrollY * 50 + 100}%`,
        left: `-${(scrollY * 50) / 2}%`,
        // opacity: Math.max(1 - scrollY * 2, 0),
      }}
      transition={{
        type: "tween",
        delay: 0,
        ease: "linear",
        opacity: { delay: 0 },
      }}
      className="absolute h-screen left-0 top-0 "
    >
      {rectangles.map((rect) => (
        <motion.div
          className={clsx("absolute", rect.color)}
          key={rect.id}
          initial={{
            x: 0,
            opacity: 0,
            top: "50%",
            left: "50%",
            rotate: rect.rotate,
            scale: 1,
          }}
          style={{
            width: rect.size,
            height: rect.size,
            borderRadius: "20%",
            position: "absolute",
          }}
          animate={{
            // x: ((mousePositionX || 0) / 100) * rect.size * 2,
            // y: ((mousePositionY || 0) / 100) * rect.size * 2,
            opacity: rect.opacity,
            left: `${rect.x * 70 + 15}%`,
            top: `${rect.y * 100}%`,
            scale: scrollY * 1.5 + 1,
          }}
          transition={{
            type: "tween",
            ease: "backOut",
            // stiffness: 100,
            x: { delay: 0 },
            y: { delay: 0 },
            opacity: { delay: 0.5, duration: 2 },
            top: { delay: 0 },
            left: { delay: 0 },
          }}
        />
      ))}
    </motion.div>
  );
};
