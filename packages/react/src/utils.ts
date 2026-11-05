import { composeRenderProps, type ClassNameOrFunction } from "react-aria-components";

/** Keep RAC render-prop classes while always retaining the component's CSS hook. */
export function classes<T>(base: string, custom?: ClassNameOrFunction<T>): ClassNameOrFunction<T> {
  return composeRenderProps(custom, (value) => [base, value].filter(Boolean).join(" "));
}

export type ControlSize = "sm" | "md" | "lg";
