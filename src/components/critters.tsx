"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { useTheme } from "next-themes";

/**
 * Ambient critters. Dark mode: drifting, twinkling fireflies.
 * Respects prefers-reduced-motion.
 */
export function Critters() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const reduce = useReducedMotion();

  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return resolvedTheme === "dark" ? <Fireflies reduce={!!reduce} /> : null;
}

/* -------------------------------- Fireflies ------------------------------- */

function Fireflies({ reduce }: { reduce: boolean }) {
  if (reduce) return null;

  const flies = Array.from({ length: 12 });

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
    >
      {flies.map((_, i) => {
        const left = (i * 53 + 7) % 96;
        const top = (i * 37 + 5) % 72; // keep them in the upper/hero region
        const duration = 5 + (i % 5);
        const delay = (i % 6) * 0.8;
        return (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: 6,
              height: 6,
              background:
                "radial-gradient(circle, #ffe9a8 0%, rgba(255,200,90,0.7) 40%, transparent 70%)",
              boxShadow: "0 0 8px 2px rgba(255,210,120,0.45)",
            }}
            animate={{
              x: [0, 16, -10, 0],
              y: [0, -14, 8, 0],
              opacity: [0, 1, 0.35, 1, 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}
