"use client";
import { FocusLineSVG } from "components/CustomSVG/focusLine";
import { Button } from "components/ui/button";
import { motion, useAnimate, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import ImTextAnimate from "./imText";
import clsx from "clsx";
import { useBackgroundContext } from "components/BackgroundContext";
import { useRef } from "react";
import { MagneticFramer } from "./followPointer";
import { BackgroundAnimateWrapper } from "components/BackgroundAnimateWrapper";

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
        // x,
        // y,
        left: ["20%", "0%"],
        opacity: [0, 1],
      }}
      transition={{ duration: 0, delay: animateDelay, ease: "easeInOut" }}
      className="mx-auto relative max-w-3xl group "
    >
      <div className="absolute w-full h-full top-0 left-0">
        {tecnologyIconsComposition.map((icon, i) => (
          <Link href={`/tag/${icon.tag}`} key={icon.src}>
            <motion.img
              whileInView={{
                opacity: [0, 1],
                y: ["40px", "0px"],
                // scale: [0, 1],
                transition: {
                  delay: i * 0.2 + animateDelay + 1.75,
                  duration: 0.5,
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
              className="absolute transform duration-200 hover:!scale-125"
              src={icon.src}
              alt="Next.js"
            />
          </Link>
        ))}
      </div>
      <motion.img
        whileInView={{
          x: ["10%", "0%"],
          opacity: [0, 1],
          transition: {
            type: "spring",
            delay: 1,
            duration: 0.75,
          },
        }}
        viewport={{
          once: true,
        }}
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
  const { background, setBackground } = useBackgroundContext();
  const ref = useRef<HTMLDivElement>(null);
  const [scopeRocket, animateRocket] = useAnimate();
  const [scopeHireMeText, animateHireMeText] = useAnimate();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0.2 0", "1.8 1"],
  });
  // const widthTest = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const slideY = useTransform(scrollYProgress, [0, 1], ["0px", "300px"], {
    clamp: true,
  });
  const slideLeft = useTransform(scrollYProgress, [0, 1], ["0px", "100px"], {
    clamp: true,
  });

  return (
    <BackgroundAnimateWrapper color={"#F8F7F1"}>
      <motion.div
        ref={ref}
        transition={{ duration: 0.5 }}
        className={clsx(
          "relative  pt-20 select-none overflow-hidden"
          // !background
          //   ? "bg-[rgba(40, 111, 108, 1)] bg-gradient-to-tl from-[#EEEED1] to-[#F8F7F1]"
          //   : "bg-[rgba(40, 111, 108, 0)]"
        )}
      >
        {/* <motion.div
          className="z-[999] h-5  bg-black  absolute left-0 top-[700px]"
          style={{ width: widthTest }}
        /> */}
        <motion.div
          animate={{ opacity: background === "#F8F7F1" ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-tl from-[#EEEED1] to-[#F8F7F1] absolute w-full h-full left-0 top-0 bottom-fade"
        />

        <div className="container z-20 relative mx-auto  pt-10 sm:pt-20 md:pt-[50px] text-text-color">
          <div className="md:hidden max-w-md block mx-auto w-full mb-10">
            <HeroBox animateDelay={0} />
          </div>
          <div className="flex items-start w-full justify-between">
            <motion.div
              whileInView={{
                opacity: [0, 1],
                x: ["-10%", "0%"],
                transition: { duration: 0.5 },
              }}
              className="h-[96px] md:h-[125px] md:mt-20 lg:h-[185px]"
            >
              <ImTextAnimate />
            </motion.div>
            <motion.a
              href="www.youtube.com"
              className="hidden md:flex  md:-mt-10 lg:mt-0 relative hover:scale-105 transform duration-150 ease-in-out"
              draggable={false}
              whileInView={{
                x: ["20%", "0%"],
                opacity: [0, 1],
                transition: { delay: 3, duration: 1, ease: "easeInOut" },
              }}
              viewport={{
                once: true,
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  delay: 10,
                  repeatDelay: 0.5,
                }}
                className="group first-letter:relative w-[200px] h-[114px]"
              >
                <img
                  draggable={false}
                  className="absolute w-full h-full object-cover rounded-md"
                  alt="lasted-video"
                  src="/images/lasted-video.jpeg"
                />
                <div className="p-3 rounded-full transform duration-150 bg-black/40 group-hover:bg-black/70 w-12 h-12 absolute left-1/2 top-1/2 -ml-6 -mt-6">
                  <img
                    alt="play icon"
                    src="/images/icons/play.svg"
                    className="pl-1 pt-px"
                  />
                </div>
              </motion.div>
              <p className="absolute font-heading w-[114px] text-sm top-full -right-5 text-center text-text-secondary rotate-90 origin-top-right">
                Latest Video
              </p>
            </motion.a>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <motion.div
              style={{ y: slideLeft }}
              className="flex-1 text-center md:text-left "
            >
              <motion.p
                whileInView={{
                  x: ["-10%", "0%"],
                  opacity: [0, 1],
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: 0.25, ease: "easeInOut" }}
                className="text-center md:text-left font-body text-h6 sm:text-h5 lg:text-h4 mt-8"
              >
                👋 I&apos;m Adisak Chaiyakul. I specialize in crafting elevated
                digital experiences that inspire and engage, connecting people
                with your business through innovative development and intuitive
                design.
                {/* a web developer skilled in
                Headless CMS, WordPress, Next.js, and GraphQL API. Dedicated to
                crafting fast, user-friendly, and flexible websites */}
              </motion.p>

              <motion.div
                whileInView={{
                  x: ["-10%", "0%"],
                  opacity: [0, 1],
                  transition: {
                    duration: 0.25,
                    delay: 0.5,
                    ease: "easeInOut",
                    stiffness: 100,
                  },
                }}
                viewport={{ once: true }}
                // transition={{ duration: 0.25, delay: 0.5, ease: "easeInOut" }}
                className="mt-8 ml-auto inline-block justify-center md:justify-start gap-4 space-x-4 relative"
              >
                <MotionButton
                  whileTap={{ scale: 0.85 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring" }}
                  className=""
                  variant="primary"
                  size="huge"
                  onTouchEnd={() => {
                    animateRocket(scopeRocket.current, {
                      scale: 1,
                      x: 0,
                      y: 0,
                    });
                    animateHireMeText(scopeHireMeText.current, {
                      scale: 1,
                      x: 0,
                    });
                  }}
                  onHoverStart={() => {
                    animateRocket(scopeRocket.current, {
                      scale: 1.8,
                      x: 10,
                      y: -6,
                    });
                    animateHireMeText(scopeHireMeText.current, {
                      scale: 1.2,
                      x: 8,
                    });
                  }}
                  onHoverEnd={() => {
                    animateRocket(scopeRocket.current, {
                      scale: 1,
                      x: 0,
                      y: 0,
                    });
                    animateHireMeText(scopeHireMeText.current, {
                      scale: 1,
                      x: 0,
                    });
                  }}
                >
                  <motion.p
                    className="font-heading font-extrabold"
                    ref={scopeHireMeText}
                  >
                    Hire ME &nbsp;
                    <motion.span className="inline-block" ref={scopeRocket}>
                      🚀
                    </motion.span>
                  </motion.p>
                </MotionButton>

                <MotionButton
                  className="group"
                  whileTap={{ scale: 0.85 }}
                  whileHover={{ scale: 1.05 }}
                  variant="outline"
                  size="huge"
                >
                  <p className="font-heading font-medium ">Book a Call</p>
                </MotionButton>

                <FocusLineSVG
                  delay={2}
                  className="left-full absolute top-[-30px] lg:top-[-75px] scale-50 lg:scale-100 origin-top-left"
                />
              </motion.div>
              <motion.div
                className="mt-8 flex items-center justify-center md:justify-start gap-4  pt-8 lg:pt-16"
                whileInView={{
                  marginLeft: ["-10%", "0%"],
                  opacity: [0, 1],
                }}
                transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
              >
                <p>Social: </p>
                {["facebook", "x", "envelope", "instagram"].map((icon, i) => (
                  <motion.a
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{
                      opacity: 1,
                      transition: { delay: i * 0.25 + 1, duration: 0.5 },
                      scale: 1,
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileDrag={{ scale: 2.5, transition: { duration: 1.5 } }}
                    key={icon}
                    href="www.facebook.com"
                    className=" p-2 rounded-md bg-white/80 transform duration-100 ease-in  hover:!scale-125"
                  >
                    <img
                      className="w-6 h-6 "
                      src={`/images/icons/${icon}.svg`}
                      alt="facebook icon"
                    />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
            <motion.div
              style={{ y: slideY }}
              transition={{
                type: "spring",
                stiffness: 100,
              }}
              className="hidden -mt-10 lg:-mt-10 md:-mr-10 lg:mr-0 md:block flex-1 max-w-sm mx-auto sm:max-w-md md:max-wlg lg:max-w-xl"
            >
              <MagneticFramer>
                <HeroBox animateDelay={0} />
              </MagneticFramer>
            </motion.div>
          </div>
        </div>
        <div className="h-20 md:h-72 lg:h-80 w-full " />
      </motion.div>
    </BackgroundAnimateWrapper>
  );
}
