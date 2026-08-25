import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CyberGlobe3D({ currentTheme }) {
  const mountRef = useRef(null);
  const isDraggingRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 4.6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const hexColor = currentTheme?.accent || '#06b6d4';
    const secColor = currentTheme?.secondaryColor || '#8b5cf6';
    const colorObj = new THREE.Color(hexColor);
    const secObj = new THREE.Color(secColor);

    // 1. Cyber Wireframe Globe (Outer Layer)
    const globeGeo = new THREE.SphereGeometry(1.6, 28, 28);
    const globeMat = new THREE.MeshStandardMaterial({
      color: colorObj,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
      roughness: 0.2,
      metalness: 0.8
    });
    const globeMesh = new THREE.Mesh(globeGeo, globeMat);
    globeGroup.add(globeMesh);

    // 2. Inner Glowing Core
    const innerCoreGeo = new THREE.IcosahedronGeometry(1.1, 2);
    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: secObj,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    globeGroup.add(innerCore);

    // 3. Orbiting Satellite Rings
    const orbitGeo = new THREE.TorusGeometry(2.1, 0.02, 16, 100);
    const orbitMat = new THREE.MeshBasicMaterial({
      color: colorObj,
      transparent: true,
      opacity: 0.6
    });
    const orbit1 = new THREE.Mesh(orbitGeo, orbitMat);
    orbit1.rotation.x = Math.PI / 3;
    globeGroup.add(orbit1);

    const orbit2 = new THREE.Mesh(orbitGeo, orbitMat);
    orbit2.rotation.x = -Math.PI / 4;
    orbit2.rotation.y = Math.PI / 6;
    globeGroup.add(orbit2);

    // 4. Pulsing Beacon for Location (Tashkent coords approximate on sphere)
    const beaconGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const beaconMat = new THREE.MeshBasicMaterial({ color: '#10b981' });
    const beacon = new THREE.Mesh(beaconGeo, beaconMat);
    beacon.position.set(0.9, 0.9, 0.9);
    globeGroup.add(beacon);

    // Halo pulse ring around beacon
    const ringGeo = new THREE.RingGeometry(0.12, 0.16, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: '#10b981', side: THREE.DoubleSide, transparent: true, opacity: 0.8 });
    const beaconRing = new THREE.Mesh(ringGeo, ringMat);
    beaconRing.position.set(0.95, 0.95, 0.95);
    beaconRing.lookAt(2, 2, 2);
    globeGroup.add(beaconRing);

    // 5. Surrounding Cyber Particles
    const pCount = 100;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i += 3) {
      pPos[i] = (Math.random() - 0.5) * 6;
      pPos[i + 1] = (Math.random() - 0.5) * 6;
      pPos[i + 2] = (Math.random() - 0.5) * 6;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: colorObj, size: 0.04, transparent: true, opacity: 0.7 });
    const pCloud = new THREE.Points(pGeo, pMat);
    scene.add(pCloud);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambient);

    const pointLight = new THREE.PointLight(colorObj, 3, 20);
    pointLight.position.set(3, 3, 3);
    scene.add(pointLight);

    // Mouse Drag Rotation Controls
    const handleMouseDown = (e) => {
      isDraggingRef.current = true;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - prevMouseRef.current.x;
      const dy = e.clientY - prevMouseRef.current.y;
      globeGroup.rotation.y += dx * 0.008;
      globeGroup.rotation.x += dy * 0.008;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    const startTime = performance.now();

    const animate = (time) => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = (time - startTime) * 0.001;

      if (!isDraggingRef.current) {
        globeGroup.rotation.y += 0.006;
      }

      orbit1.rotation.z += 0.012;
      orbit2.rotation.z -= 0.01;

      const scalePulse = 1 + Math.sin(elapsed * 4) * 0.2;
      beaconRing.scale.set(scalePulse, scalePulse, scalePulse);

      pCloud.rotation.y = elapsed * 0.02;

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      globeGeo.dispose();
      globeMat.dispose();
      innerCoreGeo.dispose();
      innerCoreMat.dispose();
      orbitGeo.dispose();
      orbitMat.dispose();
      pGeo.dispose();
      pMat.dispose();
      renderer.dispose();
    };
  }, [currentTheme]);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '280px',
        cursor: 'grab',
        position: 'relative'
      }}
      title="3D Globusni aylantirish uchun ushlab torting"
    />
  );
}
