import { useRef, useState } from "react";

import { motion } from "framer-motion";

export const MagneticFramer = ({
  children,
  className,
}: {
  children: JSX.Element;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;

    const { height, width, left, top } = ref.current.getBoundingClientRect();

    const middleX = clientX - (left + width / 2);

    const middleY = clientY - (top + height / 2);

    setPosition({ x: middleX / 10, y: middleY / 20 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 100, damping: 10, mass: 0.5 }}
    >
      {children}
    </motion.div>
  );
};
