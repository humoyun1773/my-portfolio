import React, { useState } from 'react';
import { 
  FileCode, Palette, FileJson, Code2, Atom, Layers, 
  Cpu, Boxes, Send, GitBranch, Zap, Smartphone, Sparkles 
} from 'lucide-react';
import TiltCard from '../3d/TiltCard';
import { SKILLS_DATA } from '../../data/portfolioData';
import { playHoverSound, playClickSound } from '../../utils/soundEffects';

const ICON_MAP = {
  FileCode,
  Palette,
  FileJson,
  Code2,
  Atom,
  Layers,
  Cpu,
  Boxes,
  Send,
  GitBranch,
  Zap,
  Smartphone
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("Barchasi");

  const categories = ["Barchasi", ...SKILLS_DATA.map((c) => c.category)];

  const displayedSkills = activeCategory === "Barchasi"
    ? SKILLS_DATA.flatMap((cat) => cat.items)
    : SKILLS_DATA.find((cat) => cat.category === activeCategory)?.items || [];

  return (
    <section id="skills" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Sparkles size={14} />
            <span>Texnik Ko'nikmalar</span>
          </div>
          <h2 className="section-title">
            Mening <span className="gradient-text">Tech Stack</span> & Vositalarim
          </h2>
          <p className="section-desc">
            Har bir loyihada toza arxitektura, yuqori unumdorlik va mukammal UI/UX yaratish uchun foydalanadigan asosiy texnologiyalarim.
          </p>
        </div>

        {/* Category Filters */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.6rem',
            justifyContent: 'center',
            marginBottom: '3rem'
          }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  playClickSound();
                  setActiveCategory(cat);
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
                {cat}
              </button>
            );
          })}
        </div>

        {/* Skills 3D Grid */}
        <div className="grid-3">
          {displayedSkills.map((skill, index) => {
            const IconComponent = ICON_MAP[skill.icon] || Code2;
            return (
              <TiltCard key={index} style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '12px',
                        background: `${skill.color}18`,
                        border: `1px solid ${skill.color}40`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: skill.color,
                        boxShadow: `0 0 15px ${skill.color}25`
                      }}
                    >
                      <IconComponent size={24} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff' }}>
                        {skill.name}
                      </h3>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', fontWeight: 500 }}>
                        Daraja: {skill.level}%
                      </span>
                    </div>
                  </div>

                  <span
                    style={{
                      padding: '0.25rem 0.65rem',
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '9999px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      color: 'var(--text-main)',
                      letterSpacing: '0.02em'
                    }}
                  >
                    {skill.badge}
                  </span>
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem', minHeight: '42px' }}>
                  {skill.description}
                </p>

                <div>
                  <div
                    style={{
                      width: '100%',
                      height: '6px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      borderRadius: '9999px',
                      overflow: 'hidden',
                      position: 'relative'
                    }}
                  >
                    <div
                      style={{
                        width: `${skill.level}%`,
                        height: '100%',
                        borderRadius: '9999px',
                        background: `linear-gradient(90deg, ${skill.color}, var(--primary))`,
                        boxShadow: `0 0 10px ${skill.color}`,
                        transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    />
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
