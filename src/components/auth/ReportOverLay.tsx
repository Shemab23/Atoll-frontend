import { LOGIN_PAGE_CONTENT, reportMotivesType } from "@/data/pages/LoginData";
import { Loader2, X } from "lucide-react";
import React, { Dispatch, SetStateAction, SubmitEvent } from "react";
type params = {
  setIsReportOpen: Dispatch<SetStateAction<boolean>>;
  setMotive: Dispatch<SetStateAction<reportMotivesType>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setMessage: Dispatch<SetStateAction<string>>;
  motive: reportMotivesType;
  email: string;
  message: string;
  isSubmitting: boolean;
  handleReportSubmit: (e: SubmitEvent<HTMLFormElement>) => Promise<void>;
};
export const ReportOverLay = ({
  setIsReportOpen,
  handleReportSubmit,
  setMotive,
  motive,
  setEmail,
  email,
  setMessage,
  message,
  isSubmitting,
}: params) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurry Outside Backdrop (Click to close) */}
      <div
        onClick={() => setIsReportOpen(false)}
        className="fixed inset-0 bg-root-inverse/40 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-bg-card p-6 shadow-xl">
        {/* Header & Close Button */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-text pb-4">
            {LOGIN_PAGE_CONTENT.reportModal.title}
          </h2>
          <button
            type="button"
            onClick={() => setIsReportOpen(false)}
            className="rounded-lg p-1 text-text-muted transition hover:bg-bg-muted hover:text-text"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="mt-1 text-xs text-text-muted">
          {LOGIN_PAGE_CONTENT.reportModal.subtitle}
        </p>

        <form onSubmit={handleReportSubmit} className="mt-4 space-y-4">
          {/* Motive Selector */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-text">
              {LOGIN_PAGE_CONTENT.reportModal.motiveLabel}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {LOGIN_PAGE_CONTENT.reportModal.motives.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setMotive(item.id as typeof motive)}
                  className={`rounded-md border px-2.5 py-2 text-xs font-medium transition ${
                    motive === item.id
                      ? "border-primary bg-primary-muted text-primary"
                      : "border-border bg-bg text-text-muted hover:text-text"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Optional Manual Email */}
          <div>
            <label
              htmlFor="report-email"
              className="mb-1 block text-xs font-medium text-text"
            >
              {LOGIN_PAGE_CONTENT.reportModal.emailLabel}{" "}
              {motive !== "issue" ? (
                <span className="text-text-muted">
                  {LOGIN_PAGE_CONTENT.reportModal.emailOptionalHint}
                </span>
              ) : (
                ""
              )}
            </label>
            <input
              id="report-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={LOGIN_PAGE_CONTENT.reportModal.emailPlaceholder}
              className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text placeholder:text-text-muted/60 focus:border-primary focus:outline-none"
            />
          </div>

          {/* Message Box */}
          <div>
            <label
              htmlFor="report-message"
              className="mb-1 block text-xs font-medium text-text"
            >
              {LOGIN_PAGE_CONTENT.reportModal.messageLabel}
            </label>
            <textarea
              id="report-message"
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={LOGIN_PAGE_CONTENT.reportModal.messagePlaceholder}
              className="w-full resize-none rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text placeholder:text-text-muted/60 focus:border-primary focus:outline-none"
            />
          </div>

          {/* Submit Button with Submitting Mode */}
          <button
            type="submit"
            disabled={isSubmitting || !message.trim()}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {LOGIN_PAGE_CONTENT.reportModal.submitLoading}
              </>
            ) : (
              LOGIN_PAGE_CONTENT.reportModal.submitIdle
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
