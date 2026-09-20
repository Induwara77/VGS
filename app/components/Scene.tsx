"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import { useEffect, useRef, useState, Suspense } from "react";
import * as THREE from "three";

function IceCube({ scale }: { scale: number }) {
  const { scene } = useGLTF("/models/IceCube_obj-converted.glb");
  const groupRef = useRef<THREE.Group>(null);
  const isTouch = useRef(false);

  useEffect(() => {
    isTouch.current = "ontouchstart" in window;

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color("#ffffff"),
          metalness: 0.1,
          roughness: 0.1,
          transmission: 0.6,
          transparent: true,
          opacity: 0.9,
          side: THREE.DoubleSide,
        });
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
  // Massive scale configuration
  const [scale, setScale] = useState(1.4);

  useEffect(() => {
    const updateScale = () => {
      const w = window.innerWidth;
      if (w < 640) setScale(1.0);       // Mobile size
      else if (w < 1024) setScale(1.2);  // Tablet size
      else setScale(1.4);              // Huge desktop size
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <Canvas 
      camera={{ position: [0, 0, 7], fov: 45, near: 0.1, far: 1000 }} // Pulled back to 7
      style={{ overflow: 'visible', background: 'transparent', width: '100%', height: '100%' }}
      gl={{ alpha: true }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={2.5} />
      <directionalLight position={[-5, -5, -5]} intensity={1} />
      <Environment preset="city" />
      <Suspense fallback={null}>
        <IceCube scale={scale} />
      </Suspense>
    </Canvas>
  );
}