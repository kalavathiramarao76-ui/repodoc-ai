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
    desc: "Paste code, get JSDoc/docstring comments for every function, class, and method.",
    href: "/app/document",
    color: "from-emerald-500/20 to-emerald-900/5",
  },
  {
    icon: BookOpen,
    title: "README Generator",
    desc: "Paste your repo structure and key files to generate a complete README.md.",
    href: "/app/readme",
    color: "from-emerald-500/15 to-emerald-900/5",
  },
  {
    icon: Globe,
    title: "API Doc Writer",
    desc: "Paste API routes and handlers to generate OpenAPI/Swagger documentation.",
    href: "/app/api-docs",
    color: "from-emerald-500/10 to-emerald-900/5",
  },
  {
    icon: Network,
    title: "Architecture Explainer",
    desc: "Paste file tree and key files to get an architecture explanation.",
    href: "/app/architecture",
    color: "from-emerald-400/15 to-emerald-900/5",
  },
  {
    icon: GitCommitHorizontal,
    title: "Changelog Generator",
    desc: "Paste git diff or commit messages to generate a clean changelog.",
    href: "/app/changelog",
    color: "from-emerald-400/10 to-emerald-900/5",
  },
  {
    icon: ArrowRightLeft,
    title: "Migration Guide",
    desc: "Paste old and new code to generate step-by-step migration instructions.",
    href: "/app/migration",
    color: "from-emerald-300/10 to-emerald-900/5",
  },
];

export default function AppDashboard() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-zinc-100 font-mono mb-2">
          Documentation Tools
        </h1>
        <p className="text-zinc-500 font-mono text-sm mb-10">
          Select a tool to generate documentation from your code.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((tool, i) => (
          <motion.div
            key={tool.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <Link href={tool.href}>
              <div
                className={`group relative p-6 rounded-xl border border-zinc-800/60 bg-gradient-to-br ${tool.color} hover:border-emerald-800/50 transition-all duration-300 cursor-pointer`}
              >
                <div className="flex items-start justify-between">
                  <tool.icon className="w-10 h-10 text-emerald-500 mb-4 group-hover:text-emerald-400 transition-colors" />
                  <ArrowRight className="w-5 h-5 text-zinc-700 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-100 mb-2 font-mono">
                  {tool.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  {tool.desc}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
