import { useEffect } from "react";

/** Replay viewport entrances in the current scrolling direction. */
export function useScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let previousY = window.scrollY;
    let direction = "down";
    const observed = new Set<HTMLElement>();
    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY !== previousY) direction = currentY > previousY ? "down" : "up";
      previousY = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const element = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          element.dataset["revealDirection"] = direction;
          element.classList.add("reveal-visible");
        } else {
          element.classList.remove("reveal-visible");
          element.dataset["revealDirection"] = entry.boundingClientRect.top < 0 ? "up" : "down";
        }
      }
    }, { threshold: 0.06 });

    const register = () => {
      document.querySelectorAll<HTMLElement>(
        ".hero-copy > *, .section-heading, .feature-list article, .track-filter, .agenda-date, .schedule-list article, .speaker-card, .gallery-stage, footer > *",
      ).forEach((element) => {
        if (observed.has(element)) return;
        observed.add(element);
        element.dataset["revealDirection"] = "down";
        element.classList.add("scroll-reveal");
        observer.observe(element);
      });
    };
    register();
    const mutations = new MutationObserver(register);
    const main = document.querySelector("main");
    if (main) mutations.observe(main, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      mutations.disconnect();
      observer.disconnect();
      observed.forEach((element) => element.classList.remove("scroll-reveal", "reveal-visible"));
    };
  }, []);
}