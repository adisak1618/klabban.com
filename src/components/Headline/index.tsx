"use client";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface HeadlineSectionProps {
  backgroundImage?: string;
  backgroundSrcSet?: string;
  imageAlt?: string;
  title: string;
  subTitle?: string;
  subTitleClassName?: string;
  hideSubTitle?: boolean;
  className?: string;
  footer?: JSX.Element;
  header?: JSX.Element;
}

export function HeadlineSection({
  backgroundImage,
  imageAlt,
  title,
  subTitle,
  subTitleClassName,
  hideSubTitle = false,
  className,
  footer,
  header,
  backgroundSrcSet,
}: HeadlineSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <div
      // style={{
      //   backgroundImage: `url(${backgroundImage})` || "",
      // }}
      className={twMerge(
        clsx(
          "bg-third max-w-full overflow-hidden relative bg-fixed bg-cover bg-top flex items-end",
          className
        )
      )}
    >
      <div
        className={clsx(
          "z-10 headline-shape flex-1 pt-20 pb-10 text-white",
          backgroundImage && "dark-fade-bg"
        )}
      >
        <div className="mx-auto container px-5 text-center relative z-10 ">
          {header}
          <h1 className=" inline mx-auto py-2 bg-opacity-50 text-h3 mb-6 sm:h3 md:text-h2 font-bold text-center  leading-[1.7em] md:leading-[1.565em] text-white px-3 drop-shadow-2xl">
            {title}
          </h1>
          <br />
          {subTitle ? (
            <p
              className={clsx(
                "mb-6 text-h5 text-white mx-auto px-4 py-0 font-medium max-w-2xl line-clamp-5"
              )}
            >
              {subTitle?.replaceAll(
                /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g,
                ""
              ) || "Please Add Page slug name /blog and add description"}
            </p>
          ) : (
            <>{hideSubTitle ? null : <div className="h-20" />}</>
          )}
          {footer}
        </div>
      </div>
      {backgroundImage && (
        <motion.div
          className="w-full h-full absolute"
          style={{
            y: backgroundY,
          }}
        >
          <Image
            priority
            src={backgroundImage}
            alt={imageAlt || "cover"}
            // srcSet={backgroundSrcSet}
            fill
            sizes="(max-width: 5000px) 100vw"
            className="w-full h-full object-cover object-center absolute"
          />
        </motion.div>
      )}

      {/* <span className="bg-black opacity-30 absolute w-full h-full top-0 left-0"></span> */}
      {/* <div className="bg-fade-black absolute w-full h-full top-0 left-0" /> */}
    </div>
  );
}
