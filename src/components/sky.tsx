"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { useGroveAtmosphere, type Phase } from "@/lib/grove-atmosphere";

/**
 * Soft top-down sky tints for each time-of-day phase. Kept low-opacity so they
 * tint the Grove background without touching text/card contrast — this layer
 * sits at -z-10, behind all content, independent of the light/dark theme.
 */
const SKY: Record<Phase, string> = {
  dawn: "linear-gradient(to bottom, rgba(244,180,160,0.35), rgba(224,164,88,0.12) 42%, transparent 78%)",
  midday: "linear-gradient(to bottom, rgba(139,174,157,0.16), transparent 60%)",
  dusk: "linear-gradient(to bottom, rgba(118,82,140,0.34), rgba(226,125,96,0.18) 46%, transparent 82%)",
  night: "linear-gradient(to bottom, rgba(22,32,64,0.45), rgba(15,26,21,0.16) 52%, transparent 88%)",
};

export function Sky() {
  const atmo = useGroveAtmosphere();
  if (!atmo) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={atmo.phase}
          className="absolute inset-0"
          style={{ background: SKY[atmo.phase] }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
      </AnimatePresence>
    </div>
  );
}
