"use client";

import type { Dispatch, SetStateAction, SubmitEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { User, Lock, Loader2 } from "lucide-react";
import { Logo } from "../ui/logo";
import { rules, validateForm } from "@/lib/validation";
import { SIGN_IN_DATA } from "@/data/pages/LoginData";
import { useFormTracking } from "@/hooks/useFormTrack";
import { FormField } from "../ui/formField";

const { background, welcome, card, errors: msg, footer: foot } = SIGN_IN_DATA;

// The schema needs no component state, so it lives outside and is created once.
const schema = {
  identifier: [rules.required(msg.identifier)],
  password: [rules.required(msg.password)],
};

type params = {
  identifier: string;
  setIdentifier: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  handleSubmit: (e: SubmitEvent<HTMLFormElement>) => Promise<void>;
};

export const SignIn = ({
  identifier,
  setIdentifier,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  isLoading,
  handleSubmit,
}: params) => {
  const { touch, markSubmitted, errorFor } = useFormTracking();

  const { errors, isValid } = validateForm({ identifier, password }, schema);

  const onSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    markSubmitted();
    if (!isValid) return;
    handleSubmit(e);
  };

  return (
    <section className="relative flex h-full min-h-dvh w-full flex-col items-center justify-between overflow-y-auto px-6 py-4 sm:px-12 sm:py-6 lg:min-h-0">
      <Image
        src={background.path}
        alt={background.alt}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="pointer-events-none z-0 object-cover"
      />
      <div className="pointer-events-none absolute inset-0 z-0 bg-bg/30" />

      {/* Top spacer on desktop */}
      <div className="hidden lg:block" />

      {/* CORRECTION: max-w-sm -> max-w-md so login and register cards are the same width */}
      <div className="relative z-10 my-auto flex w-full max-w-md flex-col items-center gap-4 py-2">
        <div className="flex w-full shrink-0 justify-center lg:hidden">
          <Logo size={42} choice={false} />
        </div>

        <h2 className="text-center text-3xl font-bold tracking-tight text-text sm:text-4xl">
          {welcome}
        </h2>

        {/* CORRECTION: the card title was a second <h2> right after the welcome <h2>.
            It is a sub-heading, so <h3> (same as Register). Sizes now match Register too. */}
        <div className="w-full rounded-3xl border-2 border-root/60 bg-bg-card/40 px-5 py-6 shadow-xl backdrop-blur-md sm:px-7">
          <h3 className="flex justify-center pb-1 text-2xl font-bold tracking-tight text-text-brand underline">
            {card.title}
          </h3>
          <p className="text-center text-xs text-text/75">{card.subtitle}</p>

          <form onSubmit={onSubmit} noValidate className="mt-5">
            <fieldset
              disabled={isLoading}
              className="m-0 min-w-0 space-y-3.5 border-0 p-0"
            >
              <FormField
                id="identifier"
                label={card.identifierLabel}
                placeholder={card.identifierPlaceholder}
                autoComplete="username"
                autoCapitalize="none"
                spellCheck={false}
                icon={User}
                value={identifier}
                onChange={setIdentifier}
                onBlur={() => touch("identifier")}
                error={errorFor("identifier", errors.identifier)}
              />

              <FormField
                id="password"
                type="password"
                label={card.passwordLabel}
                placeholder={card.passwordPlaceholder}
                autoComplete="current-password"
                icon={Lock}
                value={password}
                onChange={setPassword}
                onBlur={() => touch("password")}
                error={errorFor("password", errors.password)}
                revealed={showPassword}
                onToggleReveal={() => setShowPassword((p) => !p)}
              />

              <button
                type="submit"
                disabled={isLoading}
                aria-busy={isLoading}
                className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-root shadow-sm transition hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading && (
                  <Loader2
                    className="h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                {isLoading ? card.loadingBtn : card.logBtn}
              </button>
            </fieldset>
          </form>

          <div className="mt-3.5 text-center">
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-text-muted hover:text-text-link hover:underline"
            >
              {card.forgotPassword}
            </Link>
          </div>

          {/* CORRECTION: border-stone-200/70 ignored your theme tokens (same fix as Register) */}
          <div className="my-5 border-t border-root/30" />

          <Link
            href="/register"
            className="flex w-full items-center justify-center rounded-full border border-root bg-transparent py-2.5 text-sm font-semibold text-text-link transition hover:bg-brand/25"
          >
            {card.createAccount}
          </Link>
        </div>
      </div>

      <footer className="relative z-10 shrink-0 pt-2 text-center text-xs text-text-muted">
        <p className="flex items-center justify-center gap-1">
          <foot.copyRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>
            {foot.date()} {foot.statement}
          </span>
        </p>
      </footer>
    </section>
  );
};
