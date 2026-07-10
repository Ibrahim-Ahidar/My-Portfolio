import React, { useRef, useMemo, useEffect, useState, Component } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.warn('ThreeBackground disabled:', error?.message || error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}

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

  const { positions1, initialPositions1 } = useMemo(() => {
    const pos = new Float32Array(count1 * 3);
    const init = new Array(count1);
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

      init[i] = { x, y, z, speed: 0.15 + Math.random() * 0.35, angle: Math.random() * Math.PI * 2 };
    }
    return { positions1: pos, initialPositions1: init };
  }, [count1]);

  const { positions2, initialPositions2 } = useMemo(() => {
    const pos = new Float32Array(count2 * 3);
    const init = new Array(count2);
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

      init[i] = { x, y, z, speed: 0.25 + Math.random() * 0.55, angle: Math.random() * Math.PI * 2 };
    }
    return { positions2: pos, initialPositions2: init };
  }, [count2]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const pointer = state.pointer;

    scrollY.current += (targetScrollY.current - scrollY.current) * 0.05;

    if (pointsRef1.current) {
      const mesh = pointsRef1.current;
      mesh.rotation.y = time * 0.02 + scrollY.current * 0.0003;
      mesh.rotation.x = time * 0.01 + scrollY.current * 0.0002;
      mesh.rotation.y += (pointer.x * 0.15 - mesh.rotation.y) * 0.05;
      mesh.rotation.x += (-pointer.y * 0.15 - mesh.rotation.x) * 0.05;

      const positionAttr = mesh.geometry.attributes.position;
      // Guard: never write past the GPU buffer length (resize is unsupported)
      if (positionAttr && positionAttr.array.length === count1 * 3) {
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
    }

    if (pointsRef2.current) {
      const mesh = pointsRef2.current;
      mesh.rotation.y = -time * 0.03 - scrollY.current * 0.0002;
      mesh.rotation.x = -time * 0.015 - scrollY.current * 0.0001;
      mesh.rotation.y += (-pointer.x * 0.2 - mesh.rotation.y) * 0.05;
      mesh.rotation.x += (pointer.y * 0.2 - mesh.rotation.x) * 0.05;

      const positionAttr = mesh.geometry.attributes.position;
      if (positionAttr && positionAttr.array.length === count2 * 3) {
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
    }
  });

  return (
    <group>
      <points ref={pointsRef1}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions1, 3]}
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
            args={[positions2, 3]}
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

const fallbackBg = {
  position: 'fixed',
  inset: 0,
  width: '100%',
  height: '100%',
  zIndex: -2,
  pointerEvents: 'none',
  background: 'radial-gradient(circle at 50% 50%, #09090B 0%, #000000 100%)',
};

export default function ThreeBackground() {
  // Lock particle counts at first paint — resizing BufferAttributes crashes Three.js
  const [scene] = useState(() => {
    if (typeof window === 'undefined') {
      return { prefersReduced: false, isMobile: false, count1: 1500, count2: 800 };
    }
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return {
      prefersReduced,
      isMobile,
      count1: isMobile ? 500 : 1500,
      count2: isMobile ? 250 : 800,
    };
  });

  const [prefersReduced, setPrefersReduced] = useState(scene.prefersReduced);

  useEffect(() => {
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReduced(mqMotion.matches);
    mqMotion.addEventListener('change', update);
    return () => mqMotion.removeEventListener('change', update);
  }, []);

  if (prefersReduced) {
    return <div aria-hidden="true" style={fallbackBg} />;
  }

  return (
    <div aria-hidden="true" style={fallbackBg}>
      <CanvasErrorBoundary fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 60 }}
          dpr={scene.isMobile ? [1, 1] : [1, 1.5]}
          performance={{ min: 0.5 }}
        >
          <ambientLight intensity={0.5} />
          <InteractiveParticles count1={scene.count1} count2={scene.count2} />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}
