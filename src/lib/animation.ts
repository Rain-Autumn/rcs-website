export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export const lerp = (start: number, end: number, amount: number) =>
  start + (end - start) * amount;

function cleanZero(value: number): number {
  return Object.is(value, -0) ? 0 : value;
}

export function normalizePointer(
  clientX: number,
  clientY: number,
  width: number,
  height: number,
) {
  const x = clamp(
    (clientX / Math.max(width, 1)) * 2 - 1,
    -1,
    1,
  );

  const y = clamp(
    -((clientY / Math.max(height, 1)) * 2 - 1),
    -1,
    1,
  );

  return {
    x: cleanZero(x),
    y: cleanZero(y),
  };
}
