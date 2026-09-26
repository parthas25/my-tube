import Image from "next/image";
import type { CSSProperties } from "react";

type CatImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  style?: CSSProperties;
} & (
  | { fill: true; width?: never; height?: never }
  | { fill?: false; width: number; height: number }
);

export function CatImage({
  src,
  alt,
  className,
  sizes,
  priority,
  style,
  fill,
  width,
  height,
}: CatImageProps) {
  const localUpload = src.startsWith("blob:") || src.startsWith("data:");

  if (localUpload) {
    return (
      // User-picked thumbnails are session blob URLs, which next/image cannot optimize.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        className={
          fill
            ? `absolute inset-0 h-full w-full ${className ?? ""}`
            : className
        }
        style={style}
      />
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={className}
        style={style}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      className={className}
      style={style}
    />
  );
}
