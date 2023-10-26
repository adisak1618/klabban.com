import clsx from "clsx";

interface OutlineButtonProps {
  children: JSX.Element | string;
  className?: string;
}

export function OutlineButton({ children, className }: OutlineButtonProps) {
  return (
    <div
      className={clsx(
        "border-2 border-text-color hover:bg-text-color hover:text-white px-6 py-2 rounded-full font-medium",
        className
      )}
    >
      {children}
    </div>
  );
}
