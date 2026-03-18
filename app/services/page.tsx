import type { Metadata } from "next";
import { SectionShell } from "@/components/section-shell";
import { servicesPage } from "@/content/site-copy";

export const metadata: Metadata = {
  title: "Services",
};

export default function ServicesPage() {
  return (
    <SectionShell
      eyebrow="Services"
      title="Commercially legible engineering support, built for real teams and real constraints."
      description="Website work, internal software, engineering improvements, and infrastructure support — all delivered with a bias toward clarity, durability, and practical outcomes."
      className="min-h-[calc(100svh-8rem)]"
    >
      <div className="grid gap-px border border-black/10 bg-black/10 lg:grid-cols-2 lg:auto-rows-fr">
        {servicesPage.map((service) => (
          <article key={service.title} className="grid h-full bg-white p-6 sm:p-7 md:p-9 lg:grid-rows-[6.5rem_7.5rem_auto_1fr]">
            <div>
              <h2 className="max-w-[16ch] text-2xl font-semibold tracking-[-0.04em] sm:text-[2rem] md:text-3xl">
                {service.title}
              </h2>
            </div>

            <div className="pt-5">
              <p className="max-w-2xl text-sm leading-7 text-black/68">{service.description}</p>
            </div>

            <div className="grid gap-8 pt-8 lg:grid-cols-2 lg:gap-x-12">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/45 sm:text-xs sm:tracking-[0.24em]">What it helps with</p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-black/78">
                  {service.helpsWith.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/45 sm:text-xs sm:tracking-[0.24em]">Who it’s for</p>
                <p className="mt-3 max-w-md text-sm leading-7 text-black/78">{service.for}</p>
              </div>
            </div>

            <div className="pt-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/45 sm:text-xs sm:tracking-[0.24em]">Outcome</p>
              <p className="mt-3 max-w-xl text-sm leading-7 text-black/78">{service.outcome}</p>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
