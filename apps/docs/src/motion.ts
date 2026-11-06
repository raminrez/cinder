import { useEffect } from "react";

/** One-shot entrances enhance already-visible content; no hidden CSS state. */
export function useHomeMotion() {
  useEffect(() => {
    const page = document.querySelector<HTMLElement>(".home-page");
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    if (
      !page ||
      preference.matches ||
      !("IntersectionObserver" in window) ||
      !Element.prototype.animate
    )
      return;

    const tokens = getComputedStyle(page);
    const easing = tokens.getPropertyValue("--cinder-ease-entrance-expressive").trim();
    // The production CSS minifier may shorten 700ms to .7s. Web Animations
    // always expects milliseconds, regardless of the token's serialized unit.
    const milliseconds = (name: string) => {
      const value = tokens.getPropertyValue(name).trim();
      return parseFloat(value) * (value.endsWith("ms") ? 1 : 1000);
    };
    const slow = milliseconds("--cinder-duration-slow-02");
    const quick = milliseconds("--cinder-duration-slow-01");
    const running = new Map<Element, Animation>();
    const observer = new IntersectionObserver(
      (entries) => {
        let order = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target;
          observer.unobserve(element);
          if (element.contains(document.activeElement)) continue;
          const picture = element.matches(
            ".feature-specimen, .specimen-reveal, .foundation-bottom",
          );
          const heading = element.matches(".hero-line, h2, .footer-wordmark");
          const animation = element.animate(
            [
              {
                opacity: heading ? 1 : 0.5,
                transform: picture
                  ? "translateY(20px) scale(.985)"
                  : `translateY(${heading ? 24 : 16}px)`,
              },
              { opacity: 1, transform: "none" },
            ],
            {
              duration: picture || heading ? slow : quick,
              delay: (order++ % 3) * 70,
              easing,
              fill: "backwards",
            },
          );
          running.set(element, animation);
          animation.onfinish = () => running.delete(element);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" },
    );

    document
      .querySelectorAll(".home-page [data-reveal], .site-footer [data-reveal]")
      .forEach((element) => observer.observe(element));
    // Keyboard users get the stable final position immediately on focus.
    const settleFocus = (event: FocusEvent) => {
      for (const [element, animation] of running) {
        if (event.target instanceof Node && element.contains(event.target)) {
          animation.cancel();
          running.delete(element);
        }
      }
    };
    const stop = () => {
      observer.disconnect();
      for (const animation of running.values()) animation.cancel();
      running.clear();
    };
    const onPreference = () => {
      if (preference.matches) stop();
    };
    document.addEventListener("focusin", settleFocus);
    preference.addEventListener("change", onPreference);
    return () => {
      stop();
      document.removeEventListener("focusin", settleFocus);
      preference.removeEventListener("change", onPreference);
    };
  }, []);
}
