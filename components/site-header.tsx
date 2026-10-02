"use client";

import Image from "next/image";
import { Bell, Menu, Mic, Search, Upload } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { CatLogo } from "@/components/cat-logo";
import { ThemeToggle } from "@/components/theme-toggle";

const NOTES = [
  {
    title: "Paws & Whiskers uploaded",
    body: "Playful Kittens Having the Best Time!",
    image: "/cats/cat-07.jpg",
    query: "Playful Kittens",
  },
  {
    title: "Funny Cats TV is climbing",
    body: "If It Fits, I Sits is trending again",
    image: "/cats/cat-22.jpg",
    query: "If It Fits",
  },
  {
    title: "Meow Moments",
    body: "A new purring mix just landed",
    image: "/cats/cat-11.jpg",
    query: "Purring",
  },
];

type SiteHeaderProps = {
  query: string;
  onQueryChange: (value: string) => void;
  onMenu: () => void;
  onLogo: () => void;
  onNotify: (query: string) => void;
  onUpload?: (video: {
    title: string;
    channel: string;
    image: string;
  }) => void;
  onSearchSubmit?: (query: string) => void;
  showUpload?: boolean;
  menuAlways?: boolean;
};

export function SiteHeader({
  query,
  onQueryChange,
  onMenu,
  onLogo,
  onNotify,
  onUpload,
  onSearchSubmit,
  showUpload = true,
  menuAlways = false,
}: SiteHeaderProps) {
  const [notesOpen, setNotesOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const notesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!notesOpen) return;

    function onPointerDown(event: MouseEvent) {
      if (!notesRef.current?.contains(event.target as Node)) {
        setNotesOpen(false);
      }
    }

    window.addEventListener("mousedown", onPointerDown);
    return () => window.removeEventListener("mousedown", onPointerDown);
  }, [notesOpen]);

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-line bg-surface px-3 sm:px-5">
      <button
        type="button"
        className={`grid h-10 w-10 place-items-center rounded-full text-foreground hover:bg-hover ${
          menuAlways ? "" : "md:hidden"
        }`}
        aria-label="Open menu"
        onClick={onMenu}
      >
        <Menu className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={onLogo}
        className="flex shrink-0 items-center gap-2 rounded-xl pr-2"
      >
        <CatLogo />
        <span className="hidden text-[22px] leading-none font-extrabold tracking-tight sm:inline">
          <span className="text-foreground">Meow</span>
          <span className="text-meow">Tube</span>
        </span>
      </button>

      <form
        className="mx-auto min-w-0 flex-1"
        onSubmit={(event) => {
          event.preventDefault();
          onSearchSubmit?.(query);
        }}
        role="search"
      >
        <label className="relative mx-auto flex h-10 w-full max-w-[640px] items-center sm:h-11">
          <span className="sr-only">Search for cat videos, breeds, or channels</span>
          <Search className="pointer-events-none absolute left-3 h-[18px] w-[18px] text-muted sm:left-4" />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search for cat videos, breeds, or channels..."
            className="h-10 w-full rounded-full border border-line bg-surface pr-10 pl-9 text-sm text-foreground outline-none placeholder:text-muted focus:border-[#ffb3a3] focus:ring-4 focus:ring-[#ff5c3a]/10 sm:h-11 sm:pr-12 sm:pl-11"
          />
          <Mic className="pointer-events-none absolute right-3 hidden h-[18px] w-[18px] text-muted sm:right-4 sm:block" />
        </label>
      </form>

      <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
        <ThemeToggle />
        <div className="relative" ref={notesRef}>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full text-foreground hover:bg-hover"
            aria-label="Notifications"
            aria-expanded={notesOpen}
            onClick={() => setNotesOpen((open) => !open)}
          >
            <Bell className="h-5 w-5" />
          </button>
          {notesOpen ? (
            <div className="absolute right-0 z-50 mt-2 w-[320px] overflow-hidden rounded-2xl border border-line bg-elevated p-2 shadow-[0_16px_50px_rgba(0,0,0,0.12)]">
              <p className="px-2 py-1.5 text-sm font-semibold">Notifications</p>
              <ul>
                {NOTES.map((note) => (
                  <li key={note.title}>
                    <button
                      type="button"
                      className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left hover:bg-hover"
                      onClick={() => {
                        onNotify(note.query);
                        setNotesOpen(false);
                      }}
                    >
                      <Image
                        src={note.image}
                        alt=""
                        width={44}
                        height={44}
                        className="h-11 w-11 rounded-full object-cover"
                      />
                      <span>
                        <span className="block text-sm font-semibold">
                          {note.title}
                        </span>
                        <span className="block text-xs text-muted">
                          {note.body}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <Image
          src="/cats/cat-01.jpg"
          alt="Your profile"
          width={36}
          height={36}
          className="hidden h-9 w-9 rounded-full object-cover object-[center_20%] sm:block"
        />

        {showUpload ? (
          <button
            type="button"
            onClick={() => setUploadOpen(true)}
            className="inline-flex h-10 items-center gap-1.5 rounded-full bg-meow px-3 text-sm font-semibold text-white shadow-sm hover:bg-[#ff4b26] sm:px-4"
          >
            <Upload className="h-4 w-4" />
            <span className="hidden sm:inline">Upload</span>
          </button>
        ) : null}
      </div>

      {uploadOpen ? (
        <UploadDialog
          onClose={() => setUploadOpen(false)}
          onUpload={(video) => {
            onUpload?.(video);
            setUploadOpen(false);
          }}
        />
      ) : null}
    </header>
  );
}

function UploadDialog({
  onClose,
  onUpload,
}: {
  onClose: () => void;
  onUpload: (video: { title: string; channel: string; image: string }) => void;
}) {
  const titleId = useId();
  const [title, setTitle] = useState("");
  const [channel, setChannel] = useState("Your Channel");
  const [image, setImage] = useState("/cats/cat-08.jpg");
  const [error, setError] = useState("");

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-md rounded-3xl bg-elevated p-6 text-foreground shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <h2 id={titleId} className="text-xl font-bold">
          Upload a cat video
        </h2>
        <p className="mt-1 text-sm text-muted">
          It will show up at the front of Trending on this page.
        </p>
        <form
          className="mt-5 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            if (!title.trim()) {
              setError("Give the video a title.");
              return;
            }
            onUpload({
              title: title.trim(),
              channel: channel.trim() || "Your Channel",
              image,
            });
          }}
        >
          <label className="block text-sm font-semibold">
            Title
            <input
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                setError("");
              }}
              className="mt-1.5 h-11 w-full rounded-xl border border-line bg-surface px-3 text-sm font-normal outline-none focus:border-[#ffb3a3] focus:ring-4 focus:ring-[#ff5c3a]/10"
              placeholder="Afternoon zoomies"
            />
          </label>
          <label className="block text-sm font-semibold">
            Channel
            <input
              value={channel}
              onChange={(event) => setChannel(event.target.value)}
              className="mt-1.5 h-11 w-full rounded-xl border border-line bg-surface px-3 text-sm font-normal outline-none focus:border-[#ffb3a3] focus:ring-4 focus:ring-[#ff5c3a]/10"
            />
          </label>
          <label className="block text-sm font-semibold">
            Thumbnail
            <input
              type="file"
              accept="image/*"
              className="mt-1.5 block w-full text-sm font-normal text-muted file:mr-3 file:rounded-full file:border-0 file:bg-meow-soft file:px-3 file:py-2 file:text-sm file:font-semibold file:text-meow"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                setImage(URL.createObjectURL(file));
              }}
            />
          </label>
          {error ? <p className="text-sm text-meow">{error}</p> : null}
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="h-10 rounded-full px-4 text-sm font-semibold text-foreground hover:bg-hover"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-10 rounded-full bg-meow px-4 text-sm font-semibold text-white hover:bg-[#ff4b26]"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
