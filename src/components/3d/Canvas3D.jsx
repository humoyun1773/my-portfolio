import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Canvas3D({ currentTheme, activeShape = 'torus' }) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const groupRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    const camera = new THREE.PerspectiveCamera(
      60,
      width / height,
      0.1,
      1000
    );
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    groupRef.current = mainGroup;
    scene.add(mainGroup);

    // Color conversion
    const hexColor = currentTheme?.accent || '#06b6d4';
    const secondaryColor = currentTheme?.secondaryColor || '#8b5cf6';
    const colorObj = new THREE.Color(hexColor);
    const colorSecObj = new THREE.Color(secondaryColor);

    // Create Main 3D Shape based on activeShape prop
    let primaryMesh, innerMesh;

    const createShape = (shapeType) => {
      while (mainGroup.children.length > 0) {
        const obj = mainGroup.children[0];
        mainGroup.remove(obj);
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) obj.material.dispose();
      }

      if (shapeType === 'sphere') {
        const sphereGeo = new THREE.IcosahedronGeometry(1.3, 3);
        const sphereMat = new THREE.MeshStandardMaterial({
          color: colorObj,
          wireframe: true,
          roughness: 0.1,
          metalness: 0.9,
          transparent: true,
          opacity: 0.75
        });
        primaryMesh = new THREE.Mesh(sphereGeo, sphereMat);
        mainGroup.add(primaryMesh);

        const innerGeo = new THREE.OctahedronGeometry(0.7, 1);
        const innerMat = new THREE.MeshBasicMaterial({
          color: colorSecObj,
          wireframe: true,
          transparent: true,
          opacity: 0.5
        });
        innerMesh = new THREE.Mesh(innerGeo, innerMat);
        mainGroup.add(innerMesh);

      } else if (shapeType === 'cube') {
        const boxGeo = new THREE.BoxGeometry(1.6, 1.6, 1.6, 3, 3, 3);
        const boxMat = new THREE.MeshStandardMaterial({
          color: colorObj,
          wireframe: true,
          roughness: 0.2,
          metalness: 0.8,
          transparent: true,
          opacity: 0.7
        });
        primaryMesh = new THREE.Mesh(boxGeo, boxMat);
        mainGroup.add(primaryMesh);

        const innerGeo = new THREE.SphereGeometry(0.65, 16, 16);
        const innerMat = new THREE.MeshBasicMaterial({
          color: colorSecObj,
          wireframe: true,
          transparent: true,
          opacity: 0.5
        });
        innerMesh = new THREE.Mesh(innerGeo, innerMat);
        mainGroup.add(innerMesh);

      } else if (shapeType === 'rings') {
        const ring1Geo = new THREE.TorusGeometry(1.4, 0.05, 16, 100);
        const ring1Mat = new THREE.MeshStandardMaterial({ color: colorObj, metalness: 0.9 });
        const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);

        const ring2Geo = new THREE.TorusGeometry(1.0, 0.05, 16, 100);
        const ring2Mat = new THREE.MeshStandardMaterial({ color: colorSecObj, metalness: 0.9 });
        const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
        ring2.rotation.x = Math.PI / 2;

        const ring3Geo = new THREE.TorusGeometry(0.6, 0.05, 16, 100);
        const ring3Mat = new THREE.MeshStandardMaterial({ color: colorObj, metalness: 0.9 });
        const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
        ring3.rotation.y = Math.PI / 2;

        mainGroup.add(ring1);
        mainGroup.add(ring2);
        mainGroup.add(ring3);

        const innerGeo = new THREE.DodecahedronGeometry(0.4);
        const innerMat = new THREE.MeshBasicMaterial({ color: '#ffffff', wireframe: true });
        innerMesh = new THREE.Mesh(innerGeo, innerMat);
        mainGroup.add(innerMesh);

      } else {
        const torusGeo = new THREE.TorusKnotGeometry(1.15, 0.36, 120, 24);
        const torusMat = new THREE.MeshStandardMaterial({
          color: colorObj,
          roughness: 0.2,
          metalness: 0.8,
          wireframe: true,
          transparent: true,
          opacity: 0.75
        });
        primaryMesh = new THREE.Mesh(torusGeo, torusMat);
        mainGroup.add(primaryMesh);

        const coreGeo = new THREE.IcosahedronGeometry(0.65, 2);
        const coreMat = new THREE.MeshBasicMaterial({
          color: colorSecObj,
          wireframe: true,
          transparent: true,
          opacity: 0.45
        });
        innerMesh = new THREE.Mesh(coreGeo, coreMat);
        mainGroup.add(innerMesh);
      }
    };

    createShape(activeShape);

    // Surrounding Floating 3D Particles
    const particleCount = 240;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 9;
      positions[i + 1] = (Math.random() - 0.5) * 9;
      positions[i + 2] = (Math.random() - 0.5) * 9;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: colorObj,
      size: 0.045,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(colorObj, 4, 25);
    pointLight.position.set(3, 3, 3);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(colorSecObj, 3, 25);
    pointLight2.position.set(-3, -3, -2);
    scene.add(pointLight2);

    // Mouse & Touch Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      const { innerWidth, innerHeight } = window;
      mouseX = (event.clientX / innerWidth - 0.5) * 2;
      mouseY = -(event.clientY / innerHeight - 0.5) * 2;
    };

    const handleTouchMove = (event) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        const { innerWidth, innerHeight } = window;
        mouseX = (touch.clientX / innerWidth - 0.5) * 2;
        mouseY = -(touch.clientY / innerHeight - 0.5) * 2;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    let animationFrameId;
    const startTime = performance.now();

    const animate = (currentTime) => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (currentTime - startTime) * 0.001;

      targetX += (mouseX - targetX) * 0.06;
      targetY += (mouseY - targetY) * 0.06;

      mainGroup.rotation.x = elapsedTime * 0.3 + targetY * 0.6;
      mainGroup.rotation.y = elapsedTime * 0.4 + targetX * 0.6;

      if (innerMesh) {
        const pulse = 1 + Math.sin(elapsedTime * 2.5) * 0.1;
        innerMesh.scale.set(pulse, pulse, pulse);
        innerMesh.rotation.z = -elapsedTime * 0.5;
      }

      particleSystem.rotation.y = elapsedTime * 0.05;
      particleSystem.rotation.x = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [currentTheme, activeShape]);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    />
  );
}
