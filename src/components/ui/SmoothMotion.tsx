'use client';

import { useEffect } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function SmoothMotion() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const root = document.documentElement;

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(
        '[data-reveal]',
      ),
    );

    root.classList.add('motion-ready');

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          (
            entry.target as HTMLElement
          ).classList.add('is-revealed');

          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.05,
      },
    );

    for (const element of elements) {
      const rect = element.getBoundingClientRect();

      if (rect.top < window.innerHeight * 0.92) {
        element.classList.add('is-revealed');
      } else {
        observer.observe(element);
      }
    }

    return () => {
      observer.disconnect();
      root.classList.remove('motion-ready');
    };
  }, [reducedMotion]);

  return null;
}
