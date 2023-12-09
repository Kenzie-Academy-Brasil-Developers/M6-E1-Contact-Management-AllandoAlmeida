'use client'
import { useState, useEffect } from "react";

export function useWindowWidth() {
  const isClient = typeof window === "object";

  const [windowWidth, setWindowWidth] = useState(
    isClient ? window.innerWidth : 0
  );

  useEffect(() => {
    if (!isClient) {
      return;
    }

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isClient]);

  return windowWidth;
}
