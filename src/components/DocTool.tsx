"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Loader2, Sparkles, RotateCcw } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import FavoriteButton from "@/components/FavoriteButton";
import ExportMenu from "@/components/ExportMenu";

interface DocToolProps {
  title: string;
  description: string;
  icon: LucideIcon;
  placeholder: string;
  secondaryPlaceholder?: string;
  secondaryLabel?: string;
  mode: string;
  hasSecondInput?: boolean;
}

export default function DocTool({
  title,
  description,
  icon: Icon,
  placeholder,
  secondaryPlaceholder,
  secondaryLabel,
  mode,
  hasSecondInput = false,
}: DocToolProps) {
  const [input, setInput] = useState("");
  const [secondInput, setSecondInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setOutput("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          input: input.trim(),
          secondInput: hasSecondInput ? secondInput.trim() : undefined,
        }),
      });

      if (!res.ok) throw new Error("Generation failed");

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let result = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          result += chunk;
          setOutput(result);
          if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
          }
        }
      }
    } catch {
      setOutput("Error generating documentation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setInput("");
    setSecondInput("");
    setOutput("");
  };

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto h-full flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-2">
          <Icon className="w-6 h-6 text-emerald-500" />
          <h1 className="text-2xl font-bold text-zinc-100 font-mono">
            {title}
          </h1>
        </div>
        <p className="text-zinc-500 text-sm font-mono">{description}</p>
      </motion.div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">
        {/* Input Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col min-h-0"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
              <span className="ml-2 text-xs text-zinc-600 font-mono">
                input
              </span>
            </div>
            <button
              onClick={handleReset}
              className="text-xs text-zinc-600 hover:text-zinc-400 font-mono flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Clear
            </button>
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className={`code-textarea flex-1 rounded-xl p-4 w-full ${
              hasSecondInput ? "min-h-[180px]" : "min-h-[300px]"
            }`}
          />

          {hasSecondInput && (
            <>
              <div className="flex items-center gap-2 mt-3 mb-2">
                <span className="text-xs text-zinc-600 font-mono">
                  {secondaryLabel || "secondary input"}
                </span>
              </div>
              <textarea
                value={secondInput}
                onChange={(e) => setSecondInput(e.target.value)}
                placeholder={secondaryPlaceholder}
                className="code-textarea flex-1 rounded-xl p-4 w-full min-h-[180px]"
              />
            </>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading || !input.trim()}
            className="mt-3 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-semibold font-mono text-sm flex items-center justify-center gap-2 transition-all duration-200 glow-emerald disabled:shadow-none"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Documentation
              </>
            )}
          </button>
        </motion.div>

        {/* Output Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col min-h-0"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
              <span className="ml-1 text-xs text-zinc-600 font-mono">
                output
              </span>
            </div>
            {output && (
              <div className="flex items-center gap-1">
                <FavoriteButton
                  itemId={`repodoc-${mode}`}
                  itemLabel={title}
                  size="sm"
                />
                <ExportMenu content={output} title={`${title} — RepoDoc AI Report`} />
                <button
                  onClick={handleCopy}
                  className="text-xs text-zinc-600 hover:text-emerald-400 font-mono flex items-center gap-1 transition-colors ml-1"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          <div
            ref={outputRef}
            className="flex-1 rounded-xl border border-zinc-800 bg-[#0d0d0d] p-5 overflow-auto min-h-[300px] lg:min-h-0"
          >
            {output ? (
              <pre className="whitespace-pre-wrap text-sm font-mono text-zinc-300 leading-relaxed doc-output">
                {output}
              </pre>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <Icon className="w-12 h-12 text-zinc-800 mx-auto mb-3" />
                  <p className="text-zinc-700 font-mono text-sm">
                    Output will appear here
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
