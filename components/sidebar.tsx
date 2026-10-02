"use client";

import {
  Clock,
  Clapperboard,
  Flame,
  Heart,
  History,
  Home,
  Music,
  PawPrint,
  Radio,
  Scissors,
  SquarePlay,
  SquareStack,
  ThumbsUp,
  Tv,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { SectionId } from "@/lib/catalog";

type NavItem = {
  id: SectionId;
  label: string;
  icon: LucideIcon;
};

const PRIMARY: NavItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "shorts", label: "Shorts", icon: Zap },
  { id: "subscriptions", label: "Subscriptions", icon: SquareStack },
];

const LIBRARY: NavItem[] = [
  { id: "library", label: "Library", icon: SquarePlay },
  { id: "history", label: "History", icon: History },
  { id: "your-videos", label: "Your videos", icon: Clapperboard },
  { id: "watch-later", label: "Watch later", icon: Clock },
  { id: "liked", label: "Liked videos", icon: ThumbsUp },
];

const EXPLORE: NavItem[] = [
  { id: "trending", label: "Trending", icon: Flame },
  { id: "music", label: "Music for Cats", icon: Music },
  { id: "cute", label: "Cute Moments", icon: Heart },
  { id: "breeds", label: "Cat Breeds", icon: PawPrint },
  { id: "care", label: "DIY & Care", icon: Scissors },
  { id: "live", label: "Live Streams", icon: Radio },
  { id: "shorts", label: "Cat Shorts", icon: Tv },
  { id: "channels", label: "Channels", icon: Users },
];

type SidebarProps = {
  active: SectionId;
  open: boolean;
  onClose: () => void;
  onSelect: (section: SectionId) => void;
  overlayOnly?: boolean;
};

export function Sidebar({
  active,
  open,
  onClose,
  onSelect,
  overlayOnly = false,
}: SidebarProps) {
  return (
    <>
      {open ? (
        <button
          type="button"
          aria-label="Close menu"
          className={`fixed inset-0 z-40 bg-black/30 ${overlayOnly ? "" : "md:hidden"}`}
          onClick={onClose}
        />
      ) : null}
      <aside
        className={`top-16 bottom-0 left-0 z-40 w-[232px] overflow-y-auto border-r border-line bg-surface px-3 py-3 sidebar-scroll ${
          overlayOnly
            ? `fixed ${open ? "visible translate-x-0" : "invisible -translate-x-full"}`
            : `fixed transition-transform md:sticky md:visible md:translate-x-0 ${
                open ? "visible translate-x-0" : "invisible -translate-x-full"
              }`
        }`}
      >
        <NavGroup items={PRIMARY} active={active} onSelect={onSelect} />
        <div className="my-3 border-t border-line" />
        <NavGroup items={LIBRARY} active={active} onSelect={onSelect} />
        <div className="my-3 border-t border-line" />
        <p className="px-3 pt-1 pb-1 text-[13px] font-semibold text-muted">
          Explore
        </p>
        <NavGroup items={EXPLORE} active={active} onSelect={onSelect} />
      </aside>
    </>
  );
}

function NavGroup({
  items,
  active,
  onSelect,
}: {
  items: NavItem[];
  active: SectionId;
  onSelect: (section: SectionId) => void;
}) {
  return (
    <ul className="space-y-0.5">
      {items.map((item) => {
        const selected = item.id === active;
        const Icon = item.icon;
        return (
          <li key={`${item.id}-${item.label}`}>
            <button
              type="button"
              aria-current={selected ? "page" : undefined}
              onClick={() => onSelect(item.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-[14px] font-medium ${
                selected
                  ? "bg-meow-soft text-meow"
                  : "text-foreground hover:bg-hover"
              }`}
            >
              <Icon
                className="h-[18px] w-[18px] shrink-0"
                strokeWidth={selected ? 2.4 : 1.8}
              />
              {item.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
