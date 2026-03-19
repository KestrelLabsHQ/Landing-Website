import Link from "next/link";

export function BlogSubscribeCta() {
  return (
    <div className="mt-10 border border-black/10 bg-neutral-50">
      <div className="bg-white p-5 sm:p-6 md:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/45 sm:text-xs sm:tracking-[0.24em]">
          Stay in the loop
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-black/75">
          If you’d like occasional updates, reach out and I’ll share new posts when they’re worth sending.
        </p>
        <div className="mt-5">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md border border-black/15 bg-white px-4 py-2 text-sm font-semibold hover:bg-neutral-50"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
