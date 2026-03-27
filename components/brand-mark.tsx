import Image from "next/image";

type BrandMarkProps = {
  className?: string;
  invert?: boolean;
};

export function BrandMark({ className, invert = false }: BrandMarkProps) {
  return (
    <Image
      src={invert ? "/logos/KestrelLabs_White.png" : "/logos/KestrelLabs.svg"}
      alt=""
      aria-hidden="true"
      width={invert ? 789 : 208}
      height={invert ? 571 : 128}
      className={className}
      unoptimized
    />
  );
}
