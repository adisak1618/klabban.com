"use client";

import { useEffect } from "react";

export function AddLightNavigation() {
  useEffect(() => {
    document.body.classList.add("light-navigation");
  }, []);
  return null;
}
