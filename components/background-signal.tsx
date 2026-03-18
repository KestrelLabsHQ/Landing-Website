import { cn } from "@/lib/utils";

type BackgroundSignalProps = {
  className?: string;
  invert?: boolean;
};

export function BackgroundSignal({ className, invert = false }: BackgroundSignalProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        invert ? "opacity-70" : "opacity-100",
        className,
      )}
    >
      <div
        className={cn(
          "absolute inset-0",
          invert
            ? "bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)]"
            : "bg-[linear-gradient(rgba(17,24,39,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(17,24,39,0.06)_1px,transparent_1px)]",
          "bg-[size:72px_72px]",
        )}
      />
      <div className={cn("absolute -right-24 top-10 h-72 w-72 rotate-12 border", invert ? "border-white/15" : "border-black/10")} />
      <div className={cn("absolute right-12 top-24 h-px w-[30rem] rotate-[22deg]", invert ? "bg-white/20" : "bg-black/15")} />
      <div className={cn("absolute right-24 top-52 h-px w-72 rotate-[8deg]", invert ? "bg-white/15" : "bg-black/10")} />
      <div className={cn("absolute bottom-20 right-14 h-32 w-32 border", invert ? "border-white/12" : "border-black/8")} />
      <div className={cn("absolute bottom-24 left-0 h-px w-56", invert ? "bg-white/10" : "bg-black/10")} />
    </div>
  );
}
