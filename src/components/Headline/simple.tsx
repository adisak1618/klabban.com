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
}

export function NormalHeadlineSection({
  backgroundImage,
  title,
  subTitle,
  subTitleClassName,
  hideSubTitle = false,
  className,
  footer,
}: HeadlineSectionProps) {
  return (
    <div
      // style={{ backgroundImage: `url(${backgroundImage})` }}
      className={clsx(
        "relative flex container-content overflow-hidden",
        className
      )}
    >
      <div className="max-w">
        <img className="max-w-[400px]" src={backgroundImage} />
      </div>
      <div className="flex-1 pt-10 pb-10">
        <div className="mx-auto container px-5 text-center relative z-10">
          <p className="text-body uppercase leading-[1em] text-text-third tracking-widest">
            Category
          </p>
          <h1 className="text-h2 uppercase mb-2 font-bold text-center leading-[1em] text-text-color px-6 drop-shadow-2xl tracking-widest">
            {title}
          </h1>

          {subTitle ? (
            <p
              className={clsx(
                "mb-6 text-h6 text-text-secondary mx-auto px-4 py-0 max-w-2xl line-clamp-5",
                subTitleClassName
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
    </div>
  );
}
