import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const BASE_SPIN = { x: 0.07, y: 0.3 };

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

type Spin = { x: number; y: number };

type CoreProps = {
  group: React.RefObject<THREE.Group | null>;
  spin: React.RefObject<Spin>;
  dragging: React.RefObject<boolean>;
  reduced: React.RefObject<boolean>;
  red: string;
  ink: string;
  muted: string;
};

function Core({ group, spin, dragging, reduced, red, ink, muted }: CoreProps) {
  const satRefs = useRef<(THREE.Mesh | null)[]>([]);
  const dustSpin = useRef<THREE.Points>(null);

  const satellites = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        angle: (i / 7) * Math.PI * 2,
        radius: 3.3,
        speed: 0.3 + (i % 3) * 0.09,
        size: 0.07 + (i % 2) * 0.04,
        y: Math.sin(i * 1.7) * 0.55,
      })),
    []
  );

  const dust = useMemo(() => {
    const positions = new Float32Array(140 * 3);
    for (let i = 0; i < 140; i++) {
      const radius = 3.9 + Math.random() * 2.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame(({ clock }, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const g = group.current;
    if (g) {
      if (!dragging.current && !reduced.current) {
        const k = 1 - Math.exp(-1.6 * delta);
        spin.current.x += (BASE_SPIN.x - spin.current.x) * k;
        spin.current.y += (BASE_SPIN.y - spin.current.y) * k;
      }
      if (!reduced.current) {
        g.rotation.x += spin.current.x * delta;
        g.rotation.y += spin.current.y * delta;
      }
    }
    const t = clock.elapsedTime;
    satellites.forEach((s, i) => {
      const m = satRefs.current[i];
      if (!m) return;
      const a = s.angle + t * s.speed;
      m.position.set(Math.cos(a) * s.radius, s.y + Math.sin(t * 0.8 + i) * 0.12, Math.sin(a) * s.radius);
      m.rotation.x += delta * 0.8;
      m.rotation.y += delta * 0.6;
    });
    if (dustSpin.current && !reduced.current) dustSpin.current.rotation.y -= delta * 0.02;
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.3, 0]} />
        <meshStandardMaterial color={red} flatShading roughness={0.3} metalness={0.35} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[2.05, 1]} />
        <meshBasicMaterial color={ink} wireframe transparent opacity={0.22} />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, 0.3, 0]}>
        <torusGeometry args={[2.75, 0.03, 10, 110]} />
        <meshStandardMaterial color={red} roughness={0.4} metalness={0.5} />
      </mesh>
      <mesh rotation={[Math.PI / 1.7, -0.5, 0.4]}>
        <torusGeometry args={[3.15, 0.016, 8, 110]} />
        <meshBasicMaterial color={ink} transparent opacity={0.4} />
      </mesh>
      {satellites.map((s, i) => (
        <mesh
          key={i}
          ref={(m) => {
            satRefs.current[i] = m;
          }}
        >
          <octahedronGeometry args={[s.size]} />
          <meshStandardMaterial color={i % 2 ? ink : red} flatShading roughness={0.35} metalness={0.3} />
        </mesh>
      ))}
      <points ref={dustSpin}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dust, 3]} />
        </bufferGeometry>
        <pointsMaterial color={muted} size={0.045} sizeAttenuation transparent opacity={0.55} />
      </points>
    </group>
  );
}

export default function HeroScene() {
  const { red, ink, muted } = useThemeColors();
  const group = useRef<THREE.Group>(null);
  const spin = useRef<Spin>({ ...BASE_SPIN });
  const dragging = useRef(false);
  const reduced = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  return (
    <div
      className="hero-3d"
      style={{ touchAction: "pan-y" }}
      onPointerDown={(e) => {
        dragging.current = true;
        last.current = { x: e.clientX, y: e.clientY };
        e.currentTarget.setPointerCapture?.(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!dragging.current) return;
        const dx = e.clientX - last.current.x;
        const dy = e.clientY - last.current.y;
        last.current = { x: e.clientX, y: e.clientY };
        const g = group.current;
        if (!g) return;
        g.rotation.y += dx * 0.006;
        g.rotation.x += dy * 0.004;
        spin.current.y = THREE.MathUtils.clamp(dx * 0.3, -3, 3);
        spin.current.x = THREE.MathUtils.clamp(dy * 0.18, -2, 2);
      }}
      onPointerUp={() => {
        dragging.current = false;
      }}
      onPointerLeave={() => {
        dragging.current = false;
      }}
    >
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 7.6], fov: 42 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.55} />
        <directionalLight position={[6, 8, 6]} intensity={1.5} />
        <directionalLight position={[-6, -4, -5]} intensity={0.5} color={muted} />
        <Core group={group} spin={spin} dragging={dragging} reduced={reduced} red={red} ink={ink} muted={muted} />
      </Canvas>
    </div>
  );
}
