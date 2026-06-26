import Image from "next/image";
import { Star, GitFork, BookMarked } from "lucide-react";
import { Section } from "@/components/section";
import { GithubIcon } from "@/components/icons";

const USER = "embedolla";

// Per-repo placeholder screenshots — swap these SVGs in public/projects/ for
// real screenshots as projects mature. Unmatched repos fall back to default.svg.
const repoImages: Record<string, string> = {
  "OpenTUI-Multilingual-Project": "/projects/OpenTUI-Multilingual-Project.svg",
  "CPAL-Virtual-Clock-Wall": "/projects/CPAL-Virtual-Clock-Wall.svg",
  "emily-portfolio": "/projects/emily-portfolio.svg",
  "quiz-app": "/projects/quiz-app.svg",
};

// Friendly descriptions for repos that don't yet have one set on GitHub.
const repoDescriptions: Record<string, string> = {
  "OpenTUI-Multilingual-Project":
    "A multilingual terminal-UI project exploring OpenTUI.",
  "CPAL-Virtual-Clock-Wall":
    "A virtual clock-wall display built at Child Poverty Action Lab.",
};

type Repo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  updated_at: string;
};

// Curated fallback shown when the live GitHub API is unavailable (e.g. the
// unauthenticated rate limit is hit, or a hard refresh bypasses the cache).
// Without this the whole section vanishes on refresh; with it the section
// always renders and is upgraded to live data whenever the API responds.
const FALLBACK_REPOS: Repo[] = [
  {
    name: "OpenTUI-Multilingual-Project",
    description: null,
    html_url: `https://github.com/${USER}/OpenTUI-Multilingual-Project`,
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    updated_at: "",
  },
  {
    name: "CPAL-Virtual-Clock-Wall",
    description: null,
    html_url: `https://github.com/${USER}/CPAL-Virtual-Clock-Wall`,
    language: "JavaScript",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    updated_at: "",
  },
  {
    name: "emily-portfolio",
    description: "This portfolio site — built with Next.js and Tailwind.",
    html_url: `https://github.com/${USER}/emily-portfolio`,
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    updated_at: "",
  },
  {
    name: "quiz-app",
    description: "A small interactive quiz application.",
    html_url: `https://github.com/${USER}/quiz-app`,
    language: "JavaScript",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    updated_at: "",
  },
];

type Profile = {
  public_repos: number;
  followers: number;
  following: number;
};

async function getData(): Promise<{ profile: Profile | null; repos: Repo[] }> {
  try {
    const [profileRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USER}`, {
        next: { revalidate: 3600 },
        headers: { Accept: "application/vnd.github+json" },
      }),
      fetch(
        `https://api.github.com/users/${USER}/repos?sort=updated&per_page=100`,
        {
          next: { revalidate: 3600 },
          headers: { Accept: "application/vnd.github+json" },
        },
      ),
    ]);

    if (!profileRes.ok || !reposRes.ok) return { profile: null, repos: [] };

    const profile = (await profileRes.json()) as Profile;
    const repos = ((await reposRes.json()) as Repo[])
      .filter((r) => !r.fork)
      .slice(0, 4);

    return { profile, repos };
  } catch {
    return { profile: null, repos: [] };
  }
}

export async function GithubActivity() {
  const { profile, repos } = await getData();

  // Always render the section. When the live API fails (rate limit, transient
  // error, or a dev hard-refresh that bypasses the fetch cache) fall back to a
  // curated repo list instead of disappearing entirely.
  const displayRepos = repos.length > 0 ? repos : FALLBACK_REPOS;

  return (
    <Section id="github" eyebrow="Live from GitHub" title="What I'm building lately">
      {profile && (
        <div className="mb-6 flex flex-wrap gap-3 text-sm">
          <Stat icon={BookMarked} label="public repos" value={profile.public_repos} />
          <Stat icon={GithubIcon} label="followers" value={profile.followers} />
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {displayRepos.map((repo) => {
          const description = repo.description ?? repoDescriptions[repo.name];
          return (
          <a
            key={repo.name}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border bg-secondary">
              <Image
                src={repoImages[repo.name] ?? "/projects/default.svg"}
                alt={`${repo.name} preview`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-5">
            <h3 className="flex items-center gap-2 font-medium">
              <BookMarked className="size-4 text-primary" />
              {repo.name}
            </h3>
            {description && (
              <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                {description}
              </p>
            )}
            <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
              {repo.language && (
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-primary" />
                  {repo.language}
                </span>
              )}
              {repo.stargazers_count > 0 && (
                <span className="inline-flex items-center gap-1">
                  <Star className="size-3.5" /> {repo.stargazers_count}
                </span>
              )}
              {repo.forks_count > 0 && (
                <span className="inline-flex items-center gap-1">
                  <GitFork className="size-3.5" /> {repo.forks_count}
                </span>
              )}
            </div>
            </div>
          </a>
          );
        })}
      </div>
    </Section>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5">
      <Icon className="size-4 text-primary" />
      <span className="font-semibold text-foreground">{value}</span>
      <span className="text-muted-foreground">{label}</span>
    </span>
  );
}
