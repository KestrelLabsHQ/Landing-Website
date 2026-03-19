import type { MDXComponents } from "mdx/types";
import { Callout } from "@/components/mdx/callout";
import { Takeaways } from "@/components/mdx/takeaways";

export const mdxComponents: MDXComponents = {
  h1: (props) => <h1 className="text-3xl font-semibold tracking-[-0.04em]" {...props} />,
  h2: (props) => <h2 className="mt-10 text-2xl font-semibold tracking-[-0.04em]" {...props} />,
  h3: (props) => <h3 className="mt-8 text-xl font-semibold" {...props} />,
  p: (props) => <p className="mt-4 text-sm leading-7 text-black/75" {...props} />,
  ul: (props) => <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-black/75" {...props} />,
  ol: (props) => <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-black/75" {...props} />,
  a: (props) => <a className="underline decoration-black/30 underline-offset-4 hover:decoration-black/60" {...props} />,
  pre: (props) => <pre className="mt-5 overflow-x-auto rounded-lg border border-black/10 bg-neutral-50 p-4 text-xs" {...props} />,
  code: (props) => <code className="rounded bg-black/[0.04] px-1 py-0.5 text-[0.95em]" {...props} />,

  // Custom MDX blocks
  Callout,
  Takeaways,
};
