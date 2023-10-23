import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-[#884A39] to-[#C38154]">
      <section className="wrapper text-center !translate-y-[0px]">
        <div className="flex items-center justify-center transform translate-y-[-0.55em]">
          <h1 className="text-white header-font uppercase font-bold text-h5 md:h4 lg:text-h3 text-center">
            Klabban Commerce
          </h1>
        </div>
        <div className="top">Comming</div>

        <div
          className="bottom text-center bg-gradient-to-r from-[#FFC26F] to-[#F9E0BB]"
          aria-hidden="true"
        >
          Soon
        </div>
      </section>
    </div>
  );
}
