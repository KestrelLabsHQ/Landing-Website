export function BlogAudioPlayer({ src, title }: { src: string; title: string }) {
  return (
    <aside className="mb-8 border border-black/10 bg-neutral-50">
      <div className="bg-white p-5 sm:p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/45 sm:text-xs sm:tracking-[0.24em]">
          Audio version
        </p>
        <p className="mt-3 text-sm leading-7 text-black/75">
          Prefer listening? This post is available as audio.
        </p>
        <div className="mt-4">
          <audio controls preload="none" className="w-full" aria-label={`Audio version of ${title}`}>
            <source src={src} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </aside>
  );
}
