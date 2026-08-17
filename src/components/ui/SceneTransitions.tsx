"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const DESKTOP_SCENES = "(min-width: 900px)";
const TEXT_CANDIDATES = "h1, h2, h3, p, li, dt, dd, strong, small, span";
const EXIT_TIME = 210;
const ENTER_TIME = 240;

type SceneOverlay = {
  lines: HTMLSpanElement[];
  sources: HTMLElement[];
};

function wait(duration: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, duration));
}

function nextFrame() {
  return new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => resolve()));
  });
}

function textNodeFor(element: HTMLElement) {
  if (element.children.length > 0) return null;

  const nodes = Array.from(element.childNodes).filter(
    (node): node is Text =>
      node.nodeType === Node.TEXT_NODE && Boolean(node.textContent?.trim()),
  );

  return nodes.length === 1 ? nodes[0] : null;
}

function lineRanges(node: Text) {
  const text = node.data;
  const words = Array.from(text.matchAll(/\S+/g));
  const grouped: Array<{ start: number; end: number; top: number }> = [];

  for (const word of words) {
    const start = word.index ?? 0;
    const range = document.createRange();
    range.setStart(node, start);
    range.setEnd(node, start + word[0].length);
    const rect = range.getBoundingClientRect();

    if (rect.width <= 0 || rect.height <= 0) continue;

    const previous = grouped.at(-1);
    if (previous && Math.abs(previous.top - rect.top) < 2) {
      previous.end = start + word[0].length;
    } else {
      grouped.push({ start, end: start + word[0].length, top: rect.top });
    }
  }

  return grouped.map(({ start, end }) => {
    const range = document.createRange();
    range.setStart(node, start);
    range.setEnd(node, end);
    return { range, text: text.slice(start, end) };
  });
}

function buildOverlay(panel: HTMLElement, concealed: boolean): SceneOverlay {
  const panelRect = panel.getBoundingClientRect();
  const lines: HTMLSpanElement[] = [];
  const sources: HTMLElement[] = [];
  let lineIndex = 0;

  const candidates = Array.from(
    panel.querySelectorAll<HTMLElement>(TEXT_CANDIDATES),
  );

  for (const element of candidates) {
    if (
      element.closest(
        "form, [contenteditable='true'], [aria-live], .scene-transition-skip",
      )
    ) {
      continue;
    }

    const node = textNodeFor(element);
    if (!node) continue;

    const style = window.getComputedStyle(element);
    const elementRect = element.getBoundingClientRect();
    if (
      style.display === "none" ||
      style.visibility === "hidden" ||
      elementRect.width <= 0 ||
      elementRect.height <= 0
    ) {
      continue;
    }

    const ranges = lineRanges(node);
    if (ranges.length === 0) continue;

    element.classList.add("scene-transition-source");
    sources.push(element);

    for (const { range, text } of ranges) {
      const rect = range.getBoundingClientRect();
      const computedLineHeight = Number.parseFloat(style.lineHeight);
      const lineHeight = Number.isFinite(computedLineHeight)
        ? computedLineHeight
        : rect.height;
      const leading = Math.max(0, lineHeight - rect.height) / 2;
      const line = document.createElement("span");

      line.className = "scene-transition-line";
      if (concealed) line.classList.add("is-concealed");
      line.setAttribute("aria-hidden", "true");
      line.textContent = text;
      line.style.left = `${rect.left - panelRect.left + panel.scrollLeft}px`;
      line.style.top = `${rect.top - panelRect.top + panel.scrollTop - leading}px`;
      line.style.width = `${Math.ceil(rect.width) + 2}px`;
      line.style.height = `${lineHeight}px`;
      line.style.fontFamily = style.fontFamily;
      line.style.fontSize = style.fontSize;
      line.style.fontStyle = style.fontStyle;
      line.style.fontWeight = style.fontWeight;
      line.style.fontStretch = style.fontStretch;
      line.style.letterSpacing = style.letterSpacing;
      line.style.lineHeight = `${lineHeight}px`;
      line.style.textTransform = style.textTransform;
      line.style.color = style.color;
      line.style.setProperty(
        "--scene-exit-delay",
        `${((lineIndex * 29) % 7) * 14}ms`,
      );
      line.style.setProperty(
        "--scene-enter-delay",
        `${((lineIndex * 43 + 2) % 7) * 14}ms`,
      );

      panel.append(line);
      lines.push(line);
      lineIndex += 1;
    }
  }

  return { lines, sources };
}

function removeOverlay(overlay: SceneOverlay | null) {
  if (!overlay) return;
  for (const source of overlay.sources) {
    source.classList.remove("scene-transition-source");
  }
  for (const line of overlay.lines) line.remove();
}

