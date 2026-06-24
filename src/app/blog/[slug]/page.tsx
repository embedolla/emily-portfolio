import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft } from "lucide-react";
import { getAllPosts, getPost, formatDate } from "@/lib/posts";
import { ReadingProgress } from "@/components/reading-progress";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Emily Bedolla`,
    description: post.excerpt,
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto w-full max-w-2xl px-6 py-20 sm:py-28">
      <ReadingProgress />
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        All writing
      </Link>

      <p className="mt-6 text-sm text-muted-foreground">
        {formatDate(post.date)}
      </p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">{post.title}</h1>

      <div
        className="prose mt-8 max-w-none text-foreground
          [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4
          [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold
          [&_li]:my-1 [&_p]:my-4 [&_p]:leading-relaxed [&_p]:text-muted-foreground
          [&_strong]:text-foreground [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6"
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}
