import type { ComponentPropsWithoutRef } from "react";
import { Eye, EyeOff, type LucideIcon } from "lucide-react"; // replaces the react-icons imports

// CORRECTION: the old version had useState, rules, check, trackTouched and submitted inside
// the field. That made it a form manager, not a field. Those props are gone: the parent
// decides WHEN an error exists and just passes the final `error` string down.

type FormFieldProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "onChange" | "value" | "id"
> & {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void; // pass a setter directly: onChange={setEmail}

  icon?: LucideIcon; // optional left icon, e.g. icon={FiMail}
  error?: string; // empty/undefined = no error
  hint?: string;

  // Password helpers, all optional. The parent owns the state, the field only renders it.
  revealed?: boolean; // current show/hide state
  onToggleReveal?: () => void; // if given, the eye button appears
  strength?: { level: number; label: string }; // if given, the strength meter appears
};

const strengthColor = [
  "",
  "bg-red-500",
  "bg-orange-400",
  "bg-yellow-400",
  "bg-green-500",
];

export const FormField = ({
  id,
  label,
  value,
  onChange,
  type = "text",
  icon: Icon,
  error,
  hint,
  revealed = false,
  onToggleReveal,
  strength,
  disabled,
  className,
  ...inputProps
}: FormFieldProps) => {
  const isPassword = type === "password";
  const hasToggle = isPassword && !!onToggleReveal;
  const showMeter = isPassword && !!strength && strength.level > 0;

  const describedBy =
    [
      error ? `${id}-error` : hint ? `${id}-hint` : "",
      showMeter ? `${id}-strength` : "",
    ]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1 block pl-1 text-xs font-medium text-text/80"
      >
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-text-muted">
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
        )}

        <input
          {...inputProps}
          id={id}
          type={isPassword && revealed ? "text" : type}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={`w-full rounded-2xl border bg-bg-card/80 py-2.5 text-sm text-text placeholder-text-muted transition focus:outline-none focus:ring-2 disabled:opacity-60 ${
            Icon ? "pl-10" : "pl-4"
          } ${hasToggle ? "pr-12" : "pr-4"} ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
              : "border-root focus:border-primary focus:ring-primary/30"
          } ${className ?? ""}`}
        />

        {hasToggle && (
          <button
            type="button"
            onClick={onToggleReveal}
            disabled={disabled}
            aria-label={revealed ? "Hide password" : "Show password"}
            aria-pressed={revealed}
            className="absolute inset-y-0 right-0 flex cursor-pointer items-center rounded-r-2xl px-4 text-text hover:text-text/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            {/* the eye button content */}
            {revealed ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      {showMeter && (
        <div id={`${id}-strength`} className="mt-2 pl-1" aria-live="polite">
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((bar) => (
              <span
                key={bar}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  bar <= strength!.level
                    ? strengthColor[strength!.level]
                    : "bg-text/15"
                }`}
              />
            ))}
          </div>
          <p className="mt-1 text-[11px] text-text-muted">
            Strength:{" "}
            <span className="font-medium text-text">{strength!.label}</span>
          </p>
        </div>
      )}

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
};
