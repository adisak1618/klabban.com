"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MacbookMockupFrame } from "components/MacbookMockupFram";
import clsx from "clsx";
import { BackgroundAnimateWrapper } from "components/BackgroundAnimateWrapper";
import { ParallaxBox } from "components/ParalexMove";

export const MyProjectsSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "7 1"],
  });
  const headingOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.2, 0.8, 1]
  );
  const headingLetterSpace = useTransform(
    scrollYProgress,
    [0, 0.4, 1],
    ["0.3em", "0.1em", "0.1em"]
  );
  const widthPercent = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const headingY = useTransform(scrollYProgress, [0, 1], [0, 68]);

  return (
    <BackgroundAnimateWrapper color="#0E2F3E">
      <motion.div
        className="relative pt-40 overflow-x-hidden bottom-fade text-white"
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
        <div className="flex justify-center px-3">
          <motion.div
            style={{ width: widthPercent }}
            className="absolute top-20 h-2 bg-white/10 text-white rounded-xl"
          />
        </div>
        <div className=" container mx-auto ">
          <motion.h2
            ref={ref}
            style={{
              opacity: headingOpacity,
              letterSpacing: headingLetterSpace,
              y: headingY,
            }}
            className={clsx(
              "relative font-black mb-20 text-center  text-[44px] sm:text-[72px]  md:text-[90px] lg:text-[120px] xl:text-[150px] font-heading",
              "bg-gradient-to-t from-bg2 to-bg1 bg-clip-text fill-current text-bg1 drop-shadow-sm whitespace-nowrap text-outline"
            )}
          >
            <span className="text-primary scale-125 inline-block origin-center !translate-x-[10%] translate-y-[-5%] !tracking-[-0.08em]">
              MY
            </span>
            <span className="relative">PROJECTS</span>
          </motion.h2>
          <p className="text-center text-h6 max-w-4xl mx-auto">
            I have a wide range of skills, but I&apos;m currently concentrating
            on mastering Headless CMS. My goal is to become an expert to provide
            the best service possible to my customers. Here are my latest three
            projects developed using Headless CMS.
          </p>
          <div className="flex flex-col md:flex-row justify-between my-40 relative gap-4 items-center text-center md:text-left">
            <motion.div
              whileInView={{
                x: ["-20%", "0%"],
                opacity: [0, 1],
                transition: {
                  duration: 0.5,
                  delay: 0.5,
                },
              }}
              viewport={{ once: true }}
              className="relative flex-1 min-w-[50%] order-2 md:order-1"
            >
              <div className="relative z-10">
                <h2 className=" text-h2 font-heading font-bold leading-[1.1em] uppercase">
                  #1 Bike Society
                </h2>
                <p className="text-h5 font-extralight mt-3">
                  <b className="font-bold">Bike Society </b> is the leading bike
                  shop Adelaide, selling Road bikes, Mountain bikes, Commuter
                  bikes, BMX and E-Bikes plus cycling accessories and equipment
                </p>
                <p className="text-h5  text-yellow font-semibold font-heading mt-5">
                  Tecnologies
                </p>
                <ul className="md:text-left md:grid grid-cols-2 gap-x-3 relative text-h6 font-extralight">
                  <li>- Next.js (Front-end)</li>
                  <li>- WordPress (CMS)</li>
                  <li>- WooCommerce (Ecommerce)</li>
                  <li>- ACF (Custom Fields)</li>
                  <li>- Stripe (Payment)</li>
                  <li>- Paypal (Payment)</li>
                  <li>- Apple Pay </li>
                  <li>- Google Pay </li>
                  <li>- Lightspeed (POS sync inventory with Woocommerce)</li>
                  <li>- Google Rich Results</li>
                </ul>
              </div>
              <motion.div
                style={{
                  top: "-30%",
                  borderRadius: "100%",
                }}
                whileInView={{
                  x: ["-100%", "-60%"],
                  transition: {
                    duration: 0.5,
                    delay: 1,
                  },
                }}
                className="absolute pt-[100%] w-[200%] bg-white/10 blur-3xl opacity-40 py-20"
              />
            </motion.div>
            <ParallaxBox
              amount={100}
              offset={50}
              whileInView={{
                x: ["30%", "0%"],

                opacity: [0, 1],
                transition: {
                  duration: 0.5,
                  delay: 0.5,
                },
              }}
              viewport={{ once: true }}
              className="relative flex-1 flex justify-start order-1 md:order-2"
            >
              <MacbookMockupFrame
                className="md:min-w-[500px]"
                content="/images/ecommerce-frame-1.jpg"
                animateScroll={{
                  duration: 10,
                  scrollPosition: "-40%",
                  delay: 3,
                }}
              />
            </ParallaxBox>
          </div>
          <div className="md:flex justify-between my-40 relative gap-4 items-center text-center md:text-left">
            <ParallaxBox
              amount={100}
              offset={50}
              whileInView={{
                x: ["-30%", "0%"],

                opacity: [0, 1],
                transition: {
                  duration: 0.5,
                  delay: 0.5,
                },
              }}
              viewport={{ once: true }}
              className="relative flex-1 min-w-[50%] flex justify-end"
            >
              <MacbookMockupFrame
                className="md:min-w-[500px]"
                content="/images/ecommerce-frame-1.jpg"
                animateScroll={{
                  duration: 30,
                  scrollPosition: "-40%",
                  delay: 3,
                }}
              />
            </ParallaxBox>

            <motion.div
              whileInView={{
                x: ["10%", "0%"],
                opacity: [0, 1],
                transition: {
                  duration: 0.5,
                  delay: 0.5,
                },
              }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative z-10">
                <h2 className=" text-h2 font-heading font-bold leading-[1.1em]">
                  #2 Tuckert Tub
                </h2>
                <p className="text-h5 font-extralight mt-3">
                  <b className="font-bold">Tucker Tub</b> all natural dog food,
                  made farm fresh in Australia. Locally sourced ingredients.
                  Nutrient-rich recipes pet nutritionist approved.
                </p>
                <p className="text-h5 text-yellow font-semibold font-heading mt-5">
                  Tecnologies
                </p>
                <ul className="md:text-left md:grid grid-cols-2 gap-x-3 relative text-h6 font-extralight">
                  <li>- WordPress (CMS)</li>
                  <li>- WooCommerce (Ecommerce)</li>
                  <li>- Stripe (Payment)</li>
                  <li>- Next.js (Front-end)</li>
                  <li>- Calendly (scheduling platform)</li>
                  <li>- Paypal (Payment)</li>
                  <li>- Apple Pay </li>
                  <li>- Google Pay </li>
                </ul>
              </div>
              <motion.div
                style={{
                  top: "-30%",
                  borderRadius: "100%",
                }}
                whileInView={{
                  x: ["50%", "-10%"],
                  transition: {
                    duration: 0.5,
                    delay: 0.5,
                  },
                }}
                className="absolute pt-[100%] w-[200%] bg-white/20 blur-3xl opacity-40 py-20"
              />
            </motion.div>
          </div>
          <div className="md:flex justify-between my-40 relative gap-4 items-center text-center md:text-left">
            <motion.div
              whileInView={{
                x: ["-20%", "0%"],
                opacity: [0, 1],
                transition: {
                  duration: 0.5,
                  delay: 0.5,
                },
              }}
              viewport={{ once: true }}
              className="relative flex-1 min-w-[50%]"
            >
              <div className="relative z-10">
                <h2 className=" text-h2 font-heading font-bold leading-[1.1em]">
                  #3 SureWill
                </h2>
                <p className="text-h5 font-extralight leading-[1.1em] mt-3">
                  <b className="font-bold">SureWill</b> Your Online Will
                  Creation Service. Craft a legally binding Australian Will in
                  minutes with SureWill. Our process is fast, straightforward,
                  and secure. Begin your Will for free today and experience the
                  ease of planning for the future.
                </p>
                <p className="text-h5 text-yellow font-semibold font-heading mt-5">
                  Key-Feature
                </p>
                <ul className="md:text-left md:grid grid-cols-2 gap-x-3 relative text-h6 font-extralight">
                  <li>- Sanity (CMS)</li>
                  <li>- Next.js (Front-end)</li>
                  <li>- Vercel (Server)</li>
                  <li>- Google Rich Results</li>
                  <li>- GA4 with custom tracking and funnel</li>
                </ul>

                <p className="font-extralight mt-3">
                  * I only do marketing site for this project
                </p>
              </div>
              <motion.div
                style={{
                  top: "-50%",
                  borderRadius: "100%",
                }}
                whileInView={{
                  x: ["-100%", "-60%"],
                  transition: {
                    duration: 0.5,
                    delay: 0.5,
                  },
                }}
                className="absolute pt-[100%] w-[200%] bg-white/20 blur-3xl opacity-40 py-20"
              />
            </motion.div>
            <ParallaxBox
              amount={100}
              offset={50}
              whileInView={{
                x: ["30%", "0%"],
                opacity: [0, 1],
                transition: {
                  duration: 0.5,
                  delay: 0.5,
                },
              }}
              viewport={{ once: true }}
              className="relative flex-1 flex justify-start"
            >
              <MacbookMockupFrame
                className="md:min-w-[500px]"
                content="/images/ecommerce-frame-1.jpg"
                animateScroll={{
                  duration: 10,
                  scrollPosition: "-40%",
                  delay: 3,
                }}
              />
            </ParallaxBox>
          </div>
        </div>
      </motion.div>
    </BackgroundAnimateWrapper>
  );
};
