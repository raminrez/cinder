import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  Button,
  Dialog,
  Heading,
  Icon,
  Link,
  Menu,
  MenuItem,
  MenuTrigger,
  Modal,
  Popover,
  SearchField,
  type ThemeName,
} from "@cinder/react";
import { isThemeName, themeNames } from "@cinder/tokens";
import { components } from "./catalog";

export const themeLabels: Record<ThemeName, string> = {
  white: "White",
  g10: "Gray 10",
  g90: "Gray 90",
  g100: "Gray 100",
};
export const ThemePreference = createContext<{
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}>({ theme: "g10", setTheme: () => {} });
export const useThemePreference = () => useContext(ThemePreference);

function ThemeMenu() {
  const { theme, setTheme } = useThemePreference();
  return (
    <MenuTrigger>
      <Button
        variant="ghost"
        size="md"
        iconOnly
        aria-label={`Change theme, current theme ${themeLabels[theme]}`}
      >
        <Icon name={theme === "white" || theme === "g10" ? "sun" : "moon"} size={20} />
      </Button>
      <Popover placement="bottom end">
        <Menu
          aria-label="Color theme"
          selectionMode="single"
          selectedKeys={[theme]}
          onAction={(key) => {
            if (isThemeName(key)) setTheme(key);
          }}
        >
          {themeNames.map((name) => (
            <MenuItem id={name} key={name} textValue={themeLabels[name]}>
              <span className={`theme-dot theme-dot-${name}`} />
              {themeLabels[name]}
            </MenuItem>
          ))}
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}

function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
  const matches = components.filter((item) =>
    `${item.name} ${item.category}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <Button
        className="site-search-trigger"
        variant="ghost"
        size="md"
        aria-label="Search ⌘ K"
        aria-keyshortcuts="Meta+k Control+k"
        onPress={() => setOpen(true)}
      >
        <Icon name="search" />
        <span>Search</span>
        <span className="search-shortcut" aria-hidden="true">
          ⌘ K
        </span>
      </Button>
      <Modal isOpen={open} onOpenChange={setOpen} isDismissable size="sm">
        <Dialog>
          <Heading slot="title">Find a component</Heading>
          <Button slot="close" variant="ghost" size="md" iconOnly aria-label="Close search">
            <Icon name="close" />
          </Button>
          <SearchField
            autoFocus
            aria-label="Find components"
            placeholder="Search by name or category"
            value={query}
            onChange={setQuery}
          />
          <div className="command-results">
            {matches.length ? (
              matches.map((item) => (
                <Link href={`/components/${item.slug}`} key={item.slug}>
                  <span>{item.name}</span>
                  <span>{item.category}</span>
                </Link>
              ))
            ) : (
              <p>No components match “{query}”.</p>
            )}
          </div>
        </Dialog>
      </Modal>
    </>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const path = window.location.pathname;
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <Link href="/" className="wordmark" aria-label="Cinder home">
          <svg
            className="brand-symbol"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path fill="currentColor" d="M0 0h24v24H0z" />
            <path fill="var(--cinder-background)" d="M6 6h12v4h-8v4h8v4H6z" />
          </svg>
          Cinder
        </Link>
        <nav aria-label="Main navigation" className={menuOpen ? "site-nav is-open" : "site-nav"}>
          <Link
            href="/components"
            aria-current={path.startsWith("/components") ? "page" : undefined}
          >
            Components
          </Link>
          <Link href="/foundations" aria-current={path === "/foundations" ? "page" : undefined}>
            Foundations
          </Link>
          <Link href="/research" aria-current={path === "/research" ? "page" : undefined}>
            Research
          </Link>
        </nav>
        <div className="site-header-actions">
          <SiteSearch />
          <ThemeMenu />
          <Link href="/get-started" className="header-start">
            Get started <Icon name="arrowRight" />
          </Link>
          <Button
            className="mobile-menu-button"
            variant="ghost"
            size="md"
            iconOnly
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onPress={() => setMenuOpen((value) => !value)}
          >
            <Icon name={menuOpen ? "close" : "menu"} size={20} />
          </Button>
        </div>
      </header>
    </>
  );
}

export function SiteFooter({ compact = false }: { compact?: boolean }) {
  return (
    <footer className={compact ? "site-footer compact-footer" : "site-footer"}>
      <div className="footer-top">
        <div data-reveal>
          <h2>Make it your own.</h2>
          <Link href="/get-started" className="footer-action">
            Start with Cinder <Icon name="arrowRight" size={20} />
          </Link>
        </div>
        <nav aria-label="Upstream projects" data-reveal>
          <Link href="https://carbondesignsystem.com">
            Carbon Design System <Icon name="external" />
          </Link>
          <Link href="https://react-aria.adobe.com">
            React Aria Components <Icon name="external" />
          </Link>
          <Link href="https://bun.com">
            Bun <Icon name="external" />
          </Link>
        </nav>
      </div>
      <div className="footer-credits" data-reveal>
        <p>An independent implementation. A shared design language.</p>
        <Link href="/research">Sources & implementation notes</Link>
      </div>
      {!compact && (
        <div className="footer-wordmark" aria-hidden="true" data-reveal>
          Cinder
        </div>
      )}
    </footer>
  );
}

export function PageIntro({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="page-intro">
      <h1>{title}</h1>
      <p>{children}</p>
    </div>
  );
}
