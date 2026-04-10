import { clsx } from "clsx";
import type { ComponentProps } from "react";

export interface CardProps extends ComponentProps<"div"> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        "flex w-full flex-col gap-3 border border-border-primary p-5",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={clsx("flex items-center gap-2", className)} {...props} />
  );
}

export function CardTitle({ className, ...props }: ComponentProps<"h3">) {
  return (
    <h3
      className={clsx(
        "font-normal font-primary text-[13px] text-text-primary",
        className,
      )}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={clsx(
        "font-secondary text-[12px] text-text-secondary leading-relaxed",
        className,
      )}
      {...props}
    />
  );
}
