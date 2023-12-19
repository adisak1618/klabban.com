"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export function AboutMeHeroBlock() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(
    scrollYProgress || 0,
    [0, 0.3, 1],
    ["10%", "40%", "80%"]
  );

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const clound2X = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const clound3X = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const clound2Y = useTransform(scrollYProgress, [0, 1], ["20%", "150%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["25%", "40%"]);

  return (
    <div>
      <div
        ref={ref}
        className="relative headline-shape text-white h-[100vh] w-full overflow-hidden bg-gray-200"
      >
        <motion.div
          className="w-full h-[130vh] absolute bottom-0 left-0 transition-all duration-0"
          style={{
            y: backgroundY,
          }}
        >
          <Image
            alt="ocean view"
            fill
            quality={50}
            priority
            src={"/images/sea-montain-cover.png"}
            className="absolute bottom-0 right-0 object-cover"
          />
        </motion.div>

        <motion.div
          className="w-full h-full  flex justify-center items-end absolute bottom-8 lg:bottom-0 lg:right-0 left-1/2 lg:left-auto ml-[-400px] lg:ml-0 min-w-[800px] transition-all duration-0"
          style={{
            opacity: 0,
            scaleX: "400%",
            translateY: "32%",
          }}
          // animate={{ opacity: 1 }}
          // transition={{ delay: 0.2, duration: 4 }}
          animate={{ marginRight: [-200, 300, -200], opacity: 1 }}
          transition={{
            duration: 60,
            repeat: Infinity,
            opacity: {
              duration: 1,
            },
          }}
        >
          <Image
            alt="clound1"
            width={1000}
            height={1000}
            quality={50}
            src={"/images/clound1.png"}
            className="object-cover absolute"
          />
        </motion.div>
        <motion.div
          className="w-full md:w-1/2 h-1/2 md:-left-1/3  -top-40 flex justify-center items-end absolute bottom-8 transition-all duration-0"
          style={{
            x: clound2X,
            y: clound2Y,
            scaleX: "200%",
          }}
          // initial={{ marginLeft: -400 }}
          animate={{ marginLeft: [-400, 400, -400] }}
          transition={{ duration: 60, repeat: Infinity }}
        >
          <Image
            alt="clound1"
            width={1000}
            height={1000}
            quality={50}
            src={"/images/clound1.png"}
            className="object-cover absolute"
          />
        </motion.div>
        <motion.div
          className="w-2/3 md:w-1/2 h-1/2 -right-1/4  top-0 flex justify-center items-end absolute bottom-8 transition-all duration-0"
          style={{
            x: clound3X,
            y: clound2Y,
            scaleX: "300%",
          }}
          animate={{ marginRight: [-300, 300, -300] }}
          transition={{ duration: 60, repeat: Infinity }}
        >
          <Image
            alt="clound1"
            width={1000}
            height={1000}
            quality={50}
            src={"/images/clound1.png"}
            className="object-cover absolute"
          />
        </motion.div>
        <motion.div
          className="absolute w-full h-full text-center transition-all duration-0"
          style={{
            y: titleY,
            // opacity: 0,
          }}
          initial={{ opacity: 0, paddingTop: 100 }}
          animate={{ opacity: 1, paddingTop: 0 }}
          exit={{ opacity: 0 }}
        >
          <p className="text-primary uppercase font-bold text-h3 lg:text-h2 md:leading-[60px] drop-shadow-xl custom-text-border">
            Adisak Chaiyakul
          </p>
          <h1 className="text-[80px] uppercase sm:text-[140px] lg:text-[200px] font-bold font-title drop-shadow-xl leading-[80px] sm:leading-[140px] lg:leading-[110px] custom-text-border">
            I&apos;m OTTO
          </h1>
          <p className="sm:hidden p-4 rounded-xl text-h6 overflow-hidden break-words font-bold custom-text-border text-center">
            I have developed an e-commerce solution tailored for small
            businesses aiming to accelerate their growth in the online realm,
            leveraging cutting-edge Headless-CMS technology.
          </p>
        </motion.div>

        <motion.div
          className="w-full h-full flex justify-center items-end absolute -bottom-10 right-0 lg:min-w-[800px] transition-all duration-0"
          style={{
            y: heroY,
            marginTop: 500,
          }}
          initial={{ opacity: 0, bottom: -100 }}
          animate={{ opacity: 1, bottom: 0 }}
          transition={{ delay: 0.5, duration: 0.5, easings: 10 }}
        >
          <Image
            alt="hero"
            width={1000}
            height={1000}
            quality={50}
            src={"/images/otto-on-the-hill.png"}
            className="object-cover absolute mb-20 sm:mb-16 lg:mb-0 scale-150 sm:scale-125 lg:scale-100"
          />
          <div className="hidden absolute bottom-0 pt-20 w-full h-1/2 container max-w-5xl sm:grid grid-cols-3">
            <div className="text-h5">
              <motion.div
                className="p-4 rounded-xl overflow-hidden break-words font-bold custom-text-border text-right"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                I have developed an e-commerce solution tailored for small
                businesses aiming to accelerate their growth in the online
                realm, leveraging cutting-edge Headless-CMS technology.
              </motion.div>
            </div>
            <div />
            <motion.div
              className="text-h5 text-center"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              <p className=" inline-block rounded-xl text-primary text-h4 uppercase text-center overflow-hidden break-words custom-text-border font-bold">
                Technology I use
              </p>
              <div className="flex justify-center gap-4 items-center flex-wrap">
                {[
                  "Wordpress",
                  "Graphql",
                  "Next.js",
                  "Tailwind CSS",
                  "Hasura",
                  "Postgress",
                  "Vercel",
                  "Headless CMS",
                  "SEO",
                  "GA4 Tracking",
                ].map((word) => (
                  <div
                    key={word}
                    className="px-3 py-1 rounded-xl bg-black/60 font-bold"
                  >
                    {word}
                  </div>
                ))}
                <p></p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
