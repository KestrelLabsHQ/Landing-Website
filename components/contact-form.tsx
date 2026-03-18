"use client";

import { FormEvent, useMemo, useState } from "react";

const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState(
    endpoint
      ? "Send a direct inquiry to Kestrel Labs."
      : "Contact endpoint is not configured yet. Add NEXT_PUBLIC_CONTACT_ENDPOINT to enable live form delivery.",
  );

  const buttonLabel = useMemo(() => {
    if (status === "loading") return "Sending...";
    if (status === "success") return "Sent";
    return "Send Inquiry";
  }, [status]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!endpoint) {
      setStatus("error");
      setMessage("Contact endpoint is not configured yet.");
      return;
    }

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const payload = {
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      projectType: String(form.get("projectType") ?? "").trim(),
      context: String(form.get("context") ?? "").trim(),
    };

    setStatus("loading");
    setMessage("Sending your inquiry...");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
      setMessage("Thanks — your inquiry was sent successfully.");
      formElement.reset();
    } catch {
      setStatus("error");
      setMessage("Could not send the inquiry right now. You can still email contact@kestrellabshq.com directly.");
    }
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
        <button disabled={status === "loading" || !endpoint} type="submit" className="flex min-h-12 items-center justify-center border border-black bg-black px-6 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-transparent hover:text-black disabled:cursor-not-allowed disabled:border-black/20 disabled:bg-black/20 disabled:text-black/40">
          {buttonLabel}
        </button>
        <p className="text-sm leading-6 text-black/56">{message}</p>
      </div>
    </form>
  );
}
