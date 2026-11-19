import Image from "next/image";

export type ImageCardProps = {
  img: string;
  alt: string;
  motive: string;
  size: string;
  kind?: "square" | "circle";
  /** Pass unique positioning, z-index, and rotation classes here (e.g. "right-6 top-0 z-10 rotate-3") */
  positionClass: string;
  /** Optional extra classes for the <Image /> element itself */
  imageClassName?: string;
};

export function ImageCard({
  img,
  alt,
  motive,
  size,
  kind = "square",
  positionClass,
  imageClassName = "",
}: ImageCardProps) {
  const shapeClasses =
    kind === "circle"
      ? "h-28 w-28 rounded-full border-4 border-[#1B7A78] hover:scale-105"
      : "h-44 w-40 rounded-3xl border-4 border-white hover:rotate-0 xl:h-52 xl:w-44";

  return (
    <div
      className={`absolute overflow-hidden bg-white shadow-xl transition-transform duration-300 ${shapeClasses} ${positionClass}`}
    >
      <Image
        src={img}
        alt={alt}
        fill
        sizes={size}
        className={`object-cover ${imageClassName}`}
      />

      {/* Motive Pill Badge (shown on square cards so it doesn't clip small circles) */}
      {kind === "square" && motive && (
        <span className="absolute bottom-2.5 left-2.5 z-10 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold capitalize text-stone-800 shadow-sm backdrop-blur-sm">
          {motive}
        </span>
      )}
    </div>
  );
}
