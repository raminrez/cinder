import {
  createContext,
  useCallback,
  useContext,
  useId,
  useState,
  type ComponentProps,
  type ReactNode,
  type RefCallback,
} from "react";
import {
  Label,
  LabelContext,
  Text,
  TextContext,
  FieldError,
  FieldErrorContext,
  Input,
  TextArea,
  Group,
  GroupContext,
  DateInput,
  ButtonContext,
  DialogTrigger,
  TooltipTrigger,
  composeRenderProps,
  useLocale,
  useSlottedContext,
  type RenderProps,
} from "react-aria-components";
import { Button, type ButtonProps } from "../button";
import { Icon, type IconProps } from "../../icons";
import { Popover } from "../popover";
import { Dialog } from "../dialog";
import { Tooltip } from "../tooltip";
import { classes } from "../../utils";

export type FieldStatusPlacement = "attached" | "detached";

export interface FieldStatus {
  /** Presentation only. Use RAC isInvalid or Form validationErrors for validation. */
  type: "warning" | "error" | "success";
  message?: ReactNode;
  variant?: FieldStatusPlacement;
}

export interface FieldPresentationProps {
  status?: FieldStatus;
  statusVariant?: FieldStatusPlacement;
  isOptional?: boolean;
}

const FieldPresentationContext = createContext<
  FieldPresentationProps & { statusRef?: RefCallback<HTMLElement>; isRequired?: boolean }
>({});

export function useFieldPresentation(
  {
    status,
    statusVariant,
    isOptional,
    "aria-describedby": describedBy,
  }: FieldPresentationProps & { "aria-describedby"?: string },
  inheritedDescription?: string,
  defaultVariant: FieldStatusPlacement = "attached",
) {
  const resolvedVariant = statusVariant ?? status?.variant ?? defaultVariant;
  const description = describedBy ?? inheritedDescription;
  const [statusId, setStatusId] = useState<string>();
  const statusRef = useCallback((node: HTMLElement | null) => setStatusId(node?.id), []);
  return {
    statusVariant: resolvedVariant,
    props: {
      "data-hashti-status": status?.type,
      "data-hashti-status-variant": resolvedVariant,
      "aria-describedby":
        [description, status ? statusId : undefined].filter(Boolean).join(" ") || description,
    },
    wrap<T extends { isRequired: boolean }>(
      children: RenderProps<T>["children"],
      inheritedChildren?: RenderProps<T>["children"],
    ) {
      return composeRenderProps(
        children === undefined ? inheritedChildren : children,
        (content, state) => (
          <FieldPresentationContext.Provider
            value={{
              status,
              statusVariant: resolvedVariant,
              statusRef,
              isOptional,
              isRequired: state.isRequired,
            }}
          >
            {content}
          </FieldPresentationContext.Provider>
        ),
      );
    },
  };
}

const fieldMessages: Record<
  string,
  {
    required: string;
    optional: string;
    about: string;
    close: string;
    warning: string;
    error: string;
    success: string;
  }
> = {
  en: {
    required: "required",
    optional: "optional",
    about: "About",
    close: "Close field help",
    warning: "Warning",
    error: "Error",
    success: "Success",
  },
  fa: {
    required: "الزامی",
    optional: "اختیاری",
    about: "دربارهٔ",
    close: "بستن راهنمای فیلد",
    warning: "هشدار",
    error: "خطا",
    success: "تأیید",
  },
  ar: {
    required: "مطلوب",
    optional: "اختياري",
    about: "حول",
    close: "إغلاق مساعدة الحقل",
    warning: "تحذير",
    error: "خطأ",
    success: "نجاح",
  },
  de: {
    required: "erforderlich",
    optional: "optional",
    about: "Informationen zu",
    close: "Feldhilfe schließen",
    warning: "Warnung",
    error: "Fehler",
    success: "Bestätigt",
  },
};

function useFieldMessages() {
  const { locale } = useLocale();
  return fieldMessages[locale.split("-")[0]!] ?? fieldMessages.en!;
}

