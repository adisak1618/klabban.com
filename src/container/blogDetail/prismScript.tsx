"use client";
import { useEffect } from "react";
import Prism from "prismjs";

export const PrismScript = () => {
  useEffect(() => {
    const highlight = async () => {
      await Prism.highlightAll(); // <--- prepare Prism
    };
    highlight();
  }, []);
  return <div></div>;
};
