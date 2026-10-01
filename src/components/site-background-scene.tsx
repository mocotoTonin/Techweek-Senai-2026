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

  const iconTextures = useMemo(() => {
    const drawIcon = (kind: number, color: string) => {
      const canvas = document.createElement("canvas");
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext("2d");
      if (!ctx) return new THREE.CanvasTexture(canvas);
      ctx.strokeStyle = color;
      ctx.lineWidth = 7;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      if (kind === 0) {
        ctx.strokeRect(32, 32, 64, 64);
        for (let p = 40; p <= 88; p += 16) {
          ctx.beginPath(); ctx.moveTo(p, 20); ctx.lineTo(p, 32); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(p, 96); ctx.lineTo(p, 108); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(20, p); ctx.lineTo(32, p); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(96, p); ctx.lineTo(108, p); ctx.stroke();
        }
        ctx.strokeRect(48, 48, 32, 32);
      } else if (kind === 1) {
        ctx.beginPath(); ctx.moveTo(48, 34); ctx.lineTo(25, 64); ctx.lineTo(48, 94); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(80, 34); ctx.lineTo(103, 64); ctx.lineTo(80, 94); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(71, 25); ctx.lineTo(57, 103); ctx.stroke();
      } else {
        ctx.beginPath(); ctx.arc(64, 64, 26, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.arc(64, 64, 8, 0, Math.PI * 2); ctx.stroke();
        for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
          ctx.beginPath(); ctx.moveTo(64 + Math.cos(a) * 27, 64 + Math.sin(a) * 27); ctx.lineTo(64 + Math.cos(a) * 43, 64 + Math.sin(a) * 43); ctx.stroke();
        }
      }
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    };
    return [drawIcon(0, muted), drawIcon(1, red), drawIcon(2, ink)];
  }, [ink, muted, red]);

  const icons = useMemo(
    () => Array.from({ length: 22 }, (_, i) => ({
      x: (Math.random() - 0.5) * 28,
      y: (Math.random() - 0.5) * 17,
      z: -2 - Math.random() * 7,
      size: 0.45 + Math.random() * 0.55,
      kind: i % 3,
      phase: i * 0.91,
    })),
    []
  );
  const iconRefs = useRef<(THREE.Sprite | null)[]>([]);

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
    icons.forEach((icon, i) => {
      const sprite = iconRefs.current[i];
      if (!sprite) return;
      sprite.position.y = icon.y + Math.sin(t * 0.12 + icon.phase) * 0.35;
      sprite.material.rotation = Math.sin(t * 0.08 + icon.phase) * 0.12;
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
      {icons.map((icon, i) => {
        const texture = iconTextures[icon.kind];
        if (!texture) return null;
        return (
          <sprite
            key={`icon-${i}`}
            position={[icon.x, icon.y, icon.z]}
            scale={[icon.size, icon.size, 1]}
            ref={(sprite) => {
              iconRefs.current[i] = sprite;
            }}
          >
            <spriteMaterial map={texture} transparent opacity={icon.kind === 1 ? 0.22 : 0.13} depthWrite={false} />
          </sprite>
        );
      })}
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
