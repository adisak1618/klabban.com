import clsx from "clsx";
import { MenuProvider } from "klabban-commerce";
import { HamburgerMenu } from "./burgerMenu";
import { MenuWrapper } from "./wrapper";
import { KlabbanConfig } from "libs/klabbanConfig";
import { SubMenu } from "./subMenu";
import { Logo } from "components/Logo";
import { Social } from "./social";
import { HeadroomWrapper } from "./headroom";
import Link from "next/link";
export function MainMenu({ light = false }: { light?: boolean }) {
  return (
    <MenuProvider
      {...KlabbanConfig}
      variables={{
        id: "home",
      }}
    >
      {({ menus }) => (
        <HeadroomWrapper light={light}>
          <div
            style={{
              background: "var(--navigation-bg)",
              color: "var(--navigation-text)",
              height: "var(--header-height, 70px)",
            }}
            className={clsx(
              "flex items-center transition-all duration-300 text-navigation-text bg-opacity-40",
              !light && "border-b border-border"
            )}
          >
            <div className="container-content w-full flex flex-wrap items-center">
              <HamburgerMenu menus={menus} />
              <MenuWrapper className="flex-1 md:flex-none flex items-center">
                <Link href="/" aria-label="go to home page">
                  <Logo />
                </Link>
              </MenuWrapper>
              {/* <div className="md:hidden flex-1" /> */}
              <div className="hidden flex-1 md:flex flex-wrap lg:text-h6">
                {menus.map((menu) => {
                  const isTree =
                    (menu.children || [])?.flatMap((a) => a.children).length >
                    0;
                  return (
                    <MenuWrapper
                      key={menu.id}
                      className="group leading-[70px] font-bold hover:text-primary hover:font-semibold content-stretch capitalize hover:border-b-2 border-primary"
                    >
                      <Link href={menu.uri || "#"}>
                        {menu.label}
                        {(menu.children || [])?.length > 0 && (
                          <div
                            className={clsx(
                              "hidden group-hover:block -mx-3 bg-secondary rounded-lg px-6 shadow",
                              !isTree && "absolute py-3"
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
                      </Link>
                    </MenuWrapper>
                  );
                })}
              </div>

              <Social />
            </div>
          </div>
        </HeadroomWrapper>
      )}
    </MenuProvider>
  );
}
