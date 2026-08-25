import React, { useState } from 'react';
import { 
  FileCode, Palette, FileJson, Code2, Atom, Layers, 
  Cpu, Boxes, Send, GitBranch, Zap, Smartphone, Sparkles 
} from 'lucide-react';
import TiltCard from '../3d/TiltCard';
import { useLanguage } from '../../context/LanguageContext';
import { SKILLS_LIST } from '../../data/translations';
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
  const { lang, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { key: "all", label: t.skills.all },
    { key: "core", label: t.skills.categories.core },
    { key: "framework", label: t.skills.categories.framework },
    { key: "state", label: t.skills.categories.state },
    { key: "tools", label: t.skills.categories.tools }
  ];

  const displayedSkills = activeCategory === "all"
    ? SKILLS_LIST
    : SKILLS_LIST.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Sparkles size={14} />
            <span>{t.skills.badge}</span>
          </div>
          <h2 className="section-title">
            {t.skills.title} <span className="gradient-text">{t.skills.titleHighlight}</span>
          </h2>
          <p className="section-desc">
            {t.skills.description}
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
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => {
                  playClickSound();
                  setActiveCategory(cat.key);
                }}
                onMouseEnter={playHoverSound}
                style={{
                  padding: '0.55rem 1.25rem',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  border: isActive ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                  background: isActive ? 'linear-gradient(135deg, rgba(var(--primary-rgb), 0.25), rgba(var(--secondary-rgb), 0.25))' : 'rgba(255, 255, 255, 0.03)',
                  color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                  backdropFilter: 'blur(8px)',
                  boxShadow: isActive ? '0 0 15px var(--primary-glow)' : 'none',
                  transition: 'all 0.25s ease'
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Skills 3D Grid */}
        <div className="grid-3">
          {displayedSkills.map((skill, index) => {
            const IconComponent = ICON_MAP[skill.icon] || Code2;
            const description = skill.desc[lang] || skill.desc.uz;

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
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>
                        {skill.name}
                      </h3>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', fontWeight: 500 }}>
                        {t.skills.level}: {skill.level}%
                      </span>
                    </div>
                  </div>

                  <span
                    style={{
                      padding: '0.25rem 0.65rem',
                      background: 'rgba(var(--primary-rgb), 0.1)',
                      border: '1px solid rgba(var(--primary-rgb), 0.25)',
                      borderRadius: '9999px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      color: 'var(--primary)',
                      letterSpacing: '0.02em'
                    }}
                  >
                    {skill.badge}
                  </span>
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem', minHeight: '42px' }}>
                  {description}
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
