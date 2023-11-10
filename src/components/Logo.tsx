import Image from "next/image";

export function Logo({ logo }: { logo?: string }) {
  return (
    <div className="h-[40px] relative flex items-center gap-1">
      {logo ? (
        <Image
          className="pb-3"
          width={80}
          height={80}
          src={logo || ""}
          alt={"site Logo"}
        />
      ) : (
        <img
          className="w-full h-full text-white"
          src="/logo.svg"
          alt="site Logo"
        />
      )}
      <span className="font-bold text-h5 ">KLAB BAN</span>
    </div>
  );
}
