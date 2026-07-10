import { useEffect, useRef, useMemo } from "react";
import { AdditiveBlending, type Points } from "three";
import { useFrame } from "@react-three/fiber";
import { Color } from "@/constants";

const MAX_RAND_32 = 0xffffffff;

const createParticlePositions = (count: number): Float32Array => {
  const arr = new Float32Array(count * 3);
  const rand = new Uint32Array(count * 3);
  globalThis.crypto.getRandomValues(rand);
  for (let i = 0; i < count * 3; i++) {
    const scale = i % 3 === 2 ? 15 : 20;
    arr[i] = (rand[i] / MAX_RAND_32 - 0.5) * scale;
  }
  return arr;
};

export default function ParticleField({ count = 300 }: { count?: number }) {
  const ref = useRef<Points>(null);
  const positions = useMemo(() => createParticlePositions(count), [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.02;
    ref.current.rotation.x += delta * 0.01;
  });

  // Dispose GPU resources on unmount to prevent leaks over long sessions.
  useEffect(() => {
    const node = ref.current;
    return () => {
      if (!node) return;
      node.geometry.dispose();
      const { material } = node;
      if (Array.isArray(material))
        material.forEach((m) => {
          m.dispose();
        });
      else material.dispose();
    };
  }, []);

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        color={Color.CYAN}
        size={0.03}
        sizeAttenuation
        transparent
        opacity={0.6}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
