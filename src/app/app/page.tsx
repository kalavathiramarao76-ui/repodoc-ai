"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileCode2,
  BookOpen,
  Globe,
  Network,
  GitCommitHorizontal,
  ArrowRightLeft,
  ArrowRight,
} from "lucide-react";

const tools = [
  {
    icon: FileCode2,
    title: "Code Documenter",
    tag: "generate()",
    desc: "Paste code, get JSDoc/docstring comments for every function, class, and method.",
    href: "/app/document",
  },
  {
    icon: BookOpen,
    title: "README Generator",
    tag: "compose()",
    desc: "Paste your repo structure and key files to generate a complete README.md.",
    href: "/app/readme",
  },
  {
    icon: Globe,
    title: "API Doc Writer",
    tag: "document()",
    desc: "Paste API routes and handlers to generate OpenAPI/Swagger documentation.",
    href: "/app/api-docs",
  },
  {
    icon: Network,
    title: "Architecture Explainer",
    tag: "analyze()",
    desc: "Paste file tree and key files to get an architecture explanation.",
    href: "/app/architecture",
  },
  {
    icon: GitCommitHorizontal,
    title: "Changelog Generator",
    tag: "diff()",
    desc: "Paste git diff or commit messages to generate a clean changelog.",
    href: "/app/changelog",
  },
  {
    icon: ArrowRightLeft,
    title: "Migration Guide",
    tag: "migrate()",
    desc: "Paste old and new code to generate step-by-step migration instructions.",
    href: "/app/migration",
  },
];

export default function AppDashboard() {
  return (
    <div className="p-10 md:p-16 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mb-16"
      >
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-4xl font-bold text-zinc-100 tracking-tight">
            Doc Studio
          </h1>
          <span className="px-3 py-1 text-[10px] font-semibold font-mono tracking-[0.2em] uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
            Workspace
          </span>
        </div>
        <p className="text-zinc-500 text-base max-w-md leading-relaxed">
          Select a tool to generate documentation from your code.
        </p>
      </motion.div>

      {/* Tool rows */}
      <div className="space-y-3">
        {tools.map((tool, i) => (
          <motion.div
            key={tool.href}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.1 + i * 0.06,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <Link href={tool.href}>
              <div className="group relative flex items-center gap-6 px-6 py-5 rounded-2xl border border-zinc-800/50 bg-zinc-900/30 hover:bg-zinc-900/60 hover:border-emerald-800/40 transition-all duration-300 cursor-pointer">
                {/* Row number */}
                <span className="text-[11px] font-mono text-zinc-700 tabular-nums w-5 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-emerald-500/8 border border-emerald-500/10 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/12 group-hover:border-emerald-500/20 transition-all duration-300">
                  <tool.icon className="w-[18px] h-[18px] text-emerald-500 group-hover:text-emerald-400 transition-colors" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-[15px] font-semibold text-zinc-200 group-hover:text-zinc-100 transition-colors">
                      {tool.title}
                    </h3>
                    <span className="text-[11px] font-mono text-emerald-600 bg-emerald-500/6 px-2 py-0.5 rounded-md border border-emerald-500/10">
                      {tool.tag}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed truncate">
                    {tool.desc}
                  </p>
                </div>

                {/* Arrow */}
                <ArrowRight className="w-4 h-4 text-zinc-700 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all duration-300 shrink-0" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
