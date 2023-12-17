"use client";
import { FocusLineSVG } from "components/CustomSVG/focusLine";
import { Button } from "components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import ImTextAnimate from "./imText";

const MotionLink = motion(Link);
const MotionButton = motion(Button);

interface TecnologyIconProps {
  src: string;
  width: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  tag: string;
}

const tecnologyIconsComposition: TecnologyIconProps[] = [
  { src: "/images/icons/nextjs.png", width: "20%", top: "22%", tag: "next.js" },
  {
    src: "/images/icons/graphql-api.png",
    width: "20%",
    top: "-7%",
    left: "47%",
    tag: "graphql",
  },
  {
    src: "/images/icons/wordpress.png",
    width: "20%",
    top: "24%",
    right: "-2%",
    tag: "wordpress",
  },
  {
    src: "/images/icons/stripe.png",
    width: "10%",
    bottom: "14%",
    right: "3%",
    tag: "graphql",
  },
  {
    src: "/images/icons/tailwind.png",
    width: "10%",
    bottom: "-2%",
    right: "43%",
    tag: "tailwind",
  },
  {
    src: "/images/icons/typescript.png",
    width: "10%",
    bottom: "12%",
    left: "5%",
    tag: "typescript",
  },
];

const HeroBox = ({ animateDelay = 0 }: { animateDelay: number }) => {
  return (
    <motion.div
      animate={{
        left: ["20%", "0%"],
        opacity: [0, 1],
      }}
      transition={{ duration: 0.5, delay: animateDelay, ease: "easeInOut" }}
      className="mx-auto relative max-w-3xl group"
    >
      <div className="absolute w-full h-full top-0 left-0">
        {tecnologyIconsComposition.map((icon, i) => (
          <Link href={`/tag/${icon.tag}`} key={icon.src}>
            <motion.img
              animate={{
                opacity: [0, 1],
                marginTop: ["40px", "0px"],
                // scale: [0, 1],
                transition: {
                  delay: i * 0.2 + animateDelay + 0.5,
                  duration: 0.5,
                  ease: "easeIn",
                },
              }}
              style={{
                width: icon.width,
                top: icon.top,
                bottom: icon.bottom,
                left: icon.left,
                right: icon.right,
                zIndex: 5,
              }}
              className="absolute transform duration-200 hover:scale-125"
              src={icon.src}
              alt="Next.js"
            />
          </Link>
        ))}
      </div>
      <img
        className="w-full group-hover:scale-[102%] transform duration-150"
        src="/images/pages/home/HERO.png"
        alt="Adisak Chaiyakul"
        style={{ zIndex: 0 }}
        // animate={{ opacity: 1, scale: 1 }}
      />
    </motion.div>
  );
};

export function HeroSection() {
  return (
    <>
      <div className="bg-gradient-to-tl from-[#EEEED1] to-lime-[#F8F7F1] select-none">
        <div className="container mx-auto pt-20 md:pt-[170px] overflow-hidden">
          <div className="md:hidden max-w-md block mx-auto w-full mb-10">
            <HeroBox animateDelay={0} />
          </div>
          <div className="flex items-start w-full justify-between">
            <div className="h-[96px] md:h-[125px] lg:h-[185px]">
              <ImTextAnimate />
            </div>
            <motion.a
              href="www.youtube.com"
              className="hidden md:flex  md:-mt-20 lg:mt-0 relative hover:scale-105 transform duration-150 ease-in-out"
              draggable={false}
              animate={{
                right: ["-10%", "0%"],
                opacity: [0, 1],
              }}
              transition={{ delay: 2, duration: 1 }}
            >
              <motion.img
                animate={{ scale: 1.1 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: 0.2,
                  repeatDelay: 0.3,
                  ease: "easeOut",
                }}
                draggable={false}
                className="origin-right w-[200px] h-[114px] object-cover rounded-md shadow-md hover:shadow-xl transform duration-150"
                alt="lasted-video"
                src="/images/lasted-video.jpeg"
              />
              <p className="absolute font-heading w-[114px] text-sm top-full -right-5 text-center text-text-secondary rotate-90 origin-top-right">
                Latest Video
              </p>
            </motion.a>
          </div>
          <div className="flex flex-col md:flex-row pb-20 gap-4">
            <div className="flex-1 text-center md:text-left">
              <motion.p
                animate={{
                  marginLeft: ["-10%", "0%"],
                  opacity: [0, 1],
                }}
                transition={{ duration: 0.25, delay: 0.25, ease: "easeInOut" }}
                className="text-center md:text-left font-body text-h6 sm:text-h5 lg:text-h4 mt-8"
              >
                👋 I&apos;m Adisak Chaiyakul, a web developer skilled in
                Headless CMS, WordPress, Next.js, and GraphQL API. Dedicated to
                crafting fast, user-friendly, and flexible websites
              </motion.p>

              <motion.div
                animate={{
                  marginLeft: ["-10%", "0%"],
                  opacity: [0, 1],
                }}
                transition={{ duration: 0.25, delay: 0.5, ease: "easeInOut" }}
                className="mt-8 ml-auto inline-block justify-center md:justify-start gap-4 space-x-4 relative"
              >
                <MotionButton
                  whileTap={{ scale: 0.85 }}
                  whileHover={{ scale: 1.05 }}
                  className=""
                  variant="primary"
                  size="huge"
                >
                  Hire ME 🚀
                </MotionButton>
                <MotionButton
                  whileTap={{ scale: 0.85 }}
                  whileHover={{ scale: 1.05 }}
                  variant="outline"
                  size="huge"
                >
                  Book a Call
                </MotionButton>
                {/* <img
                  style={{
                    left: "100%",
                  }}
                  // hidden md:block
                  className="absolute top-[-30px] lg:top-[-75px] scale-50 lg:scale-100 origin-top-left"
                  alt="focus-line"
                  src="/images/icons/focus-line2.svg"
                /> */}
                <FocusLineSVG
                  delay={2}
                  className="left-full absolute top-[-30px] lg:top-[-75px] scale-50 lg:scale-100 origin-top-left"
                />
              </motion.div>
              <motion.div
                className="mt-8 flex items-center justify-center md:justify-start gap-4  pt-8 lg:pt-16"
                animate={{
                  marginLeft: ["-10%", "0%"],
                  opacity: [0, 1],
                }}
                transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
              >
                <p>Social: </p>
                {["facebook", "x", "envelope", "instagram"].map((icon, i) => (
                  <motion.a
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      transition: { delay: i * 0.25 + 1, duration: 0.5 },
                      scale: 1,
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileDrag={{ scale: 2.5, transition: { duration: 1.5 } }}
                    key={icon}
                    href="www.facebook.com"
                    className=" p-2 rounded-md bg-bg1 transform duration-100 ease-in  hover:!scale-125"
                  >
                    <img
                      className="w-6 h-6 "
                      src={`/images/icons/${icon}.svg`}
                      alt="facebook icon"
                    />
                  </motion.a>
                ))}
              </motion.div>
            </div>
            <div className="hidden -mt-10 lg:-mt-10 md:-mr-10 lg:mr-0 md:block flex-1 max-w-sm mx-auto sm:max-w-md md:max-wlg lg:max-w-xl">
              <HeroBox animateDelay={0} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
