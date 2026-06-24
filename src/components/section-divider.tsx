import { Sprout } from "lucide-react";

/**
 * A hand-drawn botanical divider: a loose, wobbling vine line on each side of a
 * centered sprout. Purely decorative; static (no client JS needed).
 */
export function SectionDivider() {
  return (
    <div
      aria-hidden
      className="mx-auto flex max-w-5xl items-center gap-4 px-6 py-6 text-sage/70"
    >
      <VineLine className="flex-1" />
      <Sprout className="size-5 shrink-0 text-primary/70" />
      <VineLine className="flex-1 -scale-x-100" />
    </div>
  );
}

function VineLine({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 24"
      preserveAspectRatio="none"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      className={`h-6 ${className ?? ""}`}
    >
      {/* loose, hand-drawn waving vine */}
      <path d="M2 13 q 38 -11 76 -1 t 76 1 t 76 -2 t 76 2 t 76 -1 t 76 1 t 64 0" />
      {/* a couple of little leaves budding off it */}
      <path d="M158 12 q 10 -12 22 -6 q -4 12 -22 6 Z" fill="currentColor" stroke="none" />
      <path d="M386 14 q 12 10 24 4 q -6 -12 -24 -4 Z" fill="currentColor" stroke="none" />
    </svg>
  );
}
