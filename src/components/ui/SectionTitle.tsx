"use client";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  pinkWord?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  eyebrow,
  pinkWord,
  align = "center",
  className = "",
}: SectionTitleProps) {
  const alignmentClass =
    align === "center" ? "text-center items-center" : "text-left items-start";

  const renderTitle = () => {
    if (!pinkWord) {
      return title;
    }
    const parts = title.split(pinkWord);
    if (parts.length === 1) {
      return title;
    }
    return (
      <>
        {parts[0]}
        <span className="text-brand-pink italic">{pinkWord}</span>
        {parts.slice(1).join(pinkWord)}
      </>
    );
  };

  return (
    <div className={`flex flex-col gap-4 ${alignmentClass} ${className}`}>
      {eyebrow && (
        <span className="font-body text-xs font-medium uppercase tracking-[4px] text-brand-green">
          {eyebrow}
        </span>
      )}

      <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-brand-white">
        {renderTitle()}
      </h2>

      {subtitle && (
        <p className="font-body text-base md:text-lg font-light text-brand-muted max-w-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
