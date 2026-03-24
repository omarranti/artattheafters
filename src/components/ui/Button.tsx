"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { type ReactNode, type MouseEventHandler } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-6 py-2.5 text-xs",
  md: "px-10 py-4 text-sm",
  lg: "px-12 py-5 text-base",
};

const easeTransition = {
  duration: 0.25,
  ease: "easeOut" as const,
};

function getVariantStyles(variant: ButtonVariant): string {
  switch (variant) {
    case "primary":
      return [
        "bg-brand-pink text-brand-white",
        "hover:brightness-110 hover:opacity-90",
      ].join(" ");
    case "secondary":
      return [
        "bg-transparent border-[1.5px] border-brand-green text-brand-green",
        "hover:bg-brand-green/10",
      ].join(" ");
    case "ghost":
      return [
        "bg-transparent border-[1.5px] border-brand-gray2 text-brand-white",
        "hover:border-brand-green hover:text-brand-green",
      ].join(" ");
  }
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  href,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseStyles = [
    "inline-flex items-center justify-center",
    "font-body font-semibold uppercase tracking-[1.5px]",
    "rounded-full cursor-pointer",
    "transition-all duration-250 ease-out",
    "relative overflow-hidden",
  ].join(" ");

  const combinedClassName = `${baseStyles} ${getVariantStyles(variant)} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={easeTransition}
        className="inline-block"
      >
        <Link href={href} className={combinedClassName}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={easeTransition}
      className={combinedClassName}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
}
