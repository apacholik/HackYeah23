import * as SelectPrimitive from "@radix-ui/react-select";
import * as React from "react";

import { cn } from "../../../helpers";

const Root = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label ref={ref} className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)} {...props} />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-gray-100 focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-gray-400", className)} {...props} />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.486 16.73C10.3547 16.7303 10.2247 16.7046 10.1034 16.6545C9.98206 16.6044 9.87182 16.5308 9.779 16.438L5.537 12.195C5.44143 12.1028 5.36517 11.9925 5.31267 11.8706C5.26018 11.7486 5.2325 11.6174 5.23126 11.4846C5.23001 11.3519 5.25522 11.2202 5.30541 11.0972C5.35561 10.9743 5.42978 10.8626 5.52361 10.7686C5.61743 10.6747 5.72903 10.6004 5.85189 10.55C5.97475 10.4996 6.10641 10.4742 6.23919 10.4753C6.37197 10.4763 6.5032 10.5038 6.62525 10.5562C6.74729 10.6085 6.85768 10.6846 6.95 10.78L10.485 14.315L16.85 7.95202C17.0375 7.76438 17.2919 7.65891 17.5571 7.65881C17.8224 7.65872 18.0769 7.76401 18.2645 7.95152C18.4521 8.13902 18.5576 8.39339 18.5577 8.65866C18.5578 8.92393 18.4525 9.17838 18.265 9.36602L11.193 16.438C11.1002 16.5308 10.9899 16.6044 10.8686 16.6545C10.7473 16.7046 10.6173 16.7303 10.486 16.73Z"
        fill="#21272A"
      />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.0808 13.314L17.0308 8.364C17.123 8.26849 17.2334 8.19231 17.3554 8.1399C17.4774 8.08749 17.6086 8.05991 17.7414 8.05875C17.8741 8.0576 18.0058 8.0829 18.1287 8.13318C18.2516 8.18346 18.3633 8.25772 18.4572 8.35161C18.5511 8.4455 18.6253 8.55715 18.6756 8.68005C18.7259 8.80295 18.7512 8.93463 18.75 9.06741C18.7489 9.20018 18.7213 9.3314 18.6689 9.45341C18.6165 9.57541 18.5403 9.68576 18.4448 9.778L12.7878 15.435C12.6002 15.6225 12.3459 15.7278 12.0808 15.7278C11.8156 15.7278 11.5613 15.6225 11.3738 15.435L5.71676 9.778C5.62125 9.68576 5.54507 9.57541 5.49266 9.45341C5.44025 9.3314 5.41267 9.20018 5.41151 9.06741C5.41036 8.93463 5.43566 8.80295 5.48594 8.68005C5.53622 8.55715 5.61048 8.4455 5.70437 8.35161C5.79826 8.25772 5.90991 8.18346 6.03281 8.13318C6.15571 8.0829 6.28739 8.0576 6.42017 8.05875C6.55294 8.05991 6.68416 8.08749 6.80617 8.1399C6.92817 8.19231 7.03852 8.26849 7.13076 8.364L12.0808 13.314Z"
        fill="#21272A"
      />
    </svg>
  );
}

export const Select = {
  Root,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
