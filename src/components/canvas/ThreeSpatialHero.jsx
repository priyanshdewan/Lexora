import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext.jsx';

/**
 * ThreeSpatialHero Component
 * Inspired by Three.js & bestdesignsonx.com:
 * Interactive 3D spatial legal geometry representing the statutory knowledge kernel.
 * Features reactive cursor rotation, vertex lighting, and institutional azure/cyan aesthetics.
 * Strictly adheres to negative constraints: zero purple, high-performance WebGL canvas.
 */
export const ThreeSpatialHero = () => {
  const { isDark } = useTheme();
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group to hold meshes for mouse tilt
    const group = new THREE.Group();
    scene.add(group);

    // 1. Outer Polyhedron Wireframe (Statutory Shell)
    const icosahedronGeometry = new THREE.IcosahedronGeometry(2.1, 1);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: isDark ? 0x0284c7 : 0x2563eb,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.35 : 0.25
    });
    const wireframeMesh = new THREE.Mesh(icosahedronGeometry, wireframeMaterial);
    group.add(wireframeMesh);

    // 2. Vertex Points (Grounding Nodes)
    const pointsMaterial = new THREE.PointsMaterial({
      color: isDark ? 0x06b6d4 : 0x0284c7,
      size: 0.08,
      transparent: true,
      opacity: isDark ? 0.9 : 0.8
    });
    const pointsMesh = new THREE.Points(icosahedronGeometry, pointsMaterial);
    group.add(pointsMesh);

    // 3. Inner Crystalline Octahedron (Precedence Core)
    const innerGeometry = new THREE.OctahedronGeometry(1.2, 0);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: isDark ? 0x3b82f6 : 0x1d4ed8,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.6 : 0.45
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    group.add(innerMesh);

    // 4. Floating Concentric Rings (Jurisdiction Horizons)
    const ringGeometry = new THREE.RingGeometry(2.5, 2.54, 48);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: isDark ? 0x06b6d4 : 0x3b82f6,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: isDark ? 0.2 : 0.15
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.rotation.x = Math.PI / 3;
    group.add(ringMesh);

    // Mouse coordinates for reactive spatial parallax
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      mouseX = x;
      mouseY = y;
      targetRotationY = x * 1.5;
      targetRotationX = y * 1.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Continuous subtle orbital rotation
      wireframeMesh.rotation.y = elapsedTime * 0.08;
      wireframeMesh.rotation.x = elapsedTime * 0.05;

      pointsMesh.rotation.y = elapsedTime * 0.08;
      pointsMesh.rotation.x = elapsedTime * 0.05;

      innerMesh.rotation.y = -elapsedTime * 0.15;
      innerMesh.rotation.z = elapsedTime * 0.1;

      ringMesh.rotation.z = elapsedTime * 0.05;

      // Smooth camera/group tilt interpolation towards mouse
      group.rotation.x += (targetRotationX - group.rotation.x) * 0.05;
      group.rotation.y += (targetRotationY - group.rotation.y) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      icosahedronGeometry.dispose();
      innerGeometry.dispose();
      ringGeometry.dispose();
      wireframeMaterial.dispose();
      pointsMaterial.dispose();
      innerMaterial.dispose();
      ringMaterial.dispose();
    };
  }, [isDark]);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full min-h-[380px] sm:min-h-[460px] pointer-events-auto cursor-grab active:cursor-grabbing relative flex items-center justify-center select-none"
      style={{ touchAction: 'none' }}
    />
  );
};
