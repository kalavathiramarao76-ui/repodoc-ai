"use client";

import { Globe } from "lucide-react";
import DocTool from "@/components/DocTool";

export default function ApiDocsPage() {
  return (
    <DocTool
      title="API Doc Writer"
      description="Paste your API routes and handlers to generate OpenAPI/Swagger-style documentation."
      icon={Globe}
      placeholder={`// Paste your API routes here...\n\nrouter.get('/api/users', async (req, res) => {\n  const { page = 1, limit = 20 } = req.query;\n  const users = await User.find()\n    .skip((page - 1) * limit)\n    .limit(limit);\n  res.json({ users, total: await User.countDocuments() });\n});\n\nrouter.post('/api/users', auth, async (req, res) => {\n  const { name, email, role } = req.body;\n  const user = await User.create({ name, email, role });\n  res.status(201).json(user);\n});\n\nrouter.delete('/api/users/:id', auth, admin, async (req, res) => {\n  await User.findByIdAndDelete(req.params.id);\n  res.status(204).send();\n});`}
      mode="api-docs"
    />
  );
}
