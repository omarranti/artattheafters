"use client";

import { type ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}

export default function Marquee({
  children,
  speed = 30,
  direction = "left",
  pauseOnHover = false,
  className = "",
}: MarqueeProps) {
  const animationDirection = direction === "left" ? "normal" : "reverse";
  const hoverClass = pauseOnHover ? "group" : "";

  return (
    <div className={`overflow-hidden whitespace-nowrap ${hoverClass} ${className}`}>
      <div
        className={`inline-flex animate-marquee ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""}`}
        style={{
          animationDuration: `${speed}s`,
          animationDirection,
        }}
      >
        <div className="inline-flex shrink-0">{children}</div>
        <div className="inline-flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
