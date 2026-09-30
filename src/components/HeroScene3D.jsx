import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroScene3D() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050e08, 0.028);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Create a circular glow sprite texture for smooth organic particles
    const createParticleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(120, 255, 160, 0.85)');
      gradient.addColorStop(0.5, 'rgba(46, 139, 60, 0.35)');
      gradient.addColorStop(0.8, 'rgba(11, 31, 22, 0.1)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);

      const texture = new THREE.CanvasTexture(canvas);
      texture.generateMipmaps = false;
      texture.minFilter = THREE.LinearFilter;
      return texture;
    };

    const particleTexture = createParticleTexture();

    // Generate volumetric organic cloud particles
    const particleCount = 28000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const speeds = new Float32Array(particleCount);
    const phases = new Float32Array(particleCount);

    // Color palettes based on PRD:
    // Deep green: #0B1F16, Primary Green: #2E8B3C, Light Green: #70B85A, Neon: #38E54D, Gold: #DAAF37
    const colorPalette = [
      new THREE.Color('#38E54D'), // 0: Vivid Neon
      new THREE.Color('#2E8B3C'), // 1: Pearl Panda Primary
      new THREE.Color('#70B85A'), // 2: Light Sage/Emerald
      new THREE.Color('#104B26'), // 3: Deep Forest
      new THREE.Color('#0B2418'), // 4: Obsidian Moss
      new THREE.Color('#DAAF37'), // 5: Selective Gold Accent
      new THREE.Color('#A8F5B8'), // 6: Mint Highlights
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Create an organic cloud structure: dense center with turbulent swirling wisps
      const u = Math.random();
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      // Clustered radius distribution for natural density falloff
      const baseRadius = Math.pow(u, 0.55) * 6.8;
      
      // Organic deformation noise
      const noiseX = Math.sin(theta * 3.0) * Math.cos(phi * 2.0) * 1.4;
      const noiseY = Math.cos(theta * 2.0) * Math.sin(phi * 3.0) * 1.1;
      const noiseZ = Math.sin(theta * 4.0 + phi) * 1.2;

      // Slight horizontal ellipsoid stretch matching the center composition
      const x = (baseRadius + noiseX) * Math.sin(phi) * Math.cos(theta) * 1.35;
      const y = (baseRadius + noiseY) * Math.sin(phi) * Math.sin(theta) * 0.95;
      const z = (baseRadius + noiseZ) * Math.cos(phi) * 1.1;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      originalPositions[i3] = x;
      originalPositions[i3 + 1] = y;
      originalPositions[i3 + 2] = z;

      // Assign colors based on radial distance & random variation
      const distFromCenter = Math.sqrt(x * x + y * y + z * z);
      let pColor;

      const rand = Math.random();
      if (rand < 0.04) {
        // Selective gold accent as specified in PRD
        pColor = colorPalette[5];
      } else if (distFromCenter < 2.5) {
        // Core glow
        pColor = rand < 0.4 ? colorPalette[0] : colorPalette[6];
      } else if (distFromCenter < 5.0) {
        // Mid density body
        pColor = rand < 0.6 ? colorPalette[1] : colorPalette[2];
      } else {
        // Outer wispy edge
        pColor = rand < 0.5 ? colorPalette[3] : colorPalette[4];
      }

      colors[i3] = pColor.r;
      colors[i3 + 1] = pColor.g;
      colors[i3 + 2] = pColor.b;

      // Scale variation
      scales[i] = (0.4 + Math.random() * 0.9) * (1.0 - Math.min(distFromCenter / 9, 0.6));
      speeds[i] = 0.3 + Math.random() * 0.8;
      phases[i] = Math.random() * Math.PI * 2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Material
    const material = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Secondary layer: Ambient floating dust motes for atmosphere
    const dustCount = 800;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);

    for (let i = 0; i < dustCount; i++) {
      const i3 = i * 3;
      dustPositions[i3] = (Math.random() - 0.5) * 36;
      dustPositions[i3 + 1] = (Math.random() - 0.5) * 22;
      dustPositions[i3 + 2] = (Math.random() - 0.5) * 20;

      const c = Math.random() > 0.3 ? colorPalette[2] : colorPalette[0];
      dustColors[i3] = c.r;
      dustColors[i3 + 1] = c.g;
      dustColors[i3 + 2] = c.b;
    }

    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    dustGeo.setAttribute('color', new THREE.BufferAttribute(dustColors, 3));

    const dustMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const dustParticles = new THREE.Points(dustGeo, dustMaterial);
    scene.add(dustParticles);

    // Mouse tracking with smooth damping
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = x;
      targetMouseY = y;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize handling
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    let animationFrameId;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Smooth mouse lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Group rotation
      particles.rotation.y = elapsedTime * 0.08 + currentMouseX * 0.45;
      particles.rotation.x = Math.sin(elapsedTime * 0.05) * 0.1 - currentMouseY * 0.35;
      particles.rotation.z = Math.cos(elapsedTime * 0.06) * 0.05;

      dustParticles.rotation.y = -elapsedTime * 0.02;
      dustParticles.rotation.x = elapsedTime * 0.01;

      // Dynamic organic wave deformation
      const posAttr = geometry.attributes.position;
      const posArray = posAttr.array;

      for (let i = 0; i < particleCount; i += 3) {
        const i3 = i * 3;
        const ox = originalPositions[i3];
        const oy = originalPositions[i3 + 1];
        const oz = originalPositions[i3 + 2];

        const speed = speeds[i];
        const phase = phases[i];
        const wave = Math.sin(elapsedTime * speed + phase + ox * 0.3) * 0.12;

        posArray[i3] = ox + Math.cos(elapsedTime * 0.4 + oy * 0.2) * 0.1 + wave;
        posArray[i3 + 1] = oy + Math.sin(elapsedTime * 0.5 + ox * 0.2) * 0.1 + wave;
        posArray[i3 + 2] = oz + Math.sin(elapsedTime * 0.3 + oz * 0.2) * 0.15;
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      geometry.dispose();
      material.dispose();
      dustGeo.dispose();
      dustMaterial.dispose();
      particleTexture.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    />
  );
}
