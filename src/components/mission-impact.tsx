"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Droplets, Zap, Server } from "lucide-react";
import { Section } from "@/components/section";

// Widely reported estimates — figures vary by study and model.
// Sources noted below; meant to be illustrative, and kept up to date.
const bars = [
  { label: "Web search", value: 0.3, display: "~0.3 Wh", muted: true },
  { label: "AI chatbot query", value: 2.9, display: "~2.9 Wh" },
];
const maxBar = Math.max(...bars.map((b) => b.value));

const stats = [
  {
    icon: Droplets,
    value: "~700,000 L",
    label: "of freshwater estimated to train a single large model",
    source: "UC Riverside, 2023",
  },
  {
    icon: Zap,
    value: "~10×",
    label: "the electricity of a web search, per AI query (estimate)",
    source: "IEA, 2024",
  },
  {
    icon: Server,
    value: "~1.5%",
    label: "of global electricity already used by data centers",
    source: "IEA, 2024",
  },
];

export function MissionImpact() {
  return (
    <Section
      id="impact"
      eyebrow="Why it matters"
      title="AI's footprint, in numbers"
    >
      <p className="max-w-2xl text-muted-foreground">
        AI is extraordinary — and it isn&apos;t free. The energy and water behind
        it fall hardest on the communities near data centers. Measuring that cost
        is the first step to reducing it.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
        {/* Bar comparison */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Energy per query
          </h3>
          <div className="mt-6 space-y-5">
            {bars.map((b) => (
              <div key={b.label}>
                <div className="mb-1.5 flex items-baseline justify-between text-sm">
                  <span className="font-medium">{b.label}</span>
                  <span className="text-muted-foreground">{b.display}</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(b.value / maxBar) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className={
                      b.muted ? "h-full rounded-full bg-sage" : "h-full rounded-full bg-primary"
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          {stats.map((s) => (
            <div key={s.value} className="rounded-2xl border border-border bg-card p-5">
              <s.icon className="size-5 text-primary" />
              <p className="mt-3 text-2xl font-bold tracking-tight">{s.value}</p>
              <p className="mt-1 text-sm leading-snug text-muted-foreground">
                {s.label}
              </p>
              <p className="mt-2 text-xs text-muted-foreground/70">{s.source}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-6 text-xs text-muted-foreground/70">
        Figures are widely reported estimates and vary across studies and models.
      </p>
    </Section>
  );
}
