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
 *  - Light mode: a chunky sprout-frog in the corner (blinks, hops on click).
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
  const [hearts, setHearts] = React.useState(0);
  const hopping = React.useRef(false);

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
    if (reduce || hopping.current) return;
    hopping.current = true;
    setHearts((h) => h + 1);
    setBlink(true);
    setTimeout(() => setBlink(false), 200);

    // crouch → leap right (arc) → leap back (arc) → settle
    await controls.start({
      scaleY: 0.78,
      scaleX: 1.12,
      transition: { duration: 0.12, ease: "easeOut" },
    });
    await controls.start({
      x: 50,
      y: [0, -52, 0],
      scaleY: [1.14, 1, 0.84],
      scaleX: [0.9, 1, 1.14],
      transition: { duration: 0.5, ease: "easeOut", times: [0, 0.5, 1] },
    });
    await controls.start({
      x: 0,
      y: [0, -52, 0],
      scaleY: [1.14, 1, 0.84],
      scaleX: [0.9, 1, 1.14],
      transition: { duration: 0.5, ease: "easeOut", times: [0, 0.5, 1] },
    });
    await controls.start({
      scaleY: 1,
      scaleX: 1,
      transition: { duration: 0.16, ease: "easeOut" },
    });
    hopping.current = false;
  };

  const eyeStyle = {
    transformBox: "fill-box" as const,
    transformOrigin: "center",
  };

  return (
    <button
      type="button"
      onClick={hop}
      aria-label="A friendly sprout-frog — click to make it hop"
      className="fixed bottom-4 left-4 z-40 transition-transform hover:scale-105"
    >
      {/* heart puff on hop */}
      <span className="pointer-events-none absolute inset-x-0 top-0">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={`${hearts}-${i}`}
            initial={{ opacity: 0, y: 4, x: (i - 1) * 16 }}
            animate={hearts > 0 ? { opacity: [0, 1, 0], y: -46 } : {}}
            transition={{ duration: 0.95, delay: i * 0.08, ease: "easeOut" }}
            className="absolute left-1/2 top-0 -translate-x-1/2 text-sm"
            style={{ color: "#e8888a" }}
          >
            ♥
          </motion.span>
        ))}
      </span>

      <motion.div animate={controls} style={{ transformOrigin: "bottom center" }}>
        <svg
          width="66"
          height="76"
          viewBox="0 0 100 116"
          fill="none"
          className="drop-shadow-md"
        >
          {/* sprout */}
          <path
            d="M50 44 L50 22"
            stroke="#3f6f3a"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <g>
            <ellipse
              cx="38"
              cy="16"
              rx="12"
              ry="6.5"
              fill="#6aa050"
              stroke="#3f6f3a"
              strokeWidth="2"
              transform="rotate(-22 38 16)"
            />
            <ellipse
              cx="62"
              cy="16"
              rx="12"
              ry="6.5"
              fill="#6aa050"
              stroke="#3f6f3a"
              strokeWidth="2"
              transform="rotate(22 62 16)"
            />
            <ellipse cx="36" cy="14" rx="3" ry="1.4" fill="#ffffff" opacity="0.55" transform="rotate(-22 36 14)" />
            <ellipse cx="60" cy="14" rx="3" ry="1.4" fill="#ffffff" opacity="0.55" transform="rotate(22 60 14)" />
          </g>

          {/* feet */}
          <ellipse cx="40" cy="103" rx="8" ry="5.5" fill="#9cc586" stroke="#3f6f3a" strokeWidth="3" />
          <ellipse cx="60" cy="103" rx="8" ry="5.5" fill="#9cc586" stroke="#3f6f3a" strokeWidth="3" />

          {/* body */}
          <rect
            x="16"
            y="40"
            width="68"
            height="62"
            rx="24"
            fill="#9cc586"
            stroke="#3f6f3a"
            strokeWidth="3.5"
          />

          {/* belly */}
          <ellipse cx="50" cy="80" rx="20" ry="20" fill="#d6dd8b" />

          {/* toe lines */}
          <path d="M37 100 L37 106 M43 100 L43 106" stroke="#3f6f3a" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M57 100 L57 106 M63 100 L63 106" stroke="#3f6f3a" strokeWidth="1.8" strokeLinecap="round" />

          {/* cheeks */}
          <ellipse cx="27" cy="63" rx="6.5" ry="4.2" fill="#e89a9a" opacity="0.65" />
          <ellipse cx="73" cy="63" rx="6.5" ry="4.2" fill="#e89a9a" opacity="0.65" />

          {/* left eye (blinks) */}
          <motion.g animate={{ scaleY: blink ? 0.1 : 1 }} style={eyeStyle}>
            <ellipse cx="36" cy="53" rx="5.5" ry="7" fill="#2f5a30" transform="rotate(-12 36 53)" />
            <circle cx="34" cy="50" r="1.8" fill="#ffffff" />
          </motion.g>
          {/* right eye (blinks) */}
          <motion.g animate={{ scaleY: blink ? 0.1 : 1 }} style={eyeStyle}>
            <ellipse cx="64" cy="53" rx="5.5" ry="7" fill="#2f5a30" transform="rotate(12 64 53)" />
            <circle cx="62" cy="50" r="1.8" fill="#ffffff" />
          </motion.g>

          {/* gentle smile */}
          <path
            d="M43 58 Q50 64 57 58"
            stroke="#3f6f3a"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
    </button>
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
