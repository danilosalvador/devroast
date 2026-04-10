import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "inline-flex items-center justify-center whitespace-nowrap gap-2 font-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  variants: {
    variant: {
      primary: "bg-accent-green text-[#0A0A0A] hover:bg-accent-green/90",
      secondary:
        "border border-border-primary text-text-primary hover:bg-border-primary/50",
      link: "border border-border-primary text-text-secondary hover:text-text-primary hover:bg-border-primary/50",
    },
    size: {
      default: "px-[24px] py-[10px] text-[13px] font-[500]",
      sm: "px-[16px] py-[8px] text-[12px] font-normal",
      xs: "px-[12px] py-[6px] text-[12px] font-normal",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

export interface ButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {}

export const Button = ({ className, variant, size, ...props }: ButtonProps) => {
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  );
};
