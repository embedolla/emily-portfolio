"use client";

import * as React from "react";

export type Season = "spring" | "summer" | "autumn" | "winter";
export type Phase = "dawn" | "midday" | "dusk" | "night";

export type Atmosphere = { season: Season; phase: Phase };

/** Northern-hemisphere meteorological seasons from a date. */
export function seasonFromDate(d: Date): Season {
  const m = d.getMonth(); // 0 = Jan
  if (m === 11 || m <= 1) return "winter"; // Dec, Jan, Feb
  if (m <= 4) return "spring"; // Mar, Apr, May
  if (m <= 7) return "summer"; // Jun, Jul, Aug
  return "autumn"; // Sep, Oct, Nov
}

/** Time-of-day phase from the local hour. */
export function phaseFromDate(d: Date): Phase {
  const h = d.getHours();
  if (h >= 5 && h < 8) return "dawn";
  if (h >= 8 && h < 17) return "midday";
  if (h >= 17 && h < 20) return "dusk";
  return "night";
}

/**
 * Mirrors the real world in the grove: reads the visitor's local clock to
 * pick a season + time-of-day phase.
 *
 * Returns null until mounted so the server and first client render agree
 * (avoids hydration mismatch). Re-evaluates every 5 minutes so a tab left
 * open can roll dusk → night while you watch.
 */
export function useGroveAtmosphere(): Atmosphere | null {
  const [atmo, setAtmo] = React.useState<Atmosphere | null>(null);

  React.useEffect(() => {
    const update = () => {
      const now = new Date();
      setAtmo({ season: seasonFromDate(now), phase: phaseFromDate(now) });
    };
    update();
    const id = setInterval(update, 5 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  return atmo;
}
