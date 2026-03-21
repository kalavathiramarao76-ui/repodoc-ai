"use client";

import { useState, useEffect, useCallback } from "react";
import { WifiOff, RotateCcw } from "lucide-react";

interface ApiErrorFallbackProps {
  error: string;
  onRetry: () => void;
}

export default function ApiErrorFallback({ error, onRetry }: ApiErrorFallbackProps) {
  const [countdown, setCountdown] = useState(10);

  const handleRetry = useCallback(() => {
    setCountdown(10);
    onRetry();
  }, [onRetry]);

  useEffect(() => {
    if (countdown <= 0) {
      handleRetry();
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, handleRetry]);

  return (
    <div className="min-h-[300px] flex items-center justify-center p-8">
      <div
        className="relative max-w-md w-full rounded-2xl border border-[var(--color-border)] p-8 text-center"
        style={{
          background: "rgba(var(--color-glass-rgb, 24,24,27), 0.6)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-5">
          <WifiOff className="w-7 h-7 text-amber-400" />
        </div>
        <h2 className="text-lg font-bold font-mono text-[var(--color-text-primary)] mb-2">
          Connection Error
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4 font-mono leading-relaxed">
          {error}
        </p>

        {/* Countdown ring */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="relative w-10 h-10">
            <svg className="w-10 h-10 -rotate-90" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="16" fill="none" stroke="var(--color-border)" strokeWidth="2.5" />
              <circle
                cx="20" cy="20" r="16" fill="none" stroke="#10b981" strokeWidth="2.5"
                strokeDasharray={`${(countdown / 10) * 100.5} 100.5`}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-linear"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold text-[var(--color-text-primary)]">
              {countdown}
            </span>
          </div>
          <span className="text-xs font-mono text-[var(--color-text-secondary)]">
            Retrying automatically...
          </span>
        </div>

        <button
          onClick={handleRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold font-mono text-sm transition-all duration-200"
        >
          <RotateCcw className="w-4 h-4" />
          Retry Now
        </button>
      </div>
    </div>
  );
}
