type BrandMarkProps = {
  className?: string;
  invert?: boolean;
};

export function BrandMark({ className, invert = false }: BrandMarkProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width="39" height="39" stroke={invert ? "white" : "black"} />
      <path d="M12 9V31" stroke={invert ? "white" : "black"} strokeWidth="2" />
      <path d="M28 9L12 22" stroke={invert ? "white" : "black"} strokeWidth="2" />
      <path d="M17 19L29 31" stroke={invert ? "white" : "black"} strokeWidth="2" />
    </svg>
  );
}
