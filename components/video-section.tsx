import Link from "next/link";
import { ChevronRight, Play } from "lucide-react";
import { CatImage } from "@/components/cat-image";
import type { Video } from "@/lib/catalog";

export function VideoSection({
  id,
  title,
  videos,
  onSeeAll,
  onOpen,
}: {
  id?: string;
  title: string;
  videos: Video[];
  onSeeAll?: () => void;
  onOpen: (video: Video) => void;
}) {
  if (videos.length === 0) return null;

  return (
    <section id={id} className="mt-6">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-[18px] font-bold tracking-tight">{title}</h2>
        {onSeeAll ? (
          <button
            type="button"
            onClick={onSeeAll}
            className="inline-flex items-center text-[13px] font-medium text-[#6a6a6a] hover:text-[#1c1c1c]"
          >
            See all
            <ChevronRight className="h-4 w-4" />
          </button>
        ) : null}
      </div>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-x-4 gap-y-6">
        {videos.map((video) => (
          <li key={video.id}>
            <VideoCard video={video} onOpen={onOpen} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function VideoCard({
  video,
  onOpen,
}: {
  video: Video;
  onOpen: (video: Video) => void;
}) {
  const live = video.format === "live";
  const href = video.id.startsWith("upload-") ? null : `/watch/${video.id}`;
  const className = "group w-full text-left";
  const content = (
    <>
      <span className="relative block aspect-video overflow-hidden rounded-xl bg-[#ececec]">
        <CatImage
          src={video.image}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, 220px"
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
          style={{ objectPosition: video.imagePosition ?? "center" }}
        />
        <span className="absolute inset-0 grid place-items-center bg-black/0 opacity-0 transition group-hover:bg-black/20 group-hover:opacity-100">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-meow shadow">
            <Play className="h-4 w-4 fill-meow" />
          </span>
        </span>
        <span
          className={`absolute right-2 bottom-2 rounded-md px-1.5 py-0.5 text-[11px] font-semibold text-white ${
            live ? "bg-[#ff3b30]" : "bg-black/75"
          }`}
        >
          {video.duration}
        </span>
      </span>
      <span className="mt-2 line-clamp-2 block text-[14px] leading-5 font-semibold text-[#1a1a1a]">
        {video.title}
      </span>
      <span className="mt-1 block text-[12px] text-[#6a6a6a]">{video.channel}</span>
      <span className="block text-[12px] text-[#6a6a6a]">
        {video.views} · {video.published}
      </span>
    </>
  );

  if (!href) {
    return (
      <button type="button" onClick={() => onOpen(video)} className={className}>
        {content}
      </button>
    );
  }

  return (
    <Link href={href} className={`block ${className}`}>
      {content}
    </Link>
  );
}
