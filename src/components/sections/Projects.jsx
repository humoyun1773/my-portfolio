import React, { useState } from 'react';
import { ExternalLink, Eye, Sparkles, Layers, CheckCircle, X } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import TiltCard from '../3d/TiltCard';
import { PROJECTS_DATA } from '../../data/portfolioData';
import { playClickSound, playHoverSound } from '../../utils/soundEffects';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filterOptions = [
    { label: "Barchasi", key: "all" },
    { label: "Zustand Loyihalar", key: "zustand" },
    { label: "Redux & RTK", key: "redux" },
    { label: "React / 3D Canvas", key: "react" },
    { label: "JavaScript & API", key: "javascript" }
  ];

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.categoryKey === activeFilter);

  return (
    <section id="projects" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Layers size={14} />
            <span>Tanlangan Loyihalar</span>
          </div>
          <h2 className="section-title">
            Mening <span className="gradient-text">Portfolio Loyihalarim</span>
          </h2>
          <p className="section-desc">
            Zustand, Redux Toolkit, TypeScript, TailwindCSS va Postman API integratsiyalari orqali noldan tayyorlangan amaliy loyihalar.
          </p>
        </div>

        {/* Filter Buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.6rem',
            justifyContent: 'center',
            marginBottom: '3rem'
          }}
        >
          {filterOptions.map((opt) => {
            const isActive = activeFilter === opt.key;
            return (
              <button
                key={opt.key}
                onClick={() => {
                  playClickSound();
                  setActiveFilter(opt.key);
                }}
                onMouseEnter={playHoverSound}
                style={{
                  padding: '0.55rem 1.25rem',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  border: isActive ? '1px solid var(--primary)' : '1px solid rgba(255, 255, 255, 0.08)',
                  background: isActive ? 'linear-gradient(135deg, rgba(var(--primary-rgb), 0.25), rgba(var(--secondary-rgb), 0.25))' : 'rgba(255, 255, 255, 0.03)',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  backdropFilter: 'blur(8px)',
                  boxShadow: isActive ? '0 0 15px var(--primary-glow)' : 'none',
                  transition: 'all 0.25s ease'
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid-3">
          {filteredProjects.map((project) => (
            <TiltCard
              key={project.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  height: '170px',
                  background: project.imageTheme,
                  position: 'relative',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  overflow: 'hidden'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.7)' }} />
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
                  </div>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.6rem',
                      background: 'rgba(0, 0, 0, 0.35)',
                      borderRadius: '9999px',
                      color: '#ffffff',
                      backdropFilter: 'blur(6px)'
                    }}
                  >
                    {project.category}
                  </span>
                </div>

                <div>
                  <h3
                    style={{
                      fontSize: '1.35rem',
                      fontWeight: 800,
                      color: '#ffffff',
                      textShadow: '0 2px 10px rgba(0,0,0,0.4)'
                    }}
                  >
                    {project.title}
                  </h3>
                </div>
              </div>

              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.6,
                    marginBottom: '1.25rem',
                    flexGrow: 1
                  }}
                >
                  {project.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                  {project.tags.map((tag, i) => (
                    <span key={i} className="tech-chip">
                      {tag}
                    </span>
                  ))}
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.6rem 0.8rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: '1.25rem',
                    fontSize: '0.78rem',
                    color: 'var(--text-subtle)'
                  }}
                >
                  <div>⚡ Tezlik: <span style={{ color: '#10b981', fontWeight: 600 }}>{project.metrics.speed}</span></div>
                  <div>🧩 Modullar: <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{project.metrics.components}</span></div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <button
                    onClick={() => {
                      playClickSound();
                      setSelectedProject(project);
                    }}
                    onMouseEnter={playHoverSound}
                    className="btn btn-secondary"
                    style={{ flex: 1, padding: '0.55rem 0.8rem', fontSize: '0.85rem' }}
                  >
                    <Eye size={15} />
                    <span>Batafsil</span>
                  </button>

                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={playHoverSound}
                    className="btn btn-primary"
                    style={{ padding: '0.55rem 0.9rem', fontSize: '0.85rem' }}
                    title="Jonli ko'rish"
                  >
                    <ExternalLink size={15} />
                  </a>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={playHoverSound}
                    className="btn btn-secondary"
                    style={{ padding: '0.55rem 0.9rem', fontSize: '0.85rem' }}
                    title="GitHub kodini ko'rish"
                  >
                    <GithubIcon size={15} />
                  </a>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="glass-card"
            style={{
              maxWidth: '650px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '2rem',
              background: '#0d1527',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>

            <div style={{ marginBottom: '1.5rem' }}>
              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--primary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                {selectedProject.category}
              </span>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.25rem', color: '#ffffff' }}>
                {selectedProject.title}
              </h3>
            </div>

            <p style={{ fontSize: '0.98rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              {selectedProject.fullDescription}
            </p>

            <div style={{ marginBottom: '1.75rem' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.75rem' }}>
                Loyiha Xususiyatlari & Arxitekturasi:
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  <CheckCircle size={16} color="var(--primary)" />
                  <span>Optimizatsiya qilingan komponentlar va toza re-renderlar</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  <CheckCircle size={16} color="var(--primary)" />
                  <span>Postman orqali to'liq sinovdan o'tgan RESTful API so'rovlari</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  <CheckCircle size={16} color="var(--primary)" />
                  <span>Barcha telefon va planshetlar uchun to'liq moslashuvchan responsive dizayn</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
              {selectedProject.tags.map((t, i) => (
                <span key={i} className="tech-chip" style={{ color: 'var(--primary)', borderColor: 'rgba(var(--primary-rgb), 0.3)' }}>
                  #{t}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <a
                href={selectedProject.demo}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
                style={{ flex: 1 }}
              >
                <span>Live Demo</span>
                <ExternalLink size={16} />
              </a>
              <a
                href={selectedProject.github}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                <GithubIcon size={16} />
                <span>GitHub Repo</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
