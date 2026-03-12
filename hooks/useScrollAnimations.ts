"use client";

import { useEffect } from "react";
import gsap from "gsap";

function animateIn(element: HTMLElement, delay = 0) {
  const isPop = Boolean(element.dataset.pop);
  gsap.to(element, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: isPop ? 1.24 : 1.4,
    ease: "power2.out",
    delay
  });
}

function animateOut(element: HTMLElement) {
  const isPop = Boolean(element.dataset.pop);
  gsap.to(element, {
    opacity: 0,
    y: isPop ? 24 : 46,
    scale: isPop ? 0.96 : 0.985,
    duration: 0.62,
    ease: "power2.inOut",
    overwrite: "auto"
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
        y: element.dataset.pop ? 24 : 46,
        scale: element.dataset.pop ? 0.96 : 0.985,
        force3D: true
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            const sequence = Number(element.dataset.sequence ?? 0);
            const delay = sequence * 0.08;
            animateIn(element, delay);
          } else {
            animateOut(element);
          }
        });
      },
      {
        root: null,
        threshold: 0.2,
        rootMargin: "0px 0px -5% 0px"
      }
    );

    all.forEach((element) => observer.observe(element));

    const heroElements = Array.from(document.querySelectorAll<HTMLElement>("[data-hero-reveal]"));
    if (heroElements.length > 0) {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroElements.forEach((el, index) => {
        tl.fromTo(
          el,
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.22 },
          index === 0 ? 0 : "<0.14"
        );
      });
    }

    return () => observer.disconnect();
  }, []);
}
