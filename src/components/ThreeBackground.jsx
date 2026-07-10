import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function InteractiveParticles({ count1, count2 }) {
  const pointsRef1 = useRef();
  const pointsRef2 = useRef();
  const scrollY = useRef(0);
  const targetScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      targetScrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [positions1, initialPositions1] = useMemo(() => {
    const pos = new Float32Array(count1 * 3);
    const init = [];
    for (let i = 0; i < count1; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.5 + Math.random() * 2.5;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      init.push({ x, y, z, speed: 0.15 + Math.random() * 0.35, angle: Math.random() * Math.PI * 2 });
    }
    return [pos, init];
  }, [count1]);

  const [positions2, initialPositions2] = useMemo(() => {
    const pos = new Float32Array(count2 * 3);
    const init = [];
    for (let i = 0; i < count2; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 0.8 + Math.random() * 1.5;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      init.push({ x, y, z, speed: 0.25 + Math.random() * 0.55, angle: Math.random() * Math.PI * 2 });
    }
    return [pos, init];
  }, [count2]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const pointer = state.pointer;

    scrollY.current += (targetScrollY.current - scrollY.current) * 0.05;

    if (pointsRef1.current) {
      pointsRef1.current.rotation.y = time * 0.02 + scrollY.current * 0.0003;
      pointsRef1.current.rotation.x = time * 0.01 + scrollY.current * 0.0002;

      pointsRef1.current.rotation.y += (pointer.x * 0.15 - pointsRef1.current.rotation.y) * 0.05;
      pointsRef1.current.rotation.x += (-pointer.y * 0.15 - pointsRef1.current.rotation.x) * 0.05;

      const positionAttr = pointsRef1.current.geometry.attributes.position;
      for (let i = 0; i < count1; i++) {
        const i3 = i * 3;
        const initial = initialPositions1[i];
        const wave = Math.sin(time * initial.speed + initial.angle) * 0.12;
        positionAttr.array[i3] = initial.x + (initial.x / 4) * wave;
        positionAttr.array[i3 + 1] = initial.y + (initial.y / 4) * wave;
        positionAttr.array[i3 + 2] = initial.z + (initial.z / 4) * wave;
      }
      positionAttr.needsUpdate = true;
    }

    if (pointsRef2.current) {
      pointsRef2.current.rotation.y = -time * 0.03 - scrollY.current * 0.0002;
      pointsRef2.current.rotation.x = -time * 0.015 - scrollY.current * 0.0001;

      pointsRef2.current.rotation.y += (-pointer.x * 0.2 - pointsRef2.current.rotation.y) * 0.05;
      pointsRef2.current.rotation.x += (pointer.y * 0.2 - pointsRef2.current.rotation.x) * 0.05;

      const positionAttr = pointsRef2.current.geometry.attributes.position;
      for (let i = 0; i < count2; i++) {
        const i3 = i * 3;
        const initial = initialPositions2[i];
        const wave = Math.cos(time * initial.speed + initial.angle) * 0.08;
        positionAttr.array[i3] = initial.x + (initial.x / 3) * wave;
        positionAttr.array[i3 + 1] = initial.y + (initial.y / 3) * wave;
        positionAttr.array[i3 + 2] = initial.z + (initial.z / 3) * wave;
      }
      positionAttr.needsUpdate = true;
    }
  });

  return (
    <group>
      <points ref={pointsRef1}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count1}
            array={positions1}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.025}
          color="#8B5CF6"
          sizeAttenuation={true}
          transparent={true}
          opacity={0.4}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <points ref={pointsRef2}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count2}
            array={positions2}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#A78BFA"
          sizeAttenuation={true}
          transparent={true}
          opacity={0.5}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function ThreeBackground() {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mqMobile = window.matchMedia('(max-width: 768px)');
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      setIsMobile(mqMobile.matches);
      setPrefersReduced(mqMotion.matches);
    };
    update();
    mqMobile.addEventListener('change', update);
    mqMotion.addEventListener('change', update);
    return () => {
      mqMobile.removeEventListener('change', update);
      mqMotion.removeEventListener('change', update);
    };
  }, []);

  if (prefersReduced) {
    return (
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: -2,
          pointerEvents: 'none',
          background: 'radial-gradient(circle at 50% 50%, #09090B 0%, #000000 100%)',
        }}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: -2,
        pointerEvents: 'none',
        background: 'radial-gradient(circle at 50% 50%, #09090B 0%, #000000 100%)',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 60 }}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.5} />
        <InteractiveParticles
          count1={isMobile ? 500 : 1500}
          count2={isMobile ? 250 : 800}
        />
      </Canvas>
    </div>
  );
}
