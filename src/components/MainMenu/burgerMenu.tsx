"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { MenuLink } from "./wrapper";
import { Logo } from "components/Logo";
import { MenuType } from "klabban-commerce";
import Link from "next/link";
import { Social } from "./social";

function RenderMenu({
  menus,
  root = false,
  onLinkClick,
}: {
  menus: MenuType[];
  root?: boolean;
  onLinkClick?: () => void;
}) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <div className="">
      {menus.map((menu) => (
        <div className="" key={menu.label}>
          <div
            className={clsx(
              "mt-2 flex gap-3 items-center w-full uppercase text-left text-text-color hover:text-primary",
              root && "text-h6 border-b border-border font-bold",
              (menu.children || [])?.length > 0 && "font-bold"
            )}
          >
            {/* {!root && "-"}  */}
            <Link
              href={menu.uri || ""}
              className="flex-1 px-6 py-3"
              onClick={() => {
                menu.uri != "#" ? onLinkClick?.() : setActiveMenu(menu.id);
              }}
              prefetch={false}
            >
              {menu.label}
            </Link>
            {(menu.children || []).length > 0 && (
              <div
                className={clsx(
                  "p-3 cursor-pointer hover:text-[var(--text-link-hover)] relative",
                  activeMenu === menu.id && "-rotate-180"
                )}
                onClick={(e) => {
                  setActiveMenu(menu.id);
                }}
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M7 10L12 15L17 10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
          <div
            className={clsx(
              "pl-6 transition-all overflow-hidden",
              activeMenu === menu.id ? "max-h-[700px]" : "max-h-[0px]"
            )}
          >
            {menu.children && <RenderMenu menus={menu.children} />}
          </div>
        </div>
      ))}
    </div>
  );
}

export function HamburgerMenu({
  menus,
  logo,
  light = false,
}: {
  menus: MenuType[];
  logo?: string;
  light?: boolean;
}) {
  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isOpen]);
  return (
    <>
      <MenuLink
        onClick={() => setOpen(true)}
        className={clsx(
          "py-3.5 !px-0 lg:hidden hover:scale-110 transition-transform ease-in-out",
          light ? "text-text-color" : "text-white"
        )}
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
      </MenuLink>
      {isOpen && (
        <div
          onClick={() => setOpen(false)}
          className="fixed z-20 w-full h-screen bg-text-color opacity-50 left-0 top-0"
        ></div>
      )}
      <div
        className={clsx(
          "fixed overflow-hidden h-screen flex flex-col shadow-lg top-0 left-0 z-40 p-4 overflow-y-auto transition-transform  bg-white w-[80%] md:w-[450px] lg:hidden dark:bg-gray-800",
          !isOpen && "-translate-x-full"
        )}
        aria-labelledby="drawer-label"
      >
        <div className="border-b border-border">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="open mobile menu"
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
          <Link
            href="/"
            aria-label="go to home page"
            className="flex justify-center mb-4 text-text-color"
          >
            <Logo logo={logo} />
          </Link>
        </div>
        <div className="flex-1 text-text-color mt-3">
          {/* body */}
          <RenderMenu onLinkClick={() => setOpen(false)} menus={menus} root />
          <div className="flex justify-center border-t border-border pt-3">
            <Social />
          </div>
        </div>
      </div>
    </>
  );
}
