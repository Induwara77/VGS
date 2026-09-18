"use client";

import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

function IceCube() {
  const { scene } = useGLTF("/models/IceCube.glb");

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

  return <primitive object={scene} />;
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