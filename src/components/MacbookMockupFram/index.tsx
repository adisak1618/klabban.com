import clsx from "clsx";
import { AnimationProps, motion } from "framer-motion";
type MacbookMockupFrame = {
  content?: string;
  animateScroll?: {
    scrollPosition?: string;
    duration?: number;
    delay?: number;
  };
  className?: string;
};

export const MacbookMockupFrame = ({
  content,
  animateScroll,
  className,
}: MacbookMockupFrame) => {
  const animateImage: AnimationProps["animate"] = animateScroll
    ? {
        y: ["0%", animateScroll.scrollPosition || "0%"],
        transition: {
          duration: animateScroll.duration || 1,
          repeat: Infinity,
          delay: animateScroll.delay || 1,
        },
      }
    : {};

  return (
    <div draggable={false} className={clsx("w-full relative", className)}>
      {content && (
        <div
          style={{
            width: "74.2%",
            paddingTop: "46.7%",
            left: "12.8%",
            top: "13%",
          }}
          className="bg-gray-100 absolute overflow-hidden"
        >
          <motion.img
            animate={animateImage}
            className="absolute w-full object-cover object-top top-0 left-0"
            src={content}
          />
        </div>
      )}
      <img
        draggable={false}
        className="relative"
        src="/images/macbook-mockup-frame.png"
      />
    </div>
  );
};
