"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useScroll, Sparkles, Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { ParticlesDiya } from "./ParticlesDiya";

export function Hero3D() {
  const scroll = useScroll();
  const group = useRef<THREE.Group>(null);
  const hanumanRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  useFrame((state, delta) => {
    const r1 = scroll.range(0, 1 / 8);

    if (group.current) {
      group.current.position.y = -r1 * 15;
      group.current.rotation.y = r1 * Math.PI * 0.5;
    }

    if (hanumanRef.current) {
      hanumanRef.current.rotation.y += delta * 0.2;
    }
    
    // Smooth camera drift based on pointer and GSAP-like scroll offset
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, (state.pointer.x * 2), 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, (state.pointer.y * 2) - scroll.offset * 10, 0.05);
  });

  return (
    <group ref={group}>
      {/* Abstract Glowing Hanuman / Spiritual Core */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={hanumanRef} position={[2, 1, -2]}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <MeshDistortMaterial color="#f07a26" emissive="#f4c35a" emissiveIntensity={0.8} distort={0.4} speed={2} wireframe />
        </mesh>
      </Float>

      <ParticlesDiya />
      
      {/* Divine Saffron and Gold Particles */}
      <Sparkles count={500} scale={15} size={4} speed={0.4} opacity={0.5} color="#f4c35a" />
      <Sparkles count={200} scale={20} size={6} speed={0.2} opacity={0.3} color="#f07a26" />
    </group>
  );
}
