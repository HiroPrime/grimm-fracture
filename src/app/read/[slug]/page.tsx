import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WebtoonReader from "@/components/WebtoonReader";
import {
  EPISODES,
  getAdjacentEpisodes,
  getEpisodeWithPages,
} from "@/lib/comics";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return EPISODES.map((ep) => ({ slug: ep.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const episode = getEpisodeWithPages(slug);
  if (!episode) return { title: "Not Found | Grimm Fracture" };

  return {
    title: `${episode.title} | Grimm Fracture Reader`,
    description: episode.synopsis,
  };
}

export default async function ReadEpisodePage({ params }: Props) {
  const { slug } = await params;
  const episode = getEpisodeWithPages(slug);
  if (!episode) notFound();

  const { prev, next } = getAdjacentEpisodes(slug);

  return (
    <WebtoonReader
      episode={episode}
      pages={episode.pages}
      prev={prev}
      next={next}
    />
  );
}
