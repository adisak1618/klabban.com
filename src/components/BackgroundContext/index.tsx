"use client";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { contextFactory } from "libs/contextFactory";
import { useCallback, useState } from "react";

type BackgroundMode = "light" | "dark";

interface BackgroundContextValue {
  background: string | null;
  mode: BackgroundMode;
  setBackground: (value: string | null) => void;
  setMode: (value: BackgroundMode) => void;
}

const [useBackgroundContext, BackgroundContext] =
  contextFactory<BackgroundContextValue>();
export { useBackgroundContext };

interface Props {
  children: JSX.Element;
  className?: string;
}
export function BackgroundProvider({ children, className }: Props) {
  const [backgroundState, setBackgroundState] =
    useState<BackgroundContextValue["background"]>(null);
  const [modeState, setModeState] =
    useState<BackgroundContextValue["mode"]>("light");

  const setBackground = useCallback(
    (value: BackgroundContextValue["background"]) => {
      setBackgroundState(value);
    },
    []
  );

  const setMode = useCallback((value: BackgroundContextValue["mode"]) => {
    setModeState(value);
  }, []);

  return (
    <BackgroundContext.Provider
      value={{
        background: backgroundState,
        setBackground,
        mode: modeState,
        setMode,
      }}
    >
      <AnimatePresence>
        <motion.div
          className={className}
          // initial={{ backgroundColor: "rgba(238, 238, 209, 1)" }}
          animate={{
            backgroundColor: backgroundState ? backgroundState : "#FFFFFF",
          }}
          // exit={{ backgroundColor: "rgba(238, 238, 209, 1)" }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </BackgroundContext.Provider>
  );
}
