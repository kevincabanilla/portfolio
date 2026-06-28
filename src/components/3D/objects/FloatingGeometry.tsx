import { useRef, memo, type ReactElement } from "react";
import type { Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { Color } from "@/constants";

type GeometryName =
  | "torusKnot"
  | "icosahedron"
  | "octahedron"
  | "dodecahedron"
  | "sphere";

const GEOMETRIES: Record<GeometryName, (props: object) => ReactElement> = {
  torusKnot: (props) => (
    <torusKnotGeometry args={[0.8, 0.2, 150, 20, 2, 3]} {...props} />
  ),
  icosahedron: (props) => <icosahedronGeometry args={[1, 1]} {...props} />,
  octahedron: (props) => <octahedronGeometry args={[1, 0]} {...props} />,
  dodecahedron: (props) => <dodecahedronGeometry args={[1, 0]} {...props} />,
  sphere: (props) => <sphereGeometry args={[1.25, 16, 8]} {...props} />,
} as const;

const DEFAULT_FLOAT_CONFIG = { speed: 1.5, rotationIntensity: 0.2 } as const;

interface FloatingGeometryProps {
  geometry?: GeometryName;
  position?: [number, number, number];
  scale?: number;
  color?: string;
  wireframe?: boolean;
  rotationSpeed?: number;
  floatIntensity?: number;
  distortion?: number;
  opacity?: number;
}

const FloatingGeometry = memo(
  ({
    geometry = "torusKnot",
    position = [0, 0, 0],
    scale = 1,
    color = Color.CYAN,
    wireframe = true,
    rotationSpeed = 0.3,
    floatIntensity = 1,
    distortion = 0,
    opacity = 0.6,
  }: FloatingGeometryProps) => {
    const meshRef = useRef<Mesh>(null);

    useFrame((_, delta) => {
      if (!meshRef.current) return;
      meshRef.current.rotation.x += delta * rotationSpeed * 0.5;
      meshRef.current.rotation.y += delta * rotationSpeed;
    });

    const GeometryComponent = GEOMETRIES[geometry];

    return (
      <Float {...DEFAULT_FLOAT_CONFIG} floatIntensity={floatIntensity}>
        <mesh ref={meshRef} position={position} scale={scale}>
          <GeometryComponent />
          {distortion > 0 ? (
            <MeshDistortMaterial
              color={color}
              wireframe={wireframe}
              transparent
              opacity={opacity}
              distort={distortion}
              speed={2}
            />
          ) : (
            <meshStandardMaterial
              color={color}
              wireframe={wireframe}
              transparent
              opacity={opacity}
            />
          )}
        </mesh>
      </Float>
    );
  },
);

FloatingGeometry.displayName = "FloatingGeometry";

export default FloatingGeometry;
