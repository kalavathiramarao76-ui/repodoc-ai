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
  Terminal,
} from "lucide-react";

const features = [
  {
    icon: FileCode2,
    title: "Code Documenter",
    desc: "JSDoc & docstring comments for every function",
    href: "/app/document",
  },
  {
    icon: BookOpen,
    title: "README Generator",
    desc: "Complete README.md from repo structure",
    href: "/app/readme",
  },
  {
    icon: Globe,
    title: "API Doc Writer",
    desc: "OpenAPI/Swagger-style documentation",
    href: "/app/api-docs",
  },
  {
    icon: Network,
    title: "Architecture Explainer",
    desc: "Explain your codebase architecture",
    href: "/app/architecture",
  },
  {
    icon: GitCommitHorizontal,
    title: "Changelog Generator",
    desc: "Clean changelogs from git diffs",
    href: "/app/changelog",
  },
  {
    icon: ArrowRightLeft,
    title: "Migration Guide",
    desc: "Step-by-step migration instructions",
    href: "/app/migration",
  },
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505]" />
      </div>

      {/* Glow orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/5 blur-[120px] z-0" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20">
        {/* Terminal badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-950/80 text-sm font-mono text-zinc-400">
            <Terminal className="w-4 h-4 text-emerald-500" />
            <span>repodoc-ai</span>
            <span className="text-emerald-400">v1.0</span>
            <span className="w-2 h-4 bg-emerald-500 cursor-blink" />
          </div>
        </motion.div>

        {/* Hero */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-6xl sm:text-7xl lg:text-8xl font-bold text-center tracking-tight leading-none"
        >
          <span className="text-zinc-100">Code speaks.</span>
          <br />
          <span className="text-gradient">Let it document itself.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-lg sm:text-xl text-zinc-500 text-center max-w-2xl mx-auto font-mono"
        >
          Paste your code. Get production-ready documentation in seconds.
          <br />
          JSDoc, README, API docs, architecture, changelogs, migration guides.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center mt-12"
        >
          <Link
            href="/app"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-lg transition-all duration-200 glow-emerald"
          >
            Start Documenting
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Feature grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {features.map((f, i) => (
            <Link key={f.href} href={f.href}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + i * 0.08 }}
                className="group relative p-6 rounded-xl border border-zinc-800/60 bg-zinc-950/50 hover:border-emerald-800/50 hover:bg-zinc-900/40 transition-all duration-300 cursor-pointer"
              >
                <f.icon className="w-8 h-8 text-emerald-500 mb-4 group-hover:text-emerald-400 transition-colors" />
                <h3 className="text-lg font-semibold text-zinc-100 mb-1 font-mono">
                  {f.title}
                </h3>
                <p className="text-sm text-zinc-500">{f.desc}</p>
                <ArrowRight className="absolute top-6 right-6 w-4 h-4 text-zinc-700 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Footer */}
        <div className="mt-20 text-center text-zinc-700 text-sm font-mono">
          Built with AI. Ship docs faster.
        </div>
      </div>
    </div>
  );
}
