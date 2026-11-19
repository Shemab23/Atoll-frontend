"use client";

import {
  useState,
  type Dispatch,
  type SetStateAction,
  type SubmitEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { User, AtSign, Mail, Lock, Loader2 } from "lucide-react";
import { Logo } from "../ui/logo";
import { rules, validateForm, getPasswordStrength } from "@/lib/validation";
import { REGISTER_PAGE_DATA } from "@/data/pages/RegistrationData";
import { useFormTracking } from "@/hooks/useFormTrack";
import { FormField } from "../ui/formField";

const { rightSide } = REGISTER_PAGE_DATA;
const { card, errors: msg, footer } = rightSide;

type params = {
  fullName: string;
  setFullName: Dispatch<SetStateAction<string>>;
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  handleRegisterSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
};

export const Register = ({
  fullName,
  setFullName,
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  isLoading,
  handleRegisterSubmit,
}: params) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const { touch, markSubmitted, errorFor } = useFormTracking();

  // One schema: it drives the field errors AND the submit check.
  // It sits inside the component because `matches` needs the CURRENT password.
  const schema = {
    fullName: [rules.required(msg.fullName), rules.minLength(2, msg.fullName)],
    username: [rules.required(msg.required), rules.username(msg.username)],
    email: [rules.required(msg.required), rules.email(msg.email)],
    password: [
      rules.required(msg.required),
      rules.minLength(8, msg.passwordMin),
    ],
    confirmPassword: [
      rules.required(msg.required),
      rules.matches(() => password, msg.passwordMismatch),
    ],
  };

  const { errors, isValid } = validateForm(
    { fullName, username, email, password, confirmPassword },
    schema,
  );

  const onSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    markSubmitted();
    if (!isValid) return;
    handleRegisterSubmit(e);
  };

  return (
    <section className="relative flex h-full min-h-dvh w-full flex-col items-center justify-between overflow-y-auto sm:px-12 lg:min-h-0">
      <Image
        src={rightSide.background.path}
        alt={rightSide.background.alt}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="pointer-events-none z-0 object-cover"
      />
      <div className="pointer-events-none absolute inset-0 z-0 bg-bg/0" />

      {/* Top spacer on desktop */}
      <div className="hidden lg:block" />
      {/* <div className="" /> */}

      <div className="relative z-10 my-auto flex w-full max-w-md flex-col items-center gap-4 py-2">
        <div className="flex shrink-0 justify-center items-center lg:hidden ">
          <Logo size={42} choice={false} />
        </div>

        <h2 className="text-center text-3xl font-bold tracking-tight text-text sm:text-4xl">
          {rightSide.welcome}
        </h2>

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
                id="fullName"
                label={card.fullNameLabel}
                placeholder={card.fullNamePlaceholder}
                autoComplete="name"
                icon={User}
                value={fullName}
                onChange={setFullName}
                onBlur={() => touch("fullName")}
                error={errorFor("fullName", errors.fullName)}
              />

              <FormField
                id="username"
                label={card.usernameLabel}
                placeholder={card.usernamePlaceholder}
                hint={card.usernameHint}
                autoComplete="username"
                autoCapitalize="none"
                spellCheck={false}
                icon={AtSign}
                value={username}
                onChange={setUsername}
                onBlur={() => touch("username")}
                error={errorFor("username", errors.username)}
              />

              <FormField
                id="email"
                type="email"
                label={card.emailLabel}
                placeholder={card.emailPlaceholder}
                autoComplete="email"
                autoCapitalize="none"
                spellCheck={false}
                icon={Mail}
                value={email}
                onChange={setEmail}
                onBlur={() => touch("email")}
                error={errorFor("email", errors.email)}
              />

              <FormField
                id="password"
                type="password"
                label={card.passwordLabel}
                placeholder={card.passwordPlaceholder}
                hint={card.passwordHint}
                autoComplete="new-password"
                icon={Lock}
                value={password}
                onChange={setPassword}
                onBlur={() => touch("password")}
                error={errorFor("password", errors.password)}
                strength={getPasswordStrength(password)}
                revealed={showPassword}
                onToggleReveal={() => setShowPassword((p) => !p)}
              />

              {/* No onToggleReveal = no eye button, but it still follows `revealed` */}
              <FormField
                id="confirmPassword"
                type="password"
                label={card.confirmPasswordLabel}
                placeholder={card.confirmPasswordPlaceholder}
                autoComplete="new-password"
                icon={Lock}
                value={confirmPassword}
                onChange={setConfirmPassword}
                onBlur={() => touch("confirmPassword")}
                error={errorFor("confirmPassword", errors.confirmPassword)}
                revealed={showPassword}
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
                {isLoading ? card.loadingBtn : card.submitBtn}
              </button>
            </fieldset>
          </form>

          <div className="my-4 border-t border-root/30" />

          <p className="text-center text-xs text-text-muted">
            {card.alreadyHaveAccount}{" "}
            <Link
              href="/login"
              className="font-semibold text-text-link hover:underline"
            >
              {card.loginLink}
            </Link>
          </p>
        </div>
      </div>

      <footer className="relative z-10 shrink-0 pt-2 text-center text-sm text-black p-2">
        <p className="flex items-center justify-center gap-1">
          <footer.copyRight
            className="h-3.5 w-3.5 shrink-0"
            aria-hidden="true"
          />
          <span>
            {footer.date()} {footer.statement}
          </span>
        </p>
      </footer>
    </section>
  );
};
