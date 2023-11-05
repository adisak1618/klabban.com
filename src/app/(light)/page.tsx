"use client";
import { useViewer } from "klabban-commerce/react";
import { useSession, signIn, signOut } from "klabban-commerce/auth";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "ui/button";

export default function Home() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const { data, status } = useSession();
  const [{ data: viewer }] = useViewer({});

  if (!data) {
    return <button onClick={() => signIn()}>login</button>;
  }

  return (
    <div>
      <div className="page-hero-shape h-[98vh] w-full overflow-hidden gray-gradient relative">
        <div className="leading-[200px] mt-20 lg:mt-10 lg:leading-[250px] text-white text-[150px] lg:text-[250px] opacity-30 font-bold absolute w-full h-full left-0 top-0 text-center">
          <p className=" animate-marquee whitespace-nowrap">
            WELCOME WELCOME WELCOME WELCOME WELCOME WELCOME
          </p>
          <p className=" animate-marquee2 whitespace-nowrap">
            WELCOME WELCOME WELCOME WELCOME WELCOME WELCOME
          </p>
        </div>
        {/* <div className="hidden lg:flex text-[250px] animate-marquee lg:animate-none text-white opacity-30 font-bold absolute w-full h-1/2 justify-center items-center">
            <p className="">WELCOME</p>
          </div> */}
        <div className="container max-w-6xl w-full h-full relative mx-auto">
          <motion.img
            src="/images/hero.webp"
            className="absolute bottom-8 lg:bottom-0 lg:right-0 left-1/2 lg:left-auto ml-[-400px] lg:ml-0 min-w-[800px] object-cover"
          ></motion.img>
          <div className="absolute flex flex-col justify-center items-center bottom-0 mb-28 lg:mb-40 w-full lg:max-w-lg px-10 left-0">
            <h1 className="text-h2 leading-[1em] text-center sm:text-h1 font-title font-bold text-white uppercase">
              Im Soryor.
            </h1>
            <p className="text-h6 font-title font-medium text-white text-center lg:text-left">
              I create travel guides and backpacking itineraries for countries
              such as Thailand and New Zealand, in addition to sharing
              photography resources and more.
            </p>
            <div className="flex gap-4 mt-4">
              <Button size="xl" className="rounded-full">
                Read My Blog
              </Button>
              <Button variant="secondary" size="xl" className="rounded-full">
                About Me
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[300vh]"></div>
      <p>Hello, {viewer?.viewer?.email}</p>
      <p>status: {status}</p>
      {/* <p>{JSON.stringify(data)}</p> */}

      <button onClick={() => signOut()}>logout</button>
    </div>
  );
}
