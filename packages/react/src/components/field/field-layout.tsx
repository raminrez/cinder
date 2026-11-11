import type { ReactNode } from "react";
import type { FieldErrorProps } from "react-aria-components";
import {
  FieldLabel,
  FieldDescription,
  FieldErrorMessage,
  FieldHelp,
  FieldStatusIcon,
  FieldStatusMessage,
} from "./field-parts";
import { useTheme } from "../../theme";

export interface FieldContentProps {
  label?: ReactNode;
  labelTooltip?: ReactNode;
  description?: ReactNode;
  errorMessage?: FieldErrorProps["children"];
}

export function FieldLayout({
  label,
  labelTooltip,
  description,
  errorMessage,
  children,
  inlineIcon,
}: FieldContentProps & { children: ReactNode; inlineIcon?: boolean }) {
  const { theme } = useTheme();
  const isFrame = theme === "frame-light" || theme === "frame-dark" || theme.startsWith("hashti-");
  return (
    <>
      {label != null && <FieldLabel labelTooltip={labelTooltip}>{label}</FieldLabel>}
      {isFrame && description != null && <FieldDescription>{description}</FieldDescription>}
      {children}
      {inlineIcon && <FieldStatusIcon />}
      <FieldHelp>
        {!isFrame && description != null && <FieldDescription>{description}</FieldDescription>}
        <FieldErrorMessage>{errorMessage}</FieldErrorMessage>
        <FieldStatusMessage />
      </FieldHelp>
    </>
  );
}
