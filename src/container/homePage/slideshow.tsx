"use client";
import { PageCustomUiQuery } from "../../gql/generated";
import { Controller, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/controller";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

interface renderSlideProps
  extends Omit<
    NonNullable<
      NonNullable<
        NonNullable<
          NonNullable<PageCustomUiQuery["page"]>["customPageUI"]
        >["slideshow"]
      >["content1"]
    >,
    "__typename"
  > {}

function renderSlideComponent(slide: renderSlideProps) {
  if (slide.cta?.url)
    return (
      <SwiperSlide className="md:!w-2/3  relative">
        <Link
          href={slide?.cta?.url || "#"}
          target={slide?.cta?.target || "_self"}
        >
          <div className="relative bg-silver-3 pb-[70%] md:pb-[60%] xl:pb-[50%] group overflow-hidden">
            <Image
              className="object-cover transition group-hover:scale-105 duration-700"
              alt={slide?.image?.altText || ""}
              src={slide?.image?.sourceUrl || ""}
              fill
            />
            <div className="w-full h-full absolute top-0 left-0 bg-fade-black" />
            <div className="w-full absolute bottom-0 left-0 py-10 px-20 text-center line-clamp-2">
              <h2 className="text-h5 lg:text-h3 overflow-hidden font-bold font-title text-white relative transition group-hover:scale-105 duration-700">
                {slide?.title}
              </h2>
              <p className="text-white md:text-h6 line-clamp-3">
                {slide?.subTitle}
              </p>
            </div>
          </div>
        </Link>
      </SwiperSlide>
    );
  return (
    <SwiperSlide className="md:!w-2/3  relative">
      <div className="relative bg-silver-3 pb-[50%] group overflow-hidden">
        <Image
          className="object-cover transition group-hover:scale-105 duration-700"
          alt={slide?.image?.altText || ""}
          src={slide?.image?.sourceUrl || ""}
          fill
        />
        <div className="w-full h-full absolute top-0 left-0 bg-fade-black" />
        <div className="w-full absolute bottom-0 left-0 py-10 px-20 text-center line-clamp-2">
          <h2 className="text-h5 md:text-h3 font-bold font-title text-white relative transition group-hover:scale-105 duration-700">
            {slide?.title}
          </h2>
          <p className="text-white md:text-h6 line-clamp-3">
            {slide?.subTitle}
          </p>
        </div>
      </div>
    </SwiperSlide>
  );
}

function renderSlide(slide: renderSlideProps) {
  if (!slide.image) return null;

  return <>{renderSlideComponent(slide)}</>;
}

export function Slideshow(
  slideshow: NonNullable<
    NonNullable<PageCustomUiQuery["page"]>["customPageUI"]
  >["slideshow"]
) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      style={{ order: slideshow?.order || 99 }}
      className=" w-full bg-secondary"
    >
      <Swiper
        wrapperClass={clsx(
          !mounted && "transform !translate-x-[16.666666666%]"
        )}
        modules={[Controller, Autoplay]}
        className="!overflow-hidden"
        spaceBetween={0}
        slidesPerView={1}
        breakpoints={{
          // 0: {
          //   slidesPerView: 1,
          //   centeredSlides: true,
          // },
          768: {
            slidesPerView: 1.5,
            centeredSlides: true,
          },
        }}
        centeredSlides
        loop
        autoplay={{
          delay: 3000,
          pauseOnMouseEnter: true,
          disableOnInteraction: true,
          waitForTransition: true,
        }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {slideshow?.content1 && slideshow?.content1.image?.sourceUrl && (
          <>
            {renderSlide({ ...slideshow?.content6 })}
            {renderSlide({ ...slideshow?.content5 })}
            {renderSlide({ ...slideshow?.content4 })}
            {renderSlide({ ...slideshow?.content3 })}
            {renderSlide({ ...slideshow?.content2 })}
            {renderSlide(slideshow?.content1)}
          </>
        )}
      </Swiper>
    </div>
  );
}
