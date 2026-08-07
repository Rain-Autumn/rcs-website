'use client';

import { useSyncExternalStore } from 'react';

export type PerformanceTier = 'full' | 'lite';

type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
};

function getPerformanceTier(): PerformanceTier {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return 'lite';
  }

  const nav = navigator as NavigatorWithHints;

  const isNarrow = window.matchMedia('(max-width: 760px)').matches;
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
  const lowMemory =
    typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 4;
  const lowCpu =
    navigator.hardwareConcurrency > 0 &&
    navigator.hardwareConcurrency <= 4;

  return !isNarrow && hasFinePointer && !lowMemory && !lowCpu
    ? 'full'
    : 'lite';
}

function subscribe(callback: () => void): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const narrowQuery = window.matchMedia('(max-width: 760px)');
  const pointerQuery = window.matchMedia('(pointer: fine)');

  narrowQuery.addEventListener('change', callback);
  pointerQuery.addEventListener('change', callback);

  return () => {
    narrowQuery.removeEventListener('change', callback);
    pointerQuery.removeEventListener('change', callback);
  };
}

export function usePerformanceTier(): PerformanceTier {
  return useSyncExternalStore(
    subscribe,
    getPerformanceTier,
    () => 'lite',
  );
}
