import { Switch } from "@base-ui/react";
import * as React from "react";
import { tv } from "tailwind-variants";

const toggleVariants = tv({
  slots: {
    root: "flex items-center gap-3 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
    track:
      "flex h-[22px] w-[40px] p-[3px] shrink-0 items-center rounded-full transition-colors",
    thumb: "h-[16px] w-[16px] rounded-full transition-transform",
    label: "text-[12px] font-primary",
  },
  variants: {
    checked: {
      true: {
        track: "bg-accent-green",
        thumb: "bg-[#0A0A0A] translate-x-[18px]",
        label: "text-accent-green",
      },
      false: {
        track: "bg-border-primary",
        thumb: "bg-[#6B7280] translate-x-0",
        label: "text-text-secondary",
      },
    },
  },
});

const ToggleContext = React.createContext<{ checked: boolean }>({
  checked: false,
});

export interface ToggleProps
  extends Omit<React.ComponentProps<typeof Switch.Root>, "className"> {
  className?: string;
}

export const ToggleRoot = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      className,
      checked: checkedProp,
      defaultChecked,
      onCheckedChange,
      ...props
    },
    ref,
  ) => {
    const [checked, setChecked] = React.useState(
      checkedProp ?? defaultChecked ?? false,
    );

    React.useEffect(() => {
      if (checkedProp !== undefined) setChecked(checkedProp);
    }, [checkedProp]);

    // biome-ignore lint/suspicious/noExplicitAny: required for base-ui
    const handleCheckedChange = (value: boolean, eventDetails: any) => {
      if (checkedProp === undefined) setChecked(value);
      onCheckedChange?.(value, eventDetails);
    };

    const { root } = toggleVariants({ checked });

    return (
      <ToggleContext.Provider value={{ checked }}>
        {/* biome-ignore lint/a11y/noLabelWithoutControl: Switch.Root naturally includes the interactive control */}
        <label className={root({ className })}>
          <Switch.Root
            ref={ref}
            checked={checked}
            onCheckedChange={handleCheckedChange}
            className="peer sr-only"
            {...props}
          />
          {props.children}
        </label>
      </ToggleContext.Provider>
    );
  },
);

export function ToggleTrack({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { checked } = React.useContext(ToggleContext);
  const { track } = toggleVariants({ checked });
  return (
    <div className={track({ className })} aria-hidden {...props}>
      {props.children}
    </div>
  );
}

export function ToggleThumb({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { checked } = React.useContext(ToggleContext);
  const { thumb } = toggleVariants({ checked });
  return <div className={thumb({ className })} {...props} />;
}

export function ToggleLabel({
  className,
  ...props
}: React.ComponentProps<"span">) {
  const { checked } = React.useContext(ToggleContext);
  const { label } = toggleVariants({ checked });
  return <span className={label({ className })} {...props} />;
}

// Named exports for the composition pattern
export const Toggle = {
  Root: ToggleRoot,
  Track: ToggleTrack,
  Thumb: ToggleThumb,
  Label: ToggleLabel,
};
