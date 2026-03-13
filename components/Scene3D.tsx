"use client";

import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll, Html } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Suspense, useEffect, useState } from "react";
import { HomePage } from "./HomePage";
import { Hero3D } from "./Hero3D";
import { useSiteOverrides } from "@/hooks/useSiteOverrides";

export function AppRootFallback() {
  const overrides = useSiteOverrides();
  const is3D = overrides.is3DMode ?? true; // Default to 3D mode in 2026!

  // We need to avoid hydration mismatch if localStorage differs,
  // but for simplicity we render based on state.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="bg-ink h-screen w-screen" />;

  if (!is3D) {
    return <HomePage />;
  }

  return (
    <div className="fixed inset-0 z-0 bg-ink">
      <Canvas frameloop="demand" camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 1.5]}>
        <color attach="background" args={["#0f0a08"]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#f4c35a" />
        
        <Suspense fallback={<Html center className="text-gold font-bold tracking-widest text-sm uppercase">Loading Divine Realm...</Html>}>
          <ScrollControls pages={8} damping={0.25}>
            <Hero3D />
            <Scroll html style={{ width: "100%", height: "100%" }}>
              <HomePage />
            </Scroll>
          </ScrollControls>
          <EffectComposer>
            <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.2} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
