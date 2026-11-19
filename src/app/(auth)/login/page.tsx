"use client";

import { useState, useEffect, SubmitEvent } from "react";
import { toast } from "sonner";
import { LOGIN_PAGE_CONTENT, reportMotivesType } from "@/data/pages/LoginData";
import { LeftSideLogin } from "@/components/auth/LeftSideLogin";
import { ReportOverLay } from "@/components/auth/ReportOverLay";
import { SignIn } from "@/components/feature/Signin";
import { useRouter } from "next/navigation";
import { useSession } from "@/context/Session/SessionContext";
import type { AuthResult } from "@/lib/Session";

export default function LoginPage() {
  const router = useRouter();
  const { createSession, isAuthenticated, isCheckingSession } = useSession();

  const [isReportOpen, setIsReportOpen] = useState(false);
  const [motive, setMotive] = useState<reportMotivesType>("issue");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Immediately redirect to /home if a valid session exists
  useEffect(() => {
    if (!isCheckingSession && isAuthenticated) {
      router.replace("/home");
    }
  }, [isCheckingSession, isAuthenticated, router]);

  // Prevent rendering the login UI while checking session or redirecting
  if (isCheckingSession || isAuthenticated) {
    return null;
  }

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO(TanStack): replace this timeout with
      //   const result = await loginMutation.mutateAsync({ identifier, password });
      // (with useMutation you can also drop the local isLoading and use loginMutation.isPending)
      const result = await new Promise<AuthResult>((resolve) =>
        setTimeout(
          () =>
            resolve({
              token: "abc_xyz",
              expiresIn: 60 * 60, // 1 hour; use 90 here to test the warning quickly
              user: {
                id: "usr_123",
                username: "keza_rw",
                fullName: "Keza Aline",
              },
            }),
          1000,
        ),
      );

      createSession(result); // one call: stores token, user and expiry
      toast.success("Welcome back to Atoll!");
      router.replace("/home");
    } catch (error) {
      // CORRECTION: any failure (network, server down) used to say "Invalid credentials".
      // Show the server's message when there is one, and `${error}` printed "Error: ..." raw.
      toast.error(
        error instanceof Error
          ? error.message
          : "Invalid credentials. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReportSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));

      toast.success(LOGIN_PAGE_CONTENT.toasts.reportSuccess);
      setMessage("");
      setEmail("");
      setIsReportOpen(false);
    } catch (error) {
      toast.error(`${LOGIN_PAGE_CONTENT.toasts.reportError}:${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="grid min-h-screen w-full grid-cols-1 overflow-x-hidden text-stone-900 lg:h-screen lg:grid-cols-2 lg:overflow-hidden">
      {/* Left side */}
      <LeftSideLogin setIsReportOpen={setIsReportOpen} />

      {/* Right side */}
      <SignIn
        setIdentifier={setIdentifier}
        identifier={identifier}
        handleSubmit={handleSubmit}
        setPassword={setPassword}
        password={password}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        isLoading={isLoading}
      />

      {/* Overlay report form */}
      {isReportOpen && (
        <ReportOverLay
          setIsReportOpen={setIsReportOpen}
          handleReportSubmit={handleReportSubmit}
          setMotive={setMotive}
          motive={motive}
          setEmail={setEmail}
          email={email}
          setMessage={setMessage}
          message={message}
          isSubmitting={isSubmitting}
        />
      )}
    </main>
  );
}
