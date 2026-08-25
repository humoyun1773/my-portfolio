import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { playClickSound, playHoverSound } from '../../utils/soundEffects';

const TECH_FACES = [
  { name: 'React.js', color: '#61DAFB', desc: 'Virtual DOM, Hooks, Component Arxitekturasi' },
  { name: 'TypeScript', color: '#3178C6', desc: 'Type Safety, Interfaces, Generics' },
  { name: 'Zustand', color: '#818CF8', desc: 'Tezkor Global State, Persist Middleware' },
  { name: 'Redux Toolkit', color: '#C084FC', desc: 'RTK Query, Slices, Predictable State' },
  { name: 'TailwindCSS', color: '#06B6D4', desc: 'Modern Utility UI, 3D CSS, Dark Mode' },
  { name: 'Postman API', color: '#FF6C37', desc: 'RESTful API Testing, Auth Tokens, Mock Server' }
];

export default function TechCube3D({ currentTheme }) {
  const mountRef = useRef(null);
  const [activeFace, setActiveFace] = useState(TECH_FACES[0]);
  const isDraggingRef = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const createFaceTexture = (tech) => {
      const c = document.createElement('canvas');
      c.width = 512;
      c.height = 512;
      const ctx = c.getContext('2d');

      const grad = ctx.createLinearGradient(0, 0, 512, 512);
      grad.addColorStop(0, '#0c1324');
      grad.addColorStop(1, '#070a12');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 512);

      ctx.strokeStyle = tech.color;
      ctx.lineWidth = 14;
      ctx.strokeRect(10, 10, 492, 492);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 54px Outfit, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(tech.name, 256, 230);

      ctx.fillStyle = tech.color;
      ctx.font = '600 32px Outfit, sans-serif';
      ctx.fillText('● EXPERT STACK', 256, 310);

      return new THREE.CanvasTexture(c);
    };

    const materials = TECH_FACES.map((tech) => {
      const texture = createFaceTexture(tech);
      return new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.2,
        metalness: 0.5
      });
    });

    const cubeGeo = new THREE.BoxGeometry(2, 2, 2);
    const cubeMesh = new THREE.Mesh(cubeGeo, materials);
    scene.add(cubeMesh);

    const haloGeo = new THREE.RingGeometry(1.7, 1.75, 64);
    const haloMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(currentTheme?.accent || '#06b6d4'),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    scene.add(halo);

    const ambient = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const handleMouseDown = (e) => {
      isDraggingRef.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;

      cubeMesh.rotation.y += deltaX * 0.01;
      cubeMesh.rotation.x += deltaY * 0.01;

      previousMousePosition.current = { x: e.clientX, y: e.clientY };
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

    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isDraggingRef.current) {
        cubeMesh.rotation.y += 0.008;
        cubeMesh.rotation.x += 0.004;
      }

      halo.rotation.z += 0.01;
      halo.rotation.x = cubeMesh.rotation.x;
      halo.rotation.y = cubeMesh.rotation.y;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      cubeGeo.dispose();
      materials.forEach((m) => {
        m.map?.dispose();
        m.dispose();
      });
      haloGeo.dispose();
      haloMat.dispose();
      renderer.dispose();
    };
  }, [currentTheme]);

  return (
    <div className="glass-card" style={{ padding: '2rem', marginTop: '3.5rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <span
          style={{
            fontSize: '0.78rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--primary)',
            background: 'rgba(var(--primary-rgb), 0.12)',
            padding: '0.3rem 0.85rem',
            borderRadius: '9999px',
            border: '1px solid rgba(var(--primary-rgb), 0.3)'
          }}
        >
          3D Interaktiv Tech Kubik
        </span>
        <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '0.6rem', color: '#ffffff' }}>
          Stackni 3D Formatda Aylantirib Ko'ring
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          Kubikni sichqoncha bilan ushlab istalgan tomonga aylantirishingiz mumkin.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', alignItems: 'center' }} className="cube-grid">
        <div
          ref={mountRef}
          style={{
            width: '100%',
            height: '320px',
            cursor: 'grab',
            position: 'relative'
          }}
          title="Aylantirish uchun ushlab torting"
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {TECH_FACES.map((tech) => (
            <button
              key={tech.name}
              onClick={() => {
                playClickSound();
                setActiveFace(tech);
              }}
              onMouseEnter={playHoverSound}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                background: activeFace.name === tech.name ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                border: activeFace.name === tech.name ? `1px solid ${tech.color}` : '1px solid rgba(255, 255, 255, 0.06)',
                color: '#ffffff',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.25s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: tech.color,
                    boxShadow: `0 0 10px ${tech.color}`
                  }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{tech.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>{tech.desc}</div>
                </div>
              </div>
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: tech.color }}>Active</span>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .cube-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
