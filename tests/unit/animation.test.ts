import { describe, expect, it } from 'vitest';
import { clamp, lerp, normalizePointer } from '@/lib/animation';

describe('animation helpers', () => {
  it('clamps values', () => {
    expect(clamp(4, 0, 2)).toBe(2);
    expect(clamp(-1, 0, 2)).toBe(0);
  });

  it('interpolates values', () => {
    expect(lerp(0, 10, 0.25)).toBe(2.5);
  });

  it('normalizes pointer coordinates', () => {
    expect(normalizePointer(50, 25, 100, 50)).toEqual({ x: 0, y: 0 });
  });
});
