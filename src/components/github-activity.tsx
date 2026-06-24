import { Star, GitFork, BookMarked } from "lucide-react";
import { Section } from "@/components/section";
import { GithubIcon } from "@/components/icons";

const USER = "embedolla";

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

  // If GitHub is unreachable (e.g. rate limited), skip the section gracefully.
  if (!profile && repos.length === 0) return null;

  return (
    <Section id="github" eyebrow="Live from GitHub" title="What I'm building lately">
      {profile && (
        <div className="mb-6 flex flex-wrap gap-3 text-sm">
          <Stat icon={BookMarked} label="public repos" value={profile.public_repos} />
          <Stat icon={GithubIcon} label="followers" value={profile.followers} />
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {repos.map((repo) => (
          <a
            key={repo.name}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
          >
            <h3 className="flex items-center gap-2 font-medium">
              <BookMarked className="size-4 text-primary" />
              {repo.name}
            </h3>
            {repo.description && (
              <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                {repo.description}
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
          </a>
        ))}
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
