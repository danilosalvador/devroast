import { Card, CardHeader, CardTitle, CardDescription } from "./ui/Card";
import { CodeBlock } from "./ui/CodeBlock";
import { DiffLine } from "./ui/DiffLine";
import { clsx } from "clsx";

// Mock data for the results
const MOCK_RESULTS = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  score: 3.5,
  verdict: "needs_serious_help",
  quote: "this code looks like it was written during a power outage... in 2005.",
  language: "javascript",
  lineCount: 16,
  submittedCode: `function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    total = total + items[i].price;
  }

  if (total > 100) {
    console.log("discount applied");
    total = total * 0.9;
  }

  // TODO: handle tax calculation
  // TODO: handle currency conversion

  return total;
}`,
  analysis: [
    {
      type: "critical" as const,
      title: "using var instead of const/let",
      description: "var is function-scoped and leads to hoisting bugs. use const by default, let when reassignment is needed."
    },
    {
      type: "warning" as const,
      title: "imperative loop pattern",
      description: "for loops are verbose and error-prone. use .reduce() or .map() for cleaner, functional transformations."
    },
    {
      type: "good" as const,
      title: "clear naming conventions",
      description: "calculateTotal and items are descriptive, self-documenting names that communicate intent without comments."
    },
    {
      type: "good" as const,
      title: "single responsibility",
      description: "the function does one thing well — calculates a total. no side effects, no mixed concerns, no hidden complexity."
    }
  ],
  suggestedFix: [
    { type: "context", content: "function calculateTotal(items) {" },
    { type: "removed", content: "  var total = 0;" },
    { type: "removed", content: "  for (var i = 0; i < items.length; i++) {" },
    { type: "removed", content: "    total = total + items[i].price;" },
    { type: "removed", content: "  }" },
    { type: "removed", content: "  return total;" },
    { type: "added", content: "  return items.reduce((sum, item) => sum + item.price, 0);" },
    { type: "context", content: "}" },
  ]
};

function ScoreRing({ score }: { score: number }) {
  const radius = 75;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 10) * circumference;

  return (
    <div className="relative flex h-[180px] w-[180px] items-center justify-center">
      <svg className="h-full w-full -rotate-90">
        <circle
          cx="90"
          cy="90"
          r={radius}
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx="90"
          cy="90"
          r={radius}
          stroke="#10B981"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          fill="none"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-bold font-primary text-[48px] text-text-primary">
          {score.toFixed(1)}
        </span>
        <span className="font-primary text-[14px] text-text-tertiary">/ 10</span>
      </div>
    </div>
  );
}

export function ResultsPage({ id }: { id?: string }) {
  // In a real app, we'd fetch data using the ID
  const data = MOCK_RESULTS;

  return (
    <main className="mx-auto flex w-full max-w-[940px] flex-col gap-10 px-8 py-10">
      {/* Score Hero */}
      <section className="flex items-center gap-16">
        <ScoreRing score={data.score} />
        
        <div className="flex flex-1 flex-col gap-5">
          <div className="flex items-center gap-2 font-primary text-[12px]">
            <span className="h-2 w-2 rounded-full bg-accent-red" />
            <span className="text-accent-red uppercase tracking-widest font-bold">
              verdict: {data.verdict.replace(/_/g, " ")}
            </span>
          </div>
          
          <h1 className="font-primary text-[28px] text-text-primary leading-tight italic">
            "{data.quote}"
          </h1>

          <div className="flex items-center gap-4 font-secondary text-[13px] text-text-tertiary">
            <span>lang: {data.language}</span>
            <span className="text-[10px] opacity-30 px-1">|</span>
            <span>{data.lineCount} lines</span>
          </div>

          <button className="h-9 w-fit bg-bg-input border border-border-primary px-6 font-primary text-[12px] text-text-secondary transition-all hover:bg-bg-elevated hover:text-text-primary active:scale-95">
            $ share_roast
          </button>
        </div>
      </section>

      <div className="h-px w-full bg-border-primary/50" />

      {/* Your Submission Section */}
      <section className="flex flex-col gap-6">
        <h2 className="font-bold font-primary text-accent-green text-sm flex items-center gap-2">
          <span>{">"}</span> your_submission
        </h2>
        <CodeBlock.Root code={data.submittedCode} className="h-[430px]">
          <CodeBlock.Content>
            <CodeBlock.Gutter />
            <CodeBlock.Editor readOnly value={data.submittedCode} />
          </CodeBlock.Content>
        </CodeBlock.Root>
      </section>

      <div className="h-px w-full bg-border-primary/50" />

      {/* Detailed Analysis Section */}
      <section className="flex flex-col gap-8">
        <h2 className="font-bold font-primary text-accent-green text-sm flex items-center gap-2">
          <span>{">"}</span> detailed_analysis
        </h2>
        <div className="grid grid-cols-2 gap-5">
          {data.analysis.map((item, idx) => (
            <Card key={idx} className="bg-bg-input/40 border-border-primary/60 transition-all hover:border-border-primary hover:bg-bg-input group cursor-default">
              <CardHeader className="flex-row">
                <div 
                  className={clsx(
                    "h-2 w-2 rounded-full",
                    item.type === "critical" && "bg-accent-red",
                    item.type === "warning" && "bg-accent-amber",
                    item.type === "good" && "bg-accent-green"
                  )}
                />
                <span className={clsx(
                  "font-primary text-[10px] font-bold uppercase tracking-[0.15em]",
                  item.type === "critical" && "text-accent-red",
                  item.type === "warning" && "text-accent-amber",
                  item.type === "good" && "text-accent-green"
                )}>
                  {item.type}
                </span>
                <CardTitle className="ml-auto text-[13px] text-text-primary/80 group-hover:text-text-primary transition-colors">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardDescription className="pt-1">
                {item.description}
              </CardDescription>
            </Card>
          ))}
        </div>
      </section>

      <div className="h-px w-full bg-border-primary/50" />

      {/* Suggested Fix Section */}
      <section className="flex flex-col gap-6 pb-20">
        <h2 className="font-bold font-primary text-accent-green text-sm flex items-center gap-2">
          <span>{">"}</span> suggested_fix
        </h2>
        
        <div className="overflow-hidden border border-border-primary bg-bg-input">
          <div className="flex h-10 items-center justify-between border-border-primary border-b bg-bg-surface px-6">
             <div className="flex items-center gap-4">
                <span className="font-primary text-[10px] text-text-tertiary tracking-widest uppercase">
                  your_code.js <span className="lowercase text-[12px] px-1 opacity-50">vs</span> improved_code.js
                </span>
             </div>
             <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
                <span className="font-primary text-[10px] text-text-tertiary italic">optimized</span>
             </div>
          </div>
          
          <div className="flex flex-col py-4">
            {data.suggestedFix.map((line, idx) => (
              <DiffLine.Root key={idx} type={line.type as any}>
                <DiffLine.Number>{idx + 1}</DiffLine.Number>
                <DiffLine.Indicator />
                <DiffLine.Content>{line.content}</DiffLine.Content>
              </DiffLine.Root>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
