"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export function Section({ id, eyebrow, title, children, className }: SectionProps) {
  return (
    <section id={id} className={cn("mx-auto w-full max-w-5xl scroll-mt-20 px-6 py-16 sm:py-28", className)}>
      {(eyebrow || title) && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-10"
        >
          {eyebrow && (
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              {title}
            </h2>
          )}
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
      >
        {children}
      </motion.div>
    </section>
  );
}
