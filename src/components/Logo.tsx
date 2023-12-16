import Image from "next/image";

export function Logo({ logo, alt }: { logo?: string; alt?: string }) {
  return (
    <div className="h-[30px] relative flex items-center gap-1">
      {logo ? (
        <Image
          width={100}
          height={100}
          src={logo || ""}
          alt={alt || "site Logo"}
        />
      ) : (
        <img
          draggable="false"
          className="w-full h-full text-white"
          src="/imotto-logo.png"
          alt="site Logo"
        />
      )}
    </div>
  );
}
