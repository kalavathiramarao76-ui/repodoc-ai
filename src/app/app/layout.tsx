"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileCode2,
  BookOpen,
  Globe,
  Network,
  GitCommitHorizontal,
  ArrowRightLeft,
  Terminal,
  ArrowLeft,
  Star,
  Settings,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import ErrorBoundary from "@/components/ErrorBoundary";
import OnboardingTour from "@/components/OnboardingTour";
import { getFavoritesCount } from "@/components/FavoriteButton";
import { UserMenu } from "@/components/AuthGate";

const navItems = [
  { icon: FileCode2, label: "Documenter", href: "/app/document" },
  { icon: BookOpen, label: "README", href: "/app/readme" },
  { icon: Globe, label: "API Docs", href: "/app/api-docs" },
  { icon: Network, label: "Architecture", href: "/app/architecture" },
  { icon: GitCommitHorizontal, label: "Changelog", href: "/app/changelog" },
  { icon: ArrowRightLeft, label: "Migration", href: "/app/migration" },
  { icon: Settings, label: "Settings", href: "/app/settings" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [favCount, setFavCount] = useState(0);

  useEffect(() => {
    setFavCount(getFavoritesCount());
    const handler = () => setFavCount(getFavoritesCount());
    window.addEventListener("favorites-changed", handler);
    return () => window.removeEventListener("favorites-changed", handler);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <OnboardingTour />
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-[var(--color-border)] bg-[var(--color-sidebar)] flex flex-col">
        <div className="p-5 border-b border-[var(--color-border)]">
          <Link href="/" className="flex items-center gap-2 group">
            <ArrowLeft className="w-4 h-4 text-[var(--color-text-secondary)] group-hover:text-emerald-500 transition-colors" />
            <Terminal className="w-5 h-5 text-emerald-500" />
            <span className="font-mono font-bold text-[var(--color-text-primary)]">
              RepoDoc<span className="text-emerald-500">AI</span>
            </span>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-mono transition-all duration-200 ${
                  active
                    ? "bg-emerald-600/10 text-emerald-400 border border-emerald-800/40"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}

          {favCount > 0 && (
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-mono text-[var(--color-text-secondary)]">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>Favorites</span>
              <span className="ml-auto px-2 py-0.5 rounded-full text-[11px] font-mono bg-amber-400/10 text-amber-400 border border-amber-400/20">
                {favCount}
              </span>
            </div>
          )}
        </nav>
        <div className="p-4 border-t border-[var(--color-border)] space-y-2">
          <UserMenu />
          <ThemeToggle />
          <div className="text-xs font-mono text-[var(--color-text-tertiary)]">
            Powered by AI
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main role="main" className="flex-1 overflow-auto">
        <ErrorBoundary>{children}</ErrorBoundary>
      </main>
    </div>
  );
}
