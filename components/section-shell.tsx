import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type SectionShellProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  invert?: boolean;
};

export function SectionShell({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  invert = false,
}: SectionShellProps) {
  return (
    <section id={id} className={cn("border-t", invert ? "border-white/10 bg-neutral-950 text-white" : "border-black/10 bg-white text-black", className)}>
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:px-10 md:py-24">
        {(eyebrow || title || description) && (
          <div className="mb-10 max-w-3xl md:mb-14">
            {eyebrow ? <p className={cn("mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] sm:text-xs sm:tracking-[0.24em]", invert ? "text-white/60" : "text-black/55")}>{eyebrow}</p> : null}
            {title ? <h2 className="max-w-4xl text-3xl font-semibold tracking-[-0.04em] text-balance sm:text-4xl md:text-5xl">{title}</h2> : null}
            {description ? <p className={cn("mt-4 max-w-2xl text-base leading-7 md:text-lg", invert ? "text-white/72" : "text-black/68")}>{description}</p> : null}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
