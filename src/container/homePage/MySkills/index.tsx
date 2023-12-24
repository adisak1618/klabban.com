"use client";
import { JetBrains_Mono } from "next/font/google";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "components/ui/tooltip";
import clsx from "clsx";
import { BackgroundAnimateWrapper } from "components/BackgroundAnimateWrapper";
import {
  HTMLMotionProps,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import CursorBlinker from "../HeroSection/blinkCursor";
const CodeFont = JetBrains_Mono({
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["700", "400"],
});

type IconBoxProps = HTMLMotionProps<"div"> & {
  icon: string;
  size?: "big" | "small";
  title?: string;
  description?: string;
};

const IconBox = motion(
  ({ icon, size = "small", title, description, className }: IconBoxProps) => {
    return (
      <Tooltip>
        <TooltipTrigger
          // style={{ width: size, height: size }}
          className={clsx(
            className,
            "relative  w-full  hover:scale-110 transform-gpu duration-300",
            // "hover:bg-gray-100 rounded-[12%] hover:shadow-md",
            "card flex items-center justify-center"
            // size === "small" ? "p-4" : "p-4 md:col-span-2 md:row-span-2"
            //md:col-span-2 md:row-span-2
          )}
        >
          <motion.img
            className="max-w-full max-h-full w-full h-full"
            src={`/images/icons/tech/${icon}.svg`}
          />
        </TooltipTrigger>
        <TooltipContent className="text-center">
          <p className="text-center mt-1 font-bold text-lg">{title || icon}</p>
          {description && <p className="max-w-sm">{description}</p>}
        </TooltipContent>
      </Tooltip>
    );
  }
);

type GridBox = HTMLMotionProps<"div">;

const GridBox = ({ children, className, ...props }: GridBox) => (
  <motion.div
    className={clsx(
      "p-6 bg-white rounded-xl shadow-md shadow-gray-500/10",
      className
    )}
    {...props}
  >
    {children}
  </motion.div>
);

const AllOtherStacks: IconBoxProps[] = [
  {
    icon: "stripe",
    title: "stripe",
    size: "big",
    description: "",
  },
  {
    icon: "google",
    title: "google",
    description: "",
  },
  {
    icon: "google-tag-manager",
    title: "Google Tag Manager",
    description: "",
  },
  {
    icon: "figma",
    size: "big",
    title: "figma",
    description: "",
  },
  {
    icon: "eslint",
    title: "eslint",
    description: "",
  },
  {
    icon: "prettier",
    title: "prettier",
    description: "",
  },
  {
    icon: "vscode",
    title: "vscode",
    description: "",
  },
  {
    icon: "analytics",
    title: "analytics",
    description: "",
  },

  {
    icon: "git",
    title: "git",
    description: "",
  },
  {
    icon: "docker",
    title: "docker",
    description: "",
  },
];

const BackendStacks: IconBoxProps[] = [
  {
    icon: "wordpress",
    title: "Wordpress",
    size: "big",
    description: "",
  },

  {
    icon: "nodejs",
    title: "nodejs",
    description: "",
  },
  {
    icon: "hasura",
    title: "hasura",
    description: "",
  },
  {
    icon: "typeorm",
    title: "typeorm",
    description: "",
  },
  {
    icon: "graphql",
    size: "big",
    title: "graphql",
    description: "",
  },
  {
    icon: "postgresql",
    title: "postgresql",
    description: "",
  },
  {
    icon: "woocommerce",
    size: "big",
    title: "woocommerce",
    description: "",
  },
  {
    icon: "mysql",
    title: "mysql",
    description: "",
  },
  {
    icon: "auth0",
    title: "auth0",
    description: "",
  },
  // {
  //   icon: "cloudinary",
  //   title: "cloudinary",
  //   description: "",
  // },
];

const ServerStacks: IconBoxProps[] = [
  {
    icon: "vercel",
    title: "Vercel",
    size: "big",
    description: "",
  },
  {
    icon: "aws",
    title: "Aws",

    description: "",
  },
  {
    icon: "hostinger",
    title: "Hostinger",

    description: "",
  },
  {
    icon: "cloudflare",
    title: "Cloudflare",

    description: "",
  },
  {
    icon: "cloudflare-workers",
    title: "Cloudflare Workers",

    description: "",
  },
];

const FrontEndStacks: IconBoxProps[] = [
  {
    icon: "nextjs",
    title: "Next.JS",
    size: "big",
    description: "",
  },
  {
    icon: "react",
    title: "React",

    description: "",
  },
  {
    icon: "typescript",
    title: "Typescript",
    // size: "big",
    description: "",
  },
  {
    icon: "tailwind",
    title: "Tailwind",
    size: "big",
    description: "",
  },
  {
    icon: "javascript",
    title: "Javascript",
    description: "",
  },

  {
    icon: "react-query",
    title: "React Query",
    description: "",
  },
  {
    icon: "framer",
    title: "Framer Motion",
    // size: "big",
    description: "",
  },
  {
    icon: "formik",
    title: "Formik",
    description: "",
  },
];

export const MySkillsSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "7 1"],
  });
  const headingOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, 0.9, 1]
  );
  const widthPercent = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const headingY = useTransform(scrollYProgress, [0, 1], ["0em", "0.8em"]);

  return (
    <BackgroundAnimateWrapper
      // color="#e0e0ac"
      color="#f5f5f7"
      className="relative container mx-auto min-h-[100vh] pt-40 pb-60 !text-text-secondary-color "
    >
      <TooltipProvider>
        <div className="flex justify-center">
          <motion.div
            style={{ width: widthPercent }}
            className="absolute top-20 h-2 bg-primary/20 text-white rounded-xl"
          />
        </div>
        <motion.h2
          ref={ref}
          style={{
            y: headingY,
            opacity: headingOpacity,
          }}
          className={clsx(
            "text-[62px] md:text-[100px] lg:text-[120px] text-primary font-bold italic mb-10 tracking-[-0.1em]",
            CodeFont.className
          )}
        >
          &lt;Tech.Stack /&gt;
          <CursorBlinker character="_" />
        </motion.h2>
        <div
          className={clsx(
            "grid md:grid-cols-3 gap-6 relative mb-6",
            CodeFont.className
          )}
        >
          <GridBox className="md:col-span-2 ">
            <motion.h2
              initial={{
                opacity: 0,
                y: 100,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: 0.5, ease: "easeInOut" },
              }}
              className="text-h3 font-extrabold font-heading"
            >
              My Goto Stack Right Now.
            </motion.h2>
            <motion.p
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
                  delay: 1,
                },
              }}
              className="text-h5 font-light mb-4"
            >
              These are my go to tech stack to make any projects happen. I am
              always eager of learning more about my current stack, and new
              technologies that could expand my horizons.These are my go to tech
              stack to make any projects happen.
            </motion.p>
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
                delay: 1.25,
              },
            }}
            viewport={{ once: true }}
          >
            <h3 className="text-h3 font-extrabold font-heading">Server</h3>
            <div className="grid gap-3 photo-grid grid-flow-dense">
              {ServerStacks.map((icon) => (
                <IconBox key={icon.icon} {...icon} />
              ))}
            </div>
          </GridBox>
        </div>
        <div
          className={clsx("grid md:grid-cols-2 gap-6 mb-6", CodeFont.className)}
        >
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
          >
            <h3 className="text-h3 font-extrabold">FrontEnd</h3>
            <div className="grid gap-3 photo-grid grid-flow-dense">
              {FrontEndStacks.map((icon) => (
                <IconBox key={icon.icon} {...icon} />
              ))}
            </div>
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
                delay: 0.75,
              },
            }}
            viewport={{ once: true }}
            className=""
          >
            <h3 className="text-h3 font-extrabold font-heading">BackEnd</h3>
            <div className="grid gap-3 photo-grid grid-flow-dense">
              {BackendStacks.map((icon) => (
                <IconBox key={icon.icon} {...icon} />
              ))}
            </div>
          </GridBox>
        </div>
        <div className={clsx("grid md:grid-cols-3 gap-6", CodeFont.className)}>
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
          >
            <h3 className="text-h3 font-extrabold font-heading flex-wrap">
              AI Tools
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {["openai", "relume", "midjourney"].map((icon) => (
                <IconBox className="" key={icon} icon={icon} />
              ))}
            </div>
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
                delay: 0.75,
              },
            }}
            viewport={{ once: true }}
            className="md:col-span-2 "
          >
            <motion.h2
              initial={{
                opacity: 0,
                y: 100,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: 0.5, ease: "easeInOut" },
              }}
              viewport={{ once: true }}
              className="text-h2 font-extrabold font-heading "
            >
              All other tools
            </motion.h2>
            <div className="grid gap-3 photo-grid grid-flow-dense">
              {AllOtherStacks.map((icon) => (
                <IconBox key={icon.icon} {...icon} />
              ))}
            </div>
          </GridBox>
        </div>
      </TooltipProvider>
    </BackgroundAnimateWrapper>
  );
};
