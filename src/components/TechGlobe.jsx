import React, { useMemo, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { TECH_STACK } from '../data/index.jsx';
import '../styles/techglobe.scss';

function GlobeCore({ reducedMotion }) {
  const meshRef = useRef();
  const pointsRef = useRef();

  useFrame((state, delta) => {
    if (reducedMotion) return;
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= delta * 0.05;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.0, 20, 20]} />
        <meshBasicMaterial color="#8B5CF6" wireframe={true} transparent={true} opacity={0.06} />
      </mesh>

      <points ref={pointsRef}>
        <sphereGeometry args={[2.2, 36, 36]} />
        <pointsMaterial color="#A78BFA" size={0.03} sizeAttenuation={true} transparent={true} opacity={0.15} />
      </points>
    </group>
  );
}

function TechItems({ activeCategory, reducedMotion }) {
  const groupRef = useRef();

  const filteredStack = useMemo(() => {
    return activeCategory === 'all'
      ? TECH_STACK
      : TECH_STACK.filter((tech) => tech.category === activeCategory);
  }, [activeCategory]);

  const radius = 3.2;

  const items = useMemo(() => {
    const list = [];
    const count = filteredStack.length;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      list.push({
        tech: filteredStack[i],
        pos: [x, y, z],
      });
    }
    return list;
  }, [filteredStack]);

  return (
    <group ref={groupRef}>
      <GlobeCore reducedMotion={reducedMotion} />
      {items.map((item, index) => {
        const IconComponent = item.tech.icon;
        return (
          <Html
            key={item.tech.name + index}
            position={item.pos}
            center={true}
            distanceFactor={8.5}
            zIndexRange={[100, 0]}
          >
            <a
              href={item.tech.link}
              target="_blank"
              rel="noopener noreferrer"
              className="tech-globe-badge"
            >
              <IconComponent className="badge-icon" />
              <span>{item.tech.name}</span>
            </a>
          </Html>
        );
      })}
    </group>
  );
}

export default function TechGlobe({ activeCategory }) {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mqMobile = window.matchMedia('(max-width: 768px)');
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      setIsMobile(mqMobile.matches);
      setReducedMotion(mqMotion.matches);
    };
    update();
    mqMobile.addEventListener('change', update);
    mqMotion.addEventListener('change', update);
    return () => {
      mqMobile.removeEventListener('change', update);
      mqMotion.removeEventListener('change', update);
    };
  }, []);

  return (
    <div className="tech-globe-container">
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 60 }}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.8} />
        <TechItems activeCategory={activeCategory} reducedMotion={reducedMotion} />
        <OrbitControls
          enableZoom={false}
          autoRotate={!reducedMotion}
          autoRotateSpeed={0.6}
          enablePan={false}
          maxPolarAngle={Math.PI}
          minPolarAngle={0}
        />
      </Canvas>
      <div className="globe-instructions">
        <span>
          {isMobile
            ? 'Drag to rotate · Tap icons for docs'
            : 'Drag to rotate globe | Click icons to open docs'}
        </span>
      </div>
    </div>
  );
}
