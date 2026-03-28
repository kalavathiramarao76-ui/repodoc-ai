"use client";

import { useState, useRef, useEffect } from "react";
import { Download, Copy, FileText, Printer, Check } from "lucide-react";

interface ExportMenuProps {
  content: string;
  title?: string;
}

export default function ExportMenu({ content, title = "CodeScribe Report" }: ExportMenuProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const copyMarkdown = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setOpen(false);
    }, 1500);
  };

  const downloadTxt = () => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/\s+/g, "-").toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setOpen(false);
  };

  const printPdf = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
  <title>${title}</title>
  <style>
    @media print {
      @page { margin: 1in; }
    }
    body {
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
      font-size: 13px;
      line-height: 1.7;
      color: #18181b;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }
    .report-header {
      text-align: center;
      border-bottom: 2px solid #10b981;
      padding-bottom: 1rem;
      margin-bottom: 2rem;
    }
    .report-header h1 {
      font-size: 1.5rem;
      color: #10b981;
      margin: 0 0 0.25rem;
    }
    .report-header p {
      font-size: 0.75rem;
      color: #71717a;
      margin: 0;
    }
    pre { white-space: pre-wrap; word-wrap: break-word; }
  </style>
</head>
<body>
  <div class="report-header">
    <h1>${title}</h1>
    <p>Generated on ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
  </div>
  <pre>${content.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>
</body>
</html>`);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
    };
    setOpen(false);
  };

  if (!content) return null;

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-1.5 rounded-lg transition-all duration-200 hover:bg-emerald-500/10 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
        title="Export result"
      >
        <Download className="w-4 h-4 text-[var(--color-text-secondary)] hover:text-emerald-400 transition-colors" />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-[var(--color-border)] py-1.5 z-50 shadow-xl"
          style={{
            background: "rgba(var(--color-glass-rgb, 24,24,27), 0.9)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        >
          <button
            onClick={copyMarkdown}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-mono text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy Markdown"}
          </button>
          <button
            onClick={downloadTxt}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-mono text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] transition-colors"
          >
            <FileText className="w-4 h-4" />
            Download .txt
          </button>
          <button
            onClick={printPdf}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-mono text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] transition-colors"
          >
            <Printer className="w-4 h-4" />
            Print PDF
          </button>
        </div>
      )}
    </div>
  );
}
