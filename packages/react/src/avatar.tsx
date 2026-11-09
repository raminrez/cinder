"use client";

import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useRef,
  useState,
  type ComponentPropsWithRef,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
import { Icon } from "./icons";
import { cx } from "./utils";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarPresence = "online" | "offline" | "away" | "busy" | "dnd";

const AvatarGroupContext = createContext<{
  size?: AvatarSize;
} | null>(null);

export interface AvatarProps extends ComponentPropsWithRef<"div"> {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  presence?: AvatarPresence;
  presenceLabel?: string;
  fallback?: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

/** Extracts grapheme-safe initials (supporting Persian/Arabic grapheme clusters). */
export function getInitials(name: string, locale?: string): string {
  const trimmed = name.trim();
  if (!trimmed) return "";
  const parts = trimmed.split(/\s+/);
  const firstWord = parts[0] ?? "";
  const lastWord = parts[parts.length - 1] ?? "";

  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter(locale ?? "und", { granularity: "grapheme" });
    const getFirstGrapheme = (str: string) => {
      const segments = Array.from(segmenter.segment(str));
      return segments[0]?.segment ?? "";
    };
    if (parts.length === 1) {
      return getFirstGrapheme(firstWord);
    }
    return getFirstGrapheme(firstWord) + getFirstGrapheme(lastWord);
  }

  // Fallback
  if (parts.length === 1) return Array.from(firstWord)[0] ?? "";
  return (Array.from(firstWord)[0] ?? "") + (Array.from(lastWord)[0] ?? "");
}

export function Avatar({
  src,
  alt = "",
  name,
  size: sizeProp,
  presence,
  presenceLabel,
  fallback,
  className,
  ref,
  ...props
}: AvatarProps) {
  const groupContext = useContext(AvatarGroupContext);
  const size = sizeProp ?? groupContext?.size ?? "md";
  const [imageFailed, setImageFailed] = useState(false);

  const initials = name ? getInitials(name, props.lang) : undefined;
  const showImage = Boolean(src && !imageFailed);

  return (
    <div
      {...props}
      ref={ref}
      role="img"
      aria-label={props["aria-label"] ?? name ?? alt ?? "Avatar"}
      data-size={size}
      className={cx("cinder-avatar", className)}
    >
      <div className="cinder-avatar-inner">
        {showImage ? (
          <img
            src={src}
            alt={alt}
            onError={() => setImageFailed(true)}
          />
        ) : initials ? (
          <span aria-hidden="true">{initials}</span>
        ) : fallback ? (
          fallback
        ) : (
          <Icon name="user" size={size === "xs" || size === "sm" ? 16 : 20} />
        )}
      </div>

      {presence && (
        <span
          className="cinder-avatar-presence"
          data-status={presence}
          role="status"
          aria-label={presenceLabel ?? presence}
        />
      )}
    </div>
  );
}

export interface AvatarGroupProps extends ComponentPropsWithRef<"div"> {
  size?: AvatarSize;
  max?: number;
  overflowRenderer?: (count: number) => ReactNode;
  ref?: Ref<HTMLDivElement>;
}

export function AvatarGroup({
  size = "md",
  max,
  overflowRenderer,
  children,
  className,
  ref,
  ...props
}: AvatarGroupProps) {
  const allChildren = Children.toArray(children).filter(isValidElement);
  const total = allChildren.length;
  const visibleCount = max != null && max < total ? max : total;
  const overflowCount = total - visibleCount;

  const visibleChildren = allChildren.slice(0, visibleCount);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    const focusable = containerRef.current?.querySelectorAll<HTMLElement>('[tabindex="0"], [tabindex="-1"]');
    if (!focusable || focusable.length === 0) return;

    const list = Array.from(focusable);
    const currentIndex = list.indexOf(document.activeElement as HTMLElement);
    if (currentIndex === -1) return;

    event.preventDefault();
    const nextIndex =
      event.key === "ArrowRight"
        ? (currentIndex + 1) % list.length
        : (currentIndex - 1 + list.length) % list.length;
    list[nextIndex]?.focus();
  };

  return (
    <AvatarGroupContext.Provider value={{ size }}>
      <div
        {...props}
        ref={ref ?? containerRef}
        role="group"
        onKeyDown={handleKeyDown}
        className={cx("cinder-avatar-group", className)}
      >
        {visibleChildren.map((child, index) => {
          const el = child as ReactElement<{ tabIndex?: number }>;
          return cloneElement(el, {
            tabIndex: index === 0 ? 0 : -1,
            key: el.key ?? index,
          });
        })}

        {overflowCount > 0 && (
          <span className="cinder-avatar-group-count" aria-label={`${overflowCount} more members`}>
            {overflowRenderer ? overflowRenderer(overflowCount) : `+${overflowCount}`}
          </span>
        )}
      </div>
    </AvatarGroupContext.Provider>
  );
}
