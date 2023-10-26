import clsx from "clsx";

export function MenuWrapper({
  children,
  className,
  onClick,
}: {
  onClick?: () => void;
  children: JSX.Element | string;
  className?: string;
}) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "h-[50px] px-1.5 md:px-3 flex-nowrap whitespace-nowrap",
        className
      )}
    >
      {children}
    </div>
  );
}
