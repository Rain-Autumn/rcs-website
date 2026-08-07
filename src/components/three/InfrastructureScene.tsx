'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import type { InfrastructureNodeId } from '@/types/site';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { usePerformanceTier } from '@/hooks/usePerformanceTier';

const nodeIds: InfrastructureNodeId[] = ['internet', 'dns', 'ovh', 'debian', 'nginx', 'application'];

const positions: [number, number, number][] = [
  [-4.25, 0.45, 0],
  [-2.65, -0.55, 0.35],
  [-0.95, 0.55, -0.05],
  [0.9, -0.45, 0.35],
  [2.6, 0.5, -0.05],
  [4.3, -0.25, 0.28],
];

function Packet({ lite }: { lite: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  const reducedMotion = useReducedMotion();
  const curve = useMemo(() => new THREE.CatmullRomCurve3(positions.map((point) => new THREE.Vector3(...point))), []);

  useFrame((state) => {
    if (!mesh.current || reducedMotion) return;
    const t = (state.clock.elapsedTime * (lite ? 0.055 : 0.075)) % 1;
    mesh.current.position.copy(curve.getPointAt(t));
  });

  return (
    <mesh ref={mesh} position={positions[0]}>
      <sphereGeometry args={[0.07, 12, 12]} />
      <meshBasicMaterial color="#a56b3f" />
    </mesh>
  );
}

function Scene({ selected, onSelect, lite }: { selected: InfrastructureNodeId; onSelect: (id: InfrastructureNodeId) => void; lite: boolean }) {
  const reducedMotion = useReducedMotion();
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current || reducedMotion) return;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, state.pointer.x * 0.08, 0.025);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -state.pointer.y * 0.035, 0.025);
  });

  return (
    <group ref={group}>
      <Line points={positions} color="#6e685f" lineWidth={1.1} dashed dashSize={0.15} gapSize={0.12} transparent opacity={0.55} />
      <Packet lite={lite} />
      {nodeIds.map((nodeId, index) => {
        const active = nodeId === selected;
        const [x, y, z] = positions[index];
        return (
          <group key={nodeId} position={[x, y, z]}>
            <mesh
              onClick={(event) => {
                event.stopPropagation();
                onSelect(nodeId);
              }}
              onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
              onPointerOut={() => { document.body.style.cursor = ''; }}
              scale={active ? 1.12 : 1}
            >
              <boxGeometry args={[1.05, 0.72, 0.42]} />
              <meshStandardMaterial
                color={active ? '#ded1c2' : '#ebe6dd'}
                metalness={0.08}
                roughness={0.74}
              />
            </mesh>
            <mesh position={[0, 0, 0.225]}>
              <boxGeometry args={[0.84, 0.05, 0.018]} />
              <meshBasicMaterial color={active ? '#a56b3f' : '#8f887e'} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export default function InfrastructureScene({ selected, onSelect }: { selected: InfrastructureNodeId; onSelect: (id: InfrastructureNodeId) => void }) {
  const lite = usePerformanceTier() === 'lite';

  return (
    <Canvas
      dpr={lite ? 1 : [1, 1.4]}
      camera={{ position: [0, 1.2, 10.6], fov: 38 }}
      gl={{ antialias: !lite, alpha: true, powerPreference: lite ? 'low-power' : 'high-performance' }}
    >
      <ambientLight intensity={1.4} />
      <directionalLight position={[4, 7, 7]} intensity={2.7} color="#fff9ed" />
      <directionalLight position={[-4, -3, 4]} intensity={1.1} color="#c9c1b5" />
      <Scene selected={selected} onSelect={onSelect} lite={lite} />
    </Canvas>
  );
}
