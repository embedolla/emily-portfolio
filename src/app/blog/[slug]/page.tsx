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
        className="mt-8 max-w-none text-foreground
          [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4
          [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold
          [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold
          [&_p]:my-4 [&_p]:leading-relaxed [&_p]:text-muted-foreground
          [&_strong]:font-semibold [&_strong]:text-foreground
          [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6
          [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6
          [&_li]:my-1 [&_li]:text-muted-foreground
          [&_blockquote]:my-4 [&_blockquote]:border-l-4 [&_blockquote]:border-primary/40 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground
          [&_code]:rounded [&_code]:bg-secondary [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm
          [&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-border [&_pre]:bg-secondary [&_pre]:p-4
          [&_pre_code]:bg-transparent [&_pre_code]:p-0
          [&_img]:rounded-xl [&_hr]:my-8 [&_hr]:border-border"
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}
