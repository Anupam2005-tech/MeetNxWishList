import type React from 'react';
import { cn } from "@/lib/utils";
import Link, { type LinkProps } from "next/link";

interface GradientBorderButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  href?: LinkProps["href"];
  children: React.ReactNode;
  containerClassName?: string;
  borderClassName?: string;
  contentClassName?: string;
}

export function GradientBorderButton({
  children,
  asChild = false,
  href,
  className,
  containerClassName,
  borderClassName,
  contentClassName,
  ...props
}: GradientBorderButtonProps) {

  const commonProps = {
    className: cn(
      "relative group inline-flex items-center justify-center rounded-lg p-0.5 overflow-hidden",
      "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary",
      containerClassName
    ),
  };

  const buttonContent = (
    <>
      <span
        className={cn(
          "absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,hsl(var(--accent))_0%,hsl(var(--primary))_50%,hsl(var(--accent))_100%)]",
          "opacity-100",
          borderClassName
        )}
      />
      <span
        className={cn(
          "relative inline-flex h-full w-full cursor-pointer items-center justify-center rounded-[calc(var(--radius)-1px)] bg-background px-6 py-3 text-base font-medium text-foreground transition-all duration-200 group-hover:bg-background/90",
          // Note: rounded-[calc(var(--radius)-1px)] ensures the inner part fits snugly inside the p-0.5 border with rounded-lg
          // For default radius 0.5rem (8px), this becomes rounded-[7px]
          className, 
          contentClassName
        )}
      >
        {children}
      </span>
    </>
  );

  if (asChild && href) {
    // For Link, we pass specific props and the rest go to the anchor tag.
    // We need to ensure `commonProps.className` is applied correctly.
    // The 'props' might contain HTMLButtonElement specific attributes not valid for 'a'.
    // It's safer to explicitly pick props for Link or ensure they are compatible.
    const { type, ...anchorProps } = props as React.AnchorHTMLAttributes<HTMLAnchorElement> & {type?: string};
    return (
      <Link href={href} {...commonProps} {...anchorProps}>
        {buttonContent}
      </Link>
    );
  }
  
  return <button {...commonProps} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)} type={props.type || "button"}>{buttonContent}</button>;
}
