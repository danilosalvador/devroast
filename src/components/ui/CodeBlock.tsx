import { clsx } from "clsx";
import * as React from "react";
import { codeToHtml } from "shiki";
import { detectLanguage, POPULAR_LANGUAGES } from "../../lib/language-detector";

export interface CodeBlockRootProps extends React.ComponentProps<"div"> {
  initialLanguage?: string;
  onLanguageChange?: (lang: string) => void;
  code?: string;
}

interface CodeBlockContextValue {
  code: string;
  setCode: (code: string) => void;
  lineCount: number;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  highlightRef: React.RefObject<HTMLDivElement | null>;
  gutterRef: React.RefObject<HTMLDivElement | null>;
  language: string;
  setLanguage: (lang: string) => void;
  autoDetect: boolean;
  setAutoDetect: (auto: boolean) => void;
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
  initialLanguage = "javascript",
  onLanguageChange,
  code: codeProp,
  ...props
}: CodeBlockRootProps) {
  const [internalCode, setInternalCode] = React.useState("");
  const [language, setLanguageState] = React.useState(initialLanguage);
  const [autoDetect, setAutoDetect] = React.useState(true);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const highlightRef = React.useRef<HTMLDivElement>(null);
  const gutterRef = React.useRef<HTMLDivElement>(null);

  const code = codeProp !== undefined ? codeProp : internalCode;
  const lineCount = Math.max(code.split("\n").length, 1);

  const setLanguage = React.useCallback(
    (lang: string) => {
      setLanguageState(lang);
      onLanguageChange?.(lang);
    },
    [onLanguageChange],
  );

  return (
    <CodeBlockContext.Provider
      value={{
        code,
        setCode: setInternalCode,
        lineCount,
        textareaRef,
        highlightRef,
        gutterRef,
        language,
        setLanguage,
        autoDetect,
        setAutoDetect,
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
        "flex h-10 w-full items-center gap-4 border-border-primary border-b px-4",
        className,
      )}
      {...props}
    />
  );
}

export function CodeBlockHeaderDots() {
  return (
    <div className="flex shrink-0 items-center gap-2">
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

export function CodeBlockLanguagePicker() {
  const { language, setLanguage, setAutoDetect, autoDetect } = useCodeBlock();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "auto") {
      setAutoDetect(true);
    } else {
      setAutoDetect(false);
      setLanguage(value);
    }
  };

  return (
    <div className="flex flex-1 justify-end">
      <select
        value={autoDetect ? "auto" : language}
        onChange={handleChange}
        className="cursor-pointer bg-transparent font-primary text-[12px] text-text-tertiary outline-none transition-colors hover:text-text-primary"
      >
        <option value="auto" className="bg-bg-surface text-text-primary">
          Auto Detect
        </option>
        {POPULAR_LANGUAGES.map((lang: { id: string; name: string }) => (
          <option
            key={lang.id}
            value={lang.id}
            className="bg-bg-surface text-text-primary"
          >
            {lang.name}
          </option>
        ))}
      </select>
    </div>
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
  const { lineCount, gutterRef } = useCodeBlock();
  return (
    <div
      ref={gutterRef}
      className={clsx(
        "flex w-12 shrink-0 flex-col items-end gap-2 overflow-hidden border-border-primary border-r bg-bg-surface px-3 py-4",
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
  language: langProp,
  className,
  placeholder = "// paste your code here...",
  readOnly,
  ...props
}: CodeBlockEditorProps) {
  const {
    setCode,
    textareaRef,
    highlightRef,
    gutterRef,
    code: contextCode,
    language: contextLanguage,
    setLanguage,
    autoDetect,
  } = useCodeBlock();

  const [highlightedHtml, setHighlightedHtml] = React.useState("");

  // Current state values
  const currentCode = value !== undefined ? value : contextCode;
  const currentLanguage = langProp || contextLanguage;

  // Real-time language detection with debounce
  React.useEffect(() => {
    if (!autoDetect || !currentCode?.trim()) return;

    const timeout = setTimeout(() => {
      const detected = detectLanguage(currentCode);
      if (detected !== contextLanguage) {
        setLanguage(detected);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [currentCode, autoDetect, contextLanguage, setLanguage]);

  // Syntax Highlight effect
  React.useEffect(() => {
    let cancelled = false;
    async function highlight() {
      if (!currentCode) {
        setHighlightedHtml("");
        return;
      }
      try {
        const result = await codeToHtml(currentCode, {
          lang: currentLanguage,
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
  }, [currentCode, currentLanguage]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (value === undefined) setCode(val);
    onChangeValue?.(val);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const newValue = `${currentCode.substring(0, start)}  ${currentCode.substring(end)}`;

      if (value === undefined) setCode(newValue);
      onChangeValue?.(newValue);

      // Set cursor position after update
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  const handleScroll = () => {
    if (textareaRef.current) {
      const scrollTop = textareaRef.current.scrollTop;
      const scrollLeft = textareaRef.current.scrollLeft;
      
      if (highlightRef.current) {
        highlightRef.current.scrollTop = scrollTop;
        highlightRef.current.scrollLeft = scrollLeft;
      }
      if (gutterRef.current) {
        gutterRef.current.scrollTop = scrollTop;
      }
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
        onKeyDown={handleKeyDown}
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
  LanguagePicker: CodeBlockLanguagePicker,
  Content: CodeBlockContent,
  Gutter: CodeBlockGutter,
  Editor: CodeBlockEditor,
};
