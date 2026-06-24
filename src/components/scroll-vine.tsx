"use client";

import * as React from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

/** Fractions of scroll progress (0–1) where a leaf sprouts from the vine. */
const LEAF_STOPS = [0.12, 0.26, 0.4, 0.54, 0.68, 0.82, 0.94];

/**
 * A thin vine pinned to the left edge that "grows" as you scroll, sprouting
 * leaves at each stop. Doubles as a reading-progress indicator. Hidden on
 * small screens and for reduced-motion users.
 */
export function ScrollVine() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = React.useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    mass: 0.4,
  });

  React.useEffect(() => setMounted(true), []);
  if (!mounted || reduce) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-3 top-16 bottom-0 z-40 hidden w-6 md:block"
    >
      <svg
        className="h-full w-full overflow-visible text-primary/70"
        viewBox="0 0 24 1000"
        preserveAspectRatio="none"
        fill="none"
      >
        <motion.path
          d="M12 0 C 4 120, 20 240, 12 360 S 4 600, 12 720 S 22 880, 12 1000"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: progress }}
        />
      </svg>

      {LEAF_STOPS.map((at, i) => (
        <VineLeaf key={at} progress={progress} at={at} side={i % 2 === 0} />
      ))}
    </div>
  );
}

function VineLeaf({
  progress,
  at,
  side,
}: {
  progress: MotionValue<number>;
  at: number;
  side: boolean;
}) {
  const opacity = useTransform(progress, [at - 0.06, at], [0, 1]);
  const scale = useTransform(progress, [at - 0.06, at], [0.2, 1]);

  return (
    <motion.span
      className="absolute left-1/2 text-primary"
      style={{
        top: `${at * 100}%`,
        opacity,
        scale,
        width: 12,
        height: 12,
        marginLeft: side ? -16 : 4,
        borderRadius: "0 100% 0 100%",
        rotate: side ? -35 : 145,
        background: "linear-gradient(135deg, var(--sage), var(--forest))",
      }}
    />
  );
}
