export type CategoryId =
  | "all"
  | "kittens"
  | "funny"
  | "breeds"
  | "care"
  | "music"
  | "live"
  | "shorts"
  | "cute";

export type SectionId =
  | "home"
  | "shorts"
  | "subscriptions"
  | "library"
  | "history"
  | "your-videos"
  | "watch-later"
  | "liked"
  | "trending"
  | "recommended"
  | "music"
  | "cute"
  | "breeds"
  | "care"
  | "live"
  | "channels";

export type VideoFormat = "video" | "short" | "live";

export type Video = {
  id: string;
  title: string;
  channel: string;
  views: string;
  published: string;
  duration: string;
  image: string;
  imagePosition?: string;
  categories: Exclude<CategoryId, "all">[];
  format: VideoFormat;
  shelf: "trending" | "recommended" | "extra";
  liked?: boolean;
  watchLater?: boolean;
  watched?: boolean;
  subscribed?: boolean;
};

export type ChannelSummary = {
  name: string;
  image: string;
  count: number;
};

export const CATEGORIES: {
  id: CategoryId;
  label: string;
  image: string;
  className: string;
}[] = [
  {
    id: "all",
    label: "All",
    image: "/cats/cat-08.jpg",
    className: "bg-[#ffe4ea] text-[#3a2a2e]",
  },
  {
    id: "kittens",
    label: "Kittens",
    image: "/cats/cat-16.jpg",
    className: "bg-[#ffe8ef] text-[#3a2a2e]",
  },
  {
    id: "funny",
    label: "Funny Cats",
    image: "/cats/cat-06.jpg",
    className: "bg-[#fff3d6] text-[#3a3424]",
  },
  {
    id: "breeds",
    label: "Cat Breeds",
    image: "/cats/hero-e.jpg",
    className: "bg-[#e5f7ee] text-[#24382e]",
  },
  {
    id: "care",
    label: "Cat Care",
    image: "/cats/cat-17.jpg",
    className: "bg-[#e7f2ff] text-[#243044]",
  },
  {
    id: "music",
    label: "Music for Cats",
    image: "/cats/cat-10.jpg",
    className: "bg-[#f3e8ff] text-[#342844]",
  },
  {
    id: "live",
    label: "Live",
    image: "/cats/cat-20.jpg",
    className: "bg-[#ffe4f1] text-[#3f2434]",
  },
  {
    id: "shorts",
    label: "Shorts",
    image: "/cats/cat-07.jpg",
    className: "bg-[#eee7ff] text-[#312844]",
  },
];

export const SECTION_LABELS: Record<SectionId, string> = {
  home: "Home",
  shorts: "Shorts",
  subscriptions: "Subscriptions",
  library: "Library",
  history: "History",
  "your-videos": "Your videos",
  "watch-later": "Watch later",
  liked: "Liked videos",
  trending: "Trending Videos",
  recommended: "Recommended for You",
  music: "Music for Cats",
  cute: "Cute Moments",
  breeds: "Cat Breeds",
  care: "DIY & Care",
  live: "Live Streams",
  channels: "Channels",
};

