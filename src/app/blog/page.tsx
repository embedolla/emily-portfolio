import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getAllPosts, formatDate } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Writing — Emily Bedolla",
  description: "Essays and notes on responsible AI, technology, and building for good.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-20 sm:py-28">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back home
      </Link>

      <h1 className="mt-6 text-4xl font-bold tracking-tight">Writing</h1>
      <p className="mt-3 text-lg text-muted-foreground">
        Notes on responsible AI, technology, and building for good. 🌱
      </p>

      <div className="mt-12 space-y-8">
        {posts.length === 0 && (
          <p className="text-muted-foreground">No posts yet — check back soon!</p>
        )}
        {posts.map((post) => (
          <article key={post.slug} className="group">
            <Link href={`/blog/${post.slug}`}>
              <p className="text-sm text-muted-foreground">
                {formatDate(post.date)}
              </p>
              <h2 className="mt-1 text-xl font-semibold transition-colors group-hover:text-primary">
                {post.title}
              </h2>
              <p className="mt-2 text-muted-foreground">{post.excerpt}</p>
              <span className="mt-2 inline-flex items-center gap-1 text-sm text-primary">
                Read <ArrowRight className="size-3.5" />
              </span>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
