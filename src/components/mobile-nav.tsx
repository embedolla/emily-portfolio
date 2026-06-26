"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
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

/**
 * Phone/tablet navigation. The desktop link row is `hidden md:flex`, so this
 * hamburger is the way to reach the sections on small screens. Shown only
 * below the md breakpoint.
 */
export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const navRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    // Lock the page behind the overlay so it can't scroll under the menu.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus into the menu so keyboard/SR users land on the first link.
    navRef.current?.querySelector<HTMLElement>("a")?.focus();

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const close = () => setOpen(false);
  const isCurrent = (href: string) =>
    !href.startsWith("/#") &&
    (pathname === href || pathname.startsWith(`${href}/`));

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
      >
        {open ? (
          <X className="size-5" aria-hidden />
        ) : (
          <Menu className="size-5" aria-hidden />
        )}
      </button>

      {open && (
        <>
          <div
            aria-hidden
            onClick={close}
            className="fixed inset-0 top-16 z-40 cursor-default bg-background/80 backdrop-blur-sm"
          />
          <nav
            ref={navRef}
            id="mobile-menu"
            aria-label="Mobile"
            className="fixed inset-x-0 top-16 z-50 border-b border-border bg-card shadow-lg"
          >
            <ul className="mx-auto flex max-w-5xl flex-col gap-1 px-4 py-3">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={close}
                    aria-current={isCurrent(l.href) ? "page" : undefined}
                    className="block rounded-lg px-3 py-3 text-base text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground aria-[current=page]:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  className="block rounded-lg px-3 py-3 text-base text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  Résumé
                </a>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}
