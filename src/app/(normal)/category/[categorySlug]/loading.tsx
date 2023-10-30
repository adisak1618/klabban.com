import { Breadcrumb } from "components/Breadcrumb";
import { AnimateCard } from "components/animateCard";

export default function Loading() {
  return (
    <>
      <div className="mx-auto !max-w-5xl mt-6 mb-4 lg:container px-5">
        <Breadcrumb
          links={[
            {
              label: "Blog",
              href: "/blog",
            },
          ]}
        />
      </div>
      <div className="container-content xl:!max-w-7xl py-3">
        <AnimateCard
          avatarClassName="md:min-w-[400px]"
          avatarImage={"/images/cover.jpg"}
          content={
            <div className="p-6 relative text-center md:text-left flex flex-col justify-center">
              <p className="text-body uppercase leading-[1em] text-text-third tracking-widest">
                Category
              </p>
              <h1 className="text-h2 uppercase mb-2 font-bold leading-[1em] text-text-color drop-shadow-2xl tracking-widest"></h1>
            </div>
          }
        />
      </div>
    </>
  );
}
