"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown, ChevronUp, BookOpen } from "lucide-react";
import type { ComicEpisode } from "@/lib/comics";

type Props = {
  episode: ComicEpisode;
  pages: string[];
  prev: ComicEpisode | null;
  next: ComicEpisode | null;
};

export default function WebtoonReader({ episode, pages, prev, next }: Props) {
  const [progress, setProgress] = useState(0);
  const [chromeVisible, setChromeVisible] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;
    let hideTimer: ReturnType<typeof setTimeout> | undefined;

    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);

      const y = window.scrollY;
      if (y > lastY + 8 && y > 80) {
        setChromeVisible(false);
      } else if (y < lastY - 4) {
        setChromeVisible(true);
      }
      lastY = y;

      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        if (window.scrollY > 120) setChromeVisible(false);
      }, 1800);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(hideTimer);
    };
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollBottom = () =>
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Progress */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-[#1a1a1a]">
        <div
          className="h-full bg-[#8b0000] transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Top chrome */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b border-[#1a1a1a] bg-black/90 backdrop-blur-md transition-transform duration-300 ${
          chromeVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto flex max-w-[820px] items-center justify-between gap-3 px-4 py-3">
          <Link
            href="/read"
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} /> Episodes
          </Link>
          <div className="min-w-0 text-center">
            <p className="truncate text-[10px] font-black uppercase tracking-[0.3em] text-[#ff4444]">
              Grimm Fracture
            </p>
            <p className="truncate text-xs font-black uppercase tracking-widest text-white md:text-sm">
              {episode.title}
            </p>
          </div>
          <button
            type="button"
            onClick={scrollBottom}
            className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-gray-400 transition-colors hover:text-white"
            aria-label="Jump to end"
          >
            End <ChevronDown size={14} />
          </button>
        </div>
      </header>

      {/* Vertical strip */}
      <main className="mx-auto w-full max-w-[800px] bg-black pt-14 pb-28">
        <div className="border-b border-[#1a1a1a] px-4 py-8 text-center">
          <p className="mb-2 text-[10px] font-black uppercase tracking-[0.4em] text-[#ff4444]">
            {episode.subtitle}
          </p>
          <h1 className="comic-text text-3xl font-black uppercase tracking-tighter text-white md:text-5xl">
            {episode.title}
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm font-medium leading-relaxed text-gray-500">
            {episode.synopsis}
          </p>
          <p className="mt-6 text-[10px] font-black uppercase tracking-[0.35em] text-gray-600">
            Scroll to read
          </p>
        </div>

        {pages.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 px-6 py-24 text-center">
            <BookOpen className="text-[#8b0000]" size={40} />
            <h2 className="text-xl font-black uppercase tracking-widest text-white">
              Pages incoming
            </h2>
            <p className="max-w-sm text-sm font-medium text-gray-500">
              This Leap is locked and loading. Check back soon — or join the Travelers to hear when
              the first strips drop.
            </p>
            <Link
              href="/#subscribe"
              className="mt-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#ff4444] transition-colors hover:text-white"
            >
              Join the Travelers
            </Link>
          </div>
        ) : (
          <div className="flex flex-col">
            {pages.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`${episode.title} — panel ${i + 1}`}
                className="block h-auto w-full select-none"
                loading={i < 2 ? "eager" : "lazy"}
                decoding="async"
                draggable={false}
              />
            ))}
          </div>
        )}

        {/* End card */}
        <div className="border-t border-[#1a1a1a] px-4 py-16 text-center">
          <p className="mb-2 text-[10px] font-black uppercase tracking-[0.4em] text-[#ff4444]">
            End of {episode.title}
          </p>
          <h2 className="comic-text mb-8 text-2xl font-black uppercase tracking-tighter text-white md:text-4xl">
            Keep Leaping
          </h2>

          <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
            {prev ? (
              <Link
                href={`/read/${prev.slug}`}
                className="inline-flex items-center justify-center border-2 border-[#333] px-6 py-3 text-xs font-black uppercase tracking-widest text-white transition-colors hover:border-white"
              >
                ← {prev.title}
              </Link>
            ) : null}
            {next && next.status === "available" ? (
              <Link
                href={`/read/${next.slug}`}
                className="inline-flex items-center justify-center border-2 border-[#8b0000] bg-[#8b0000] px-6 py-3 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-red-700"
              >
                {next.title} →
              </Link>
            ) : (
              <span className="inline-flex items-center justify-center border-2 border-[#222] px-6 py-3 text-xs font-black uppercase tracking-widest text-gray-600">
                Next Leap Soon
              </span>
            )}
          </div>

          <Link
            href="/#subscribe"
            className="mt-10 inline-block text-[10px] font-black uppercase tracking-[0.35em] text-gray-500 transition-colors hover:text-[#ff4444]"
          >
            Join the Travelers
          </Link>
        </div>
      </main>

      {/* Bottom chrome */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 border-t border-[#1a1a1a] bg-black/90 backdrop-blur-md transition-transform duration-300 ${
          chromeVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto flex max-w-[820px] items-center justify-between gap-3 px-4 py-3">
          <button
            type="button"
            onClick={scrollTop}
            className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-gray-400 transition-colors hover:text-white"
          >
            <ChevronUp size={14} /> Top
          </button>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
            {pages.length > 0 ? `${Math.round(progress)}%` : "No pages yet"}
          </p>
          <Link
            href="/"
            className="text-[10px] font-black uppercase tracking-widest text-gray-400 transition-colors hover:text-white"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
