import { REGISTER_PAGE_DATA } from "@/data/pages/RegistrationData";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { Logo } from "../ui/logo";

type params = {
  currentSlide: number;
  setCurrentSlide: Dispatch<SetStateAction<number>>;
};

export const LeftSideRegister = ({ currentSlide, setCurrentSlide }: params) => {
  const activeSlide = REGISTER_PAGE_DATA.leftSide.slides[currentSlide];
  return (
    <section className="relative hidden flex-col justify-between overflow-y-auto bg-bg-brand/60 px-8 py-6 lg:flex xl:px-12">
      {/* top */}
      <div className="space-y-1">
        <Logo size={42} choice={true} />
        <h1 className="text-2xl font-bold tracking-tight text-text xl:text-3xl">
          {REGISTER_PAGE_DATA.leftSide.title}
        </h1>
        <p className="max-w-md text-md text-text-muted">
          {REGISTER_PAGE_DATA.leftSide.slogan}
        </p>
      </div>

      {/* Middle: 3-Image Slider with Hook Overlay */}
      <div className="my-2 flex w-full flex-col items-center">
        {/* 3-Card Stage */}
        <div className="relative flex h-80 w-full items-center justify-center overflow-hidden">
          {REGISTER_PAGE_DATA.leftSide.slides.map((slide, index) => {
            const total = REGISTER_PAGE_DATA.leftSide.slides.length;
            // Calculate relative position: 0 = Center, 1 = Right, 2 = Left
            const position = (index - currentSlide + total) % total;

            let positionClasses = "";
            if (position === 0) {
              // Center active card: full size, sharp, front
              positionClasses =
                "z-20 translate-x-0 scale-100 opacity-100 blur-none shadow-xl";
            } else if (position === 1) {
              // Right card: shifted right, smaller, blurred
              positionClasses =
                "z-10 translate-x-28 sm:translate-x-36 scale-75 opacity-60 blur-[2px] hover:opacity-80";
            } else {
              // Left card: shifted left, smaller, blurred
              positionClasses =
                "z-10 -translate-x-28 sm:-translate-x-36 scale-75 opacity-60 blur-[2px] hover:opacity-80";
            }

            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => setCurrentSlide(index)}
                aria-label={`View ${slide.badge}`}
                className={`absolute aspect-[4/3] h-48 cursor-pointer overflow-hidden rounded-2xl border border-root/40 bg-bg transition-all duration-500 ease-out ${positionClasses}`}
              >
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={position === 0}
                  sizes="300px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>

        {/* Separate Hook Text & Controls Below (Never Overlays the Image) */}
        <div className="mt-1 flex min-h-[4.5rem] max-w-md flex-col items-center text-center">
          <span className="rounded-full px-3 text-md font-semibold text-text ">
            {activeSlide.badge}
          </span>

          <p
            key={activeSlide.id}
            className="mt-1 text-xs font-medium leading-relaxed text-text/60 transition-opacity duration-500 sm:text-sm"
          >
            {activeSlide.hook}
          </p>
        </div>
      </div>
      <p className="text-text text-md">What to expect</p>
      {/* Bottom: 4 Core Features Grid */}
      <div className="flex flex-row gap-2 justify-evenly">
        {REGISTER_PAGE_DATA.leftSide.features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div key={feature.id} className="flex flex-col items-center">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-bg-card/75 text-primary">
                <Icon className="h-6 w-6 text-brand" />
              </div>
              <h3 className="text-sm font-bold text-text">{feature.label}</h3>
            </div>
          );
        })}
      </div>
    </section>
  );
};
