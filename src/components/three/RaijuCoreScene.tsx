'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Line, useTexture } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { usePerformanceTier } from '@/hooks/usePerformanceTier';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type EmblemAssemblyProps = {
  lite: boolean;
};

const COPPER = '#a56b3f';
const COPPER_LIGHT = '#d6ad8e';
const INK = '#4f4a44';
const MUTED = '#81796f';
const LINE = '#b8b0a5';
const LOGO_WIDTH = 2.42;
const LOGO_HEIGHT = 2.59;

function circlePoints(radius: number, segments: number) {
  return Array.from({ length: segments + 1 }, (_, index) => {
    const angle = (index / segments) * Math.PI * 2;
    return [Math.cos(angle) * radius, Math.sin(angle) * radius, 0] as [number, number, number];
  });
}

function RaijuEmblemAssembly({ lite }: EmblemAssemblyProps) {
  const assembly = useRef<THREE.Group>(null);
  const outerRing = useRef<THREE.Mesh>(null);
  const innerRing = useRef<THREE.Mesh>(null);
  const scan = useRef<THREE.Mesh>(null);
  const reducedMotion = useReducedMotion();
  const sourceLogo = useTexture('/icons/raiju-dragon.png');
  const logo = useMemo(() => {
    // Never mutate the texture returned by a hook. Configure our own clone instead.
    const texture = sourceLogo.clone();
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = true;
    return texture;
  }, [sourceLogo]);

  const outerCalibration = useMemo(() => circlePoints(1.83, lite ? 72 : 144), [lite]);
  const innerCalibration = useMemo(() => circlePoints(1.48, lite ? 64 : 120), [lite]);
  const depthLayers = lite ? 4 : 10;

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    if (assembly.current) {
      const targetY = reducedMotion ? 0 : state.pointer.x * 0.105;
      const targetX = reducedMotion ? 0 : -state.pointer.y * 0.07;
      assembly.current.rotation.y = THREE.MathUtils.lerp(assembly.current.rotation.y, targetY, 0.045);
      assembly.current.rotation.x = THREE.MathUtils.lerp(assembly.current.rotation.x, targetX, 0.045);
      if (!reducedMotion) assembly.current.position.y = Math.sin(t * 0.48) * 0.022;
    }

    if (!reducedMotion) {
      if (outerRing.current) outerRing.current.rotation.z += delta * 0.035;
      if (innerRing.current) innerRing.current.rotation.z -= delta * 0.052;
      if (scan.current) scan.current.position.y = Math.sin(t * 0.62) * 0.88;
    }
  });

  return (
    <group ref={assembly} rotation={[0.01, -0.025, 0]}>
      {/* Instrumentation only: the emblem remains the visual subject. */}
      <Line points={outerCalibration} color={LINE} lineWidth={0.55} transparent opacity={0.34} />
      <Line points={innerCalibration} color={LINE} lineWidth={0.45} transparent opacity={0.24} />

      {/* Sparse radial calibration marks, matching the RCS interface language. */}
      {Array.from({ length: 12 }, (_, index) => {
        const angle = (index / 12) * Math.PI * 2;
        const major = index % 3 === 0;
        const r1 = major ? 1.62 : 1.69;
        const r2 = major ? 1.92 : 1.83;
        return (
          <Line
            key={`mark-${index}`}
            points={[
              [Math.cos(angle) * r1, Math.sin(angle) * r1, -0.08],
              [Math.cos(angle) * r2, Math.sin(angle) * r2, -0.08],
            ]}
            color={major ? MUTED : LINE}
            lineWidth={major ? 0.8 : 0.45}
            transparent
            opacity={major ? 0.42 : 0.25}
          />
        );
      })}

      {/* Two extremely thin control rings. They read as instrumentation, not Saturn. */}
      <mesh ref={outerRing} position={[0, 0, -0.12]} rotation={[0.08, 0.18, 0.12]}>
        <torusGeometry args={[1.67, 0.011, 6, lite ? 72 : 144]} />
        <meshBasicMaterial color={COPPER} transparent opacity={0.5} toneMapped={false} />
      </mesh>
      <mesh ref={innerRing} position={[0, 0, -0.1]} rotation={[-0.06, -0.12, -0.18]}>
        <torusGeometry args={[1.38, 0.008, 6, lite ? 64 : 120]} />
        <meshBasicMaterial color={INK} transparent opacity={0.34} toneMapped={false} />
      </mesh>

      {/* Four cardinal lock nodes make the logo feel mounted inside a system core. */}
      {Array.from({ length: 4 }, (_, index) => {
        const angle = (index / 4) * Math.PI * 2;
        const x = Math.cos(angle) * 1.48;
        const y = Math.sin(angle) * 1.48;
        return (
          <group key={`node-${index}`} position={[x, y, 0.03]}>
            <mesh>
              <ringGeometry args={[0.047, 0.064, lite ? 10 : 18]} />
              <meshBasicMaterial color={INK} transparent opacity={0.68} side={THREE.DoubleSide} toneMapped={false} />
            </mesh>
            <mesh position={[0, 0, 0.005]}>
              <circleGeometry args={[0.017, lite ? 8 : 14]} />
              <meshBasicMaterial color={COPPER_LIGHT} toneMapped={false} />
            </mesh>
          </group>
        );
      })}

      {/* Fake extrusion: stacked alpha-masked copies create real parallax without distorting the mark. */}
      <group position={[0, 0.03, 0.04]}>
        {Array.from({ length: depthLayers }, (_, index) => {
          const progress = index / (depthLayers - 1);
          return (
            <mesh
              key={`depth-${index}`}
              position={[
                -0.025 + progress * 0.025,
                0.018 - progress * 0.018,
                -0.19 + progress * 0.16,
              ]}
            >
              <planeGeometry args={[LOGO_WIDTH, LOGO_HEIGHT]} />
              <meshBasicMaterial
                map={logo}
                color={index < depthLayers * 0.55 ? COPPER : INK}
                transparent
                alphaTest={0.08}
                opacity={0.84}
                depthWrite
                toneMapped={false}
              />
            </mesh>
          );
        })}

        {/* Front face keeps the original Raiju mark readable and authoritative. */}
        <mesh position={[0, 0, 0.015]}>
          <planeGeometry args={[LOGO_WIDTH, LOGO_HEIGHT]} />
          <meshBasicMaterial
            map={logo}
            color="#f5f1e9"
            transparent
            alphaTest={0.08}
            depthWrite
            toneMapped={false}
          />
        </mesh>

        {/* Slow scan line: barely visible, like an active identification system. */}
        <mesh ref={scan} position={[0, 0, 0.045]}>
          <planeGeometry args={[2.48, 0.012]} />
          <meshBasicMaterial color={COPPER_LIGHT} transparent opacity={reducedMotion ? 0.12 : 0.24} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

export default function RaijuCoreScene() {
  const tier = usePerformanceTier();
  const lite = tier === 'lite';

  return (
    <Canvas
      className="r3f-canvas"
      dpr={lite ? 1 : [1, 1.5]}
      camera={{ position: [0, 0, 5.15], fov: 35 }}
      gl={{ antialias: !lite, alpha: true, powerPreference: lite ? 'low-power' : 'high-performance' }}
      fallback={<div className="canvas-fallback" aria-hidden="true" />}
    >
      <RaijuEmblemAssembly lite={lite} />
    </Canvas>
  );
}