export interface FieldLabelOptions {
  isRequired?: boolean;
  isOptional?: boolean;
  labelTooltip?: ReactNode;
}

export type FieldLabelProps = ComponentProps<typeof Label> & FieldLabelOptions;
export function FieldLabel({
  className,
  children,
  isRequired,
  isOptional,
  labelTooltip,
  ...props
}: FieldLabelProps) {
  const context = useSlottedContext(LabelContext, props.slot);
  const content = children === undefined ? context?.children : children;
  const presentation = useContext(FieldPresentationContext);
  const messages = useFieldMessages();
  const id = useId();
  const required = presentation.isRequired || isRequired;
  const optional = isOptional ?? presentation.isOptional;
  const label = (
    <Label
      data-slot="label"
      {...props}
      className={["hashti-field__label react-aria-Label", className].filter(Boolean).join(" ")}
    >
      {labelTooltip ? <span id={id}>{content}</span> : content}
      {(required || optional) && (
        <>
          {" "}
          <span className="hashti-field__necessity">
            ({required ? messages.required : messages.optional})
          </span>
        </>
      )}
    </Label>
  );
  return labelTooltip ? (
    <div className="hashti-field__label-row">
      {label}
      <FieldLabelHelp labelId={id} content={labelTooltip} />
    </div>
  ) : (
    label
  );
}

export interface FieldLabelHelpProps {
  labelId?: string;
  content?: ReactNode;
  tooltip?: ReactNode;
  children?: ReactNode;
}

export function FieldLabelHelp({ labelId, content, tooltip, children }: FieldLabelHelpProps) {
  const messages = useFieldMessages();
  const prefixId = useId();
  const fallbackId = useId();
  const targetLabelId = labelId ?? fallbackId;
  const labelledBy = `${prefixId} ${targetLabelId}`;
  const tooltipContent = tooltip ?? content;

  // Composition pattern: If children is provided, render a Popover dialog on click
  if (children) {
    return (
      <ButtonContext.Provider value={null}>
        <span id={prefixId} className="hashti-visually-hidden">
          {messages.about}
        </span>
        <DialogTrigger>
          <TooltipTrigger>
            <Button
              type="button"
              variant="ghost"
              iconOnly
              size="sm"
              aria-labelledby={labelledBy}
              className="hashti-field__label-help"
            >
              <Icon name="info" />
            </Button>
            {tooltipContent && <Tooltip>{tooltipContent}</Tooltip>}
          </TooltipTrigger>
          <Popover placement="bottom start" offset={6} className="hashti-field__label-popover">
            <Dialog aria-labelledby={labelledBy}>{children}</Dialog>
          </Popover>
        </DialogTrigger>
      </ButtonContext.Provider>
    );
  }

  // Default: Pure tooltip on hover/focus. Clicking does not open a popover.
  return (
    <ButtonContext.Provider value={null}>
      <span id={prefixId} className="hashti-visually-hidden">
        {messages.about}
      </span>
      <TooltipTrigger>
        <Button
          type="button"
          variant="ghost"
          iconOnly
          size="sm"
          aria-labelledby={labelledBy}
          className="hashti-field__label-help"
        >
          <Icon name="info" />
        </Button>
        {tooltipContent && <Tooltip>{tooltipContent}</Tooltip>}
      </TooltipTrigger>
    </ButtonContext.Provider>
  );
}

