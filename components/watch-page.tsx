"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowDownUp,
  BadgeCheck,
  Bookmark,
  Download,
  MoreVertical,
  Share2,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { CatImage } from "@/components/cat-image";
import { Sidebar } from "@/components/sidebar";
import { SiteHeader } from "@/components/site-header";
import { VideoPlayer } from "@/components/video-player";
import type { SectionId, Video } from "@/lib/catalog";
import { getVideo } from "@/lib/catalog";
import {
  formatCompact,
  relatedVideos,
  topicLabel,
  watchDetails,
  type RailFilter,
} from "@/lib/watch";

type Comment = {
  id: string;
  author: string;
  avatar: string;
  text: string;
  time: string;
  likes: number;
  createdAt: number;
};

const SEED_COMMENTS: Comment[] = [
  {
    id: "c1",
    author: "Luna Purr",
    avatar: "/cats/cat-08.jpg",
    text: "The yarn never stood a chance. I rewound the pounce three times.",
    time: "2 days ago",
    likes: 428,
    createdAt: 1,
  },
  {
    id: "c2",
    author: "Orange Theory",
    avatar: "/cats/cat-01.jpg",
    text: "Paws & Whiskers always films the good stuff. Subscribed for the next one.",
    time: "1 day ago",
    likes: 219,
    createdAt: 2,
  },
  {
    id: "c3",
    author: "Box Inspector",
    avatar: "/cats/cat-20.jpg",
    text: "That little face around the one-minute mark is everything.",
    time: "5 hours ago",
    likes: 96,
    createdAt: 3,
  },
];

export function WatchPage({ videoId }: { videoId: string }) {
  const router = useRouter();
  const video = getVideo(videoId);
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  if (!video) return null;

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader
        query={query}
        onQueryChange={setQuery}
        onMenu={() => setMenuOpen(true)}
        onLogo={() => router.push("/")}
        onNotify={(nextQuery) => router.push(`/?q=${encodeURIComponent(nextQuery)}`)}
        onSearchSubmit={(nextQuery) => {
          const trimmed = nextQuery.trim();
          if (trimmed) router.push(`/?q=${encodeURIComponent(trimmed)}`);
        }}
        showUpload={false}
        menuAlways
      />
      <Sidebar
        active="home"
        open={menuOpen}
        overlayOnly
        onClose={() => setMenuOpen(false)}
        onSelect={(section: SectionId) => {
          setMenuOpen(false);
          router.push(section === "home" ? "/" : `/?section=${section}`);
        }}
      />
      <WatchBody video={video} />
    </div>
  );
}

