import { lazy, Suspense, useEffect, useState } from "react";

const SiteBackgroundScene = lazy(() => import("./site-background-scene"));

export function SiteBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Suspense fallback={null}>
      <SiteBackgroundScene />
    </Suspense>
  );
}
