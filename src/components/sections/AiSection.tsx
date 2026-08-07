'use client';

import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import type { RcsCopy } from '@/content/i18n';
import type { AgentId } from '@/types/site';
import { SectionHeading } from '@/components/ui/SectionHeading';

type Point = { x: number; y: number };
type Route = { id: AgentId; d: string };
type Geometry = { width: number; height: number; trunk: string; routes: Route[] };

const EMPTY_GEOMETRY: Geometry = { width: 1, height: 1, trunk: '', routes: [] };

const DESKTOP_POSITIONS: Record<AgentId, [string, string]> = {
  one: ['50%', '12%'],
  two: ['12.5%', '62%'],
  three: ['31%', '62%'],
  four: ['50%', '62%'],
  five: ['69%', '62%'],
  six: ['87.5%', '62%'],
};

export function AiSection({ copy }: { copy: RcsCopy['intelligence'] }) {
  const [active, setActive] = useState<AgentId>('one');
  const [geometry, setGeometry] = useState<Geometry>(EMPTY_GEOMETRY);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<Partial<Record<AgentId, HTMLButtonElement | null>>>({});

  const activeAgent = copy.agents.find((item) => item.id === active) ?? copy.agents[0];

  const registerNode = useCallback((id: AgentId, node: HTMLButtonElement | null) => {
    nodeRefs.current[id] = node;
  }, []);

  const calculateRoutes = useCallback(() => {
    const map = mapRef.current;
    const root = nodeRefs.current.one;
    if (!map || !root) return;

    const mapRect = map.getBoundingClientRect();
    const rootRect = root.getBoundingClientRect();
    const width = Math.max(1, map.clientWidth);
    const height = Math.max(1, map.clientHeight);
    const mobile = width <= 860;

    const children = copy.agents
      .filter((item) => item.id !== 'one')
      .map((item) => {
        const element = nodeRefs.current[item.id];
        return element ? { id: item.id, rect: element.getBoundingClientRect() } : null;
      })
      .filter((item): item is { id: AgentId; rect: DOMRect } => item !== null);

    if (!children.length) return;

    if (mobile) {
      const spineX = 26;
      const rootCenterX = rootRect.left - mapRect.left + rootRect.width / 2;
      const rootBottom = rootRect.bottom - mapRect.top;
      const destinations = children.map(({ id, rect }) => ({
        id,
        x: rect.left - mapRect.left,
        y: rect.top - mapRect.top + rect.height / 2,
      }));
      const lastY = Math.max(...destinations.map((destination) => destination.y));
      const curveY = rootBottom + 26;
      const trunk =
        `M ${rootCenterX.toFixed(2)} ${rootBottom.toFixed(2)} ` +
        `C ${rootCenterX.toFixed(2)} ${curveY.toFixed(2)}, ` +
        `${spineX.toFixed(2)} ${curveY.toFixed(2)}, ` +
        `${spineX.toFixed(2)} ${(curveY + 20).toFixed(2)} ` +
        `L ${spineX.toFixed(2)} ${lastY.toFixed(2)}`;
      const routes = destinations.map(({ id, x, y }) => ({
        id,
        d: `M ${spineX.toFixed(2)} ${y.toFixed(2)} L ${x.toFixed(2)} ${y.toFixed(2)}`,
      }));
      setGeometry({ width, height, trunk, routes });
      return;
    }

    const start: Point = {
      x: rootRect.left - mapRect.left + rootRect.width / 2,
      y: rootRect.bottom - mapRect.top,
    };
    const destinations = children.map(({ id, rect }) => ({
      id,
      point: {
        x: rect.left - mapRect.left + rect.width / 2,
        y: rect.top - mapRect.top,
      },
    }));
    const firstTargetY = Math.min(...destinations.map((item) => item.point.y));
    const available = firstTargetY - start.y;
    const junctionY = available > 80 ? start.y + available * 0.42 : start.y + 42;
    const trunk = `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} L ${start.x.toFixed(2)} ${junctionY.toFixed(2)}`;
    const routes = destinations.map(({ id, point }) => {
      const verticalDistance = point.y - junctionY;
      const control1Y = junctionY + Math.max(18, verticalDistance * 0.32);
      const control2Y = point.y - Math.max(18, verticalDistance * 0.32);
      return {
        id,
        d:
          `M ${start.x.toFixed(2)} ${junctionY.toFixed(2)} ` +
          `C ${start.x.toFixed(2)} ${control1Y.toFixed(2)}, ` +
          `${point.x.toFixed(2)} ${control2Y.toFixed(2)}, ` +
          `${point.x.toFixed(2)} ${point.y.toFixed(2)}`,
      };
    });
    setGeometry({ width, height, trunk, routes });
  }, [copy.agents]);

  useLayoutEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(calculateRoutes);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(map);
    Object.values(nodeRefs.current).forEach((node) => node && observer.observe(node));
    window.addEventListener('resize', schedule);
    window.addEventListener('orientationchange', schedule);
    void document.fonts.ready.then(schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', schedule);
      window.removeEventListener('orientationchange', schedule);
    };
  }, [calculateRoutes]);

  return (
    <section className="technical-panel ai-section" id="intelligence" data-section="05">
      <SectionHeading index="05" label="INTELLIGENCE SYSTEMS" title={copy.title} lead={copy.lead} />

      <div className="agent-map" data-reveal ref={mapRef}>
        <svg
          className="agent-routes agent-routes--dynamic"
          viewBox={`0 0 ${geometry.width} ${geometry.height}`}
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          {geometry.trunk ? <path className="agent-route-trunk" d={geometry.trunk} /> : null}
          {geometry.routes.map((route) => (
            <path
              key={route.id}
              d={route.d}
              data-route={route.id}
              className={active === route.id ? 'agent-route agent-route--active' : 'agent-route'}
            />
          ))}
        </svg>

        {copy.agents.map((item) => {
          const [left, top] = DESKTOP_POSITIONS[item.id];
          return (
            <button
              type="button"
              key={item.id}
              ref={(node) => registerNode(item.id, node)}
              data-agent-id={item.id}
              className={active === item.id ? 'agent-node is-active' : 'agent-node'}
              style={{ left, top }}
              onClick={() => setActive(item.id)}
              aria-pressed={active === item.id}
            >
              <span>{item.code}</span>
              <strong>{item.name.toUpperCase()}</strong>
              <small>{item.role}</small>
            </button>
          );
        })}

        <aside className="agent-inspector" aria-live="polite">
          <span>{activeAgent.code}</span>
          <h3>{activeAgent.name}</h3>
          <p>{activeAgent.summary}</p>
        </aside>

        <div className="human-validation">
          <span>{copy.quality}</span>
          <strong>HUGUES HENROTTE</strong>
          <small>{copy.humanValidation}</small>
        </div>
      </div>
    </section>
  );
}
