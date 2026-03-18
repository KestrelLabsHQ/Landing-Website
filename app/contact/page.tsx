import type { Metadata } from "next";
import { SectionShell } from "@/components/section-shell";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <SectionShell
      eyebrow="Contact"
      title="Start with the problem, the constraint, or the goal."
      description="If you need a sharper website, a better internal system, or engineering help on a more demanding platform problem, send a note with enough context to frame the work."
      className="min-h-[calc(100svh-8rem)] bg-neutral-50"
    >
      <div className="grid gap-px border border-black/10 bg-black/10 lg:grid-cols-[1fr_1.1fr]">
        <div className="bg-white p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-black/45">Direct contact</p>
          <a href="mailto:hello@kestrellabs.co" className="mt-4 block text-2xl font-semibold tracking-[-0.04em] text-black">hello@kestrellabs.co</a>
          <p className="mt-5 max-w-md text-sm leading-6 text-black/68">Placeholder email for v1. Replace with the actual business inbox before launch. The form below is frontend-only and ready to connect to your preferred submission flow later.</p>
        </div>
        <form className="grid gap-5 bg-white p-6 md:grid-cols-2 md:p-8">
          <label className="grid gap-2 text-sm text-black/72">
            Name
            <input className="h-12 border border-black/14 px-4 outline-none transition-colors focus:border-black" type="text" placeholder="Your name" />
          </label>
          <label className="grid gap-2 text-sm text-black/72">
            Email
            <input className="h-12 border border-black/14 px-4 outline-none transition-colors focus:border-black" type="email" placeholder="you@company.com" />
          </label>
          <label className="grid gap-2 text-sm text-black/72 md:col-span-2">
            Project type
            <select className="h-12 border border-black/14 px-4 outline-none transition-colors focus:border-black" defaultValue="">
              <option value="" disabled>Select one</option>
              <option>Website Design & Rebuild</option>
              <option>Internal Tool</option>
              <option>Software Engineering</option>
              <option>Infrastructure / Reliability</option>
              <option>Advanced Systems</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm text-black/72 md:col-span-2">
            Project context
            <textarea className="min-h-40 border border-black/14 px-4 py-3 outline-none transition-colors focus:border-black" placeholder="What are you trying to build, improve, stabilize, or understand?" />
          </label>
          <div className="md:col-span-2">
            <button type="submit" className="border border-black bg-black px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-transparent hover:text-black">Send Inquiry</button>
          </div>
        </form>
      </div>
    </SectionShell>
  );
}