function closestSceneIndex(panels: HTMLElement[]) {
  const headerBottom =
    document.querySelector<HTMLElement>(".site-header")?.getBoundingClientRect()
      .bottom ?? 0;

  let closest = 0;
  let distance = Number.POSITIVE_INFINITY;
  panels.forEach((panel, index) => {
    const candidate = Math.abs(panel.getBoundingClientRect().top - headerBottom);
    if (candidate < distance) {
      closest = index;
      distance = candidate;
    }
  });
  return closest;
}

function canScrollInside(panel: HTMLElement, direction: number) {
  if (panel.scrollHeight <= panel.clientHeight + 2) return false;
  if (direction > 0) {
    return panel.scrollTop + panel.clientHeight < panel.scrollHeight - 2;
  }
  return panel.scrollTop > 2;
}

export function SceneTransitions() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(DESKTOP_SCENES);
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!desktop || reducedMotion) return;

    const panels = Array.from(
      document.querySelectorAll<HTMLElement>("main > .technical-panel"),
    );
    if (panels.length < 2) return;

    const root = document.documentElement;
    root.classList.add("scene-transitions-ready");

    let disposed = false;
    let locked = false;
    let animationRunning = false;
    let wheelIdle = true;
    let idleTimer = 0;
    let keyboardTimer = 0;
    let activeOutgoing: SceneOverlay | null = null;
    let activeIncoming: SceneOverlay | null = null;

    const maybeUnlock = () => {
      if (!animationRunning && wheelIdle) locked = false;
    };

    const transitionTo = async (targetIndex: number, fromKeyboard = false) => {
      const currentIndex = closestSceneIndex(panels);
      if (
        disposed ||
        locked ||
        targetIndex < 0 ||
        targetIndex >= panels.length ||
        targetIndex === currentIndex
      ) {
        return;
      }

      locked = true;
      animationRunning = true;
      root.classList.add("is-scene-switching");
      if (fromKeyboard) wheelIdle = false;

      const current = panels[currentIndex];
      const target = panels[targetIndex];

      activeOutgoing = buildOverlay(current, false);
      await nextFrame();
      if (disposed) return;

      current.classList.add("is-scene-leaving");
      await wait(EXIT_TIME);
      if (disposed) return;

      target.scrollIntoView({ behavior: "auto", block: "start" });
      activeIncoming = buildOverlay(target, true);
      current.classList.remove("is-scene-leaving");
      removeOverlay(activeOutgoing);
      activeOutgoing = null;

      await nextFrame();
      if (disposed) return;

      for (const line of activeIncoming.lines) {
        line.classList.remove("is-concealed");
      }
      target.classList.add("is-scene-entering");
      await wait(ENTER_TIME);
      if (disposed) return;

      target.classList.remove("is-scene-entering");
      removeOverlay(activeIncoming);
      activeIncoming = null;
      animationRunning = false;
      root.classList.remove("is-scene-switching");

      if (fromKeyboard) {
        window.clearTimeout(keyboardTimer);
        keyboardTimer = window.setTimeout(() => {
          wheelIdle = true;
          maybeUnlock();
        }, 80);
      } else {
        maybeUnlock();
      }
    };

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX) || Math.abs(event.deltaY) < 3) {
        return;
      }

      wheelIdle = false;
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        wheelIdle = true;
        maybeUnlock();
      }, 140);

      const direction = event.deltaY > 0 ? 1 : -1;
      const currentIndex = closestSceneIndex(panels);
      const current = panels[currentIndex];

      if (!locked && canScrollInside(current, direction)) return;

      const targetIndex = currentIndex + direction;
      if (targetIndex < 0 || targetIndex >= panels.length) return;

      event.preventDefault();
      if (!locked) void transitionTo(targetIndex);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement ||
        (event.target instanceof HTMLElement && event.target.isContentEditable)
      ) {
        return;
      }

      const currentIndex = closestSceneIndex(panels);
      let direction = 0;
      if (["ArrowDown", "PageDown", " "].includes(event.key)) direction = 1;
      if (["ArrowUp", "PageUp"].includes(event.key)) direction = -1;
      if (direction === 0 || canScrollInside(panels[currentIndex], direction)) return;

      const targetIndex = currentIndex + direction;
      if (targetIndex < 0 || targetIndex >= panels.length) return;

      event.preventDefault();
      if (!locked) void transitionTo(targetIndex, true);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      disposed = true;
      window.clearTimeout(idleTimer);
      window.clearTimeout(keyboardTimer);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      for (const panel of panels) {
        panel.classList.remove("is-scene-leaving", "is-scene-entering");
      }
      removeOverlay(activeOutgoing);
      removeOverlay(activeIncoming);
      root.classList.remove("scene-transitions-ready", "is-scene-switching");
    };
  }, [desktop, pathname, reducedMotion]);

  return null;
}
