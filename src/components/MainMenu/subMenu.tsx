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
        "bg-secondary py-2 text-sm text-text-color  dark:text-gray-200",
        root && full && "shadow-2xl border-b border-border",
        full &&
          "w-full flex items-baseline absolute flex-wrap left-0 bg-secondary p-6 !divide-y-0 lg:gap-1 justify-center !py-10"
      )}
    >
      {menus.map((menu) => (
        <>
          <div
            key={menu.id}
            className={clsx(
              "block leading-[1em] py-2 hover:bg-secondary hover:text-primary",

              full && "min-w-[150px] max-w-[250px] px-3"

              // !root && "pl-10"
            )}
          >
            <Link
              href={menu.uri || "#"}
              className={clsx(
                (menu.children || []).length > 0
                  ? "font-bold underline"
                  : "font-normal"
              )}
            >
              {menu.label}
            </Link>
            {(menu.children || []).length > 0 && (
              <div className="">
                <SubMenu menus={menu.children || []} />
              </div>
            )}
          </div>
        </>
      ))}
    </div>
  );
}
