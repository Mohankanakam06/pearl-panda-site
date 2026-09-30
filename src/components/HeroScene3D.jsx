import React, { useRef, useMemo, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Center, Text3D, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// 3D Extruded PEARL PANDA Typography with Bevel, Shaders & Parallax
function PearlPandaText({ mouse, scrollY, isMobile }) {
  const groupRef = useRef();
  const text1Ref = useRef();
  const text2Ref = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth Lerp Mouse Parallax Tilt
    const targetRotY = (mouse.current.x * Math.PI) / 8;
    const targetRotX = (-mouse.current.y * Math.PI) / 10;

    // Scroll responsiveness
    const scrollFactor = Math.min(scrollY.current / 600, 1.5);
    const targetPosZ = -scrollFactor * 4;
    const targetPosY = scrollFactor * 2;
    const targetRotZ = scrollFactor * 0.15;

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetRotY,
      4,
      delta
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetRotX,
      4,
      delta
    );
    groupRef.current.rotation.z = THREE.MathUtils.damp(
      groupRef.current.rotation.z,
      targetRotZ,
      4,
      delta
    );
    groupRef.current.position.z = THREE.MathUtils.damp(
      groupRef.current.position.z,
      targetPosZ,
      3,
      delta
    );
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      targetPosY,
      3,
      delta
    );
  });

  const fontUrl = '/Anton_Regular.json';
  const size = isMobile ? 1.3 : 2.1;
  const height = isMobile ? 0.4 : 0.65;
  const bevelThickness = 0.08;
  const bevelSize = 0.04;

  return (
    <group ref={groupRef} position={[0, 0.4, 0]}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <Center position={[0, isMobile ? 1.0 : 1.3, 0]}>
          <Text3D
            ref={text1Ref}
            font={fontUrl}
            size={size}
            height={height}
            curveSegments={12}
            bevelEnabled
            bevelThickness={bevelThickness}
            bevelSize={bevelSize}
            bevelOffset={0}
            bevelSegments={4}
            letterSpacing={0.06}
          >
            PEARL
            <meshStandardMaterial
              color="#0B1F16"
              emissive="#103622"
              emissiveIntensity={0.35}
              roughness={0.2}
              metalness={0.8}
            />
          </Text3D>
        </Center>

        <Center position={[0, isMobile ? -0.5 : -0.8, 0]}>
          <Text3D
            ref={text2Ref}
            font={fontUrl}
            size={size}
            height={height}
            curveSegments={12}
            bevelEnabled
            bevelThickness={bevelThickness}
            bevelSize={bevelSize}
            bevelOffset={0}
            bevelSegments={4}
            letterSpacing={0.06}
          >
            PANDA
            <meshStandardMaterial
              color="#2E8B3C"
              emissive="#38E54D"
              emissiveIntensity={0.4}
              roughness={0.15}
              metalness={0.85}
            />
          </Text3D>
        </Center>
      </Float>
    </group>
  );
}

// Lightweight Floating Bamboo Leaves & Gem Particles
function FloatingAtmosphere() {
  const count = 75;
  const meshRef = useRef();

  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 80;
      const speed = 0.01 + Math.random() / 150;
      const x = (Math.random() - 0.5) * 25;
      const y = (Math.random() - 0.5) * 18;
      const z = (Math.random() - 0.5) * 16 - 2;
      const scale = 0.2 + Math.random() * 0.45;
      const rotSpeedX = (Math.random() - 0.5) * 0.02;
      const rotSpeedY = (Math.random() - 0.5) * 0.02;
      const isGold = Math.random() < 0.15;
      temp.push({ t, factor, speed, x, y, z, scale, rotSpeedX, rotSpeedY, isGold });
    }
    return temp;
  }, [count]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    particles.forEach((particle, i) => {
      let { t, factor, speed, x, y, z, scale, rotSpeedX, rotSpeedY } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;

      dummy.position.set(
        x + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        y + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        z + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(scale, scale * 1.6, scale);
      dummy.rotation.set(t * 0.5 + i, t * 0.3 + i, t * 0.2);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <octahedronGeometry args={[0.3, 0]} />
      <meshStandardMaterial
        color="#70B85A"
        emissive="#38E54D"
        emissiveIntensity={0.5}
        roughness={0.3}
        metalness={0.7}
      />
    </instancedMesh>
  );
}

// Scene Lighting with Emerald Core & Gold Rim Highlights
function Lighting() {
  return (
    <>
      <ambientLight intensity={0.65} color="#0B1F16" />

      {/* Primary Top Emerald Spotlight */}
      <directionalLight
        position={[0, 8, 5]}
        intensity={2.2}
        color="#38E54D"
      />

      {/* Gold Rim Highlights for Depth & Luxury Contrast */}
      <spotLight
        position={[10, 6, -4]}
        intensity={4.5}
        color="#DAAF37"
        angle={0.6}
        penumbra={0.8}
      />
      <spotLight
        position={[-10, -6, -4]}
        intensity={3.5}
        color="#DAAF37"
        angle={0.6}
        penumbra={0.8}
      />

      {/* Front Soft Fill */}
      <pointLight position={[0, 0, 8]} intensity={1.2} color="#FFFFFF" />
      <pointLight position={[0, -5, 4]} intensity={1.8} color="#2E8B3C" />
    </>
  );
}

// Main Canvas Scene Container
export default function HeroScene3D() {
  const mouse = useRef({ x: 0, y: 0 });
  const scrollY = useRef(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsReducedMotion(reducedMotion);
    setIsMobile(window.innerWidth < 768);

    const onMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const onScroll = () => {
      scrollY.current = window.scrollY;
    };

    const onResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  if (isReducedMotion) {
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 select-none">
        <div className="text-center font-display uppercase tracking-wider">
          <div className="text-6xl md:text-9xl text-[#0B1F16] drop-shadow-[4px_4px_0px_#38E54D]">
            PEARL
          </div>
          <div className="text-6xl md:text-9xl text-[#38E54D] drop-shadow-[4px_4px_0px_#0B1F16]">
            PANDA
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden">
      <Canvas
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)]}
        className="w-full h-full"
      >
        <PerspectiveCamera makeDefault position={[0, 0, 11]} fov={isMobile ? 55 : 45} />
        <Lighting />
        <Suspense fallback={null}>
          <PearlPandaText mouse={mouse} scrollY={scrollY} isMobile={isMobile} />
          <FloatingAtmosphere />
        </Suspense>
      </Canvas>
    </div>
  );
}
