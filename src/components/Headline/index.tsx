"use client";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface HeadlineSectionProps {
  backgroundImage: string;
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
  title,
  subTitle,
  subTitleClassName,
  hideSubTitle = false,
  className,
  footer,
  header,
}: HeadlineSectionProps) {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})` || "",
      }}
      className={twMerge(
        clsx(
          "bg-third max-w-full overflow-hidden relative headline-shape bg-fixed bg-cover bg-top flex items-end",
          className
        )
      )}
    >
      <div className="dark-fade-bg flex-1 pt-20 pb-10">
        <div className="mx-auto container px-5 text-center relative z-10">
          {header}
          <h1 className="text-h3 mb-6 sm:h2 md:text-h1 font-bold text-center inline-block leading-[1em] md:leading-[1em] text-white px-6 drop-shadow-2xl">
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

      {/* <span className="bg-black opacity-30 absolute w-full h-full top-0 left-0"></span> */}
      {/* <div className="bg-fade-black absolute w-full h-full top-0 left-0" /> */}
    </div>
  );
}
