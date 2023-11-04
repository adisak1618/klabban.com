import clsx from "clsx";
import { AnimateCard } from "components/animateCard";

interface AuthorCardProps {
  className?: string;
  avatarImage?: string;
  name: string;
  description?: string;
}

export function AuthorCard({
  className,
  name,
  avatarImage,
  description,
}: AuthorCardProps) {
  return (
    <AnimateCard
      className={clsx("flex-1 col-span-2", className)}
      avatarImage={avatarImage || "/images/cover.webp"}
      content={
        <div className="p-6 relative text-center md:text-left flex flex-col justify-center items-stretch">
          <p className="text-body uppercase leading-[1em] text-text-third tracking-widest">
            Craft by
          </p>
          <h1 className="text-h4 leading-[2em] md:text-h3 uppercase mb-2 font-bold md:leading-[1em] text-text-color drop-shadow-2xl tracking-widest">
            {name || ""}
          </h1>

          {description && (
            <p
              className={
                "text-body text-text-secondary py-0 max-w-2xl line-clamp-5"
              }
            >
              {description}
            </p>
          )}
        </div>
      }
    />
  );
}
