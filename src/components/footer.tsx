import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

const socials = [
  { href: "https://github.com/", label: "GitHub", icon: GithubIcon },
  { href: "https://www.linkedin.com/", label: "LinkedIn", icon: LinkedinIcon },
  { href: "mailto:emily.bedolla@cpal.org", label: "Email", icon: Mail },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {2026} Emily Bedolla · Built with Next.js 🌱
        </p>
        <div className="flex items-center gap-4">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <s.icon className="size-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
