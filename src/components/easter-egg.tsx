"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function EasterEgg() {
  const [active, setActive] = React.useState(false);
  const reduce = useReducedMotion();

  React.useEffect(() => {
    // A little hello for anyone who opens the console.
    console.log(
      "%c🌱 Hi there, fellow builder!",
      "color:#2e5e4e;font-size:16px;font-weight:bold",
    );
    console.log(
      "%cThanks for poking around. Built with Next.js, care, and a little hope for a kinder kind of tech. — Emily",
      "color:#5c6b62;font-size:12px",
    );
    console.log("%cPsst… try the Konami code. ↑↑↓↓←→←→ b a", "color:#e27d60");
  }, []);

  React.useEffect(() => {
    let pos = 0;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      pos = key === KONAMI[pos] ? pos + 1 : key === KONAMI[0] ? 1 : 0;
      if (pos === KONAMI.length) {
        pos = 0;
        setActive(true);
        setTimeout(() => setActive(false), 4000);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (reduce) return null;

  const sprouts = Array.from({ length: 24 });

  return (
    <AnimatePresence>
      {active && (
        <div className="pointer-events-none fixed inset-0 z-[200] overflow-hidden">
          {sprouts.map((_, i) => {
            const left = (i * 37) % 100;
            const delay = (i % 8) * 0.15;
            const duration = 2.5 + ((i * 13) % 20) / 10;
            return (
              <motion.span
                key={i}
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: "110vh", opacity: [0, 1, 1, 0] }}
                transition={{ duration, delay, ease: "easeIn" }}
                style={{ left: `${left}%` }}
                className="absolute top-0 text-3xl"
              >
                🌱
              </motion.span>
            );
          })}
        </div>
      )}
    </AnimatePresence>
  );
}
