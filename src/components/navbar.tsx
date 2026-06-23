import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { CommandTrigger } from "@/components/command-palette";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#mission", label: "Mission" },
  { href: "/#projects", label: "Projects" },
  { href: "/blog", label: "Writing" },
  { href: "/now", label: "Now" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/70 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
            EB
          </span>
          <span className="hidden sm:inline">Emily Bedolla</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <CommandTrigger />
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ size: "sm", variant: "outline" }),
              "hidden sm:inline-flex",
            )}
          >
            Résumé
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
