import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "src/content/blog");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
};

export type Post = PostMeta & { content: string };

function readPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        excerpt: data.excerpt ?? "",
        content,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPosts(): PostMeta[] {
  return readPosts().map(({ content, ...meta }) => {
    void content;
    return meta;
  });
}

export function getPost(slug: string): Post | undefined {
  return readPosts().find((p) => p.slug === slug);
}

export function formatDate(date: string): string {
  if (!date) return "";
  const d = new Date(date + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
