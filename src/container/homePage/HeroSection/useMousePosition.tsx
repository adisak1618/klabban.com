import { useState, useEffect } from "react";

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<{
    x: number | undefined;
    y: number | undefined;
  }>({ x: undefined, y: undefined });
  const [scrollY, setScrollY] = useState(0);

  const updateMousePosition = (e: MouseEvent) => {
    setMousePosition({
      x: Math.round((e.clientX / window.innerWidth) * 100),
      y: Math.min(Math.round((e.clientY / window.innerHeight) * 100), 100),
    });
  };

  const updateScrollPosition = () => {
    setScrollY(Math.min(window.scrollY / window.innerHeight, 1));
  };

  useEffect(() => {
    window.addEventListener("scroll", updateScrollPosition);
    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("scroll", updateScrollPosition);
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return { ...mousePosition, scrollY };
};

export default useMousePosition;