function WatchBody({ video }: { video: Video }) {
  const details = watchDetails(video);
  const [subscribed, setSubscribed] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(details.likeCount);
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [filter, setFilter] = useState<RailFilter>("all");
  const [hiddenIds, setHiddenIds] = useState<string[]>([]);
  const [comments, setComments] = useState(SEED_COMMENTS);
  const [commentCount, setCommentCount] = useState(details.commentCount);
  const [draft, setDraft] = useState("");
  const [sort, setSort] = useState<"top" | "newest">("top");
  const [sortOpen, setSortOpen] = useState(false);

  const rail = useMemo(
    () => relatedVideos(video, filter).filter((item) => !hiddenIds.includes(item.id)),
    [video, filter, hiddenIds],
  );

  const orderedComments = [...comments].sort((a, b) =>
    sort === "newest" ? b.createdAt - a.createdAt : b.likes - a.likes,
  );

  const chips: { id: RailFilter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "topic", label: topicLabel(video) },
    { id: "related", label: "Related" },
    { id: "channel", label: `From ${video.channel}` },
  ];

  async function share() {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  function toggleLike() {
    setLiked((current) => {
      const next = !current;
      setLikeCount((count) => count + (next ? 1 : -1) + (disliked && next ? 0 : 0));
      if (next) setDisliked(false);
      return next;
    });
  }

  function toggleDislike() {
    setDisliked((current) => {
      const next = !current;
      if (next && liked) {
        setLiked(false);
        setLikeCount((count) => count - 1);
      }
      return next;
    });
  }

  return (
    <div className="mx-auto grid max-w-[1750px] grid-cols-1 gap-6 px-3 py-4 min-[800px]:grid-cols-[minmax(0,1fr)_340px] min-[800px]:px-4 xl:grid-cols-[minmax(0,1fr)_402px] xl:px-6">
      <article className="min-w-0">
        <VideoPlayer key={video.id} video={video} startAt={details.startAt} />
        <h1 className="mt-3 text-[20px] leading-7 font-bold">{details.headline}</h1>
        <p className="mt-1 text-sm text-[#606060]">
          {video.views} · {video.published}
        </p>
        <p className="mt-2 flex flex-wrap gap-x-3 text-sm font-medium text-[#606060]">
          {details.tags.map((tag) => (
            <Link key={tag} href={`/?q=${encodeURIComponent(tag)}`} className="hover:text-[#1c1c1c]">
              #{tag}
            </Link>
          ))}
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <CatImage
              src={video.image}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="min-w-0">
              <p className="flex items-center gap-1 text-sm font-semibold">
                <Link href={`/?q=${encodeURIComponent(video.channel)}`} className="truncate">
                  {video.channel}
                </Link>
                {details.verified ? (
                  <BadgeCheck className="h-4 w-4 shrink-0 fill-[#606060] text-white" aria-label="Verified" />
                ) : null}
              </p>
              <p className="text-xs text-[#606060]">{details.subscribers} subscribers</p>
            </div>
            <button
              type="button"
              onClick={() => setSubscribed((on) => !on)}
              className={`h-9 rounded-full px-4 text-sm font-semibold ${
                subscribed
                  ? "bg-[#f2f2f2] text-[#1c1c1c] hover:bg-[#e8e8e8]"
                  : "bg-meow text-white hover:bg-[#ff4b26]"
              }`}
            >
              {subscribed ? "Subscribed" : "Subscribe"}
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex overflow-hidden rounded-full bg-[#f2f2f2]">
              <button
                type="button"
                onClick={toggleLike}
                aria-pressed={liked}
                className={`inline-flex h-9 items-center gap-1.5 px-3 text-sm font-medium hover:bg-[#e7e7e7] ${
                  liked ? "text-meow" : ""
                }`}
              >
                <ThumbsUp className={`h-4 w-4 ${liked ? "fill-meow" : ""}`} />
                {formatCompact(likeCount)}
              </button>
              <button
                type="button"
                onClick={toggleDislike}
                aria-pressed={disliked}
                aria-label="Dislike"
                className="inline-flex h-9 items-center border-l border-white px-3 hover:bg-[#e7e7e7]"
              >
                <ThumbsDown className={`h-4 w-4 ${disliked ? "fill-[#1c1c1c]" : ""}`} />
              </button>
            </div>
            <ActionButton label={copied ? "Copied" : "Share"} onClick={() => void share()}>
              <Share2 className="h-4 w-4" />
            </ActionButton>
            <a
              href={video.image}
              download={`${video.id}.jpg`}
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[#f2f2f2] px-3 text-sm font-medium hover:bg-[#e7e7e7]"
            >
              <Download className="h-4 w-4" />
              Download
            </a>
            <ActionButton label="Save" pressed={saved} onClick={() => setSaved((on) => !on)}>
              <Bookmark className={`h-4 w-4 ${saved ? "fill-[#1c1c1c]" : ""}`} />
            </ActionButton>
            <button
              type="button"
              aria-label="More actions"
              className="grid h-9 w-9 place-items-center rounded-full bg-[#f2f2f2] hover:bg-[#e7e7e7]"
              onClick={() => void share()}
            >
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-[#f2f2f2] px-3 py-3 text-sm">
          <p className={expanded ? "" : "line-clamp-2"}>{details.description}</p>
          <button
            type="button"
            onClick={() => setExpanded((on) => !on)}
            className="mt-1 font-semibold"
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        </div>

        <section className="mt-6">
          <div className="flex items-center gap-6">
            <h2 className="text-lg font-bold">
              {commentCount.toLocaleString("en-US")} Comments
            </h2>
            <div className="relative">
              <button
                type="button"
                className="inline-flex items-center gap-2 text-sm font-semibold"
                aria-expanded={sortOpen}
                onClick={() => setSortOpen((open) => !open)}
              >
                <ArrowDownUp className="h-4 w-4" />
                Sort by
              </button>
              {sortOpen ? (
                <div className="absolute left-0 z-10 mt-2 w-36 rounded-xl border border-[#f0f0f0] bg-white p-1 shadow-lg">
                  {(["top", "newest"] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setSort(option);
                        setSortOpen(false);
                      }}
                      className={`block w-full rounded-lg px-3 py-1.5 text-left text-sm capitalize hover:bg-[#f6f6f6] ${
                        sort === option ? "font-semibold" : ""
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <form
            className="mt-4 flex items-center gap-3"
            onSubmit={(event) => {
              event.preventDefault();
              const text = draft.trim();
              if (!text) return;
              setComments((current) => [
                {
                  id: `local-${Date.now()}`,
                  author: "You",
                  avatar: "/cats/cat-01.jpg",
                  text,
                  time: "Just now",
                  likes: 0,
                  createdAt: Date.now(),
                },
                ...current,
              ]);
              setCommentCount((count) => count + 1);
              setDraft("");
              setSort("newest");
            }}
          >
            <CatImage
              src="/cats/cat-01.jpg"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Add a comment..."
              aria-label="Add a comment"
              className="h-10 min-w-0 flex-1 border-b border-[#e4e4e4] bg-transparent text-sm outline-none placeholder:text-[#9a9a9a] focus:border-[#1c1c1c]"
            />
          </form>

          <ul className="mt-5 space-y-4">
            {orderedComments.map((comment) => (
              <li key={comment.id} className="flex gap-3">
                <CatImage
                  src={comment.avatar}
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 shrink-0 rounded-full object-cover"
                />
                <div>
                  <p className="text-xs text-[#606060]">
                    <span className="font-semibold text-[#1c1c1c]">{comment.author}</span>
                    {" · "}
                    {comment.time}
                  </p>
                  <p className="mt-1 text-sm">{comment.text}</p>
                  <p className="mt-1 inline-flex items-center gap-1 text-xs text-[#606060]">
                    <ThumbsUp className="h-3.5 w-3.5" />
                    {comment.likes}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </article>

      <aside className="min-w-0">
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-3">
          {chips.map((chip) => {
            const selected = filter === chip.id;
            return (
              <button
                key={chip.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setFilter(chip.id)}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium ${
                  selected ? "bg-[#1f1f1f] text-white" : "bg-[#f2f2f2] text-[#1c1c1c] hover:bg-[#e8e8e8]"
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
        {rail.length === 0 ? (
          <p className="py-8 text-sm text-[#606060]">No more videos in this pile.</p>
        ) : (
          <ul className="space-y-3">
            {rail.map((item) => (
              <RelatedRow
                key={item.id}
                video={item}
                onHide={() => setHiddenIds((current) => [...current, item.id])}
              />
            ))}
          </ul>
        )}
      </aside>
    </div>
  );
}

function ActionButton({
  label,
  onClick,
  pressed,
  children,
}: {
  label: string;
  onClick: () => void;
  pressed?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={pressed}
      className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[#f2f2f2] px-3 text-sm font-medium hover:bg-[#e7e7e7]"
    >
      {children}
      {label}
    </button>
  );
}

function RelatedRow({ video, onHide }: { video: Video; onHide: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <li className="flex gap-2">
      <Link href={`/watch/${video.id}`} className="flex min-w-0 flex-1 gap-2">
        <span className="relative block h-[76px] w-[136px] shrink-0 overflow-hidden rounded-xl bg-[#ececec] xl:h-[94px] xl:w-[168px]">
          <CatImage
            src={video.image}
            alt=""
            fill
            sizes="168px"
            className="object-cover"
            style={{ objectPosition: video.imagePosition ?? "center" }}
          />
          <span className="absolute right-1.5 bottom-1.5 rounded bg-black/75 px-1 py-0.5 text-[11px] font-semibold text-white">
            {video.duration}
          </span>
        </span>
        <span className="min-w-0 flex-1">
          <span className="line-clamp-2 block text-sm leading-5 font-semibold">{video.title}</span>
          <span className="mt-1 block text-xs text-[#606060]">{video.channel}</span>
          <span className="block text-xs text-[#606060]">
            {video.views} · {video.published}
          </span>
        </span>
      </Link>
      <div className="relative">
        <button
          type="button"
          aria-label={`More actions for ${video.title}`}
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
          className="grid h-8 w-8 place-items-center rounded-full text-[#606060] hover:bg-[#f2f2f2]"
        >
          <MoreVertical className="h-4 w-4" />
        </button>
        {open ? (
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onHide();
            }}
            className="absolute right-0 z-10 mt-1 w-36 rounded-xl border border-[#f0f0f0] bg-white px-3 py-2 text-left text-sm shadow-lg hover:bg-[#f7f7f7]"
          >
            Not interested
          </button>
        ) : null}
      </div>
    </li>
  );
}
