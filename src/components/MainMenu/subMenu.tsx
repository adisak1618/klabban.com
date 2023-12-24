"use client";
import clsx from "clsx";
import { MenuType } from "klabban-commerce";
import Link from "next/link";

interface SubMenuProps {
  active?: boolean;
  menus: MenuType[];
  root?: boolean;
  parentMenuLabel?: string;
  full?: boolean;
}

export function SubMenu({ menus, root, full = false }: SubMenuProps) {
  return (
    <div
      className={clsx(
        "text-base text-text-color",
        // root && full && "shadow-sm border-b border-border",
        full && "w-full py-2 absolute left-0 "
      )}
    >
      <div
        className={clsx(
          "w-full flex-wrap",
          root && full && "container  mx-auto",
          // !full && root && "divide-y",
          menus.length > 0 && root && full && "flex"
        )}
      >
        <div
          className={clsx(
            root && "bg-white",
            menus.length > 0 &&
              root &&
              full &&
              "flex divide-x flex-wrap py-4 rounded-2xl shadow-sm border border-secondary"
          )}
        >
          {menus.map((menu) => (
            <div
              key={menu.databaseId}
              className={clsx(
                "block leading-[1em] ",
                root && full && "px-10"
                // root && !full && "px-6 py-6 hover:bg-secondary"

                // full && "min-w-[150px] max-w-[250px] px-3"

                // !root  && "pl-6"
              )}
            >
              <Link
                href={menu.uri || "#"}
                className={clsx(
                  "flex items-center hover:text-primary",
                  root && !full ? "pl-6 pr-20 py-6 hover:bg-secondary" : "py-2",
                  (menu.children || []).length > 0 && root
                    ? "font-semibold text-h6 mb-3"
                    : "font-normal"
                )}
                prefetch={false}
              >
                {menu.label}
                {/* {(menu.children?.length || 0) > 0 && root
                  ? ` (${menu.children?.length})`
                  : ""} */}
              </Link>
              {(menu.children || []).length > 0 && (
                <div className="">
                  <SubMenu menus={menu.children || []} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
