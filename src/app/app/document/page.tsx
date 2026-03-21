"use client";

import { FileCode2 } from "lucide-react";
import DocTool from "@/components/DocTool";

export default function DocumentPage() {
  return (
    <DocTool
      title="Code Documenter"
      description="Paste your code and get JSDoc/docstring comments for every function, class, and method."
      icon={FileCode2}
      placeholder={`// Paste your code here...\n\nfunction calculateTax(income, rate) {\n  const taxable = income - 12000;\n  if (taxable <= 0) return 0;\n  return taxable * rate;\n}\n\nclass UserService {\n  constructor(db) {\n    this.db = db;\n  }\n\n  async findById(id) {\n    return this.db.users.findOne({ _id: id });\n  }\n}`}
      mode="document"
    />
  );
}
