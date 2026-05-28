import Image from "next/image";

export function Avatar({
  src,
  alt,
  size = 40,
}: Readonly<{ src: string; alt: string; size?: number }>) {
  const safeSize = Number.isFinite(size) && size > 0 ? Math.round(size) : 40;
  return (
    <div
      className="relative overflow-hidden rounded-full bg-slate-200"
      style={{ width: safeSize, height: safeSize }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${safeSize}px`}
        className="object-cover"
      />
    </div>
  );
}

