import Link from "next/link";
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
  return (
    <footer className="mt-auto border-t border-border/60">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {2026} Emily Bedolla · Built with Next.js 🌱
        </p>
        <nav className="flex items-center gap-4 text-sm">
          {pages.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {p.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="-m-2 p-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <s.icon className="size-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
