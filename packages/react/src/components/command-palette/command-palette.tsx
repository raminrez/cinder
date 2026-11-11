"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  isValidElement,
  type ChangeEvent,
  type ReactNode,
  type Ref,
} from "react";
import type { Key } from "react-aria-components";
import { Modal, Dialog, type ModalProps } from "../../overlays";
import { ListBox, type ListBoxItemProps } from "../../list-box";
import { Kbd } from "../../kbd";
import { Icon } from "../../icons";
import { classes, cx } from "../../utils";

export interface CommandPaletteContextValue {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  query: string;
  setQuery: (query: string) => void;
  closeOnSelect: boolean;
}

export const CommandPaletteContext = createContext<CommandPaletteContextValue | null>(null);

export function useCommandPaletteContext(): CommandPaletteContextValue {
  const ctx = useContext(CommandPaletteContext);
  if (!ctx) {
    throw new Error("CommandPalette subcomponents must be used within CommandPalette.Root");
  }
  return ctx;
}

export interface CommandPaletteRootProps {
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  enableShortcut?: boolean;
  shortcutKey?: string;
  closeOnSelect?: boolean;
  query?: string;
  defaultQuery?: string;
  onQueryChange?: (query: string) => void;
  children?: ReactNode;
}

export function CommandPaletteRoot({
  isOpen: controlledIsOpen,
  defaultOpen = false,
  onOpenChange,
  enableShortcut = true,
  shortcutKey = "k",
  closeOnSelect = true,
  query: controlledQuery,
  defaultQuery = "",
  onQueryChange,
  children,
}: CommandPaletteRootProps) {
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(defaultOpen);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : uncontrolledIsOpen;

  const setIsOpen = useCallback(
    (nextOpen: boolean | ((prev: boolean) => boolean)) => {
      setUncontrolledIsOpen((current) => {
        const actualCurrent = controlledIsOpen !== undefined ? controlledIsOpen : current;
        const value = typeof nextOpen === "function" ? nextOpen(actualCurrent) : nextOpen;
        onOpenChange?.(value);
        return controlledIsOpen === undefined ? value : current;
      });
    },
    [controlledIsOpen, onOpenChange],
  );

  const [uncontrolledQuery, setUncontrolledQuery] = useState(defaultQuery);
  const query = controlledQuery !== undefined ? controlledQuery : uncontrolledQuery;

  const setQuery = useCallback(
    (nextQuery: string) => {
      if (controlledQuery === undefined) {
        setUncontrolledQuery(nextQuery);
      }
      onQueryChange?.(nextQuery);
    },
    [controlledQuery, onQueryChange],
  );

  useEffect(() => {
    if (!enableShortcut) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;
      if (isCmdOrCtrl && e.key.toLowerCase() === shortcutKey.toLowerCase()) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enableShortcut, shortcutKey, setIsOpen]);

  return (
    <CommandPaletteContext.Provider
      value={{
        isOpen,
        setIsOpen,
        query,
        setQuery,
        closeOnSelect,
      }}
    >
      {children}
    </CommandPaletteContext.Provider>
  );
}

export interface CommandPaletteDialogProps extends Omit<ModalProps, "children"> {
  children: ReactNode;
  "aria-label"?: string;
  dialogClassName?: string;
}

export function CommandPaletteDialog({
  children,
  className,
  overlayClassName,
  dialogClassName,
  "aria-label": ariaLabel = "Command Palette",
  ref,
  ...props
}: CommandPaletteDialogProps) {
  const { isOpen, setIsOpen } = useCommandPaletteContext();

  return (
    <Modal
      {...props}
      ref={ref}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      overlayClassName={classes("cinder-command-palette-overlay", overlayClassName)}
      className={classes("cinder-command-palette-modal", className)}
    >
      <Dialog
        aria-label={ariaLabel}
        className={cx("cinder-command-palette-dialog", dialogClassName)}
      >
        {children}
      </Dialog>
    </Modal>
  );
}
CommandPaletteDialog.displayName = "CommandPaletteDialog";

