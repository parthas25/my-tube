import {
  VIDEOS,
  categoryLabel,
  type CategoryId,
  type Video,
} from "@/lib/catalog";

export type RailFilter = "all" | "topic" | "related" | "channel";

export type WatchDetails = {
  headline: string;
  description: string;
  tags: string[];
  subscribers: string;
  likeCount: number;
  commentCount: number;
  verified: boolean;
  startAt: number;
};

const WATCH_OVERRIDES: Record<string, Partial<WatchDetails>> = {
  "playful-kittens": {
    headline: "Playful Kittens Having the Best Time! 🐾🐱",
    description:
      "These adorable kittens are full of energy and curiosity! Watch them play, explore, and have the best time together. 😻💕",
    tags: ["kittens", "cute", "playing", "meowtube"],
    subscribers: "450K",
    likeCount: 52000,
    commentCount: 1234,
    verified: true,
    startAt: 84,
  },
};

const PLAYFUL_RAIL = [
  "sleepy-kittens",
  "feather-toys",
  "if-it-fits",
  "exploring",
  "purring",
  "cats-friends",
  "jumps",
  "bath-time",
];

export function watchDetails(video: Video): WatchDetails {
  const override = WATCH_OVERRIDES[video.id] ?? {};
  const topic = topicCategory(video);

  return {
    headline: override.headline ?? video.title,
    description:
      override.description ??
      `${video.title} from ${video.channel}. Settle in for whiskers, window light, and the kind of chaos only cats can pull off.`,
    tags: override.tags ?? [topic, ...video.categories].filter(unique),
    subscribers: override.subscribers ?? "128K",
    likeCount: override.likeCount ?? 8400,
    commentCount: override.commentCount ?? 186,
    verified: override.verified ?? Boolean(video.subscribed),
    startAt: override.startAt ?? 0,
  };
}

export function topicCategory(video: Video): Exclude<CategoryId, "all"> {
  return (
    video.categories.find((category) => category !== "shorts" && category !== "live") ??
    "kittens"
  );
}

export function topicLabel(video: Video): string {
  return categoryLabel(topicCategory(video));
}

export function relatedVideos(current: Video, filter: RailFilter): Video[] {
  const pool = VIDEOS.filter((video) => video.id !== current.id && video.format !== "live");

  if (current.id === "playful-kittens" && filter === "all") {
    return PLAYFUL_RAIL.flatMap((id) => {
      const video = pool.find((item) => item.id === id);
      return video ? [video] : [];
    });
  }

  const topic = topicCategory(current);

  return pool.filter((video) => {
    if (filter === "channel") return video.channel === current.channel;
    if (filter === "topic") return video.categories.includes(topic);
    if (filter === "related") {
      return video.categories.some((category) => current.categories.includes(category));
    }
    return video.format === "video";
  });
}

export function parseDuration(value: string): number {
  if (!value.includes(":")) return 0;
  const parts = value.split(":").map((part) => Number(part));
  if (parts.some((part) => Number.isNaN(part))) return 0;
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return parts[0] * 60 + parts[1];
}

export function formatClock(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;
  const clock = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  return hours > 0 ? `${hours}:${clock.padStart(5, "0")}` : clock;
}

export function formatCompact(count: number): string {
  if (count >= 1_000_000) {
    const millions = count / 1_000_000;
    return `${millions >= 10 ? Math.round(millions) : millions.toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (count >= 1_000) return `${Math.round(count / 1000)}K`;
  return String(count);
}

function unique<T>(value: T, index: number, list: T[]): boolean {
  return list.indexOf(value) === index;
}
