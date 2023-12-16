"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MenuLink({
  children,
  className,
  onClick,
  href,
}: {
  onClick?: () => void;
  children: JSX.Element | string;
  className?: string;
  href?: string;
}) {
  const defaultStyle =
    "h-[70px] px-1.5 md:px-3 flex-nowrap whitespace-nowrap cursor-pointer";
  const pathname = usePathname();
  if (href) {
    return (
      <Link
        onClick={onClick}
        className={clsx(
          defaultStyle,
          className,
          pathname === href.replace(/\/$/, "") && "font-semibold"
        )}
        href={href}
      >
        {children}
      </Link>
    );
  }
  return (
    <div onClick={onClick} className={clsx(defaultStyle, className)}>
      {children}
    </div>
  );
}
