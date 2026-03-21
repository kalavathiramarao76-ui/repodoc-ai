"use client";

import { ArrowRightLeft } from "lucide-react";
import DocTool from "@/components/DocTool";

export default function MigrationPage() {
  return (
    <DocTool
      title="Migration Guide"
      description="Paste old and new code to generate step-by-step migration instructions."
      icon={ArrowRightLeft}
      placeholder={`// Paste your OLD code here...\n\n// Old: Express.js with callbacks\nconst express = require('express');\nconst app = express();\n\napp.get('/users', function(req, res) {\n  db.query('SELECT * FROM users', function(err, results) {\n    if (err) return res.status(500).send(err);\n    res.json(results);\n  });\n});\n\nmodule.exports = app;`}
      secondaryLabel="new code"
      secondaryPlaceholder={`// Paste your NEW code here...\n\n// New: Fastify with async/await\nimport Fastify from 'fastify';\nconst app = Fastify();\n\napp.get('/users', async (request, reply) => {\n  const results = await db.query('SELECT * FROM users');\n  return results;\n});\n\nexport default app;`}
      mode="migration"
      hasSecondInput={true}
    />
  );
}
