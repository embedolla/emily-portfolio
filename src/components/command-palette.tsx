"use client";

import * as React from "react";
import { Command } from "cmdk";
import { useTheme } from "next-themes";
import {
  Award,
  Briefcase,
  Copy,
  FileDown,
  GraduationCap,
  Heart,
  Home,
  Mail,
  Moon,
  Sun,
  User,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

const EMAIL = "emily.e.bedolla@gmail.com";

const sections = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "mission", label: "Mission", icon: Heart },
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "skills", label: "Skills", icon: Award },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "honors", label: "Honors & leadership", icon: Award },
  { id: "contact", label: "Contact", icon: Mail },
];

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const openEvt = () => setOpen(true);
    document.addEventListener("keydown", down);
    window.addEventListener("open-command-palette", openEvt);
    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("open-command-palette", openEvt);
    };
  }, []);

  const run = (fn: () => void) => {
    setOpen(false);
    fn();
  };

  const goTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const openLink = (url: string) =>
    window.open(url, "_blank", "noopener,noreferrer");

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command menu"
      className="fixed inset-0 z-[100] flex items-start justify-center"
    >
      {/* Backdrop */}
      <button
        aria-label="Close command menu"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      <div className="relative mt-[15vh] w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl">
        <Command.Input
          placeholder="Type a command or search…"
          className="w-full border-b border-border bg-transparent px-4 py-3.5 text-sm outline-none placeholder:text-muted-foreground"
        />
        <Command.List className="max-h-80 overflow-y-auto p-2">
          <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
            No results found.
          </Command.Empty>

          <Command.Group
            heading="Navigate"
            className="px-2 py-1.5 text-xs font-medium text-muted-foreground [&_[cmdk-group-items]]:mt-1"
          >
            {sections.map((s) => (
              <Item key={s.id} onSelect={() => run(() => goTo(s.id))}>
                <s.icon className="size-4 text-muted-foreground" />
                {s.label}
              </Item>
            ))}
          </Command.Group>

          <Command.Group
            heading="Actions"
            className="px-2 py-1.5 text-xs font-medium text-muted-foreground [&_[cmdk-group-items]]:mt-1"
          >
            <Item
              onSelect={() =>
                run(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))
              }
            >
              {resolvedTheme === "dark" ? (
                <Sun className="size-4 text-muted-foreground" />
              ) : (
                <Moon className="size-4 text-muted-foreground" />
              )}
              Toggle theme
            </Item>
            <Item onSelect={() => run(() => openLink("/resume.pdf"))}>
              <FileDown className="size-4 text-muted-foreground" />
              Download résumé
            </Item>
            <Item
              onSelect={() => run(() => navigator.clipboard?.writeText(EMAIL))}
            >
              <Copy className="size-4 text-muted-foreground" />
              Copy email address
            </Item>
          </Command.Group>

          <Command.Group
            heading="Links"
            className="px-2 py-1.5 text-xs font-medium text-muted-foreground [&_[cmdk-group-items]]:mt-1"
          >
            <Item
              onSelect={() => run(() => openLink("https://github.com/embedolla"))}
            >
              <GithubIcon className="size-4 text-muted-foreground" />
              GitHub
            </Item>
            <Item
              onSelect={() => run(() => openLink("https://www.linkedin.com/"))}
            >
              <LinkedinIcon className="size-4 text-muted-foreground" />
              LinkedIn
            </Item>
            <Item onSelect={() => run(() => openLink(`mailto:${EMAIL}`))}>
              <Mail className="size-4 text-muted-foreground" />
              Email me
            </Item>
          </Command.Group>
        </Command.List>
      </div>
    </Command.Dialog>
  );
}

export function CommandTrigger() {
  return (
    <button
      type="button"
      onClick={() =>
        window.dispatchEvent(new Event("open-command-palette"))
      }
      aria-label="Open command menu"
      className="hidden items-center gap-2 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground sm:flex"
    >
      <span>Search</span>
      <kbd className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-secondary-foreground">
        ⌘K
      </kbd>
    </button>
  );
}

function Item({
  children,
  onSelect,
}: {
  children: React.ReactNode;
  onSelect: () => void;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-foreground data-[selected=true]:bg-secondary"
    >
      {children}
    </Command.Item>
  );
}
