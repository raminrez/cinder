"use client";

import { createContext, useContext, type ReactNode, type Ref } from "react";
import {
  DisclosureGroup,
  Heading,
  type DisclosureGroupProps,
  type DisclosureProps,
} from "react-aria-components";
import { Button } from "../button";
import { DisclosureRoot, DisclosurePanel } from "../disclosure";
import { Icon } from "../../icons";
import { classes, type ControlSize } from "../../utils";

export interface AccordionProps extends DisclosureGroupProps {
  size?: ControlSize;
  ref?: Ref<HTMLDivElement>;
}

const AccordionSizeContext = createContext<ControlSize>("md");

export function Accordion({ size = "md", className, ...props }: AccordionProps) {
  return (
    <AccordionSizeContext.Provider value={size}>
      <DisclosureGroup
        {...props}
        data-size={size}
        className={classes("hashti-accordion", className)}
      />
    </AccordionSizeContext.Provider>
  );
}

export interface AccordionItemProps extends Omit<DisclosureProps, "children"> {
  title: ReactNode;
  children: ReactNode;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  ref?: Ref<HTMLDivElement>;
}

export function AccordionItem({
  title,
  children,
  headingLevel = 3,
  className,
  ...props
}: AccordionItemProps) {
  const size = useContext(AccordionSizeContext);
  return (
    <DisclosureRoot {...props} className={classes("hashti-accordion-item", className)}>
      <Heading level={headingLevel}>
        <Button slot="trigger" variant="ghost" size={size} className="hashti-accordion-trigger">
          <Icon name="chevronRight" />
          <span>{title}</span>
        </Button>
      </Heading>
      <DisclosurePanel className="hashti-accordion-panel">{children}</DisclosurePanel>
    </DisclosureRoot>
  );
}
