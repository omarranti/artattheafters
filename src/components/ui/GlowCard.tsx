"use client";

import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({
  children,
  className = "",
  hover = true,
}: CardProps) {
  return (
    <div
      className={[
        "bg-brand-dark2 border border-brand-gray/20 rounded-xl p-6",
        "transition-all duration-250 ease-out",
        hover ? "hover:border-brand-pink/30" : "",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
