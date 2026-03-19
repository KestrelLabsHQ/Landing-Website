import Image from "next/image";
import type { Author } from "@/content/authors";

export function BlogAuthorCard({ author }: { author: Author }) {
  return (
    <aside className="mt-10 border border-black/10 bg-neutral-50">
      <div className="grid gap-px bg-black/10 md:grid-cols-[160px_1fr]">
        <div className="bg-white p-4">
          <div className="overflow-hidden rounded-md border border-black/10 bg-white">
            {author.avatarSrc ? (
              <Image
                src={author.avatarSrc}
                alt={author.name}
                width={400}
                height={500}
                className="h-auto w-full object-cover"
              />
            ) : (
              <div className="aspect-[4/5] w-full bg-neutral-100" />
            )}
          </div>
        </div>

        <div className="bg-white p-5 sm:p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/45 sm:text-xs sm:tracking-[0.24em]">
            About the author
          </p>
          <p className="mt-2 text-lg font-semibold tracking-[-0.02em]">{author.name}</p>
          {author.title ? <p className="mt-1 text-sm leading-6 text-black/65">{author.title}</p> : null}
          {author.bio ? <p className="mt-4 text-sm leading-7 text-black/75">{author.bio}</p> : null}
        </div>
      </div>
    </aside>
  );
}
