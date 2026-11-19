import Image from "next/image";

type Params = {
  size?: number;
  choice?: boolean;
};

export const Logo = ({ size = 40, choice = false }: Params) => {
  return (
    <div className="relative z-20 flex items-center gap-3 pb-3">
      <Image
        src="/logo/Atoll.svg"
        alt="Atoll Logo"
        width={120}
        height={40}
        priority
        style={{ height: `${size}px`, width: "auto" }}
        className="object-contain"
      />
      {choice && (
        <h2 className="text-text font-bold md:text-lg text-md">Atoll</h2>
      )}
    </div>
  );
};
