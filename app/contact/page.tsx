import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
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
          <a href="mailto:contact@kestrellabshq.com" className="mt-4 block break-all text-2xl font-semibold tracking-[-0.04em] text-black">contact@kestrellabshq.com</a>
          <p className="mt-5 max-w-md text-sm leading-6 text-black/68">
            Use the direct inbox for straightforward inquiries, or use the form to open a prefilled project email with the core details already structured.
          </p>
        </div>
        <ContactForm />
      </div>
    </SectionShell>
  );
}
