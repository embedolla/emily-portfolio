"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

const pages = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Writing" },
  { href: "/now", label: "Now" },
];

const socials = [
  { href: "https://github.com/embedolla", label: "GitHub", icon: GithubIcon },
  { href: "https://www.linkedin.com/", label: "LinkedIn", icon: LinkedinIcon },
  { href: "mailto:emily.e.bedolla@gmail.com", label: "Email", icon: Mail },
];

export function Footer() {
  const pathname = usePathname();

  return (
    <footer className="mt-auto border-t border-border/60">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {2026} Emily Bedolla · Built with Next.js 🌱
        </p>
        <nav aria-label="Footer" className="flex items-center gap-4 text-sm">
          {pages.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              aria-current={pathname === p.href ? "page" : undefined}
              className="text-muted-foreground transition-colors hover:text-foreground aria-[current=page]:text-foreground"
            >
              {p.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          {socials.map((s) => {
            // mailto: links must not open a new tab (it leaves a blank tab
            // behind); only external http(s) links get target="_blank".
            const external = s.href.startsWith("http");
            return (
              <a
                key={s.label}
                href={s.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                aria-label={s.label}
                className="-m-2 p-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <s.icon className="size-5" aria-hidden />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
