"use client";
import clsx from "clsx";
import { BackgroundAnimateWrapper } from "components/BackgroundAnimateWrapper";
import { ParallaxBox } from "components/ParalexMove";
import { Button } from "components/ui/button";
import {
  HTMLMotionProps,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { HTMLAttributes, useRef } from "react";

type GridBoxProps = HTMLMotionProps<"div">;

const GridBox = ({ children, className, ...props }: GridBoxProps) => (
  <motion.div className={clsx("p-6  rounded-3xl pb-12 ", className)} {...props}>
    {children}
  </motion.div>
);

export const MyServicesSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "7 1"],
  });
  const headingOpacity = useTransform(
    scrollYProgress,
    [0, 0.6, 1],
    [0.2, 0.8, 1]
  );
  const widthPercent = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const headingY = useTransform(scrollYProgress, [0, 1], ["0", "90px"]);
  const headingLetterSpace = useTransform(
    scrollYProgress,
    [0, 1],
    ["0.3em", "0.1em"]
  );

  return (
    <div>
      <BackgroundAnimateWrapper
        // color="#151516"
        color="#151516"
        className="relative container mx-auto py-40n"
      >
        <>
          <div className="flex justify-center mb-40">
            <motion.div
              style={{ width: widthPercent }}
              className="h-2 bg-white/10 rounded-xl"
            />
          </div>
          <ParallaxBox amount={200} className="mb-40">
            <p className="text-white text-center opacity-50 font-heading text-h6 font-light">
              Let&apos;s build something great together!
            </p>
            <motion.h2 className="text-[62px] lg:text-[120px] leading-[1em] text-center text-[#f5f5f7]  font-bold uppercase font-heading">
              Services
            </motion.h2>
          </ParallaxBox>
          <div className="grid lg:grid-cols-3 gap-6 relative z-10">
            <GridBox
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  ease: "easeInOut",
                  duration: 0.5,
                  delay: 0.5,
                },
              }}
              viewport={{ once: true }}
              className="mt-10 bg-gradient-to-b from-itemBgDark to-itemBgDark/30  text-white hover:scale-[1.02] transform-gpu duration-1000"
            >
              <h3 className="text-h4 font-heading font-bold text-center">
                Static Site
              </h3>
              <p>
                Craft and deploy fast-loading static sites with an elegant
                design. I&apos;ll set up conversion forms using your preferred
                third-party tools, such as Line or Google Sheets, ensuring your
                visitors can easily engage and take action.
              </p>
              <p className="font-bold mt-6">Feature</p>
              <ul className="mt-3">
                <li>- Custom Design and Figma file</li>
                <li>- Static Site</li>
                <li>- SEO Friendly</li>
                <li>- 90+ pagespeed score guarantee</li>
                <li>- Lead Conversion Forms</li>
                <li>- X Real-Time Content Updates</li>
                <li>- X Live Content Preview</li>
              </ul>
              <p className="font-bold text-h3 text-center mt-10 font-heading">
                Start From 500$
              </p>
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
                  ease: "easeInOut",
                  duration: 0.5,
                  delay: 0.25,
                },
              }}
              viewport={{ once: true }}
              className="text-white bg-gradient-to-b from-[#427CFF] to-[#7E2FFF] hover:shadow-xl shadow-black/10 hover:scale-105 transform-gpu duration-1000"
            >
              <h3 className="text-h4 font-heading font-bold text-center">
                Headless CMS Websites
              </h3>
              <p>
                Develop cutting-edge websites using Headless WordPress. Enjoy
                the up-to-date content management capabilities of WordPress
                while reaping the performance benefits of a static site.
                I&apos;ll also implement custom conversion forms or CTAs to
                seamlessly convert visitors into leads and customers.
              </p>
              <ul className="mt-3">
                <li>- Custom Design and Figma file</li>
                <li>- Static Site</li>
                <li>- SEO Friendly</li>
                <li>- 90+ pagespeed score guarantee</li>
                <li>- Lead Conversion Forms</li>
                <li>- Real-Time Content Updates</li>
                <li>- Live Content Preview</li>
                <li>- Custom Fields</li>
                <li>- Custom Post Type</li>
              </ul>
              <p className="font-bold text-h3 text-center mt-10 font-heading">
                1200-2400$
              </p>
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
                  ease: "easeInOut",
                  duration: 0.5,
                  delay: 0.5,
                },
              }}
              viewport={{ once: true }}
              className="text-white mt-10 bg-gradient-to-b from-itemBgDark to-itemBgDark/30 hover:scale-[1.02] transform-gpu duration-1000"
            >
              <h3 className="text-h4 font-heading font-bold text-center">
                Headless E-commerce
              </h3>
              <p>
                Elevate your online store with comprehensive e-commerce
                functionality. Harness the power of WooCommerce for your product
                listings and manage transactions smoothly with Stripe payment
                integration. Experience a streamlined, scalable, and secure
                online selling platform.
              </p>
              <p className="mt-3">
                all the features of our Headless CMS website service, plus
              </p>
              <ul className="mt-3">
                <li>- Shopping Cart</li>
                <li>- Product Management</li>
                <li>- Stripe Payment</li>
                <li>- Order Management</li>
                <li>- Customer Account Management</li>
                <li>- Coupon</li>
              </ul>
              <p className="font-bold text-h3 text-center mt-10 font-heading">
                2000-3500$
              </p>
            </GridBox>
          </div>
          <ParallaxBox
            amount={400}
            className="absolute w-full h-1/2 rounded-full bg-white/10 bottom-0 left-0 blur-3xl"
          />
        </>
      </BackgroundAnimateWrapper>
    </div>
  );
};
