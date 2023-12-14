"use client";
import { useCallback, useEffect } from "react";
import Prism from "prismjs";

export const PrismScript = () => {
  const highlight = useCallback(async () => {
    await Prism.highlightAll(); // <--- prepare Prism
  }, []);
  useEffect(() => {
    highlight();
  }, [highlight]);
  return <div></div>;
};
