import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const badgeVariants = tv({
  slots: {
    root: "inline-flex items-center gap-2",
    dot: "h-2 w-2 rounded-full",
    text: "font-primary text-[12px] font-normal leading-none",
  },
  variants: {
    variant: {
      critical: {
        dot: "bg-accent-red",
        text: "text-accent-red",
      },
      warning: {
        dot: "bg-accent-amber",
        text: "text-accent-amber",
      },
      good: {
        dot: "bg-accent-green",
        text: "text-accent-green",
      },
    },
    size: {
      sm: { text: "text-[12px]" },
      md: { text: "text-[13px]" },
    },
  },
  defaultVariants: {
    variant: "good",
    size: "sm",
  },
});

export interface BadgeProps
  extends ComponentProps<"div">,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  const { root } = badgeVariants({ variant, size });
  return <div className={root({ className })} {...props} />;
}

export function BadgeDot({ className, ...props }: ComponentProps<"span">) {
  // We can't easily get the variant from parent here without Context or passing it down
  // But for simple composition, we can just rely on the parent's CSS cascade or provide a small context
  return (
    <span
      className={"h-2 w-2 rounded-full bg-current".concat(
        className ? ` ${className}` : "",
      )}
      aria-hidden
      {...props}
    />
  );
}

export function BadgeText({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={"font-normal font-primary text-[12px] leading-none".concat(
        className ? ` ${className}` : "",
      )}
      {...props}
    />
  );
}
