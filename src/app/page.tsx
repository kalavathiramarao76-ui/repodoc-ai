"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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

/* ─── Letter Reveal ─── */
function LetterReveal({ text, className = "", delay = 0 }: {
  text: string; className?: string; delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setVisible(true); return; }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className="inline-block transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(18px)",
            transitionDelay: visible ? `${delay + i * 32}ms` : "0ms",
          }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

/* ─── Scroll Counter ─── */
function ScrollCounter({ end, suffix = "", duration = 900 }: {
  end: number; suffix?: string; duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setValue(end); return; }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        obs.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setValue(Math.round(eased * end));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{value.toLocaleString()}{suffix}</span>;
}

/* ─── Code Typing Animation ─── */
function CodeTyping({ code, className = "" }: { code: string; className?: string }) {
  const ref = useRef<HTMLPreElement>(null);
  const [charCount, setCharCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCharCount(code.length);
      return;
    }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStarted(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [code.length]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setCharCount(i);
      if (i >= code.length) clearInterval(interval);
    }, 24);
    return () => clearInterval(interval);
  }, [started, code.length]);

  return (
    <pre ref={ref} className={className}>
      <code className="text-emerald-400 font-mono text-sm">
        {code.slice(0, charCount)}
        {charCount < code.length && <span className="cursor-blink inline-block w-2 h-4 bg-emerald-500 ml-0.5 align-middle" />}
      </code>
    </pre>
  );
}

/* ─── Fade In Observer ─── */
function useFadeIn() {
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      refs.current.forEach(el => { if (el) { el.style.opacity = "1"; el.style.transform = "none"; } });
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.opacity = "1";
          (e.target as HTMLElement).style.transform = "translateY(0)";
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    refs.current.forEach(el => { if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const addRef = (el: HTMLElement | null) => {
    if (el && !refs.current.includes(el)) refs.current.push(el);
  };
  return addRef;
}

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

const typingCode = `/**
 * @param {string} code
 * @returns {DocOutput}
 */
function document(code) {
  return ai.generate(code);
}`;

export default function LandingPage() {
  const addRef = useFadeIn();

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
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-950/80 text-sm font-mono text-zinc-400">
            <Terminal className="w-4 h-4 text-emerald-500" />
            <span>repodoc-ai</span>
            <span className="text-emerald-400">v1.0</span>
            <span className="w-2 h-4 bg-emerald-500 cursor-blink" />
          </div>
        </div>

        {/* Hero */}
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-center tracking-tight leading-none">
          <span className="text-zinc-100"><LetterReveal text="Code speaks." /></span>
          <br />
          <span className="text-gradient"><LetterReveal text="Let it document itself." delay={380} /></span>
        </h1>

        {/* Code typing animation */}
        <div className="max-w-md mx-auto mt-10 rounded-xl border border-zinc-800 bg-zinc-950/80 p-4 overflow-hidden">
          <div className="flex items-center gap-1.5 mb-3">
            <span className="w-3 h-3 rounded-full bg-zinc-800" />
            <span className="w-3 h-3 rounded-full bg-zinc-800" />
            <span className="w-3 h-3 rounded-full bg-zinc-800" />
            <span className="ml-2 text-xs text-zinc-600 font-mono">document.js</span>
          </div>
          <CodeTyping code={typingCode} />
        </div>

        <p className="mt-8 text-lg sm:text-xl text-zinc-500 text-center max-w-2xl mx-auto font-mono">
          Paste your code. Get production-ready documentation in seconds.
          <br />
          JSDoc, README, API docs, architecture, changelogs, migration guides.
        </p>

        {/* Stats */}
        <div className="flex items-center justify-center gap-12 mt-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-zinc-100 font-mono"><ScrollCounter end={6} /></div>
            <div className="text-xs text-zinc-600">Doc Tools</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-zinc-100 font-mono">&lt;<ScrollCounter end={10} suffix="s" /></div>
            <div className="text-xs text-zinc-600">Generation</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-zinc-100 font-mono"><ScrollCounter end={15} suffix="+" /></div>
            <div className="text-xs text-zinc-600">Languages</div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-12">
          <Link
            href="/app"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-lg transition-all duration-200 glow-emerald"
          >
            Start Documenting
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Feature grid */}
        <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <Link key={f.href} href={f.href}>
              <div
                ref={addRef}
                className="group relative p-6 rounded-xl border border-zinc-800/60 bg-zinc-950/50 hover:border-emerald-800/50 hover:bg-zinc-900/40 transition-all duration-700 cursor-pointer"
                style={{
                  opacity: 0,
                  transform: "translateY(24px)",
                  transitionDelay: `${i * 80}ms`,
                  willChange: "transform, opacity",
                }}
              >
                <f.icon className="w-8 h-8 text-emerald-500 mb-4 group-hover:text-emerald-400 transition-colors" />
                <h3 className="text-lg font-semibold text-zinc-100 mb-1 font-mono">
                  {f.title}
                </h3>
                <p className="text-sm text-zinc-500">{f.desc}</p>
                <ArrowRight className="absolute top-6 right-6 w-4 h-4 text-zinc-700 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-20 text-center text-zinc-700 text-sm font-mono">
          Built with AI. Ship docs faster.
        </div>
      </div>
    </div>
  );
}
