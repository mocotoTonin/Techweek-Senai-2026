import { lazy, Suspense, useEffect, useState } from "react";

const HeroScene = lazy(() => import("./hero-scene"));

export function HeroVisual() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Suspense fallback={null}>
      <HeroScene />
    </Suspense>
  );
}
