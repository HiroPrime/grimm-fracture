import Link from "next/link";
import type { Metadata } from "next";
import { BookOpen, ChevronRight } from "lucide-react";
import { EPISODES, getEpisodePages } from "@/lib/comics";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Read | Grimm Fracture Web Comic",
  description:
    "Read Grimm Fracture in a vertical Webtoon-style reader. Leap through fractured fables — hosted here and built for multi-platform upload.",
};

export default function ReadIndexPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <header className="border-b border-[#1a1a1a] px-6 py-6 md:px-10">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link
            href="/"
            className="text-[10px] font-black uppercase tracking-[0.4em] text-[#8b0000] transition-colors hover:text-[#ff4444]"
          >
            ← Grimm Fracture
          </Link>
          <span className="text-[10px] font-black uppercase tracking-[0.35em] text-gray-600">
            Webtoon Reader
          </span>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-6 py-16 md:px-10 md:py-24">
        <p className="mb-4 text-[10px] font-black uppercase tracking-[0.4em] text-[#ff4444]">
          Official Host
        </p>
        <h1 className="comic-text mb-4 text-4xl font-black uppercase tracking-tighter text-white md:text-6xl">
          Read the <span className="text-[#8b0000]">Fracture</span>
        </h1>
        <p className="mb-12 max-w-xl text-sm font-medium leading-relaxed text-gray-400 md:text-base">
          Scroll through Grimm Fracture in a vertical Webtoon-style reader. Pick a Leap below and
          keep reading as new pages drop.
        </p>

        <ul className="flex flex-col gap-4">
          {EPISODES.map((ep) => {
            const pageCount = getEpisodePages(ep.slug).length;
            const locked = ep.status !== "available";

            return (
              <li key={ep.slug}>
                {locked ? (
                  <div className="flex items-center justify-between gap-4 border border-[#1a1a1a] bg-[#0a0a0a] px-5 py-6 opacity-50">
                    <EpisodeMeta episode={ep} pageCount={pageCount} />
                    <span className="shrink-0 text-[10px] font-black uppercase tracking-widest text-gray-600">
                      Soon
                    </span>
                  </div>
                ) : (
                  <Link
                    href={`/read/${ep.slug}`}
                    className="group flex items-center justify-between gap-4 border border-[#1a1a1a] bg-[#0a0a0a] px-5 py-6 transition-colors hover:border-[#8b0000]"
                  >
                    <EpisodeMeta episode={ep} pageCount={pageCount} />
                    <ChevronRight
                      className="shrink-0 text-gray-600 transition-colors group-hover:text-[#8b0000]"
                      size={22}
                    />
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <div className="mt-16 flex items-start gap-3 border-t border-[#1a1a1a] pt-10 text-left">
          <BookOpen className="mt-0.5 shrink-0 text-[#2e4a22]" size={20} />
          <p className="text-xs font-medium leading-relaxed text-gray-600 md:text-sm">
            New pages land here first for Travelers. Want alerts when a Leap updates?{" "}
            <Link href="/#subscribe" className="text-[#8b0000] transition-colors hover:text-[#ff4444]">
              Join the ledger
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}

function EpisodeMeta({
  episode,
  pageCount,
}: {
  episode: (typeof EPISODES)[number];
  pageCount: number;
}) {
  return (
    <div className="min-w-0">
      <p className="mb-1 text-[10px] font-black uppercase tracking-[0.3em] text-[#ff4444]">
        {episode.subtitle}
      </p>
      <h2 className="text-xl font-black uppercase tracking-tight text-white md:text-2xl">
        {episode.title}
      </h2>
      <p className="mt-2 line-clamp-2 text-sm font-medium text-gray-500">{episode.synopsis}</p>
      <p className="mt-3 text-[10px] font-black uppercase tracking-widest text-gray-600">
        {pageCount > 0 ? `${pageCount} strips` : "Awaiting upload"}
      </p>
    </div>
  );
}
