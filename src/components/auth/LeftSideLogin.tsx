import { AUTH_IMAGES, LOGIN_PAGE_CONTENT } from "@/data/pages/LoginData";
import React, { Dispatch, SetStateAction } from "react";
import { Logo } from "../ui/logo";
import { ImageCard } from "../ui/imageCard1";
import Image from "next/image";
import { Flag } from "lucide-react";

type params = {
  setIsReportOpen: Dispatch<SetStateAction<boolean>>;
};

export const LeftSideLogin = ({ setIsReportOpen }: params) => {
  return (
    <section className="relative hidden h-full flex-col justify-between overflow-hidden border-r border-bg/12 bg-bg/30 px-10 py-7 lg:flex xl:px-14 xl:py-8">
      <Logo size={35} choice={true} />
      {/* top */}
      <div className="relative z-20 max-w-md shrink-0">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-text xl:text-4xl">
          {LOGIN_PAGE_CONTENT.hero.titlePrefix}{" "}
          <span className="text-primary">
            {LOGIN_PAGE_CONTENT.hero.titleHighlight}
          </span>
        </h1>
        <p className="mt-2 text-md leading-relaxed text-text/80">
          {LOGIN_PAGE_CONTENT.hero.description}
        </p>
      </div>

      {/* middle */}
      <div className="relative mx-auto my-2 flex w-full max-w-115 flex-1 items-center justify-center">
        <div className="relative w-full">
          <ImageCard {...AUTH_IMAGES.place} />
          <ImageCard {...AUTH_IMAGES.interest} />
          <ImageCard {...AUTH_IMAGES.shop} />
          <ImageCard {...AUTH_IMAGES.cautch} />
        </div>
      </div>

      {/* Bottom */}
      <div className="relative flex w-full items-center justify-between pt-2">
        {/* Left: Mock Telecom Partner Logos */}
        <div className="flex items-center -space-x-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Image
              key={index}
              src={LOGIN_PAGE_CONTENT.footerBar.partnerMockImage}
              alt={`${LOGIN_PAGE_CONTENT.footerBar.partnerAltPrefix} ${index + 1}`}
              width={LOGIN_PAGE_CONTENT.footerBar.sizeMain}
              height={LOGIN_PAGE_CONTENT.footerBar.sizeMain}
              unoptimized
              className={`h-${LOGIN_PAGE_CONTENT.footerBar.sizeClass} w-${LOGIN_PAGE_CONTENT.footerBar.sizeClass}  rounded-full border-2 border-bg-inverse object-cover`}
            />
          ))}
        </div>

        {/* Middle: Active Users Counter */}
        <p className="text-xs font-medium text-text-muted">
          <span className="font-bold text-text text-sm">
            {LOGIN_PAGE_CONTENT.footerBar.userCount}
          </span>{" "}
          {LOGIN_PAGE_CONTENT.footerBar.userLabel}
        </p>

        {/* Right: Report / Feedback Trigger */}
        <div className="flex flex-col items-center">
          <button
            type="button"
            onClick={() => setIsReportOpen(true)}
            title={LOGIN_PAGE_CONTENT.footerBar.reportTooltip}
            className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-card/80 text-text-muted transition hover:border-primary hover:text-primary"
          >
            <Flag className="h-6 w-6" />
          </button>
          <p className="text-text-muted/70 text-xs">
            {LOGIN_PAGE_CONTENT.footerBar.reportTriggerLabel}
          </p>
        </div>
      </div>
    </section>
  );
};
