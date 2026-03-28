"use client";

import { useState, useEffect, useCallback } from "react";
import { Sparkles, Code2, BookOpen } from "lucide-react";

const STORAGE_KEY = "repodoc-onboarding-done";

const steps = [
  {
    title: "Welcome to CodeScribe",
    description:
      "Your AI-powered documentation engine. Generate READMEs, API docs, architecture diagrams, changelogs, and migration guides from code.",
    icon: <Sparkles className="w-8 h-8" />,
  },
  {
    title: "Paste Your Code",
    description:
      "Copy any code snippet, file, or repository structure into the input panel. The more context you provide, the better the documentation.",
    icon: <Code2 className="w-8 h-8" />,
  },
  {
    title: "Generate Documentation",
    description:
      "Choose from 6 documentation tools: Documenter, README, API Docs, Architecture, Changelog, and Migration Guide. Export or favorite results.",
    icon: <BookOpen className="w-8 h-8" />,
  },
];

export default function OnboardingTour() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {}
  }, []);

  const finish = useCallback(() => {
    setConfetti(true);
    setTimeout(() => {
      setVisible(false);
      setConfetti(false);
      try {
        localStorage.setItem(STORAGE_KEY, "true");
      } catch {}
    }, 2000);
  }, []);

  const next = () => {
    if (step < steps.length - 1) {
      setStep((s) => s + 1);
    } else {
      finish();
    }
  };

  const skip = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  const current = steps[step];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={skip} />

      {confetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[10001]">
          {Array.from({ length: 60 }).map((_, i) => {
            const colors = ["#10b981", "#34d399", "#059669", "#fff", "#6ee7b7", "#047857"];
            const color = colors[i % colors.length];
            const left = Math.random() * 100;
            const delay = Math.random() * 0.5;
            const duration = 1.5 + Math.random() * 1.5;
            const size = 6 + Math.random() * 6;
            const rotation = Math.random() * 360;
            return (
              <div
                key={i}
                className="absolute"
                style={{
                  left: `${left}%`,
                  top: "-10px",
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: color,
                  borderRadius: Math.random() > 0.5 ? "50%" : "2px",
                  transform: `rotate(${rotation}deg)`,
                  animation: `confettiFall ${duration}s ease-in ${delay}s forwards`,
                }}
              />
            );
          })}
          <style>{`
            @keyframes confettiFall {
              0% { transform: translateY(0) rotate(0deg); opacity: 1; }
              100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
            }
          `}</style>
        </div>
      )}

      <div className="relative z-[10000] w-full max-w-md mx-4 rounded-2xl border border-zinc-800 bg-[#0d0d0d]/95 backdrop-blur-2xl shadow-2xl overflow-hidden">
        <div className="flex gap-1.5 px-8 pt-6">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full flex-1 transition-colors duration-300 ${
                i <= step ? "bg-emerald-500" : "bg-white/10"
              }`}
            />
          ))}
        </div>

        <div className="px-8 pt-8 pb-2 text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6">
            {current.icon}
          </div>
          <h2 className="text-2xl font-bold text-white mb-3 tracking-tight font-mono">
            {current.title}
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-sm mx-auto font-mono">
            {current.description}
          </p>
        </div>

        <div className="text-center py-4">
          <span className="text-xs font-mono text-zinc-600">
            {step + 1} / {steps.length}
          </span>
        </div>

        <div className="flex items-center justify-between px-8 pb-8">
          <button onClick={skip} className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors font-mono">
            Skip tour
          </button>
          <button
            onClick={next}
            className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors font-mono"
          >
            {step === steps.length - 1 ? "Get Started" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
