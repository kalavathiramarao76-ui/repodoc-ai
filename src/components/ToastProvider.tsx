"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";

type ToastVariant = "success" | "error" | "info";

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  addToast: (toast: Omit<Toast, "id">) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

const DISMISS_MS = 4000;
const MAX_TOASTS = 3;

function ToastCard({
  toast,
  onDismiss,
  index,
}: {
  toast: Toast;
  onDismiss: (id: string) => void;
  index: number;
}) {
  const [exiting, setExiting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setExiting(true);
      setTimeout(() => onDismiss(toast.id), 300);
    }, DISMISS_MS);
    return () => clearTimeout(timerRef.current);
  }, [toast.id, onDismiss]);

  const variantStyles: Record<ToastVariant, string> = {
    success: "border-emerald-500/20 bg-emerald-500/5 text-emerald-300",
    error: "border-red-500/20 bg-red-500/5 text-red-300",
    info: "border-emerald-500/20 bg-emerald-500/5 text-emerald-300",
  };

  const icons: Record<ToastVariant, string> = {
    success: "\u2713",
    error: "\u2715",
    info: "i",
  };

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`
        pointer-events-auto w-80 rounded-xl border px-4 py-3 shadow-2xl
        backdrop-blur-xl bg-[#0a0a0a]/80
        transition-all duration-300 ease-out
        ${variantStyles[toast.variant]}
        ${exiting ? "opacity-0 translate-x-8" : "opacity-100 translate-x-0"}
      `}
      style={{
        animationDelay: `${index * 60}ms`,
        animation: "toast-slide-in 0.3s ease-out forwards",
      }}
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold">
          {icons[toast.variant]}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-[var(--color-text-primary)]">{toast.title}</p>
          {toast.description && (
            <p className="mt-0.5 text-xs opacity-70">{toast.description}</p>
          )}
        </div>
        <button
          onClick={() => {
            setExiting(true);
            setTimeout(() => onDismiss(toast.id), 300);
          }}
          aria-label="Dismiss notification"
          className="shrink-0 text-white/40 hover:text-white/80 transition-colors text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 rounded"
        >
          &#x2715;
        </button>
      </div>
    </div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((t: Omit<Toast, "id">) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setToasts((prev) => {
      const next = [{ ...t, id }, ...prev];
      return next.slice(0, MAX_TOASTS);
    });
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div
        aria-label="Notifications"
        className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none"
      >
        {toasts.map((toast, i) => (
          <ToastCard key={toast.id} toast={toast} onDismiss={dismiss} index={i} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
