import { CodeBlock } from "./ui/CodeBlock";

const ROAST_ENTRIES = [
  {
    rank: 1,
    score: 1.2,
    language: "javascript",
    lines: 3,
    code: `eval(prompt("enter code"))\ndocument.write(response)\n// trust the user Lol`,
  },
  {
    rank: 2,
    score: 1.8,
    language: "typescript",
    lines: 5,
    code: `if (x == true) { return true; }\nelse if (x == false) { return false; }\nelse { return !false; }`,
  },
  {
    rank: 3,
    score: 2.1,
    language: "sql",
    lines: 2,
    code: `SELECT * FROM users WHERE 1=1\n-- TODO: add authentication`,
  },
  {
    rank: 4,
    score: 2.3,
    language: "java",
    lines: 3,
    code: `catch (e) {\n  // ignore\n}`,
  },
  {
    rank: 5,
    score: 2.6,
    language: "javascript",
    lines: 3,
    code: `const sleep = (ms) => {\n  const end = Date.now() + ms;\n  while(Date.now() < end) {}\n}`,
  },
];

export function LeaderboardPage() {
  return (
    <main className="mx-auto flex w-full max-w-[940px] flex-col gap-10 px-8 py-10">
      <section className="flex flex-col gap-4">
        <h1 className="flex items-center gap-4 font-bold font-primary text-[32px] text-text-primary">
          <span className="text-accent-green">{">"}</span>
          shame_leaderboard
        </h1>
        <p className="font-secondary text-[14px] text-text-secondary">
          // the most roasted code on the internet
        </p>
        <div className="flex items-center gap-8 font-primary text-[12px] text-text-tertiary">
          <span>2,847 submissions</span>
          <span>•</span>
          <span>avg score: 4.2/10</span>
        </div>
      </section>

      <div className="flex flex-col gap-6">
        {ROAST_ENTRIES.map((entry) => (
          <div key={entry.rank} className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-4 font-primary text-[13px]">
              <div className="flex items-center gap-4">
                <span className="font-bold text-accent-amber"># {entry.rank}</span>
                <span className="text-text-secondary">
                  score:{" "}
                  <span className="font-bold text-accent-red">
                    {entry.score.toFixed(1)}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-4 text-text-tertiary">
                <span>{entry.language}</span>
                <span>{entry.lines} lines</span>
              </div>
            </div>

            <CodeBlock.Root code={entry.code} className="min-h-[100px]">
              <CodeBlock.Content>
                <CodeBlock.Gutter />
                <CodeBlock.Editor readOnly value={entry.code} />
              </CodeBlock.Content>
            </CodeBlock.Root>
          </div>
        ))}
      </div>
    </main>
  );
}
