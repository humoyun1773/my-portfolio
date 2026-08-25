import React from 'react';
import { Milestone, CheckCircle2 } from 'lucide-react';
import TiltCard from '../3d/TiltCard';
import { useLanguage } from '../../context/LanguageContext';
import { ROADMAP_ITEMS } from '../../data/translations';

export default function ExperienceRoadmap() {
  const { lang, t } = useLanguage();

  return (
    <section id="roadmap" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <Milestone size={14} />
            <span>{t.roadmap.badge}</span>
          </div>
          <h2 className="section-title">
            {t.roadmap.title} <span className="gradient-text">{t.roadmap.titleHighlight}</span>
          </h2>
          <p className="section-desc">
            {t.roadmap.description}
          </p>
        </div>

        <div className="roadmap-container" style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative' }}>
          <div className="roadmap-line" />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {ROADMAP_ITEMS.map((item, idx) => {
              const itemTitle = item.title[lang] || item.title.uz;
              const itemDesc = item.desc[lang] || item.desc.uz;

              return (
                <div key={idx} className="roadmap-item">
                  <div className="roadmap-icon">
                    <CheckCircle2 size={20} />
                  </div>

                  <div className="roadmap-content">
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

                      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.6rem' }}>
                        {itemTitle}
                      </h3>

                      <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                        {itemDesc}
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
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
