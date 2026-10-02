"use client";

import {
  Captions,
  Maximize,
  Pause,
  PictureInPicture2,
  Play,
  Settings,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CatImage } from "@/components/cat-image";
import { formatClock, parseDuration } from "@/lib/watch";
import type { Video } from "@/lib/catalog";

const SPEEDS = [0.5, 1, 1.25, 1.5, 2];

export function VideoPlayer({
  video,
  startAt,
}: {
  video: Video;
  startAt: number;
}) {
  const duration = Math.max(parseDuration(video.duration), 1);
  const frameRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(() => Math.min(startAt, duration - 1));
  const [playing, setPlaying] = useState(false);
  const [captions, setCaptions] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mini, setMini] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setTime((current) => {
        const next = current + speed;
        if (next >= duration) {
          setPlaying(false);
          return duration;
        }
        return next;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [playing, speed, duration]);

  const ratio = Math.min(100, (time / duration) * 100);

  function seek(clientX: number, target: HTMLDivElement) {
    const rect = target.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * duration;
    setTime(Math.min(duration, Math.max(0, next)));
  }

  async function toggleFullscreen() {
    const frame = frameRef.current;
    if (!frame) return;
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await frame.requestFullscreen();
    }
  }

  const stage = (
    <div
      ref={mini ? undefined : frameRef}
      className={`relative overflow-hidden bg-black ${
        mini
          ? "aspect-video w-full"
          : "aspect-video w-full rounded-2xl"
      }`}
    >
      <CatImage
        src={video.image}
        alt=""
        fill
        priority
        sizes="(max-width: 960px) 100vw, 1100px"
        className="object-cover"
        style={{ objectPosition: video.imagePosition ?? "center" }}
      />
      {captions ? (
        <p className="absolute bottom-16 left-1/2 max-w-[80%] -translate-x-1/2 rounded bg-black/75 px-2 py-1 text-center text-sm text-white">
          Soft purring, a skitter of claws, then one perfect pounce.
        </p>
      ) : null}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent px-3 pt-8 pb-2.5">
        <div
          className="group relative mb-2 h-1 cursor-pointer rounded-full bg-white/35"
          onClick={(event) => seek(event.clientX, event.currentTarget)}
          role="slider"
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-valuenow={Math.floor(time)}
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") setTime((current) => Math.min(duration, current + 5));
            if (event.key === "ArrowLeft") setTime((current) => Math.max(0, current - 5));
          }}
        >
          <div className="h-full rounded-full bg-[#ff3a30]" style={{ width: `${ratio}%` }} />
          <div
            className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff3a30]"
            style={{ left: `${ratio}%` }}
          />
        </div>
        <div className="flex items-center gap-1 text-white sm:gap-2">
          <button
            type="button"
            className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/15"
            aria-label={playing ? "Pause" : "Play"}
            onClick={() => {
              if (playing) {
                setPlaying(false);
                return;
              }
              if (time >= duration) setTime(0);
              setPlaying(true);
            }}
          >
            {playing ? (
              <Pause className="h-4 w-4 fill-white" />
            ) : (
              <Play className="h-4 w-4 fill-white" />
            )}
          </button>
          <span className="ml-1 text-xs font-medium tabular-nums">
            {formatClock(time)} / {video.duration === "LIVE" ? "LIVE" : formatClock(duration)}
          </span>
          <div className="ml-auto flex items-center">
            <button
              type="button"
              aria-label="Captions"
              aria-pressed={captions}
              onClick={() => setCaptions((on) => !on)}
              className={`grid h-8 w-8 place-items-center rounded-full hover:bg-white/15 ${captions ? "text-[#ffb4a8]" : ""}`}
            >
              <Captions className="h-4 w-4" />
            </button>
            <div className="relative">
              <button
                type="button"
                aria-label="Settings"
                aria-expanded={settingsOpen}
                onClick={() => setSettingsOpen((open) => !open)}
                className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/15"
              >
                <Settings className="h-4 w-4" />
              </button>
              {settingsOpen ? (
                <div className="absolute right-0 bottom-10 w-36 rounded-xl bg-black/90 p-1 text-sm shadow-xl">
                  {SPEEDS.map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => {
                        setSpeed(value);
                        setSettingsOpen(false);
                      }}
                      className={`block w-full rounded-lg px-3 py-1.5 text-left hover:bg-white/10 ${
                        speed === value ? "text-[#ffb4a8]" : ""
                      }`}
                    >
                      {value === 1 ? "Normal" : `${value}x`}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
            <button
              type="button"
              aria-label="Mini player"
              aria-pressed={mini}
              onClick={() => setMini((on) => !on)}
              className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/15"
            >
              <PictureInPicture2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Fullscreen"
              onClick={() => void toggleFullscreen()}
              className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/15"
            >
              <Maximize className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (mini) {
    return (
      <>
        <div className="grid aspect-video place-items-center rounded-2xl bg-[#1c1c1c] text-sm text-white">
          Playing in the mini player
        </div>
        <div className="fixed right-4 bottom-4 z-50 w-[320px] overflow-hidden rounded-xl shadow-2xl">
          {stage}
        </div>
      </>
    );
  }

  return stage;
}
