"use client";

import { GitCommitHorizontal } from "lucide-react";
import DocTool from "@/components/DocTool";

export default function ChangelogPage() {
  return (
    <DocTool
      title="Changelog Generator"
      description="Paste git diff or commit messages to generate a clean, formatted changelog."
      icon={GitCommitHorizontal}
      placeholder={`# Paste git diff or commit messages here...\n\ncommit a1b2c3d\nAuthor: dev@example.com\nDate: 2024-03-20\n\n  feat: add user authentication with JWT\n  - Added login/register endpoints\n  - JWT token generation and validation\n  - Password hashing with bcrypt\n\ncommit e4f5g6h\nAuthor: dev@example.com\nDate: 2024-03-19\n\n  fix: resolve race condition in data fetching\n  - Added mutex lock for concurrent requests\n  - Fixed memory leak in connection pool\n\ncommit i7j8k9l\nAuthor: dev@example.com\nDate: 2024-03-18\n\n  refactor: migrate from CommonJS to ESM\n  - Updated all imports/exports\n  - Updated package.json type field`}
      mode="changelog"
    />
  );
}
