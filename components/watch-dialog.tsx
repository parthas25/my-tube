"use client";

import { X } from "lucide-react";
import { CatImage } from "@/components/cat-image";
import { useEffect, useId } from "react";
import type { Video } from "@/lib/catalog";

export function WatchDialog({
  video,
  onClose,
}: {
  video: Video;
  onClose: () => void;
}) {
  const titleId = useId();

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/55 p-4"
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="relative aspect-video bg-black">
          <CatImage
            src={video.image}
            alt=""
            fill
            sizes="768px"
            className="object-cover"
            style={{ objectPosition: video.imagePosition ?? "center" }}
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-black/55 text-white hover:bg-black/70"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="px-5 py-4">
          <h2 id={titleId} className="text-lg font-bold">
            {video.title}
          </h2>
          <p className="mt-1 text-sm text-[#6a6a6a]">
            {video.channel} · {video.views} · {video.published}
          </p>
        </div>
      </div>
    </div>
  );
}
