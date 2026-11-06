import type { ComponentPropsWithRef, ReactNode, CSSProperties } from "react";
import { Link, type LinkProps } from "./buttons";

export interface StackProps extends ComponentPropsWithRef<"div"> {
  gap?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
  orientation?: "horizontal" | "vertical";
}
export function Stack({
  gap = 5,
  orientation = "vertical",
  className,
  style,
  ...props
}: StackProps) {
  return (
    <div
      {...props}
      data-orientation={orientation}
      className={["cinder-stack", className].filter(Boolean).join(" ")}
      style={
        {
          "--stack-gap": `var(--cinder-spacing-${String(gap).padStart(2, "0")})`,
          ...style,
        } as CSSProperties
      }
    />
  );
}
export function Grid({ className, ...props }: ComponentPropsWithRef<"div">) {
  return <div {...props} className={["cinder-grid", className].filter(Boolean).join(" ")} />;
}
export interface ColumnLayoutProps extends ComponentPropsWithRef<"div"> {
  sm?: 1 | 2 | 3 | 4;
  md?: number;
  lg?: number;
}
export function GridColumn({
  sm = 4,
  md = 8,
  lg = 16,
  className,
  style,
  ...props
}: ColumnLayoutProps) {
  return (
    <div
      {...props}
      className={["cinder-grid-column", className].filter(Boolean).join(" ")}
      style={{ "--grid-sm": sm, "--grid-md": md, "--grid-lg": lg, ...style } as CSSProperties}
    />
  );
}

export interface HeaderProps extends ComponentPropsWithRef<"header"> {
  children: ReactNode;
}
export function Header({ className, ...props }: HeaderProps) {
  return <header {...props} className={["cinder-header", className].filter(Boolean).join(" ")} />;
}
export function HeaderName({ className, ...props }: LinkProps) {
  return (
    <Link
      {...props}
      className={
        typeof className === "function"
          ? (state) => `cinder-header-name ${className(state)}`
          : `cinder-header-name ${className ?? ""}`
      }
    />
  );
}
export function HeaderNav({ className, ...props }: ComponentPropsWithRef<"nav">) {
  return <nav {...props} className={["cinder-header-nav", className].filter(Boolean).join(" ")} />;
}
export function SideNav({ className, ...props }: ComponentPropsWithRef<"nav">) {
  return <nav {...props} className={["cinder-side-nav", className].filter(Boolean).join(" ")} />;
}
