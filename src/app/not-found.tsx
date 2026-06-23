import Link from "next/link";
import { Sprout } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-lg flex-col items-center justify-center px-6 text-center">
      <div className="grid size-16 place-items-center rounded-2xl bg-primary/10 text-primary">
        <Sprout className="size-8" />
      </div>
      <h1 className="mt-6 text-5xl font-bold tracking-tight">404</h1>
      <p className="mt-3 text-lg text-muted-foreground">
        This page hasn&apos;t sprouted yet. Let&apos;s get you back to solid
        ground. 🌱
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className={cn(buttonVariants({ size: "lg" }))}>
          Back home
        </Link>
        <Link
          href="/blog"
          className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
        >
          Read my writing
        </Link>
      </div>
    </div>
  );
}
