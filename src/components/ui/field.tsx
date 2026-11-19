import React, { ReactNode } from "react";

export const Field = ({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) => (
  <div>
    <label
      htmlFor={id}
      className="mb-1 block pl-1 text-xs font-medium text-text/80"
    >
      {label}
    </label>
    {children}
    {error ? (
      <p
        id={`${id}-error`}
        role="alert"
        className="mt-1 pl-1 text-xs text-red-500"
      >
        {error}
      </p>
    ) : hint ? (
      <p id={`${id}-hint`} className="mt-1 pl-1 text-[11px] text-text-muted">
        {hint}
      </p>
    ) : null}
  </div>
);
