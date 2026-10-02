"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { CatImage } from "@/components/cat-image";
import { CategoryChips } from "@/components/category-chips";
import { HeroBanner } from "@/components/hero-banner";
import { Sidebar } from "@/components/sidebar";
import { SiteHeader } from "@/components/site-header";
import { VideoSection } from "@/components/video-section";
import { WatchDialog } from "@/components/watch-dialog";
import {
  SECTION_LABELS,
  VIDEOS,
  categoryForSection,
  categoryLabel,
  filterVideos,
  listChannels,
  type CategoryId,
  type SectionId,
  type Video,
} from "@/lib/catalog";

export function HomePage({
  initialQuery = "",
  initialSection = "home",
}: {
  initialQuery?: string;
  initialSection?: SectionId;
}) {
  const router = useRouter();
  const [videos, setVideos] = useState(VIDEOS);
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<CategoryId>(categoryForSection(initialSection));
  const [section, setSection] = useState<SectionId>(initialSection);
  const [channel, setChannel] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [watching, setWatching] = useState<Video | null>(null);

  const visible = useMemo(
    () => filterVideos(videos, { section, category, query, channel }),
    [videos, section, category, query, channel],
  );

  const showShelves =
    section === "home" && category === "all" && query.trim() === "" && !channel;

  const trending = visible.filter((video) => video.shelf === "trending");
  const recommended = visible.filter((video) => video.shelf === "recommended");
  const channels = listChannels(
    filterVideos(videos, {
      section: "channels",
      category: "all",
      query,
      channel: null,
    }),
  );

  function goHome() {
    setSection("home");
    setCategory("all");
    setQuery("");
    setChannel(null);
    setMenuOpen(false);
  }

  function selectSection(next: SectionId) {
    setSection(next);
    setChannel(null);
    setCategory(categoryForSection(next));
    setMenuOpen(false);
  }

  function selectCategory(next: CategoryId) {
    setCategory(next);
    setSection("home");
    setChannel(null);
  }

  function watchNow() {
    router.push("/watch/playful-kittens");
  }

  const singleTitle = titleFor({ section, category, query, channel });

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader
        query={query}
        onQueryChange={(value) => {
          setQuery(value);
          if (value.trim()) setCategory("all");
        }}
        onMenu={() => setMenuOpen(true)}
        onLogo={goHome}
        onNotify={(nextQuery) => {
          setQuery(nextQuery);
          setSection("home");
          setCategory("all");
          setChannel(null);
        }}
        onUpload={({ title, channel: nextChannel, image }) => {
          const video: Video = {
            id: `upload-${crypto.randomUUID()}`,
            title,
            channel: nextChannel,
            views: "0 views",
            published: "Just now",
            duration: "0:30",
            image,
            categories: ["kittens"],
            format: "video",
            shelf: "trending",
            subscribed: true,
          };
          setVideos((current) => [video, ...current]);
          setSection("home");
          setCategory("all");
          setQuery("");
          setChannel(null);
        }}
      />
      <div className="flex">
        <Sidebar
          active={section}
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          onSelect={selectSection}
        />
        <main className="min-w-0 flex-1 px-4 py-4 sm:px-6 sm:py-5">
          <HeroBanner onWatch={watchNow} />
          <CategoryChips active={category} onSelect={selectCategory} />
          <div id="catalog">
            {section === "channels" && !channel ? (
              <ChannelGrid
                channels={channels}
                onOpen={(name) => setChannel(name)}
                onClear={goHome}
              />
            ) : showShelves ? (
              <>
                <VideoSection
                  id="trending"
                  title="Trending Videos"
                  videos={trending}
                  onSeeAll={() => selectSection("trending")}
                  onOpen={setWatching}
                />
                <VideoSection
                  title="Recommended for You"
                  videos={recommended}
                  onSeeAll={() => selectSection("recommended")}
                  onOpen={setWatching}
                />
              </>
            ) : visible.length > 0 ? (
              <VideoSection
                title={singleTitle}
                videos={visible}
                onOpen={setWatching}
              />
            ) : (
              <EmptyState onClear={goHome} />
            )}
          </div>
        </main>
      </div>
      {watching ? (
        <WatchDialog video={watching} onClose={() => setWatching(null)} />
      ) : null}
    </div>
  );
}

function titleFor(input: {
  section: SectionId;
  category: CategoryId;
  query: string;
  channel: string | null;
}): string {
  const query = input.query.trim();
  if (query) return `Results for “${query}”`;
  if (input.channel) return input.channel;
  if (input.section === "home" && input.category !== "all") {
    return categoryLabel(input.category);
  }
  return SECTION_LABELS[input.section];
}

function ChannelGrid({
  channels,
  onOpen,
  onClear,
}: {
  channels: { name: string; image: string; count: number }[];
  onOpen: (name: string) => void;
  onClear: () => void;
}) {
  if (channels.length === 0) {
    return <EmptyState onClear={onClear} />;
  }

  return (
    <section className="mt-6">
      <h2 className="mb-4 text-[18px] font-bold">Channels</h2>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3">
        {channels.map((item) => (
          <li key={item.name}>
            <button
              type="button"
              onClick={() => onOpen(item.name)}
              className="flex w-full items-center gap-3 rounded-2xl bg-elevated px-3 py-3 text-left shadow-sm ring-1 ring-foreground/10 hover:ring-meow/40"
            >
              <CatImage
                src={item.image}
                alt=""
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
              />
              <span>
                <span className="block text-sm font-semibold">{item.name}</span>
                <span className="block text-xs text-muted">
                  {item.count} {item.count === 1 ? "video" : "videos"}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="mt-10 rounded-3xl bg-elevated px-6 py-12 text-center shadow-sm ring-1 ring-foreground/10">
      <p className="text-lg font-bold">No cat videos match that</p>
      <p className="mt-1 text-sm text-muted">
        Try another breed, channel, or mood.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-4 h-10 rounded-full bg-meow px-4 text-sm font-semibold text-white hover:bg-[#ff4b26]"
      >
        Back to home
      </button>
    </div>
  );
}