export interface CommandPaletteInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  autoFocus?: boolean;
  ref?: Ref<HTMLInputElement>;
}

export function CommandPaletteInput({
  placeholder = "Type a command or search...",
  value: propValue,
  onChange: propOnChange,
  className,
  autoFocus = true,
  ref,
  ...props
}: CommandPaletteInputProps) {
  const { query, setQuery, setIsOpen } = useCommandPaletteContext();
  const currentQuery = propValue !== undefined ? propValue : query;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    propOnChange?.(e);
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape" && currentQuery) {
      e.stopPropagation();
      setQuery("");
    } else if (e.key === "Escape" && !currentQuery) {
      setIsOpen(false);
    }
  };

  return (
    <div className={cx("cinder-command-palette__input-wrapper", className)}>
      <span className="cinder-command-palette__search-icon" aria-hidden="true">
        <Icon name="search" size={16} />
      </span>
      <input
        {...props}
        ref={(node) => {
          (inputRef as any).current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            (ref as any).current = node;
          }
        }}
        type="text"
        role="searchbox"
        aria-label="Search commands"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        value={currentQuery}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="cinder-command-palette__input"
      />
      {currentQuery ? (
        <button
          type="button"
          aria-label="Clear search"
          className="cinder-command-palette__clear"
          onClick={handleClear}
        >
          <Icon name="close" size={16} />
        </button>
      ) : (
        <Kbd keys={["esc"]} className="cinder-command-palette__input-kbd" />
      )}
    </div>
  );
}

export interface CommandPaletteListProps<T extends object = object> {
  children?: ReactNode;
  className?: string;
  items?: Iterable<T>;
  onAction?: (key: Key) => void;
  emptyContent?: ReactNode;
  "aria-label"?: string;
  ref?: Ref<HTMLDivElement>;
}

export function CommandPaletteList<T extends object = object>({
  children,
  className,
  items,
  onAction,
  emptyContent,
  "aria-label": ariaLabel = "Commands",
  ref,
}: CommandPaletteListProps<T>) {
  const { closeOnSelect, setIsOpen } = useCommandPaletteContext();

  return (
    <ListBox.Root<T>
      ref={ref}
      aria-label={ariaLabel}
      items={items}
      selectionMode="single"
      variant="flat"
      emptyContent={emptyContent}
      onAction={(key) => {
        onAction?.(key);
        if (closeOnSelect) {
          setIsOpen(false);
        }
      }}
      className={cx("cinder-command-palette__list", className)}
    >
      {children}
    </ListBox.Root>
  );
}

