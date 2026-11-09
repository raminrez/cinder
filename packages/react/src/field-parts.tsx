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
import { Button, type ButtonProps } from "./buttons";
import { Icon, type IconProps } from "./icons";
import { Dialog, Popover, Tooltip } from "./overlays";
import { classes } from "./utils";

export interface FieldStatus {
  /** Presentation only. Use RAC isInvalid or Form validationErrors for validation. */
  type: "warning" | "error" | "success";
  message?: ReactNode;
}

export interface FieldPresentationProps {
  status?: FieldStatus;
  isOptional?: boolean;
}

const FieldPresentationContext = createContext<
  FieldPresentationProps & { statusRef?: RefCallback<HTMLElement>; isRequired?: boolean }
>({});

export function useFieldPresentation(
  {
    status,
    isOptional,
    "aria-describedby": describedBy,
  }: FieldPresentationProps & { "aria-describedby"?: string },
  inheritedDescription?: string,
) {
  const description = describedBy ?? inheritedDescription;
  const [statusId, setStatusId] = useState<string>();
  const statusRef = useCallback((node: HTMLElement | null) => setStatusId(node?.id), []);
  return {
    props: {
      "data-cinder-status": status?.type,
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
            value={{ status, statusRef, isOptional, isRequired: state.isRequired }}
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
      {...props}
      className={["cinder-field__label react-aria-Label", className].filter(Boolean).join(" ")}
    >
      {labelTooltip ? <span id={id}>{content}</span> : content}
      {(required || optional) && (
        <>
          {" "}
          <span className="cinder-field__necessity">
            ({required ? messages.required : messages.optional})
          </span>
        </>
      )}
    </Label>
  );
  return labelTooltip ? (
    <div className="cinder-field__label-row">
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

export function FieldLabelHelp({
  labelId,
  content,
  tooltip,
  children,
}: FieldLabelHelpProps) {
  const messages = useFieldMessages();
  const prefixId = useId();
  const fallbackId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const targetLabelId = labelId ?? fallbackId;
  const labelledBy = `${prefixId} ${targetLabelId}`;
  const tooltipContent = tooltip ?? content;
  const popoverContent = children ?? content;

  return (
    <ButtonContext.Provider value={null}>
      <span id={prefixId} className="cinder-visually-hidden">
        {messages.about}
      </span>
      <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
        <TooltipTrigger isDisabled={isOpen}>
          <Button
            type="button"
            variant="ghost"
            iconOnly
            size="sm"
            aria-labelledby={labelledBy}
            className="cinder-field__label-help"
          >
            <Icon name="info" />
          </Button>
          {tooltipContent && <Tooltip>{tooltipContent}</Tooltip>}
        </TooltipTrigger>
        <Popover placement="bottom start" offset={6} className="cinder-field__label-popover">
          <Dialog aria-labelledby={labelledBy}>
            {typeof popoverContent === "string" ? <p>{popoverContent}</p> : popoverContent}
            <Button variant="ghost" size="sm" slot="close">
              {messages.close}
            </Button>
          </Dialog>
        </Popover>
      </DialogTrigger>
    </ButtonContext.Provider>
  );
}

export type FieldStatusProps = Omit<ComponentProps<typeof Text>, "children" | "slot" | "id">;
export function FieldStatusMessage({ className, ...props }: FieldStatusProps) {
  const { status, statusRef } = useContext(FieldPresentationContext);
  const validation = useContext(FieldErrorContext);
  const messages = useFieldMessages();
  const statusId = useId();
  if (!status || validation?.isInvalid) return null;
  return (
    <TextContext.Provider value={{ ref: statusRef }}>
      <Text
        {...props}
        id={statusId}
        data-cinder-status={status.type}
        className={[
          "cinder-field__status",
          status.message == null && "cinder-visually-hidden",
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
      data-cinder-status={type}
      aria-hidden="true"
      className={["cinder-field__status-icon", className].filter(Boolean).join(" ")}
    />
  ) : null;
}

export type FieldDescriptionProps = ComponentProps<typeof Text>;
export function FieldDescription({ className, ...props }: FieldDescriptionProps) {
  return (
    <Text
      slot="description"
      {...props}
      className={["cinder-field__description react-aria-Text", className].filter(Boolean).join(" ")}
    />
  );
}

export type FieldErrorMessageProps = ComponentProps<typeof FieldError>;
export function FieldErrorMessage({ className, ...props }: FieldErrorMessageProps) {
  return (
    <FieldError
      {...props}
      className={classes("cinder-field__error react-aria-FieldError", className)}
    />
  );
}

export type FieldHelpProps = ComponentProps<"div">;
export function FieldHelp({ className, ...props }: FieldHelpProps) {
  return (
    <div
      {...props}
      className={["cinder-field__help cinder-field-help", className].filter(Boolean).join(" ")}
    />
  );
}

export type FieldInputProps = ComponentProps<typeof Input>;
export function FieldInput({ className, ...props }: FieldInputProps) {
  return (
    <Input {...props} className={classes("cinder-field__control react-aria-Input", className)} />
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
      className={classes("cinder-field__control react-aria-TextArea", className)}
    />
  );
}

export type FieldControlProps = ComponentProps<typeof Group>;
export function FieldControl({ className, children, ...props }: FieldControlProps) {
  const context = useSlottedContext(GroupContext, props.slot);
  return (
    <Group {...props} className={classes("cinder-field__control cinder-input-group", className)}>
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
      className={classes("cinder-field__control react-aria-DateInput", className)}
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
