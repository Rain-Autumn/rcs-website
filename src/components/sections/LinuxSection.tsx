'use client';

import { useState } from 'react';
import type { RcsCopy } from '@/content/i18n';
import type { InfrastructureNodeId } from '@/types/site';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function LinuxSection({
  copy,
}: {
  copy: RcsCopy['infrastructure'];
}) {
  const [selected, setSelected] =
    useState<InfrastructureNodeId>('debian');

  const selectedNode =
    copy.nodes.find((node) => node.id === selected) ??
    copy.nodes[0];

  return (
    <section
      className="technical-panel linux-section"
      id="systems"
      data-section="04"
    >
      <SectionHeading
        index="04"
        label="SYSTEMS & INFRASTRUCTURE"
        title={copy.title}
        lead={copy.lead}
      />

      <div
        className="infrastructure-stage infrastructure-stage--2d"
        data-reveal
      >
        <div
          className="infrastructure-canvas infrastructure-canvas--2d"
          aria-label={copy.canvasLabel}
        >
          <div
            className="infra-flow"
            role="group"
            aria-label={copy.canvasLabel}
          >
            <div
              className="infra-flow__rail"
              aria-hidden="true"
            />

            <div
              className="infra-flow__packet"
              aria-hidden="true"
            />

            {copy.nodes.map((node, index) => (
              <button
                key={node.id}
                type="button"
                className={
                  selected === node.id
                    ? 'infra-node-2d is-active'
                    : 'infra-node-2d'
                }
                onClick={() => setSelected(node.id)}
                style={
                  {
                    '--infra-index': index,
                  } as React.CSSProperties
                }
              >
                <span>{node.index}</span>
                <strong>{node.label}</strong>
                <small>{node.eyebrow}</small>
              </button>
            ))}
          </div>

          <div
            className="flow-caption"
            aria-hidden="true"
          >
            {copy.flowCaption}
          </div>
        </div>

        <aside
          className="infrastructure-inspector"
          aria-live="polite"
        >
          <p className="inspector-code">
            NODE {selectedNode.index}
          </p>

          <h3>{selectedNode.label}</h3>
          <p>{selectedNode.description}</p>

          <dl>
            <div>
              <dt>{copy.inspector.status}</dt>
              <dd>{selectedNode.status}</dd>
            </div>

            <div>
              <dt>{copy.inspector.role}</dt>
              <dd>{selectedNode.eyebrow}</dd>
            </div>

            <div>
              <dt>{copy.inspector.detail}</dt>
              <dd>{selectedNode.detail}</dd>
            </div>
          </dl>
        </aside>
      </div>

      <div className="mobile-infrastructure" data-reveal>
        {copy.nodes.map((node) => (
          <button
            key={node.id}
            type="button"
            className={
              selected === node.id
                ? 'is-active'
                : undefined
            }
            onClick={() => setSelected(node.id)}
          >
            <span>{node.index}</span>
            <strong>{node.label}</strong>
            <small>{node.eyebrow}</small>
          </button>
        ))}
      </div>

      <div className="instrument-grid" data-reveal>
        {copy.facts.map(([label, value], index) => (
          <article
            className="instrument-card"
            key={label}
          >
            <span className="instrument-index">
              SYS-{String(index + 1).padStart(2, '0')}
            </span>

            <small>{label}</small>
            <strong>{value}</strong>

            <div
              className="instrument-meter"
              aria-hidden="true"
            >
              <i
                style={
                  {
                    '--meter':
                      `${58 + ((index * 7) % 31)}%`,
                  } as React.CSSProperties
                }
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
