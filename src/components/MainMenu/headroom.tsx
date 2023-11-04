"use client";

import clsx from "clsx";
import React, { useState } from "react";
import Headroom from "react-headroom";

interface HeadroomWrapperProps {
  children: JSX.Element;
  className?: string;
  light?: boolean;
  pinStart?: number;
}

export function HeadroomWrapper({
  children,
  className,
  light = false,
  pinStart = 0,
}: HeadroomWrapperProps) {
  const [isUnfix, setIsUnfix] = useState(true);
  const [isSticky, setIsSticky] = useState(false);

  const cssVars = {
    "--navigation-text": "var(--text-color)",
    "--navigation-bg": "var(--bg)",
  };
  return (
    <Headroom
      pinStart={pinStart}
      className={clsx(
        light &&
          (!isSticky || isUnfix) &&
          "light-navigation absolute w-full top-0 left-0 !z-40",
        className
      )}
      onPin={() => {
        setIsSticky(true);
        setIsUnfix(false);
      }}
      onUnpin={() => {
        setIsSticky(false);
      }}
      onUnfix={() => {
        setIsSticky(false);
        setIsUnfix(true);
      }}
      style={(isSticky ? cssVars : {}) as any}
    >
      {children as any}
    </Headroom>
  );
}
