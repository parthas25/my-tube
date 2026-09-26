import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WatchPage } from "@/components/watch-page";
import { VIDEOS, getVideo } from "@/lib/catalog";
import { watchDetails } from "@/lib/watch";

export function generateStaticParams() {
  return VIDEOS.map((video) => ({ id: video.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const video = getVideo(id);
  if (!video) return { title: "Video" };
  return {
    title: watchDetails(video).headline,
    description: watchDetails(video).description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!getVideo(id)) notFound();
  return <WatchPage videoId={id} />;
}
