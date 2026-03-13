"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

export function ParticlesDiya() {
  const count = 75;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 10;
      const speed = 0.01 + Math.random() * 0.02;
      temp.push({ x, y, z, speed, offset: Math.random() * Math.PI * 2 });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    
    particles.forEach((particle, i) => {
      particle.y += particle.speed;
      if (particle.y > 10) particle.y = -10;
      
      dummy.position.set(
        particle.x + Math.sin(state.clock.elapsedTime * particle.speed + particle.offset) * 2,
        particle.y,
        particle.z
      );
      dummy.rotation.set(state.clock.elapsedTime * particle.speed, 0, 0);
      dummy.scale.setScalar(0.2 + Math.sin(state.clock.elapsedTime * 2 + particle.offset) * 0.1);
      
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    if (mesh.current) {
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <coneGeometry args={[0.2, 0.4, 8]} />
      <meshStandardMaterial color="#f4c35a" emissive="#f07a26" emissiveIntensity={2} roughness={0.1} />
    </instancedMesh>
  );
}
