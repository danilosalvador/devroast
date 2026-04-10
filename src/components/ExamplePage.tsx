import { Badge, BadgeDot, BadgeText } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/Card";
import { CodeBlock } from "./ui/CodeBlock";
import { DiffLine } from "./ui/DiffLine";
import { Toggle } from "./ui/Toggle";

export function ExamplePage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 p-12">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold font-primary text-2xl text-text-primary">
          Exemplo de Componentes
        </h1>
        <p className="font-primary text-sm text-text-secondary">
          Listagem das variantes construídas do UI kit para visualização e
          testes (Refatorado para Composition Pattern).
        </p>
      </div>

      <div className="flex flex-col gap-6 rounded-xl border border-border-primary bg-[#0a0a0a] p-6">
        <h2 className="border-border-primary border-b pb-2 font-medium font-primary text-lg text-text-primary">
          Button (Submits & Actions)
        </h2>

        <div className="mt-2 flex flex-wrap items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <Button variant="primary" size="default">
              $ roast_my_code
            </Button>
            <span className="font-primary text-text-tertiary text-xs">
              primary
            </span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Button variant="secondary" size="sm">
              $ share_roast
            </Button>
            <span className="font-primary text-text-tertiary text-xs">
              secondary
            </span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Button variant="link" size="xs">
              $ view_all {">>"}
            </Button>
            <span className="font-primary text-text-tertiary text-xs">
              link
            </span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Button disabled>$ roast_my_code</Button>
            <span className="font-primary text-text-tertiary text-xs">
              disabled
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 rounded-xl border border-border-primary bg-[#0a0a0a] p-6">
        <h2 className="border-border-primary border-b pb-2 font-medium font-primary text-lg text-text-primary">
          Toggle (Switches)
        </h2>
        <div className="flex items-center gap-8">
          <Toggle.Root checked={true}>
            <Toggle.Track>
              <Toggle.Thumb />
            </Toggle.Track>
            <Toggle.Label>roast mode (on)</Toggle.Label>
          </Toggle.Root>

          <Toggle.Root checked={false}>
            <Toggle.Track>
              <Toggle.Thumb />
            </Toggle.Track>
            <Toggle.Label>roast mode (off)</Toggle.Label>
          </Toggle.Root>

          <Toggle.Root disabled>
            <Toggle.Track>
              <Toggle.Thumb />
            </Toggle.Track>
            <Toggle.Label>disabled</Toggle.Label>
          </Toggle.Root>
        </div>
      </div>

      <div className="flex flex-col gap-6 rounded-xl border border-border-primary bg-[#0a0a0a] p-6">
        <h2 className="border-border-primary border-b pb-2 font-medium font-primary text-lg text-text-primary">
          Badge Status
        </h2>
        <div className="flex items-center gap-4">
          <Badge variant="critical">
            <BadgeDot />
            <BadgeText>critical</BadgeText>
          </Badge>

          <Badge variant="warning">
            <BadgeDot />
            <BadgeText>warning</BadgeText>
          </Badge>

          <Badge variant="good">
            <BadgeDot />
            <BadgeText>good</BadgeText>
          </Badge>

          <Badge variant="critical" size="md">
            <BadgeDot />
            <BadgeText className="text-[13px]">needs_serious_help</BadgeText>
          </Badge>
        </div>
      </div>

      <div className="flex flex-col gap-6 rounded-xl border border-border-primary bg-[#0a0a0a] p-6">
        <h2 className="border-border-primary border-b pb-2 font-medium font-primary text-lg text-text-primary">
          Diff Lines
        </h2>
        <div className="flex flex-col overflow-hidden rounded-md border border-border-primary font-primary">
          <DiffLine.Root type="context">
            <DiffLine.Number>10</DiffLine.Number>
            <DiffLine.Indicator />
            <DiffLine.Content>function isReady() {"{"}</DiffLine.Content>
          </DiffLine.Root>

          <DiffLine.Root type="removed">
            <DiffLine.Number>11</DiffLine.Number>
            <DiffLine.Indicator />
            <DiffLine.Content> return false;</DiffLine.Content>
          </DiffLine.Root>

          <DiffLine.Root type="added">
            <DiffLine.Number>12</DiffLine.Number>
            <DiffLine.Indicator />
            <DiffLine.Content> return true;</DiffLine.Content>
          </DiffLine.Root>

          <DiffLine.Root type="context">
            <DiffLine.Number>13</DiffLine.Number>
            <DiffLine.Indicator />
            <DiffLine.Content>{"}"}</DiffLine.Content>
          </DiffLine.Root>
        </div>
      </div>

      <div className="flex flex-col gap-6 rounded-xl border border-border-primary bg-[#0a0a0a] p-6">
        <h2 className="border-border-primary border-b pb-2 font-medium font-primary text-lg text-text-primary">
          Card
        </h2>
        <Card className="max-w-[480px]">
          <CardHeader>
            <Badge variant="warning">
              <BadgeDot />
              <BadgeText>warning</BadgeText>
            </Badge>
          </CardHeader>
          <CardTitle>using var instead of const/let</CardTitle>
          <CardDescription>
            the var keyword is function-scoped rather than block-scoped, which
            can lead to unexpected behavior and bugs. modern javascript uses
            const for immutable bindings and let for mutable ones.
          </CardDescription>
        </Card>
      </div>

      <div className="flex flex-col gap-6 rounded-xl border border-border-primary bg-[#0a0a0a] p-6">
        <h2 className="border-border-primary border-b pb-2 font-medium font-primary text-lg text-text-primary">
          Code Block
        </h2>
        <CodeBlock.Root
          code={`function calculateTotal(price, tax) {
  var total = price + tax; // using var
  return total;
}`}
        >
          <CodeBlock.Header>
            <CodeBlock.HeaderDots />
            <CodeBlock.HeaderTitle>calculate.js</CodeBlock.HeaderTitle>
            <CodeBlock.LanguagePicker />
          </CodeBlock.Header>
          <CodeBlock.Content>
            <CodeBlock.Gutter />
            <CodeBlock.Editor
              value={`function calculateTotal(price, tax) {
  var total = price + tax; // using var
  return total;
}`}
            />
          </CodeBlock.Content>
        </CodeBlock.Root>
      </div>
    </div>
  );
}
