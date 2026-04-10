import { useState } from "react";
import { Button } from "./ui/Button";
import { CodeBlock } from "./ui/CodeBlock";
import { Toggle } from "./ui/Toggle";

const SAMPLE_CODE = `function calculateTotal(items) {
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
}`;

const LEADERBOARD_DATA = [
  {
    rank: 1,
    score: "1.2",
    code: [
      'eval(prompt("enter code"))',
      "document.write(response)",
      "// trust the user lol",
    ],
    lang: "javascript",
    isFirst: true,
  },
  {
    rank: 2,
    score: "1.8",
    code: [
      "if (x == true) { return true; }",
      "else if (x == false) { return false; }",
      "else { return !false; }",
    ],
    lang: "typescript",
    isFirst: false,
  },
  {
    rank: 3,
    score: "2.1",
    code: ["SELECT * FROM users WHERE 1=1", "-- TODO: add authentication"],
    lang: "sql",
    isFirst: false,
  },
];

export function HomePage() {
  const [roastMode, setRoastMode] = useState(true);
  const [code, setCode] = useState(SAMPLE_CODE);

  return (
    <main className="flex w-full flex-1 flex-col items-center gap-8 px-10 pt-20 pb-0">
      {/* Hero Title */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-3">
          <span className="font-bold font-primary text-4xl text-accent-green">
            $
          </span>
          <h1 className="font-bold font-primary text-4xl text-text-primary">
            paste your code. get roasted.
          </h1>
        </div>
        <p className="font-secondary text-sm text-text-secondary">
          {
            "// drop your code below and we'll rate it — brutally honest or full roast mode"
          }
        </p>
      </div>

      {/* Code Editor */}
      <div className="w-full max-w-[780px]">
        <CodeBlock.Root className="h-[360px]" code={code}>
          <CodeBlock.Header>
            <CodeBlock.HeaderDots />
            <CodeBlock.LanguagePicker />
          </CodeBlock.Header>
          <CodeBlock.Content>
            <CodeBlock.Gutter />
            <CodeBlock.Editor value={code} onChangeValue={setCode} />
          </CodeBlock.Content>
        </CodeBlock.Root>
      </div>

      {/* Actions Bar */}
      <div className="flex w-full max-w-[780px] items-center justify-between">
        <div className="flex items-center gap-4">
          <Toggle.Root checked={roastMode} onCheckedChange={setRoastMode}>
            <Toggle.Track>
              <Toggle.Thumb />
            </Toggle.Track>
            <Toggle.Label>roast mode</Toggle.Label>
          </Toggle.Root>
          <span className="font-secondary text-[12px] text-text-tertiary">
            {"// maximum sarcasm enabled"}
          </span>
        </div>
        <Button
          variant="primary"
          size="default"
          disabled={!code.trim()}
          onClick={() => {
            window.location.hash = "#results/550e8400-e29b-41d4-a716-446655440000";
          }}
        >
          $ roast_my_code
        </Button>
      </div>

      {/* Footer Stats */}
      <div className="flex items-center justify-center gap-6">
        <span className="font-secondary text-[12px] text-text-tertiary">
          2,847 codes roasted
        </span>
        <span className="font-primary text-[12px] text-text-tertiary">·</span>
        <span className="font-secondary text-[12px] text-text-tertiary">
          avg score: 4.2/10
        </span>
      </div>

      {/* Spacer */}
      <div className="h-[60px]" />

      {/* Leaderboard Preview */}
      <section className="flex w-full max-w-[960px] flex-col gap-6">
        {/* Leaderboard Title Row */}
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold font-primary text-accent-green text-sm">
              {"//"}
            </span>
            <span className="font-bold font-primary text-sm text-text-primary">
              shame_leaderboard
            </span>
          </div>
          <Button variant="link" size="xs">
            {"$ view_all >>"}
          </Button>
        </div>

        {/* Subtitle */}
        <p className="font-secondary text-[13px] text-text-tertiary">
          {"// the worst code on the internet, ranked by shame"}
        </p>

        {/* Table */}
        <div className="w-full overflow-hidden border border-border-primary">
          {/* Table Header */}
          <div className="flex h-10 w-full items-center border-border-primary border-b bg-bg-surface px-5">
            <div className="w-[50px] font-medium font-primary text-[12px] text-text-tertiary">
              #
            </div>
            <div className="w-[70px] font-medium font-primary text-[12px] text-text-tertiary">
              score
            </div>
            <div className="flex-1 font-medium font-primary text-[12px] text-text-tertiary">
              code
            </div>
            <div className="w-[100px] font-medium font-primary text-[12px] text-text-tertiary">
              lang
            </div>
          </div>

          {/* Table Rows */}
          {LEADERBOARD_DATA.map((row) => (
            <div
              key={row.rank}
              className="flex w-full items-start border-border-primary border-b px-5 py-4 last:border-b-0"
            >
              <div className="w-[50px] font-primary text-[12px]">
                <span
                  className={
                    row.isFirst ? "text-accent-amber" : "text-text-secondary"
                  }
                >
                  {row.rank}
                </span>
              </div>
              <div className="w-[70px] font-bold font-primary text-[12px] text-accent-red">
                {row.score}
              </div>
              <div className="flex flex-1 flex-col gap-[3px]">
                {row.code.map((line) => (
                  <span
                    key={line}
                    className={`font-primary text-[12px] ${
                      line.startsWith("//") || line.startsWith("--")
                        ? "text-[#8B8B8B]"
                        : "text-text-primary"
                    }`}
                  >
                    {line}
                  </span>
                ))}
              </div>
              <div className="w-[100px] font-primary text-[12px] text-text-secondary">
                {row.lang}
              </div>
            </div>
          ))}
        </div>

        {/* Fade Hint */}
        <div className="flex w-full justify-center px-0 py-4">
          <span className="font-secondary text-[12px] text-text-tertiary">
            {"showing top 3 of 2,847 · "}
          </span>
          <a
            href="#leaderboard"
            className="font-secondary text-[12px] text-text-tertiary transition-colors hover:text-text-primary"
          >
            {"view full leaderboard >>"}
          </a>
        </div>
      </section>

      {/* Bottom Padding */}
      <div className="h-[60px]" />
    </main>
  );
}
