"use client";

import { BookOpen } from "lucide-react";
import DocTool from "@/components/DocTool";

export default function ReadmePage() {
  return (
    <DocTool
      title="README Generator"
      description="Paste your repo structure and key code files to generate a complete README.md."
      icon={BookOpen}
      placeholder={`# Paste your repo structure + key files here...\n\nProject: my-api\n\n├── src/\n│   ├── index.ts\n│   ├── routes/\n│   │   ├── auth.ts\n│   │   └── users.ts\n│   ├── middleware/\n│   │   └── auth.ts\n│   └── models/\n│       └── user.ts\n├── package.json\n├── tsconfig.json\n└── Dockerfile\n\n// src/index.ts\nimport express from 'express';\nconst app = express();\napp.listen(3000);`}
      mode="readme"
    />
  );
}
