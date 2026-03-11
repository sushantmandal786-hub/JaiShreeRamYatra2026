"use client";

import { useEffect } from "react";
import gsap from "gsap";

function animateIn(element: HTMLElement, delay = 0) {
  gsap.to(element, {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    duration: 0.9,
    ease: "power3.out",
    delay
  });
}

export function useScrollAnimations() {
  useEffect(() => {
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const popElements = Array.from(document.querySelectorAll<HTMLElement>("[data-pop]"));

    const all = [...revealElements, ...popElements];
    all.forEach((element) => {
      gsap.set(element, {
        opacity: 0,
        y: element.dataset.pop ? 20 : 48,
        filter: "blur(8px)",
        scale: element.dataset.pop ? 0.97 : 1
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const element = entry.target as HTMLElement;
          const sequence = Number(element.dataset.sequence ?? 0);
          const delay = sequence * 0.08;

          animateIn(element, delay);
          observer.unobserve(element);
        });
      },
      {
        root: null,
        threshold: 0.2,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    all.forEach((element) => observer.observe(element));

    const heroElements = Array.from(document.querySelectorAll<HTMLElement>("[data-hero-reveal]"));
    if (heroElements.length > 0) {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroElements.forEach((el, index) => {
        tl.fromTo(
          el,
          { y: 24, opacity: 0, filter: "blur(6px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.9 },
          index === 0 ? 0 : "<0.12"
        );
      });
    }

    return () => observer.disconnect();
  }, []);
}
