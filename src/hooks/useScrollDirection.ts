"use client";

import { useState, useRef, useEffect } from "react";

export const useScrollDirection = ({
  threshold = 4, // movement in px before we decide direction
  offset = 10, // don’t react until user has scrolled a little
  initial = "up" as "up" | "down",
} = {}) => {
  const [dir, setDir] = useState<"up" | "down">(initial);
  const [atTop, setAtTop] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    setAtTop(lastY.current <= offset);

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;

      if (Math.abs(delta) > threshold) {
        setDir(delta > 0 ? "down" : "up");
        lastY.current = y;
      }

      setAtTop(y <= offset);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold, offset]);

  return { dir, atTop };
};
