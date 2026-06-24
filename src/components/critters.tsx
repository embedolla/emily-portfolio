"use client";

import * as React from "react";
import {
  motion,
  useAnimationControls,
  useReducedMotion,
} from "motion/react";
import { useTheme } from "next-themes";

/**
 * Theme-aware ambient critters:
 *  - Light mode: a friendly clickable frog in the corner (blinks, hops).
 *  - Dark mode: drifting, twinkling fireflies.
 * Both respect prefers-reduced-motion.
 */
export function Critters() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const reduce = useReducedMotion();

  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return resolvedTheme === "dark" ? (
    <Fireflies reduce={!!reduce} />
  ) : (
    <Frog reduce={!!reduce} />
  );
}

/* ---------------------------------- Frog ---------------------------------- */

function Frog({ reduce }: { reduce: boolean }) {
  const controls = useAnimationControls();
  const [blink, setBlink] = React.useState(false);

  // Occasional natural blink.
  React.useEffect(() => {
    if (reduce) return;
    let timer: ReturnType<typeof setTimeout>;
    const loop = () => {
      setBlink(true);
      setTimeout(() => setBlink(false), 140);
      timer = setTimeout(loop, 3200 + Math.random() * 3000);
    };
    timer = setTimeout(loop, 2500);
    return () => clearTimeout(timer);
  }, [reduce]);

  const hop = async () => {
    if (reduce) return;
    setBlink(true);
    setTimeout(() => setBlink(false), 160);
    await controls.start({
      y: [0, -28, 0],
      scaleY: [1, 1.08, 0.9, 1],
      scaleX: [1, 0.95, 1.06, 1],
      transition: { duration: 0.55, times: [0, 0.4, 0.7, 1], ease: "easeOut" },
    });
  };

  const eyeStyle = {
    transformBox: "fill-box" as const,
    transformOrigin: "center",
  };

  return (
    <motion.button
      type="button"
      onClick={hop}
      animate={controls}
      aria-label="A friendly frog — click to make it hop"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="fixed bottom-4 left-4 z-40 drop-shadow-md transition-transform hover:scale-105"
    >
      <svg width="60" height="54" viewBox="0 0 72 64" fill="none">
        {/* feet */}
        <ellipse cx="16" cy="58" rx="8" ry="4.5" fill="#1b3a30" />
        <ellipse cx="56" cy="58" rx="8" ry="4.5" fill="#1b3a30" />
        {/* body */}
        <ellipse cx="36" cy="42" rx="27" ry="19" fill="#2e5e4e" />
        {/* belly */}
        <ellipse cx="36" cy="49" rx="15" ry="9" fill="#8bae9d" opacity="0.55" />
        {/* cheeks */}
        <circle cx="12" cy="38" r="4.5" fill="#e27d60" opacity="0.5" />
        <circle cx="60" cy="38" r="4.5" fill="#e27d60" opacity="0.5" />
        {/* mouth */}
        <path
          d="M24 40 Q36 50 48 40"
          stroke="#1b3a30"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* eye mounds */}
        <circle cx="23" cy="18" r="13" fill="#2e5e4e" />
        <circle cx="49" cy="18" r="13" fill="#2e5e4e" />
        {/* left eye (blinks) */}
        <motion.g animate={{ scaleY: blink ? 0.1 : 1 }} style={eyeStyle}>
          <circle cx="23" cy="17" r="8" fill="#faf6ee" />
          <circle cx="24.5" cy="18" r="3.8" fill="#1e2a24" />
          <circle cx="21.5" cy="15" r="1.4" fill="#ffffff" />
        </motion.g>
        {/* right eye (blinks) */}
        <motion.g animate={{ scaleY: blink ? 0.1 : 1 }} style={eyeStyle}>
          <circle cx="49" cy="17" r="8" fill="#faf6ee" />
          <circle cx="50.5" cy="18" r="3.8" fill="#1e2a24" />
          <circle cx="47.5" cy="15" r="1.4" fill="#ffffff" />
        </motion.g>
      </svg>
    </motion.button>
  );
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
