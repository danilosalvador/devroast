import type { ComponentProps } from "react";
import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";

const diffLineVariants = tv({
  slots: {
    root: "flex w-full items-start gap-3 px-4 py-1.5 font-primary text-[13px] leading-relaxed",
    lineNumber: "w-8 select-none text-right text-text-tertiary",
    content: "flex-1 overflow-x-auto whitespace-pre",
    indicator: "select-none opacity-50",
  },
  variants: {
    type: {
      added: {
        root: "bg-[#0A1A0F]",
        content: "text-[#B6FFCE]",
        indicator: "text-[#10B981]",
      },
      removed: {
        root: "bg-[#1A0A0A]",
        content: "text-[#FF5C33]",
        indicator: "text-[#EF4444]",
      },
      context: {
        root: "bg-transparent",
        content: "text-text-secondary",
        indicator: "text-transparent",
      },
    },
  },
  defaultVariants: {
    type: "context",
  },
});

const DiffLineContext = React.createContext<
  VariantProps<typeof diffLineVariants>
>({
  type: "context",
});

export interface DiffLineProps
  extends ComponentProps<"div">,
    VariantProps<typeof diffLineVariants> {}

export function DiffLineRoot({ className, type, ...props }: DiffLineProps) {
  const { root } = diffLineVariants({ type });
  return (
    <DiffLineContext.Provider value={{ type }}>
      <div className={root({ className })} {...props} />
    </DiffLineContext.Provider>
  );
}

export function DiffLineNumber({
  className,
  ...props
}: ComponentProps<"span">) {
  const { type } = React.useContext(DiffLineContext);
  const { lineNumber } = diffLineVariants({ type });
  return <span className={lineNumber({ className })} {...props} />;
}

export function DiffLineIndicator({
  className,
  ...props
}: ComponentProps<"span">) {
  const { type } = React.useContext(DiffLineContext);
  const { indicator } = diffLineVariants({ type });

  const getChar = () => {
    if (type === "added") return "+";
    if (type === "removed") return "-";
    return " ";
  };

  return (
    <span className={indicator({ className })} {...props}>
      {getChar()}
    </span>
  );
}

export function DiffLineContent({
  className,
  ...props
}: ComponentProps<"span">) {
  const { type } = React.useContext(DiffLineContext);
  const { content } = diffLineVariants({ type });
  return <span className={content({ className })} {...props} />;
}

export const DiffLine = {
  Root: DiffLineRoot,
  Number: DiffLineNumber,
  Indicator: DiffLineIndicator,
  Content: DiffLineContent,
};
