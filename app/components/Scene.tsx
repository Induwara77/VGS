"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import { useEffect, useRef, useState, Suspense } from "react";
import * as THREE from "three";

function IceCube({ scale }: { scale: number }) {
  const { scene } = useGLTF("/models/IceCube.glb");
  const groupRef = useRef<THREE.Group>(null);
  const isTouch = useRef(false);

  useEffect(() => {
    isTouch.current = "ontouchstart" in window;

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

    if (isTouch.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.15;
      groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.05;
      return;
    }

    const { x, y } = state.pointer;

    const targetRotY = x * 0.4;
    const targetRotX = -y * 0.2;
    const targetPosX = x * 0.15;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetPosX, 0.05);
  });

  return (
    <group ref={groupRef} scale={scale}>
      <primitive object={scene} />
    </group>
  );
}

export default function Scene() {
  const [scale, setScale] = useState(0.6);

  useEffect(() => {
    const updateScale = () => {
      const w = window.innerWidth;
      if (w < 640) setScale(0.35);
      else if (w < 1024) setScale(0.5);
      else setScale(0.6);
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 3]} intensity={1.5} />
      <Environment preset="studio" />
      <Suspense fallback={null}>
        <IceCube scale={scale} />
      </Suspense>
    </Canvas>
  );
}