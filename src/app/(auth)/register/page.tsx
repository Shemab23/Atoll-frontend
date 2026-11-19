"use client";

import { useState, useEffect, SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSession } from "@/context/Session/SessionContext";
import { REGISTER_PAGE_DATA } from "@/data/pages/RegistrationData";
import { LeftSideRegister } from "@/components/auth/LeftSideRegister";
import { Register } from "@/components/feature/Register";
import type { AuthResult } from "@/lib/Session";

export default function RegisterPage() {
  const router = useRouter();
  const { createSession, isAuthenticated, isCheckingSession } = useSession();

  // Slider state
  const [currentSlide, setCurrentSlide] = useState(0);

  // Registration form states
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Redirect to /home if already logged in
  useEffect(() => {
    if (!isCheckingSession && isAuthenticated) {
      router.replace("/home");
    }
  }, [isCheckingSession, isAuthenticated, router]);

  // Auto-advance the 3-image slider every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === REGISTER_PAGE_DATA.leftSide.slides.length - 1 ? 0 : prev + 1,
      );
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  // Prevent flashing registration page while checking session
  if (isCheckingSession || isAuthenticated) {
    return null;
  }

  const handleRegisterSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO(TanStack): replace this timeout with
      //   const result = await registerMutation.mutateAsync({ fullName, username, email, password });
      const result = await new Promise<AuthResult>((resolve) =>
        setTimeout(
          () =>
            resolve({
              token: "tok_reg_999",
              expiresIn: 60 * 60,
              user: { id: "usr_new_01", username, fullName },
            }),
          1200,
        ),
      );

      createSession(result);
      toast.success(REGISTER_PAGE_DATA.toasts.success);
      router.replace("/home");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : REGISTER_PAGE_DATA.toasts.error,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen w-full grid-cols-1 overflow-x-hidden text-text lg:h-screen lg:grid-cols-2 lg:overflow-hidden">
      {/* leftSide */}
      <LeftSideRegister
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
      />
      {/* right side */}
      <Register
        fullName={fullName}
        setFullName={setFullName}
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        isLoading={isLoading}
        handleRegisterSubmit={handleRegisterSubmit}
      />
    </main>
  );
}
