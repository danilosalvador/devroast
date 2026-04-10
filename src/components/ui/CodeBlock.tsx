import { clsx } from "clsx";
import * as React from "react";
import { codeToHtml } from "shiki";

export interface CodeBlockRootProps extends React.ComponentProps<"div"> {}

interface CodeBlockContextValue {
  code: string;
  setCode: (code: string) => void;
  lineCount: number;
  highlightedHtml: string;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  highlightRef: React.RefObject<HTMLDivElement | null>;
  language: string;
}

const CodeBlockContext = React.createContext<CodeBlockContextValue | null>(
  null,
);

function useCodeBlock() {
  const context = React.useContext(CodeBlockContext);
  if (!context) {
    throw new Error(
      "CodeBlock components must be used within a CodeBlock.Root",
    );
  }
  return context;
}

export function CodeBlockRoot({
  className,
  children,
  ...props
}: CodeBlockRootProps) {
  // Since composition means we might have Editor as a child,
  // we'll need a way to track state here or let the user pass it.
  // To keep it simple but modular, we'll store the internal state or allow controlled mode.
  // But wait, if Editor is a child, it should probably be controlled by the user's state.
  // We'll provide a local state that can be synced if needed.

  const [code, setCode] = React.useState("");
  const [highlightedHtml, _setHighlightedHtml] = React.useState("");
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const highlightRef = React.useRef<HTMLDivElement>(null);
  const [language, _setLanguage] = React.useState("javascript");

  const lineCount = Math.max(code.split("\n").length, 1);

  return (
    <CodeBlockContext.Provider
      value={{
        code,
        setCode,
        lineCount,
        highlightedHtml,
        textareaRef,
        highlightRef,
        language,
      }}
    >
      <div
        className={clsx(
          "flex w-full flex-col overflow-hidden border border-border-primary bg-bg-input",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </CodeBlockContext.Provider>
  );
}

export function CodeBlockHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={clsx(
        "flex h-10 w-full items-center gap-3 border-border-primary border-b px-4",
        className,
      )}
      {...props}
    />
  );
}

export function CodeBlockHeaderDots() {
  return (
    <div className="flex items-center gap-2">
      <div className="h-3 w-3 rounded-full bg-[#EF4444]" />
      <div className="h-3 w-3 rounded-full bg-[#F59E0B]" />
      <div className="h-3 w-3 rounded-full bg-[#10B981]" />
    </div>
  );
}

export function CodeBlockHeaderTitle({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={clsx(
        "flex-1 text-right font-primary text-[12px] text-text-tertiary",
        className,
      )}
      {...props}
    />
  );
}

export function CodeBlockContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={clsx("flex flex-1 overflow-hidden", className)}
      {...props}
    />
  );
}

export function CodeBlockGutter({ className }: { className?: string }) {
  const { lineCount } = useCodeBlock();
  return (
    <div
      className={clsx(
        "flex w-12 shrink-0 flex-col items-end gap-2 border-border-primary border-r bg-bg-surface px-3 py-4",
        className,
      )}
    >
      {Array.from({ length: lineCount }, (_, i) => {
        const lineNum = i + 1;
        return (
          <span
            key={`ln-${lineNum}`}
            className="select-none font-primary text-[12px] text-text-tertiary leading-[20px]"
          >
            {lineNum}
          </span>
        );
      })}
    </div>
  );
}

export interface CodeBlockEditorProps
  extends Omit<React.ComponentProps<"textarea">, "value" | "onChange"> {
  value?: string;
  onChangeValue?: (value: string) => void;
  language?: string;
}

export function CodeBlockEditor({
  value,
  onChangeValue,
  language = "javascript",
  className,
  placeholder = "// paste your code here...",
  readOnly,
  ...props
}: CodeBlockEditorProps) {
  const {
    setCode,
    textareaRef,
    highlightRef,
    code: internalCode,
  } = useCodeBlock();
  const [highlightedHtml, setHighlightedHtml] = React.useState("");

  // Sync with value prop if provided (controlled)
  React.useEffect(() => {
    if (value !== undefined) {
      setCode(value);
    }
  }, [value, setCode]);

  const currentCode = value !== undefined ? value : internalCode;

  // Highlight effect
  React.useEffect(() => {
    let cancelled = false;
    async function highlight() {
      if (!currentCode) {
        setHighlightedHtml("");
        return;
      }
      try {
        const result = await codeToHtml(currentCode, {
          lang: language,
          theme: "vesper",
        });
        if (!cancelled) setHighlightedHtml(result);
      } catch {
        if (!cancelled) setHighlightedHtml("");
      }
    }
    highlight();
    return () => {
      cancelled = true;
    };
  }, [currentCode, language]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (value === undefined) setCode(val);
    onChangeValue?.(val);
  };

  const handleScroll = () => {
    if (textareaRef.current && highlightRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  return (
    <div className="relative flex-1 overflow-auto">
      {/* Syntax Highlight Overlay */}
      {highlightedHtml && (
        <div
          ref={highlightRef}
          className="[&>pre]:!bg-transparent [&>pre]:!m-0 [&>pre]:!p-0 pointer-events-none absolute inset-0 overflow-hidden p-4 [&>pre]:font-primary [&>pre]:text-[12px] [&>pre]:leading-[20px]"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: required for shiki syntax highlight
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      )}

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={currentCode}
        onChange={handleChange}
        onScroll={handleScroll}
        readOnly={readOnly}
        placeholder={placeholder}
        spellCheck={false}
        className={clsx(
          "absolute inset-0 h-full w-full resize-none bg-transparent p-4 font-primary text-[12px] text-transparent leading-[20px] caret-text-primary outline-none placeholder:text-text-tertiary",
          highlightedHtml ? "text-transparent" : "text-text-primary",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export const CodeBlock = {
  Root: CodeBlockRoot,
  Header: CodeBlockHeader,
  HeaderDots: CodeBlockHeaderDots,
  HeaderTitle: CodeBlockHeaderTitle,
  Content: CodeBlockContent,
  Gutter: CodeBlockGutter,
  Editor: CodeBlockEditor,
};
