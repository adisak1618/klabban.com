"use client";
import clsx from "clsx";
import { useState } from "react";
import { MenuWrapper } from "./wrapper";
import { Logo } from "components/Logo";
import { MenuType } from "klabban-commerce";
import Link from "next/link";

function RenderMenu({
  menus,
  root = false,
}: {
  menus: MenuType[];
  root?: boolean;
}) {
  return (
    <div className="">
      {menus.map((menu) => (
        <div className="" key={menu.label}>
          <Link
            className="mt-2 font-medium text-text-color text-h6 hover:text-[var(--text-link-hover)] px-3 py-1 hover:font-bold "
            href={menu.url || ""}
          >
            {!root && "-"} {menu.label}
          </Link>
          <div className="pl-3">
            {menu.children && <RenderMenu menus={menu.children} />}
          </div>
        </div>
      ))}
    </div>
  );
}

export function HamburgerMenu({ menus }: { menus: MenuType[] }) {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <MenuWrapper
        onClick={() => setOpen(true)}
        className="py-3 !px-0 text-[var(--navigation-text)] lg:hidden hover:scale-110 transition-transform ease-in-out "
      >
        <svg
          version="1.1"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          height="100%"
          fill="currentColor"
        >
          <g id="grid_system" />
          <g id="_icons">
            <path d="M5,7h14c0.6,0,1-0.4,1-1s-0.4-1-1-1H5C4.4,5,4,5.4,4,6S4.4,7,5,7z" />
            <path d="M3,13h14c0.6,0,1-0.4,1-1s-0.4-1-1-1H5c-0.6,0-1,0.4-1,1S4.4,13,5,13z" />
            <path d="M5,19h14c0.6,0,1-0.4,1-1s-0.4-1-1-1H5c-0.6,0-1,0.4-1,1S4.4,19,5,19z" />
          </g>
        </svg>
      </MenuWrapper>
      <div
        className={clsx(
          "fixed shadow-lg top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform  bg-white w-[80%] md:w-[450px] lg:hidden dark:bg-gray-800",
          !isOpen && "-translate-x-full"
        )}
        aria-labelledby="drawer-label"
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          data-drawer-hide="drawer-example"
          aria-controls="drawer-example"
          className="text-gray-400 text-text-color bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <div className="flex justify-center mb-10 text-text-color">
          <Logo />
        </div>
        <div>
          {/* body */}
          <RenderMenu menus={menus} root />
        </div>
      </div>
    </>
  );
}
