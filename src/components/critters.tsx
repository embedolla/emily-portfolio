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
 *  - Light mode: a green tree frog on a lily pad (blinks, hops on click).
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
  const frog = useAnimationControls();
  const [blink, setBlink] = React.useState(false);
  const [hopCount, setHopCount] = React.useState(0);
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
    setHopCount((n) => n + 1);
    setBlink(true);
    setTimeout(() => setBlink(false), 220);

    await frog.start({
      scaleY: 0.8,
      scaleX: 1.12,
      transition: { duration: 0.1, ease: "easeOut" },
    });
    await frog.start({
      y: [0, -46, 0],
      scaleY: [1.16, 1, 0.85],
      scaleX: [0.9, 1, 1.13],
      transition: { duration: 0.6, times: [0, 0.45, 1], ease: "easeOut" },
    });
    await frog.start({
      y: [0, -24, 0],
      scaleY: [1.1, 1, 0.9],
      scaleX: [0.94, 1, 1.08],
      transition: { duration: 0.45, times: [0, 0.45, 1], ease: "easeOut" },
    });
    await frog.start({
      scaleY: 1,
      scaleX: 1,
      transition: { duration: 0.15 },
    });
    hopping.current = false;
  };

  const eyeStyle = {
    transformBox: "fill-box" as const,
    transformOrigin: "center",
  };
  const frogStyle = {
    transformBox: "fill-box" as const,
    transformOrigin: "bottom center",
  };

  return (
    <button
      type="button"
      onClick={hop}
      aria-label="A little frog on a lily pad — click to make it hop"
      className="fixed bottom-3 left-3 z-40 transition-transform hover:scale-105"
    >
      <svg width="92" height="96" viewBox="0 0 120 124" fill="none" className="drop-shadow-md">
        {/* ── lily pad (static) ── */}
        <ellipse cx="58" cy="108" rx="54" ry="13" fill="#5f9e47" />
        <ellipse cx="58" cy="105" rx="47" ry="9.5" fill="#74b85a" />
        <path d="M58 105 L84 99" stroke="#4d8438" strokeWidth="2" strokeLinecap="round" />
        <path d="M58 105 L40 99" stroke="#4d8438" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

        {/* ripple on hop */}
        <motion.ellipse
          key={hopCount}
          cx="58"
          cy="106"
          rx="20"
          ry="5"
          fill="none"
          stroke="#d2eec1"
          strokeWidth="2"
          style={eyeStyle}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={hopCount > 0 ? { opacity: [0, 0.7, 0], scale: 1.7 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />

        {/* ── water lily (static) ── */}
        <g>
          <ellipse cx="100" cy="96" rx="11" ry="6" fill="#f7c6d9" />
          <ellipse cx="100" cy="89" rx="3" ry="7" fill="#ef9fc0" />
          <ellipse cx="92" cy="92" rx="3" ry="7" fill="#ef9fc0" transform="rotate(-42 92 92)" />
          <ellipse cx="108" cy="92" rx="3" ry="7" fill="#ef9fc0" transform="rotate(42 108 92)" />
          <ellipse cx="95" cy="97" rx="3" ry="6" fill="#f4b2cd" transform="rotate(-70 95 97)" />
          <ellipse cx="105" cy="97" rx="3" ry="6" fill="#f4b2cd" transform="rotate(70 105 97)" />
          <circle cx="100" cy="93" r="2.6" fill="#f3d35b" />
        </g>

        {/* ── frog (hops) ── */}
        <motion.g animate={frog} style={frogStyle}>
          {/* haunches */}
          <ellipse cx="32" cy="76" rx="12" ry="16" fill="#79b35e" />
          <ellipse cx="84" cy="76" rx="12" ry="16" fill="#79b35e" />
          {/* hind feet */}
          <ellipse cx="33" cy="98" rx="12" ry="5" fill="#8cc06f" stroke="#4d8438" strokeWidth="1.5" />
          <ellipse cx="83" cy="98" rx="12" ry="5" fill="#8cc06f" stroke="#4d8438" strokeWidth="1.5" />
          <path d="M27 99 L25 102 M33 99 L33 103 M39 99 L41 102" stroke="#4d8438" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M77 99 L75 102 M83 99 L83 103 M89 99 L91 102" stroke="#4d8438" strokeWidth="1.4" strokeLinecap="round" />

          {/* front arms + hands */}
          <path d="M47 80 C41 86 41 93 44 98" stroke="#84bd66" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M71 80 C77 86 77 93 74 98" stroke="#84bd66" strokeWidth="6" fill="none" strokeLinecap="round" />
          <ellipse cx="44" cy="99" rx="5" ry="3" fill="#8cc06f" stroke="#4d8438" strokeWidth="1.3" />
          <ellipse cx="74" cy="99" rx="5" ry="3" fill="#8cc06f" stroke="#4d8438" strokeWidth="1.3" />

          {/* body */}
          <path
            d="M58 28 C36 28 29 52 31 74 C33 93 46 99 58 99 C70 99 83 93 85 74 C87 52 80 28 58 28 Z"
            fill="#84bd66"
            stroke="#4d8438"
            strokeWidth="2"
          />
          {/* belly */}
          <ellipse cx="58" cy="80" rx="17" ry="19" fill="#eef3de" />

          {/* speckles */}
          <circle cx="42" cy="62" r="1.6" fill="#5f9a45" />
          <circle cx="50" cy="52" r="1.4" fill="#5f9a45" />
          <circle cx="70" cy="60" r="1.6" fill="#5f9a45" />
          <circle cx="76" cy="52" r="1.4" fill="#5f9a45" />

          {/* eye mounds */}
          <circle cx="45" cy="40" r="13" fill="#84bd66" />
          <circle cx="71" cy="40" r="13" fill="#84bd66" />

          {/* nostrils + mouth */}
          <circle cx="54" cy="52" r="1.2" fill="#4d8438" />
          <circle cx="62" cy="52" r="1.2" fill="#4d8438" />
          <path d="M42 58 Q58 71 74 58" stroke="#3f6f3a" strokeWidth="2.4" fill="none" strokeLinecap="round" />

          {/* eyes (blink) */}
          <motion.g animate={{ scaleY: blink ? 0.1 : 1 }} style={eyeStyle}>
            <circle cx="45" cy="40" r="9" fill="#e3b24a" stroke="#9c7320" strokeWidth="1" />
            <ellipse cx="45" cy="41" rx="3.2" ry="5.2" fill="#1a1208" />
            <circle cx="42.3" cy="37.3" r="2" fill="#ffffff" />
          </motion.g>
          <motion.g animate={{ scaleY: blink ? 0.1 : 1 }} style={eyeStyle}>
            <circle cx="71" cy="40" r="9" fill="#e3b24a" stroke="#9c7320" strokeWidth="1" />
            <ellipse cx="71" cy="41" rx="3.2" ry="5.2" fill="#1a1208" />
            <circle cx="68.3" cy="37.3" r="2" fill="#ffffff" />
          </motion.g>
        </motion.g>
      </svg>
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
