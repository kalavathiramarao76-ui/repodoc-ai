"use client";

import { Network } from "lucide-react";
import DocTool from "@/components/DocTool";

export default function ArchitecturePage() {
  return (
    <DocTool
      title="Architecture Explainer"
      description="Paste your file tree and key files to get an architecture explanation."
      icon={Network}
      placeholder={`# Paste your file tree + key files here...\n\n├── src/\n│   ├── app/\n│   │   ├── layout.tsx\n│   │   ├── page.tsx\n│   │   └── api/\n│   │       └── route.ts\n│   ├── components/\n│   │   ├── ui/\n│   │   └── features/\n│   ├── lib/\n│   │   ├── db.ts\n│   │   ├── auth.ts\n│   │   └── utils.ts\n│   ├── hooks/\n│   └── types/\n├── prisma/\n│   └── schema.prisma\n├── public/\n└── next.config.js\n\n// Include key file contents for better analysis`}
      mode="architecture"
    />
  );
}