export type FieldStatusProps = Omit<ComponentProps<typeof Text>, "children" | "slot" | "id">;
export function FieldStatusMessage({ className, ...props }: FieldStatusProps) {
  const { status, statusRef, statusVariant = "attached" } = useContext(FieldPresentationContext);
  const validation = useContext(FieldErrorContext);
  const messages = useFieldMessages();
  const statusId = useId();
  if (!status || validation?.isInvalid) return null;
  const isDetached = statusVariant === "detached";
  return (
    <TextContext.Provider value={{ ref: statusRef }}>
      <Text
        {...props}
        id={statusId}
        data-hashti-status={status.type}
        data-variant={statusVariant}
        className={[
          "hashti-field__status",
          isDetached ? "hashti-field__status--detached" : "hashti-field__status--attached",
          status.message == null && "hashti-visually-hidden",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {status.message == null ? messages[status.type] : status.message}
      </Text>
    </TextContext.Provider>
  );
}

export type FieldStatusIconProps = Omit<IconProps, "name">;
export function FieldStatusIcon({ className, ...props }: FieldStatusIconProps) {
  const { status } = useContext(FieldPresentationContext);
  const validation = useContext(FieldErrorContext);
  const type = validation?.isInvalid ? "error" : status?.type;
  return type ? (
    <Icon
      {...props}
      name={type}
      data-slot="icon"
      data-hashti-status={type}
      aria-hidden="true"
      className={["hashti-field__status-icon", className].filter(Boolean).join(" ")}
    />
  ) : null;
}

export type FieldDescriptionProps = ComponentProps<typeof Text>;
export function FieldDescription({ className, ...props }: FieldDescriptionProps) {
  return (
    <Text
      data-slot="description"
      slot="description"
      {...props}
      className={["hashti-field__description react-aria-Text", className].filter(Boolean).join(" ")}
    />
  );
}

export type FieldErrorMessageProps = ComponentProps<typeof FieldError>;
export function FieldErrorMessage({ className, ...props }: FieldErrorMessageProps) {
  return (
    <FieldError
      data-slot="error"
      {...props}
      className={classes("hashti-field__error react-aria-FieldError", className)}
    />
  );
}

export type FieldHelpProps = ComponentProps<"div">;
export function FieldHelp({ className, ...props }: FieldHelpProps) {
  return (
    <div
      {...props}
      data-slot="help"
      className={["hashti-field__help hashti-field-help", className].filter(Boolean).join(" ")}
    />
  );
}

export type FieldInputProps = ComponentProps<typeof Input>;
export function FieldInput({ className, ...props }: FieldInputProps) {
  return (
    <Input {...props} className={classes("hashti-field__control react-aria-Input", className)} />
  );
}

export function FieldGroupInput({ className, ...props }: FieldInputProps) {
  return <Input {...props} className={classes("react-aria-Input", className)} />;
}

export type FieldTextAreaProps = ComponentProps<typeof TextArea>;
export function FieldTextArea({ className, ...props }: FieldTextAreaProps) {
  return (
    <TextArea
      {...props}
      className={classes("hashti-field__control react-aria-TextArea", className)}
    />
  );
}

export type FieldControlProps = ComponentProps<typeof Group>;
export function FieldControl({ className, children, ...props }: FieldControlProps) {
  const context = useSlottedContext(GroupContext, props.slot);
  return (
    <Group
      {...props}
      data-slot="control"
      className={classes("hashti-field__control hashti-input-group", className)}
    >
      {composeRenderProps(children === undefined ? context?.children : children, (content) => (
        <>
          {content}
          <FieldStatusIcon />
        </>
      ))}
    </Group>
  );
}

export function FieldButton({ size = "md", ...props }: ButtonProps) {
  return <Button variant="ghost" iconOnly {...props} size={size} />;
}

export type FieldDateInputProps = ComponentProps<typeof DateInput>;
export function FieldDateInput({ className, ...props }: FieldDateInputProps) {
  return (
    <DateInput
      {...props}
      className={classes("hashti-field__control react-aria-DateInput", className)}
    />
  );
}

export function FieldGroupDateInput({ className, ...props }: FieldDateInputProps) {
  return <DateInput {...props} className={classes("react-aria-DateInput", className)} />;
}

export const fieldParts = {
  Label: FieldLabel,
  Description: FieldDescription,
  Help: FieldHelp,
  ErrorMessage: FieldErrorMessage,
  Status: FieldStatusMessage,
  StatusIcon: FieldStatusIcon,
};
