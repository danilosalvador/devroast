import hljs from "highlight.js";

export const POPULAR_LANGUAGES = [
  { id: "javascript", name: "JavaScript" },
  { id: "typescript", name: "TypeScript" },
  { id: "python", name: "Python" },
  { id: "go", name: "Go" },
  { id: "rust", name: "Rust" },
  { id: "java", name: "Java" },
  { id: "csharp", name: "C#" },
  { id: "php", name: "PHP" },
  { id: "html", name: "HTML" },
  { id: "css", name: "CSS" },
  { id: "sql", name: "SQL" },
];

const LANGUAGE_IDS = POPULAR_LANGUAGES.map((l) => l.id);

export function detectLanguage(code: string): string {
  if (!code?.trim()) return "javascript";

  try {
    const result = hljs.highlightAuto(code, LANGUAGE_IDS);
    return result.language || "javascript";
  } catch {
    return "javascript";
  }
}
