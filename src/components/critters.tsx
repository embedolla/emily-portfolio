"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { useTheme } from "next-themes";
import { useGroveAtmosphere, type Season } from "@/lib/grove-atmosphere";

/**
 * Ambient critters that mirror the real world:
 *   night   → drifting, twinkling fireflies (dark mode only)
 *   spring  → falling cherry petals
 *   summer  → floating pollen motes
 *   autumn  → tumbling leaves
 *   winter  → drifting snow
 * Respects prefers-reduced-motion (renders nothing).
 */
export function Critters() {
  const atmo = useGroveAtmosphere();
  const reduce = useReducedMotion();
  const { resolvedTheme } = useTheme();

  if (!atmo || reduce) return null;
  const dark = resolvedTheme === "dark";
  // Fireflies only glow in dark mode; in light mode the night is simply still.
  if (atmo.phase === "night") {
    return dark ? <Fireflies /> : null;
  }
  // Summer has no daytime critter (the pollen was removed).
  if (atmo.season === "summer") return null;
  return <FallingSeason season={atmo.season} />;
}

/* -------------------------------- Fireflies ------------------------------- */

function Fireflies() {
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

/* ------------------------------ Falling season ---------------------------- */

type SeasonConfig = {
  count: number;
  /** Fall duration range, seconds. */
  fall: { base: number; step: number };
  /** Whether particles tumble end-over-end as they fall. */
  spin: boolean;
  /** Inline style for a single particle. */
  style: React.CSSProperties;
};

const SEASON_CONFIG: Record<Season, SeasonConfig> = {
  spring: {
    count: 16,
    fall: { base: 9, step: 1.4 },
    spin: true,
    style: {
      width: 11,
      height: 11,
      borderRadius: "0 100% 0 100%",
      background: "linear-gradient(135deg, #fbd0dd, #f4a8c0)",
      boxShadow: "0 0 3px rgba(244,168,192,0.5)",
    },
  },
  summer: {
    count: 22,
    fall: { base: 11, step: 1.6 },
    spin: false,
    style: {
      width: 6,
      height: 6,
      borderRadius: "9999px",
      background:
        "radial-gradient(circle, #fff3c4 0%, rgba(224,164,88,0.6) 45%, transparent 75%)",
      boxShadow: "0 0 6px 1px rgba(224,164,88,0.5)",
    },
  },
  autumn: {
    count: 16,
    fall: { base: 8, step: 1.3 },
    spin: true,
    style: {
      width: 13,
      height: 13,
      borderRadius: "0 100% 0 100%",
      background: "linear-gradient(135deg, #e0a458, #e27d60)",
      boxShadow: "0 0 3px rgba(226,125,96,0.45)",
    },
  },
  winter: {
    count: 20,
    fall: { base: 12, step: 1.8 },
    spin: false,
    style: {
      width: 7,
      height: 7,
      borderRadius: "9999px",
      background: "rgba(255,255,255,0.92)",
      boxShadow: "0 0 5px 1px rgba(255,255,255,0.7)",
    },
  },
};

function FallingSeason({ season }: { season: Season }) {
  const cfg = SEASON_CONFIG[season];
  const items = Array.from({ length: cfg.count });

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
    >
      {items.map((_, i) => {
        const left = (i * 61 + 9) % 98;
        const duration = cfg.fall.base + (i % 5) * cfg.fall.step;
        const delay = (i % 7) * 1.1;
        const drift = (i % 2 === 0 ? 1 : -1) * (14 + (i % 4) * 9);
        return (
          <motion.span
            key={i}
            className="absolute top-0"
            style={{ left: `${left}%`, ...cfg.style }}
            initial={{ y: "-12vh", opacity: 0 }}
            animate={{
              y: "112vh",
              x: [0, drift, -drift / 2, drift],
              opacity: [0, 1, 1, 0.4],
              rotate: cfg.spin ? [0, 200, 360] : 0,
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );
      })}
    </div>
  );
}
