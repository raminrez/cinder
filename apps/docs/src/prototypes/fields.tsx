import type { ReactNode } from "react";
import { Icon } from "@cinder/react";

export function RequiredLabel({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <span className="prototype-required" aria-hidden="true">
        Required
      </span>
    </>
  );
}

export function ValidationMessage({ children }: { children: ReactNode }) {
  return (
    <span className="prototype-validation-message">
      <Icon name="error" />
      <span>{children}</span>
    </span>
  );
}
