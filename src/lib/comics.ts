import fs from "fs";
import path from "path";

export type EpisodeStatus = "available" | "coming_soon";

export type ComicEpisode = {
  slug: string;
  leap: number;
  title: string;
  subtitle: string;
  synopsis: string;
  status: EpisodeStatus;
};

/** Series catalog — add a row when you start a new Leap. */
export const EPISODES: ComicEpisode[] = [
  {
    slug: "leap-1",
    leap: 1,
    title: "Leap 1",
    subtitle: "1888 // Overgrown Wonderland",
    synopsis:
      "Red and Alice drop empty-handed into a Victorian nightmare choked with mutated flora. Sixty seconds to scavenge. One Keystone Page to reclaim.",
    status: "available",
  },
];

const IMAGE_RE = /\.(png|jpe?g|webp|gif|avif)$/i;

export function getEpisode(slug: string): ComicEpisode | undefined {
  return EPISODES.find((ep) => ep.slug === slug);
}

export function getAdjacentEpisodes(slug: string) {
  const index = EPISODES.findIndex((ep) => ep.slug === slug);
  if (index < 0) return { prev: null, next: null };
  return {
    prev: index > 0 ? EPISODES[index - 1] : null,
    next: index < EPISODES.length - 1 ? EPISODES[index + 1] : null,
  };
}

/**
 * Reads strip images from public/comics/<slug>/ sorted naturally
 * (001, 002… or page-1, page-2…). Drop the same files you upload to Webtoon here.
 */
export function getEpisodePages(slug: string): string[] {
  const dir = path.join(process.cwd(), "public", "comics", slug);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => IMAGE_RE.test(file) && !file.startsWith("."))
    .sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
    )
    .map((file) => `/comics/${slug}/${file}`);
}

export function getEpisodeWithPages(slug: string) {
  const episode = getEpisode(slug);
  if (!episode) return null;
  const pages = getEpisodePages(slug);
  return {
    ...episode,
    pages,
    ready: pages.length > 0 && episode.status === "available",
  };
}