export const VIDEOS: Video[] = [
  {
    id: "playful-kittens",
    title: "Playful Kittens Having the Best Time!",
    channel: "Paws & Whiskers",
    views: "2.4M views",
    published: "3 days ago",
    duration: "3:24",
    image: "/cats/cat-07.jpg",
    imagePosition: "center 40%",
    categories: ["kittens", "cute"],
    format: "video",
    shelf: "trending",
    liked: true,
    subscribed: true,
  },
  {
    id: "purring",
    title: "Relaxing Cat Purring Compilation",
    channel: "Meow Moments",
    views: "1.8M views",
    published: "1 week ago",
    duration: "5:18",
    image: "/cats/cat-11.jpg",
    imagePosition: "center 45%",
    categories: ["music", "cute"],
    format: "video",
    shelf: "trending",
    watchLater: true,
    subscribed: true,
  },
  {
    id: "if-it-fits",
    title: "If It Fits, I Sits 😹 (Part 10)",
    channel: "Funny Cats TV",
    views: "3.1M views",
    published: "2 weeks ago",
    duration: "4:12",
    image: "/cats/cat-22.jpg",
    imagePosition: "center 30%",
    categories: ["funny"],
    format: "video",
    shelf: "trending",
    liked: true,
    subscribed: true,
  },
  {
    id: "piano",
    title: "Talented Cat Plays Piano Like a Pro",
    channel: "Cat Talent",
    views: "4.5M views",
    published: "3 weeks ago",
    duration: "2:56",
    image: "/cats/cat-10.jpg",
    imagePosition: "center 40%",
    categories: ["music"],
    format: "video",
    shelf: "trending",
    watched: true,
  },
  {
    id: "outdoor",
    title: "Cats vs. Outdoor Adventures",
    channel: "Adventure Cats",
    views: "1.2M views",
    published: "1 month ago",
    duration: "3:33",
    image: "/cats/hero-a.jpg",
    imagePosition: "center 20%",
    categories: ["breeds"],
    format: "video",
    shelf: "trending",
    watched: true,
  },
  {
    id: "kitten-compilation",
    title: "Adorable Kittens Compilation 2024",
    channel: "Cute Paws",
    views: "5.8M views",
    published: "1 month ago",
    duration: "6:21",
    image: "/cats/cat-08.jpg",
    imagePosition: "center 30%",
    categories: ["kittens", "cute"],
    format: "video",
    shelf: "trending",
  },
  {
    id: "watching-fish",
    title: "Cats Watching Fish 🐟",
    channel: "Curious Cats",
    views: "1.6M views",
    published: "2 weeks ago",
    duration: "4:40",
    image: "/cats/cat-12.jpg",
    imagePosition: "center 40%",
    categories: ["funny"],
    format: "video",
    shelf: "recommended",
  },
  {
    id: "lazy-afternoon",
    title: "Lazy Cat Afternoon Vibes",
    channel: "Chill Cats",
    views: "980K views",
    published: "2 weeks ago",
    duration: "3:27",
    image: "/cats/cat-01.jpg",
    imagePosition: "center 35%",
    categories: ["cute"],
    format: "video",
    shelf: "recommended",
    watchLater: true,
  },
  {
    id: "kittens-toys",
    title: "Kittens vs. Toys (Hilarious!)",
    channel: "Playful Paws",
    views: "2.7M views",
    published: "3 weeks ago",
    duration: "2:19",
    image: "/cats/cat-03.jpg",
    imagePosition: "center 40%",
    categories: ["kittens", "funny"],
    format: "video",
    shelf: "recommended",
  },
  {
    id: "bath-time",
    title: "Cat Bath Time (So Cute!)",
    channel: "Fluffy Friends",
    views: "1.9M views",
    published: "1 month ago",
    duration: "5:11",
    image: "/cats/cat-18.jpg",
    imagePosition: "center 20%",
    categories: ["care"],
    format: "video",
    shelf: "recommended",
    watched: true,
  },
  {
    id: "expressions",
    title: "Cute Cat Expressions That Melt Your Heart",
    channel: "MeowTube Originals",
    views: "3.4M views",
    published: "1 month ago",
    duration: "3:45",
    image: "/cats/hero-c.jpg",
    imagePosition: "center 30%",
    categories: ["cute", "funny"],
    format: "video",
    shelf: "recommended",
    liked: true,
    subscribed: true,
  },
  {
    id: "peaceful",
    title: "Peaceful Cats in Beautiful Places",
    channel: "Traveling Cats",
    views: "1.1M views",
    published: "1 month ago",
    duration: "4:08",
    image: "/cats/cat-14.jpg",
    imagePosition: "center 45%",
    categories: ["breeds"],
    format: "video",
    shelf: "recommended",
    watchLater: true,
  },
  {
    id: "brushing",
    title: "Gentle Brushing for Happy Cats",
    channel: "DIY & Care",
    views: "860K views",
    published: "5 days ago",
    duration: "7:02",
    image: "/cats/cat-17.jpg",
    imagePosition: "center 40%",
    categories: ["care"],
    format: "video",
    shelf: "extra",
  },
  {
    id: "zoomies",
    title: "Zoomies Across the Hall",
    channel: "Playful Paws",
    views: "640K views",
    published: "4 days ago",
    duration: "0:18",
    image: "/cats/cat-19.jpg",
    imagePosition: "center 40%",
    categories: ["shorts", "funny"],
    format: "short",
    shelf: "extra",
  },
  {
    id: "stairs",
    title: "One Hop Down the Stairs",
    channel: "Paws & Whiskers",
    views: "210K views",
    published: "1 week ago",
    duration: "0:22",
    image: "/cats/cat-02.jpg",
    imagePosition: "center 40%",
    categories: ["shorts", "kittens"],
    format: "short",
    shelf: "extra",
    subscribed: true,
  },
  {
    id: "live-window",
    title: "Live: Sunny Window Perch",
    channel: "Cat Cafe Cam",
    views: "842 watching",
    published: "Live now",
    duration: "LIVE",
    image: "/cats/hero-b.jpg",
    imagePosition: "center 30%",
    categories: ["live"],
    format: "live",
    shelf: "extra",
  },
];

