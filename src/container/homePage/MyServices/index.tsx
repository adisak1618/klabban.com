"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BackgroundAnimateWrapper } from "../Projects/backgroundAnimateWrapper";

export const MyServicesSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1 1"],
  });
  const headingOpacity = useTransform(scrollYProgress, [0, 1], [0.5, 0.8]);
  const headingLetterSpace = useTransform(
    scrollYProgress,
    [0, 1],
    ["0.3em", "0.1em"]
  );
  const headingY = useTransform(scrollYProgress, [0, 1], [0, 68]);
  return (
    <BackgroundAnimateWrapper color="#e0e0ac">
      <motion.div
        className="relative pt-40 overflow-x-hidden"
        initial={{
          opacity: 0.5,
          y: 100,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{ duration: 1 }}
      >
        <div ref={ref} className="container mx-auto ">
          <motion.h2
            style={{
              opacity: headingOpacity,
              letterSpacing: headingLetterSpace,
              y: headingY,
            }}
            className="text-center font-black w-[300%] mb-20 ml-[-100%] text-[150px] text-white font-heading uppercase"
          >
            My Services
          </motion.h2>
          <motion.div
            className="grid grid-cols-2 my-40"
            whileInView={{
              x: ["-10%", "0%"],
              opacity: [0, 1],
              transition: {
                duration: 1,
                ease: "easeInOut",
                delay: 0.5,
              },
            }}
          >
            <div>
              <h2 className="text-h1 font-heading font-bold leading-[1.1em]">
                #1 Headless CMS Websites
              </h2>
              <p className="text-h4 font-extralight">
                Elevate Your Digital Narrative with Our Pioneering Headless CMS
                Solutions, Where Content Meets Innovation.
              </p>
            </div>
            <div></div>
          </motion.div>
          <motion.div
            className="grid grid-cols-2 my-40"
            whileInView={{
              x: ["10%", "0%"],
              opacity: [0, 1],
              transition: {
                duration: 1,
                ease: "easeInOut",
                delay: 1,
              },
            }}
          >
            <div></div>
            <div>
              <h2 className="text-h1 font-heading font-bold leading-[1.1em]">
                #2 Headless E-commerce Websites
              </h2>
              <p className="text-h4 font-extralight">
                Transforming Online Retail with State-of-the-Art Headless
                E-commerce: Where Speed Meets Scalability and Success.
              </p>
            </div>
          </motion.div>
          {/* <motion.h2
          style={{
            opacity: headingOpacity,
            letterSpacing: headingLetterSpace,
            y: headingY,
          }}
          className="text-center font-extrabold w-[300%] ml-[-100%] text-[180px] font-heading uppercase"
        >
          My Services
        </motion.h2> */}
          {/* <motion.div
          style={{ opacity: headingOpacity }}
          className="grid grid-cols-2 text-center py-10 divide-x bg-white  transform duration-1000 hover:scale-[1.02] rounded-xl"
        >
          <div className=" p-10">
            <h3 className="font-heading font-bold text-h4">
              Headless CMS Website
            </h3>
            <p className="text-lg mt-3">
              I focus on all things design and web related. With each of my
              services, my goal is to deliver an impactful and elevating digital
              experience for everyone.
            </p>
          </div>
          <div className="p-10">
            <h3 className="font-heading font-bold text-h4">
              Headless Ecommerce Website
            </h3>
            <p className="text-lg mt-3">
              I focus on all things design and web related. With each of my
              services, my goal is to deliver an impactful and elevating digital
              experience for everyone.
            </p>
          </div>
        </motion.div> */}
        </div>
      </motion.div>
    </BackgroundAnimateWrapper>
  );
};
