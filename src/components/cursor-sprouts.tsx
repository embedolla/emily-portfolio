"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Sprout } from "lucide-react";

type Trail = { id: number; x: number; y: number; rotate: number };

/**
 * A faint trail of tiny sprouts that drift up and fade as the cursor moves.
 * Throttled, capped, and disabled for touch devices and reduced-motion users.
 */
export function CursorSprouts() {
  const reduce = useReducedMotion();
  const [trail, setTrail] = React.useState<Trail[]>([]);
  const idRef = React.useRef(0);
  const lastRef = React.useRef(0);

  React.useEffect(() => {
    if (reduce) return;
    // Skip touch / pen-primary devices — there's no hovering cursor to trail.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastRef.current < 70) return; // throttle spawns
      lastRef.current = now;
      const id = idRef.current++;
      const rotate = ((id % 5) - 2) * 18;
      setTrail((t) => [...t.slice(-11), { id, x: e.clientX, y: e.clientY, rotate }]);
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce]);

  if (reduce) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
    >
      <AnimatePresence>
        {trail.map((s) => (
          <motion.span
            key={s.id}
            className="absolute text-primary/80"
            style={{ left: s.x, top: s.y }}
            initial={{ opacity: 0.85, scale: 0.4, x: "-50%", y: "-50%", rotate: s.rotate }}
            animate={{ opacity: 0, scale: 1, y: "-170%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            onAnimationComplete={() =>
              setTrail((arr) => arr.filter((p) => p.id !== s.id))
            }
          >
            <Sprout className="size-3.5" />
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