export interface CommandPaletteGroupProps {
  heading?: ReactNode;
  title?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function CommandPaletteGroup({
  heading,
  title,
  children,
  className,
}: CommandPaletteGroupProps) {
  const headerContent = heading ?? title;

  return (
    <ListBox.Section className={cx("cinder-command-palette__group", className)}>
      {headerContent && (
        <ListBox.Header className="cinder-command-palette__group-header">
          {headerContent}
        </ListBox.Header>
      )}
      {children}
    </ListBox.Section>
  );
}

export interface CommandPaletteItemProps<T extends object = object>
  extends Omit<ListBoxItemProps<T>, "children" | "onAction"> {
  icon?: ReactNode;
  shortcut?: string | string[];
  addon?: ReactNode;
  description?: ReactNode;
  onAction?: () => void;
  onSelect?: () => void;
  children?: ReactNode;
}

export function CommandPaletteItem<T extends object = object>({
  icon,
  shortcut,
  addon,
  description,
  onAction,
  onSelect,
  children,
  className,
  ...props
}: CommandPaletteItemProps<T>) {
  const { closeOnSelect, setIsOpen } = useCommandPaletteContext();

  const handleAction = () => {
    onAction?.();
    onSelect?.();
    if (closeOnSelect) {
      setIsOpen(false);
    }
  };

  const resolvedClassName =
    typeof className === "function"
      ? (values: any) => cx("cinder-command-palette__item", className(values))
      : cx("cinder-command-palette__item", className);

  return (
    <ListBox.Item
      {...props}
      onAction={handleAction}
      className={resolvedClassName}
    >
      <div className="cinder-command-palette__item-content">
        {icon && <span className="cinder-command-palette__item-icon">{icon}</span>}
        <div className="cinder-command-palette__item-text">
          <span className="cinder-command-palette__item-title">{children}</span>
          {description && (
            <span className="cinder-command-palette__item-desc">{description}</span>
          )}
        </div>
      </div>
      {(shortcut || addon) && (
        <div className="cinder-command-palette__item-extra">
          {addon}
          {shortcut && <Kbd keys={shortcut} className="cinder-command-palette__kbd" />}
        </div>
      )}
    </ListBox.Item>
  );
}

export interface CommandPaletteEmptyProps {
  children?: ReactNode;
  className?: string;
  icon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
}

export function CommandPaletteEmpty({
  children,
  className,
  icon,
  title,
  description,
}: CommandPaletteEmptyProps) {
  if (children) {
    return (
      <div className={cx("cinder-command-palette__empty", className)}>
        {children}
      </div>
    );
  }

  return (
    <div className={cx("cinder-command-palette__empty", className)}>
      <div className="cinder-command-palette__empty-icon" aria-hidden="true">
        {icon ?? <Icon name="search" size={24} />}
      </div>
      <div className="cinder-command-palette__empty-title">
        {title ?? "No results found"}
      </div>
      {description && (
        <div className="cinder-command-palette__empty-desc">{description}</div>
      )}
    </div>
  );
}

export interface CommandPaletteFooterProps {
  children?: ReactNode;
  className?: string;
}

export function CommandPaletteFooter({
  children,
  className,
}: CommandPaletteFooterProps) {
  if (children) {
    return (
      <footer className={cx("cinder-command-palette__footer", className)}>
        {children}
      </footer>
    );
  }

  return (
    <footer className={cx("cinder-command-palette__footer", className)}>
      <div className="cinder-command-palette__shortcut-item">
        <Kbd keys={["up", "down"]} />
        <span>Navigate</span>
      </div>
      <div className="cinder-command-palette__shortcut-item">
        <Kbd keys={["enter"]} />
        <span>Select</span>
      </div>
      <div className="cinder-command-palette__shortcut-item">
        <Kbd keys={["escape"]} />
        <span>Dismiss</span>
      </div>
    </footer>
  );
}

export interface CommandPaletteProps extends CommandPaletteRootProps {
  placeholder?: string;
  emptyContent?: ReactNode;
  footer?: ReactNode;
  dialogClassName?: string;
}

function CommandPaletteDefault({
  isOpen,
  defaultOpen,
  onOpenChange,
  enableShortcut = true,
  shortcutKey = "k",
  closeOnSelect = true,
  query,
  defaultQuery,
  onQueryChange,
  placeholder,
  emptyContent,
  footer,
  dialogClassName,
  children,
  ...props
}: CommandPaletteProps) {
  const hasDialog =
    isValidElement(children) &&
    (children.type === CommandPaletteDialog ||
      (children.type as any)?.displayName === "CommandPaletteDialog");

  return (
    <CommandPaletteRoot
      isOpen={isOpen}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      enableShortcut={enableShortcut}
      shortcutKey={shortcutKey}
      closeOnSelect={closeOnSelect}
      query={query}
      defaultQuery={defaultQuery}
      onQueryChange={onQueryChange}
    >
      {hasDialog ? (
        children
      ) : (
        <CommandPaletteDialog className={dialogClassName} {...props}>
          {children}
        </CommandPaletteDialog>
      )}
    </CommandPaletteRoot>
  );
}

export const CommandPalette = Object.assign(CommandPaletteDefault, {
  Root: CommandPaletteRoot,
  Dialog: CommandPaletteDialog,
  Input: CommandPaletteInput,
  List: CommandPaletteList,
  Group: CommandPaletteGroup,
  Item: CommandPaletteItem,
  Empty: CommandPaletteEmpty,
  Footer: CommandPaletteFooter,
  Kbd,
});
