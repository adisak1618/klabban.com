import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface AuthorCardProps {
  className?: string;
  avatarImage?: string;
  avatarSrcSetImage?: string;
  content?: JSX.Element;
  avatarClassName?: string;
  small?: boolean;
}

export function AnimateCard({
  className,
  avatarImage,
  avatarSrcSetImage,
  content,
  avatarClassName,
  small = false,
}: AuthorCardProps) {
  return (
    <div
      className={clsx(
        "group flex flex-col md:flex-row bg-secondary hover:bg-third overflow-hidden relative group hover:shadow-xl border border-border transition-shadow shadow-none duration-300",
        !small && "rounded-[25px]",
        small && "rounded-2xl",
        className
      )}
    >
      <div className={twMerge(clsx("min-w-[250px] relative", avatarClassName))}>
        <div className="w-[37%] absolute h-full top-0 right-0 overflow-hidden">
          <svg
            width="20"
            role="img"
            aria-hidden="true"
            className={clsx(
              "transition-all ease-linea hidden text-secondary group-hover:text-third md:block absolute -scale-x-100 z-[2] top-0 bg-right-top  h-[200%] group-hover:top-[-100%]",
              !small &&
                "w-[40px] right-[-10px] md:w-[50px] group-hover:w-[20px]  md:group-hover:w-[30px] duration-[800ms]",
              small &&
                "w-[20px] right-[-5px] md:w-[20px] group-hover:w-[10px]  md:group-hover:w-[15px] duration-[400ms]"
            )}
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 66.46 526"
          >
            <path
              // className="transition-all duration-300 ease-linear"
              fill="currentColor"
              d="M41 526c13.61-38 47.43-153.17 4.06-263-55.93-141.6 0-263 0-263H0v526z"
            ></path>
          </svg>
        </div>
        <div className="relative w-full h-full pb-[75%] text-secondary group-hover:text-third bg-cover bg-center overflow-hidden">
          <img
            src={avatarImage}
            srcSet={avatarSrcSetImage}
            className="absolute w-full h-full object-cover transition-all ease-linear duration-500 group-hover:scale-110"
          />
          <svg
            className="shape-fit md:hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 1183 42.14"
          >
            <path fill="currentColor" d="M0,0S535,78.49,1183,0V42.14H0Z" />
          </svg>
        </div>
      </div>
      {content}
    </div>
  );
}
