"use client";
import { useViewer } from "klabban-commerce/react";
import { useSession, signIn, signOut } from "klabban-commerce/auth";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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
        <div className="container max-w-6xl w-full h-full relative mx-auto">
          <motion.img
            src="/images/hero.webp"
            className="absolute bottom-0 right-0"
          ></motion.img>
          <div className="absolute bottom-1/2 w-1/2 left-0">
            <h1 className="text-h1 font-title font-bold text-white uppercase">
              Im Soryor.
            </h1>
            <p className="text-h6 font-title font-medium text-white">
              I create travel guides and backpacking itineraries for countries
              such as Thailand and New Zealand, in addition to sharing
              photography resources and more.
            </p>
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
