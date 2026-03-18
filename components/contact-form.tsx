"use client";

import { FormEvent, useState } from "react";

const inbox = "contact@kestrellabshq.com";

type Status = "idle" | "ready";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const projectType = String(form.get("projectType") ?? "").trim();
    const context = String(form.get("context") ?? "").trim();

    const subject = encodeURIComponent(`Kestrel Labs inquiry${projectType ? ` — ${projectType}` : ""}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Project type: ${projectType || "Not specified"}`,
        "",
        "Project context:",
        context,
      ].join("\n"),
    );

    window.location.href = `mailto:${inbox}?subject=${subject}&body=${body}`;
    setStatus("ready");
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 bg-white p-5 sm:p-6 md:grid-cols-2 md:p-8">
      <label className="grid gap-2 text-sm text-black/72">
        Name
        <input name="name" className="h-12 border border-black/14 px-4 outline-none transition-colors focus:border-black" type="text" placeholder="Your name" required />
      </label>
      <label className="grid gap-2 text-sm text-black/72">
        Email
        <input name="email" className="h-12 border border-black/14 px-4 outline-none transition-colors focus:border-black" type="email" placeholder="you@company.com" required />
      </label>
      <label className="grid gap-2 text-sm text-black/72 md:col-span-2">
        Project type
        <select name="projectType" className="h-12 border border-black/14 px-4 outline-none transition-colors focus:border-black" defaultValue="" required>
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
        <textarea name="context" className="min-h-40 border border-black/14 px-4 py-3 outline-none transition-colors focus:border-black" placeholder="What are you trying to build, improve, stabilize, or understand?" required />
      </label>
      <div className="flex flex-col gap-3 md:col-span-2 md:flex-row md:items-center md:justify-between">
        <button type="submit" className="flex min-h-12 items-center justify-center border border-black bg-black px-6 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-transparent hover:text-black">Compose Email</button>
        <p className="text-sm leading-6 text-black/56">
          {status === "ready"
            ? "Your email client should open with the inquiry details prefilled."
            : "Submitting opens your email client with the project details prefilled to send to Kestrel Labs."}
        </p>
      </div>
    </form>
  );
}
