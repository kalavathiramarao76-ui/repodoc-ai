const SYSTEM_PROMPTS: Record<string, string> = {
  document: `You are an expert code documenter. Given source code, add comprehensive JSDoc/docstring comments to every function, class, method, and significant block. Include:
- @param with types and descriptions
- @returns with type and description
- @throws if applicable
- @example with usage examples
- Brief description of what each function does
Return the fully documented code. Preserve the original code exactly, only adding documentation comments.`,

  readme: `You are an expert README generator. Given a repo structure and code files, generate a complete, professional README.md with:
- Project title and badges
- Description/overview
- Features list
- Tech stack
- Installation instructions
- Usage examples
- API documentation (if applicable)
- Project structure
- Contributing guidelines
- License section
Use proper markdown formatting with headers, code blocks, tables, and lists.`,

  "api-docs": `You are an expert API documentation writer. Given API route handlers and endpoints, generate comprehensive OpenAPI/Swagger-style documentation with:
- Endpoint path and HTTP method
- Description of what each endpoint does
- Request parameters (query, path, body) with types
- Request body schema with examples
- Response schemas with status codes
- Authentication requirements
- Example requests and responses (curl)
Format as clean, readable markdown documentation.`,

  architecture: `You are an expert software architect. Given a file tree and key source files, explain the project architecture:
- High-level overview and purpose
- Architecture pattern (MVC, microservices, clean architecture, etc.)
- Directory structure explanation
- Data flow description
- Key components and their responsibilities
- Dependencies and integrations
- Design patterns used
- Scalability considerations
Provide a clear, well-structured explanation suitable for onboarding new developers.`,

  changelog: `You are an expert changelog writer. Given git diff output or commit messages, generate a clean, formatted changelog following Keep a Changelog format:
- Group changes by type: Added, Changed, Deprecated, Removed, Fixed, Security
- Write clear, concise descriptions
- Include version headers if applicable
- Use proper markdown formatting
- Focus on user-facing changes
- Link to relevant issues/PRs if mentioned
Generate a professional, readable changelog.`,

  migration: `You are an expert migration guide writer. Given old code and new code, generate a comprehensive step-by-step migration guide:
- Overview of what changed and why
- Prerequisites
- Step-by-step migration instructions
- Code transformation examples (before/after)
- Breaking changes highlighted
- Deprecation notices
- Rollback instructions
- Testing checklist
- Common pitfalls and solutions
Format as clear, actionable markdown documentation.`,
};

export async function POST(request: Request) {
  const { mode, input, secondInput } = await request.json();

  const systemPrompt = SYSTEM_PROMPTS[mode] || SYSTEM_PROMPTS.document;

  let userMessage = input;
  if (mode === "migration" && secondInput) {
    userMessage = `OLD CODE:\n${input}\n\nNEW CODE:\n${secondInput}`;
  }

  const response = await fetch("https://sai.sharedllm.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-oss:120b",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      stream: true,
      max_tokens: 4096,
      temperature: 0.3,
    }),
  });

  if (!response.ok) {
    return Response.json(
      { error: "Failed to generate documentation" },
      { status: 500 }
    );
  }

  const reader = response.body?.getReader();
  if (!reader) {
    return Response.json({ error: "No response body" }, { status: 500 });
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const text = decoder.decode(value, { stream: true });
          const lines = text.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6).trim();
              if (data === "[DONE]") continue;

              try {
                const json = JSON.parse(data);
                const content = json.choices?.[0]?.delta?.content;
                if (content) {
                  controller.enqueue(encoder.encode(content));
                }
              } catch {
                // skip malformed chunks
              }
            }
          }
        }
      } catch {
        // stream ended
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
      "Cache-Control": "no-cache",
    },
  });
}
