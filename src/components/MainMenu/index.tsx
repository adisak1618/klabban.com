import clsx from "clsx";
import { MenuRequest } from "klabban-commerce";
import { HamburgerMenu } from "./burgerMenu";
import { MenuLink } from "./wrapper";
import { KlabbanConfig } from "libs/klabbanConfig";
import { SubMenu } from "./subMenu";
import { Logo } from "components/Logo";
import { Social } from "./social";
import { HeadroomWrapper } from "./headroom";
import Link from "next/link";
export async function MainMenu({
  light = false,
  textColor = "dark",
}: {
  light?: boolean;
  textColor?: "light" | "dark";
}) {
  const { formatedMenu } =
    (await MenuRequest({
      ...KlabbanConfig,
      input: {
        id: "home",
      },
      option: {
        next: {
          tags: ["menu/home"],
        },
      },
    })) || [];

  return (
    <HeadroomWrapper light={light}>
      <div
        style={{
          // background: "var(--navigation-bg)",
          color: textColor === "dark" ? "var(--text-color)" : "var(--bg)",
          height: "var(--header-height, 70px)",
        }}
        className={clsx(
          "flex items-center transition-all duration-300 text-navigation-text bg-opacity-40",
          !light && "border-b border-border"
        )}
      >
        <div className="mx-auto lg:container px-5 w-full flex flex-wrap items-center">
          <HamburgerMenu menus={formatedMenu} light={light} />
          <MenuLink className="flex-1 md:flex-none flex items-center">
            <Link href="/" aria-label="home page">
              <Logo />
            </Link>
          </MenuLink>
          {/* <div className="md:hidden flex-1" /> */}
          <div className="hidden flex-1 md:flex flex-wrap lg:text-h6">
            {formatedMenu.map((menu) => {
              const isTree =
                (menu.children || [])?.flatMap((a) => a.children).length > 0;
              return (
                <div key={menu.id} className="group leading-[70px] capitalize">
                  <>
                    <MenuLink
                      className="flex items-center"
                      href={menu.uri || "#"}
                    >
                      <>
                        {menu.label || ""}
                        {(menu.children || [])?.length > 0 ? (
                          // eslint-disable-next-line jsx-a11y/alt-text
                          <img
                            className="w-6 h-6"
                            src="/images/icons/chevron-down.svg"
                          />
                        ) : null}
                      </>
                    </MenuLink>
                    {(menu.children || [])?.length > 0 && (
                      <div
                        className={clsx(
                          "hidden group-hover:block -mx-3 bg-white rounded-b-md shadow overflow-hidden",
                          !isTree && "absolute"
                        )}
                      >
                        <SubMenu
                          root
                          menus={menu.children || []}
                          active={false}
                          full={isTree}
                        />
                      </div>
                    )}
                  </>
                </div>
              );
            })}
          </div>

          <Social />
        </div>
      </div>
    </HeadroomWrapper>
  );
}