const CATEGORY_SECTIONS = new Set<SectionId>([
  "shorts",
  "music",
  "cute",
  "breeds",
  "care",
  "live",
]);

export function categoryForSection(section: SectionId): CategoryId {
  if (CATEGORY_SECTIONS.has(section)) {
    return section as CategoryId;
  }
  return "all";
}

export function filterVideos(
  videos: Video[],
  input: {
    section: SectionId;
    category: CategoryId;
    query: string;
    channel: string | null;
  },
): Video[] {
  const query = input.query.trim().toLowerCase();

  return videos.filter((video) => {
    if (input.channel && video.channel !== input.channel) {
      return false;
    }

    if (
      query &&
      !`${video.title} ${video.channel}`.toLowerCase().includes(query)
    ) {
      return false;
    }

    if (!matchesSection(video, input.section, input.category)) {
      return false;
    }

    if (
      input.category !== "all" &&
      !matchesCategory(video, input.category)
    ) {
      return false;
    }

    return true;
  });
}

function matchesCategory(video: Video, category: Exclude<CategoryId, "all"> | CategoryId): boolean {
  if (category === "all") return true;
  if (category === "shorts") return video.format === "short";
  if (category === "live") return video.format === "live";
  return video.categories.includes(category);
}

function matchesSection(
  video: Video,
  section: SectionId,
  category: CategoryId,
): boolean {
  switch (section) {
    case "home":
      if (category === "shorts") return video.format === "short";
      if (category === "live") return video.format === "live";
      return video.shelf !== "extra";
    case "shorts":
      return video.format === "short";
    case "subscriptions":
      return Boolean(video.subscribed);
    case "library":
      return Boolean(video.liked || video.watchLater || video.watched);
    case "history":
      return Boolean(video.watched);
    case "your-videos":
      return video.channel === "MeowTube Originals";
    case "watch-later":
      return Boolean(video.watchLater);
    case "liked":
      return Boolean(video.liked);
    case "trending":
      return video.shelf === "trending";
    case "recommended":
      return video.shelf === "recommended";
    case "music":
      return video.categories.includes("music");
    case "cute":
      return video.categories.includes("cute");
    case "breeds":
      return video.categories.includes("breeds");
    case "care":
      return video.categories.includes("care");
    case "live":
      return video.format === "live";
    case "channels":
      return true;
    default:
      return true;
  }
}

export function listChannels(videos: Video[]): ChannelSummary[] {
  const channels = new Map<string, ChannelSummary>();

  for (const video of videos) {
    const current = channels.get(video.channel);
    if (current) {
      current.count += 1;
    } else {
      channels.set(video.channel, {
        name: video.channel,
        image: video.image,
        count: 1,
      });
    }
  }

  return [...channels.values()].sort((a, b) => b.count - a.count);
}

export function categoryLabel(category: CategoryId): string {
  return CATEGORIES.find((item) => item.id === category)?.label ?? "Videos";
}
