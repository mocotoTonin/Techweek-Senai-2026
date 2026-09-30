import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function cssColor(name: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  if (!value) return fallback;
  const ctx = document.createElement("canvas").getContext("2d");
  if (!ctx) return fallback;
  ctx.fillStyle = "#000";
  ctx.fillStyle = value;
  const normalized = ctx.fillStyle;
  return normalized.startsWith("#") || normalized.startsWith("rgb") ? normalized : fallback;
}

function useThemeColors() {
  const [colors, setColors] = useState({ red: "#c02a30", ink: "#f4f4f4", muted: "#9a9a9a" });
  useEffect(() => {
    const read = () => {
      const dark = document.documentElement.classList.contains("dark");
      setColors({
        red: cssColor("--primary", "#c02a30"),
        ink: dark ? "#f4f4f4" : "#2b2b2b",
        muted: dark ? "#b0b0b0" : "#707070",
      });
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  return colors;
}

function Field({ red, ink, muted }: { red: string; ink: string; muted: string }) {
  const dust = useRef<THREE.Points>(null);
  const grid = useRef<THREE.Group>(null);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const particles = useMemo(() => {
    const count = 420;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 34;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14 - 3;
    }
    return positions;
  }, []);

  const nodes = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        x: (Math.random() - 0.5) * 30,
        y: (Math.random() - 0.5) * 16,
        z: -4 - Math.random() * 6,
        size: 0.1 + Math.random() * 0.16,
        speed: 0.15 + Math.random() * 0.25,
        phase: i * 1.3,
        red: i % 3 === 0,
      })),
    []
  );

  const nodeRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    if (reduced.current) return;
    const t = clock.elapsedTime;
    if (dust.current) {
      dust.current.rotation.y += delta * 0.015;
      dust.current.rotation.x = Math.sin(t * 0.05) * 0.06;
    }
    if (grid.current) grid.current.rotation.z = Math.sin(t * 0.04) * 0.05;
    nodes.forEach((n, i) => {
      const m = nodeRefs.current[i];
      if (!m) return;
      m.position.y = n.y + Math.sin(t * n.speed + n.phase) * 0.7;
      m.rotation.x += delta * 0.4;
      m.rotation.y += delta * 0.3;
    });
  });

  return (
    <>
      <points ref={dust}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial color={muted} size={0.05} sizeAttenuation transparent opacity={0.5} />
      </points>
      <group ref={grid}>
        {nodes.map((n, i) => (
          <mesh
            key={i}
            position={[n.x, n.y, n.z]}
            ref={(m) => {
              nodeRefs.current[i] = m;
            }}
          >
            <octahedronGeometry args={[n.size]} />
            <meshBasicMaterial color={n.red ? red : ink} wireframe transparent opacity={n.red ? 0.5 : 0.28} />
          </mesh>
        ))}
      </group>
    </>
  );
}

export default function SiteBackgroundScene() {
  const { red, ink, muted } = useThemeColors();
  return (
    <div className="site-bg" aria-hidden="true">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 10], fov: 55 }} gl={{ antialias: true, alpha: true }}>
        <Field red={red} ink={ink} muted={muted} />
      </Canvas>
    </div>
  );
}
