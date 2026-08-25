import React from 'react';
import { Milestone, CheckCircle2 } from 'lucide-react';
import TiltCard from '../3d/TiltCard';
import { ROADMAP_DATA } from '../../data/portfolioData';

export default function ExperienceRoadmap() {
  return (
    <section id="roadmap" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <Milestone size={14} />
            <span>O'sish Yo'li</span>
          </div>
          <h2 className="section-title">
            Dasturchilik <span className="gradient-text">Yo'l Xaritasi</span>
          </h2>
          <p className="section-desc">
            Web dasturlash asoslaridan tortib, murakkab React, TypeScript, Zustand, Redux va API integratsiyalarigacha bo'lgan amaliy yo'lim.
          </p>
        </div>

        <div style={{ maxWidth: '1020px', margin: '0 auto', position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              top: '20px',
              bottom: '20px',
              left: '24px',
              width: '2px',
              background: 'linear-gradient(180deg, var(--primary) 0%, var(--secondary) 100%)',
              zIndex: 1
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {ROADMAP_DATA.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  gap: '1.75rem',
                  alignItems: 'flex-start',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'var(--bg-main)',
                    border: '2px solid var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary)',
                    boxShadow: '0 0 15px var(--primary-glow)',
                    flexShrink: 0
                  }}
                >
                  <CheckCircle2 size={22} />
                </div>

                <div style={{ flex: 1 }}>
                  <TiltCard style={{ padding: '1.75rem' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <span
                        style={{
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          padding: '0.25rem 0.75rem',
                          borderRadius: '9999px',
                          background: 'rgba(var(--primary-rgb), 0.15)',
                          color: 'var(--primary)',
                          border: '1px solid rgba(var(--primary-rgb), 0.3)'
                        }}
                      >
                        {item.period}
                      </span>
                      <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--secondary)' }}>
                        {item.role}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.6rem' }}>
                      {item.title}
                    </h3>

                    <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                      {item.description}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {item.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="tech-chip">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </TiltCard>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
