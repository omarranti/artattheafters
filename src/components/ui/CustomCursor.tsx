"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

function isTouchDevice(): boolean {
  if (typeof window === "undefined") return true;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    if (isTouchDevice()) return;
    setIsMounted(true);

    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setVisible(true);
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest(
          "a, button, [role='button'], input, textarea, select, [data-cursor-hover]"
        ) !== null;
      setHovering(isInteractive);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseover", onMouseOver);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isMounted) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[99999] rounded-full"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: hovering ? 20 : 12,
        height: hovering ? 20 : 12,
        opacity: visible ? 1 : 0,
        boxShadow: hovering
          ? "0 0 0 3px rgba(255, 51, 153, 0.4)"
          : "none",
      }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
    >
      <div
        className="w-full h-full rounded-full bg-brand-pink"
        style={{ transition: "all 0.25s ease" }}
      />
    </motion.div>
  );
}
