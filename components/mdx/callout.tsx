import type { ReactNode } from "react";

export function Callout({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="my-6 border border-black/10 bg-neutral-50">
      <div className="bg-white p-5 sm:p-6">
        {title ? (
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/45 sm:text-xs sm:tracking-[0.24em]">
            {title}
          </p>
        ) : null}
        <div className={title ? "mt-3" : ""}>{children}</div>
      </div>
    </div>
  );
}
