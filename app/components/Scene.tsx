"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

function IceCube() {
  const { scene } = useGLTF("/models/IceCube.glb");
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        child.material.side = THREE.DoubleSide;
      }
    });

    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    box.getCenter(center);
    scene.position.sub(center);
  }, [scene]);

  useFrame((state) => {
    if (!groupRef.current) return;

    const isTouch = "ontouchstart" in window;

    if (isTouch) {
      // Mobile: no mouse, so drift gently on its own
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.15;
      groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.05;
      return;
    }

    // Desktop: subtle mouse-driven tilt + tiny horizontal drift
    const { x, y } = state.pointer; // both range -1 to 1

    const targetRotY = x * 0.4;
    const targetRotX = -y * 0.2;
    const targetPosX = x * 0.15;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetPosX, 0.05);
  });

  return (
    <group ref={groupRef} scale={0.6}>
      <primitive object={scene} />
    </group>
  );
}

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 3]} intensity={1.5} />
      <Environment preset="studio" />
      <IceCube />
    </Canvas>
  );
}