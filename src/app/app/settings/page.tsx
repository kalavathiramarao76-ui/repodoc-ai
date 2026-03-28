"use client";

import { useState, useEffect } from "react";
import { Settings, Trash2 } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const models = [
  { id: "", label: "Default (auto)" },
  { id: "gpt-4o", label: "GPT-4o" },
  { id: "gpt-4o-mini", label: "GPT-4o Mini (fast)" },
  { id: "gpt-3.5-turbo", label: "GPT-3.5 Turbo (budget)" },
];

const STORAGE_KEYS = {
  endpoint: "repodoc-api-endpoint",
  model: "repodoc-model",
};

export default function SettingsPage() {
  const [endpoint, setEndpoint] = useState("");
  const [model, setModel] = useState("");
  const [saved, setSaved] = useState(false);
  const [cleared, setCleared] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      setEndpoint(localStorage.getItem(STORAGE_KEYS.endpoint) || "");
      setModel(localStorage.getItem(STORAGE_KEYS.model) || "");
    } catch {}
  }, []);

  const save = () => {
    try {
      localStorage.setItem(STORAGE_KEYS.endpoint, endpoint);
      localStorage.setItem(STORAGE_KEYS.model, model);
    } catch {}
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const clearData = () => {
    if (!confirm("Clear all CodeScribe local data? This includes favorites and settings. This cannot be undone.")) return;
    try {
      const keys = Object.keys(localStorage).filter((k) => k.startsWith("repodoc"));
      keys.forEach((k) => localStorage.removeItem(k));
    } catch {}
    setEndpoint("");
    setModel("");
    setCleared(true);
    setTimeout(() => {
      setCleared(false);
      window.location.reload();
    }, 1500);
  };

  if (!mounted) return null;

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <Settings className="w-6 h-6 text-emerald-500" />
        <h1 className="text-2xl font-bold text-zinc-100 font-mono">Settings</h1>
      </div>
      <p className="text-zinc-500 text-sm font-mono mb-10">
        Configure your CodeScribe workspace.
      </p>

      <div className="space-y-8">
        {/* Theme */}
        <section className="rounded-xl border border-[var(--color-border)] p-6" style={{ background: "rgba(var(--color-glass-rgb, 24,24,27), 0.5)" }}>
          <h2 className="text-base font-semibold text-zinc-200 font-mono mb-1">Appearance</h2>
          <p className="text-xs text-zinc-500 font-mono mb-4">Switch between dark, light, and system themes.</p>
          <ThemeToggle />
        </section>

        {/* API Endpoint */}
        <section className="rounded-xl border border-[var(--color-border)] p-6" style={{ background: "rgba(var(--color-glass-rgb, 24,24,27), 0.5)" }}>
          <h2 className="text-base font-semibold text-zinc-200 font-mono mb-1">API Endpoint</h2>
          <p className="text-xs text-zinc-500 font-mono mb-4">Custom OpenAI-compatible endpoint URL. Leave blank for default.</p>
          <input
            type="url"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            placeholder="https://api.openai.com/v1"
            className="code-textarea w-full rounded-xl px-4 py-3 text-sm"
          />
        </section>

        {/* Model */}
        <section className="rounded-xl border border-[var(--color-border)] p-6" style={{ background: "rgba(var(--color-glass-rgb, 24,24,27), 0.5)" }}>
          <h2 className="text-base font-semibold text-zinc-200 font-mono mb-1">AI Model</h2>
          <p className="text-xs text-zinc-500 font-mono mb-4">Choose the model for documentation generation.</p>
          <div className="space-y-2">
            {models.map((m) => (
              <label
                key={m.id}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all font-mono text-sm ${
                  model === m.id
                    ? "border-emerald-600/40 bg-emerald-600/5"
                    : "border-[var(--color-border)] bg-transparent hover:border-zinc-700"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                    model === m.id ? "border-emerald-500 bg-emerald-500" : "border-zinc-700"
                  }`}
                >
                  {model === m.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <span className="text-[var(--color-text-primary)]">{m.label}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Save */}
        <button
          onClick={save}
          className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold font-mono transition-colors"
        >
          {saved ? "Saved!" : "Save Settings"}
        </button>

        {/* Danger Zone */}
        <section className="rounded-xl border border-red-500/10 bg-red-500/[0.02] p-6">
          <h2 className="text-base font-semibold text-red-400 font-mono mb-1">Danger Zone</h2>
          <p className="text-xs text-zinc-500 font-mono mb-4">
            Clear all locally stored data including favorites, onboarding, and settings.
          </p>
          <button
            onClick={clearData}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 text-sm font-medium font-mono hover:bg-red-500/10 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            {cleared ? "Cleared!" : "Clear All Data"}
          </button>
        </section>
      </div>
    </div>
  );
}
