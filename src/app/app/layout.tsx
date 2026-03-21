"use client";

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
} from "lucide-react";

const navItems = [
  { icon: FileCode2, label: "Documenter", href: "/app/document" },
  { icon: BookOpen, label: "README", href: "/app/readme" },
  { icon: Globe, label: "API Docs", href: "/app/api-docs" },
  { icon: Network, label: "Architecture", href: "/app/architecture" },
  { icon: GitCommitHorizontal, label: "Changelog", href: "/app/changelog" },
  { icon: ArrowRightLeft, label: "Migration", href: "/app/migration" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-zinc-800/60 bg-zinc-950/80 flex flex-col">
        <div className="p-5 border-b border-zinc-800/60">
          <Link href="/" className="flex items-center gap-2 group">
            <ArrowLeft className="w-4 h-4 text-zinc-600 group-hover:text-emerald-500 transition-colors" />
            <Terminal className="w-5 h-5 text-emerald-500" />
            <span className="font-mono font-bold text-zinc-100">
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
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/60"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-zinc-800/60">
          <div className="text-xs font-mono text-zinc-700">
            Powered by AI
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
