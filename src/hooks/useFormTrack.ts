"use client";

import { useState } from "react";

// Touch/submit tracking lives here, in the parent, not inside the field.
export const useFormTracking = () => {
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  return {
    touch: (key: string) => setTouched((t) => ({ ...t, [key]: true })),
    markSubmitted: () => setSubmitted(true),
    errorFor: (key: string, error: string) =>
      touched[key] || submitted ? error : "",
  };
};
