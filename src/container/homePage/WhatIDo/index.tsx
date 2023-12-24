"use client";
import { JetBrains_Mono } from "next/font/google";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "components/ui/tooltip";
import clsx from "clsx";
import { BackgroundAnimateWrapper } from "components/BackgroundAnimateWrapper";
import {
  HTMLMotionProps,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import CursorBlinker from "../HeroSection/blinkCursor";
import { MacbookMockupFrame } from "components/MacbookMockupFram";
import { ParallaxBox } from "components/ParalexMove";

const CodeFont = JetBrains_Mono({
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["700", "400"],
});

type IconBoxProps = HTMLMotionProps<"div"> & {
  icon: string;
  size?: "big" | "small";
  title?: string;
  description?: string;
};

const IconBox = motion(
  ({ icon, size = "small", title, description, className }: IconBoxProps) => {
    return (
      <Tooltip>
        <TooltipTrigger
          // style={{ width: size, height: size }}
          className={clsx(
            className,
            "relative  hover:scale-110 transform-gpu duration-300",
            // "hover:bg-gray-100 rounded-[12%] hover:shadow-md",
            "card flex items-center justify-center"
            // size === "small" ? "p-4" : "p-4 md:col-span-2 md:row-span-2"
            //md:col-span-2 md:row-span-2
          )}
        >
          <motion.img
            className="max-w-full max-h-full w-full h-full"
            src={`/images/icons/tech/${icon}.svg`}
          />
        </TooltipTrigger>
        <TooltipContent className="text-center">
          <p className="text-center mt-1 font-bold text-lg">{title || icon}</p>
          {description && <p className="max-w-sm">{description}</p>}
        </TooltipContent>
      </Tooltip>
    );
  }
);

type GridBox = HTMLMotionProps<"div">;

const GridBox = ({ children, className, ...props }: GridBox) => (
  <motion.div
    className={clsx(
      "p-6 bg-white rounded-xl shadow-md shadow-gray-500/10",
      className
    )}
    {...props}
  >
    {children}
  </motion.div>
);

export const WhatIDoSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "7 1"],
  });
  const headingOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, 0.9, 1]
  );
  const widthPercent = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const headingY = useTransform(scrollYProgress, [0, 1], ["0em", "0.8em"]);

  return (
    <BackgroundAnimateWrapper
      // color="#e0e0ac"
      color="#f5f5f7"
      className="relative container mx-auto min-h-[100vh] pt-40 pb-60 !text-text-secondary-color "
    >
      <TooltipProvider>
        <div className="flex justify-center px-3">
          <motion.div
            style={{ width: widthPercent }}
            className="absolute top-20 h-2 bg-black/5 text-white rounded-xl"
          />
        </div>
        <motion.h2
          ref={ref}
          style={{
            y: headingY,
            opacity: headingOpacity,
          }}
          className={clsx(
            "text-[62px] text-center md:text-left md:text-[100px] font-heading uppercase lg:text-[120px] text-primary font-bold mb-10 tracking-[-0.1em]"
          )}
        >
          What I Do
          <CursorBlinker character="_" />
        </motion.h2>
        <div className={clsx("grid md:grid-cols-3 gap-6 relative mb-6")}>
          <GridBox
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                delay: 0.5,
              },
            }}
            viewport={{ once: true }}
            className="md:col-span-2 bg-gradient-to-b from-white via-white  to-[#0E2F3E]/5"
          >
            <motion.h3
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  delay: 0.5,
                },
              }}
              viewport={{ once: true }}
              className="text-h5 lg:text-h4 font-semibold font-heading mb-3 lg:mb-6 mt-2"
            >
              Headless CMS & Ecommerce
            </motion.h3>
            <motion.p
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  delay: 0.5,
                },
              }}
              viewport={{ once: true }}
              className="text-h6 lg:text-h5 font-light"
            >
              As a web developer, I concentrate on delivering impactful designs
              and robust e-commerce solutions through Headless CMS tailored to
              small and medium businesses. I&apos;m committed to offering fast,
              scalable, and cost-effective solutions that keep you ahead in the
              digital landscape.
            </motion.p>
          </GridBox>
          <ParallaxBox
            amount={150}
            offset={75}
            initial={{
              opacity: 0,
              x: 40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.5,
                delay: 0.5,
              },
            }}
            viewport={{ once: true }}
            className="relative"
          >
            <MacbookMockupFrame
              className="md:min-w-[500px] "
              content="/images/ecommerce-frame-1.jpg"
              animateScroll={{
                duration: 30,
                scrollPosition: "-40%",
                delay: 3,
              }}
            />
          </ParallaxBox>
        </div>
        <div className="grid grid-cols-4 lg:grid-cols-6 gap-6 mb-6 text-center">
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                delay: 0.5,
              },
            }}
            viewport={{ once: true }}
            className="flex justify-center items-center col-span-6 lg:col-span-2"
          >
            <div className={CodeFont.className}>
              <h3
                className={clsx(
                  "text-h4 font-bold text-center lg:text-left font-heading",
                  CodeFont.className
                )}
              >
                &lt;Core.Technologies /&gt;
                <CursorBlinker character="_" />
              </h3>
              <p className="text-h6 text-left">
                A Fine Balance Between Old and New Technologies.
              </p>
            </div>
          </motion.div>
          <GridBox
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                delay: 0.5,
              },
            }}
            viewport={{ once: true }}
            className="flex items-center justify-center"
          >
            <div>
              <IconBox icon="wordpress" className="w-full h-20" />
            </div>
          </GridBox>
          <GridBox
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                delay: 0.5,
              },
            }}
            viewport={{ once: true }}
            className="flex items-center justify-center"
          >
            <div>
              <IconBox icon="woocommerce" className="w-full h-20" />
            </div>
          </GridBox>

          <GridBox
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                delay: 0.5,
              },
            }}
            viewport={{ once: true }}
            className="flex items-center justify-center"
          >
            <div>
              <IconBox icon="nextjs" className="w-full h-20" />
            </div>
          </GridBox>
          <GridBox
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                delay: 0.5,
              },
            }}
            viewport={{ once: true }}
            className="flex items-center justify-center"
          >
            <div>
              <IconBox icon="stripe" className="w-full h-20" />
            </div>
          </GridBox>
        </div>

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.5,
              delay: 0.5,
            },
          }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6"
        >
          <GridBox className="space-x-3 bg-gradient-to-b from-white via-white to-[#0E2F3E]/5">
            <h4 className="text-h6 font-bold inline">#1 Performance</h4>
            <p className="text-h6 font-light inline">
              Overcoming the limitations of WordPress with Headless CMS.
              Delivers fast, responsive websites that enhance user experience
              and SEO.
            </p>
          </GridBox>
          <GridBox className="space-x-3 bg-gradient-to-b from-white via-white to-[#0E2F3E]/5">
            <h4 className="text-h6 font-bold inline ">#2 Customizable</h4>
            <p className="text-h6 font-light inline">
              You&apos;re no longer confined by plugins and themes. Instead, you
              have the freedom to connect with any third-party tools or services
              you need to enhance your website.
            </p>
          </GridBox>

          <GridBox className="space-x-3 md:col-span-2 xl:col-span-1 bg-gradient-to-b from-white via-white to-[#0E2F3E]/5">
            <h4 className="text-h6 font-bold inline ">#3 Cost-Effective</h4>
            <p className="text-h6 font-light inline">
              it reduces server load and hosting costs. Efficient development
              and updates lower expenses, while its scalability and long-term
              performance offer significant savings
            </p>
          </GridBox>
        </motion.div>
      </TooltipProvider>
    </BackgroundAnimateWrapper>
  );
};
