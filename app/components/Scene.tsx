"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import { useEffect, useRef, useState, Suspense } from "react";
import * as THREE from "three";

function IPhoneModel({ scale }: { scale: number }) {
  const { scene } = useGLTF("/models/iphone_16_-_free.glb");
  const groupRef = useRef<THREE.Group>(null);
  const isTouch = useRef(false);

  // Tracking movement for both mouse and touch
  const velocity = useRef({ x: 0, y: 0 });
  const lastPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    isTouch.current = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    // Center the model based on its bounding box
    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    box.getCenter(center);
    scene.position.sub(center);

    // Offset the model position slightly down on mobile viewports
    if (window.innerWidth < 640) {
      scene.position.y -= 0.3;
    }

    // Mouse movement handler
    const handleMouseMove = (e: MouseEvent) => {
      if (isTouch.current) return;
      const { innerWidth, innerHeight } = window;
      const currentX = (e.clientX / innerWidth) * 2 - 1;
      const currentY = -(e.clientY / innerHeight) * 2 + 1;

      velocity.current.x = currentX - lastPosition.current.x;
      velocity.current.y = currentY - lastPosition.current.y;
      lastPosition.current = { x: currentX, y: currentY };
    };

    // Touch swipe handlers for mobile devices
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      lastPosition.current = {
        x: (touch.clientX / window.innerWidth) * 2 - 1,
        y: -(touch.clientY / window.innerHeight) * 2 + 1,
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      const currentX = (touch.clientX / window.innerWidth) * 2 - 1;
      const currentY = -(touch.clientY / window.innerHeight) * 2 + 1;

      velocity.current.x = currentX - lastPosition.current.x;
      velocity.current.y = currentY - lastPosition.current.y;
      lastPosition.current = { x: currentX, y: currentY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [scene]);

  useFrame(() => {
    if (!groupRef.current) return;

    // Continuous smooth idle spin
    const idleSpeed = 0.005;
    groupRef.current.rotation.y += idleSpeed;

    // Apply movement momentum (mouse or finger swipe)
    const sensitivity = isTouch.current ? 5.0 : 3.5;
    groupRef.current.rotation.y += velocity.current.x * sensitivity;
    groupRef.current.rotation.x += velocity.current.y * sensitivity;

    // Gradually decay momentum when user stops interacting
    velocity.current.x *= 0.92;
    velocity.current.y *= 0.92;
  });

  return (
    <group ref={groupRef} scale={scale}>
      <primitive object={scene} />
    </group>
  );
}

export default function Scene() {
  const [scale, setScale] = useState(0.16); // 3x smaller than original default (0.6)

  useEffect(() => {
    const updateScale = () => {
      const w = window.innerWidth;
      if (w < 640) setScale(0.4);      // Mobile size (3x smaller)
      else if (w < 1024) setScale(0.3);  // Tablet size (3x smaller)
      else setScale(0.16);              // Desktop size (3x smaller)
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
      <Canvas 
        camera={{ position: [0, 0, 4], fov: 35, near: 0.1, far: 1000 }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
        gl={{ alpha: true }}
        className="pointer-events-auto"
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={2.5} />
        <directionalLight position={[-5, -5, -5]} intensity={1} />
        <Environment preset="city" />
        <Suspense fallback={null}>
          <IPhoneModel scale={scale} />
        </Suspense>
      </Canvas>
    </div>
  );
}