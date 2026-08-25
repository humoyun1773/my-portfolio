import React, { useState, useEffect } from 'react';
import { ArrowRight, Download, Disc, Box, CircleDot, Activity, Volume2, VolumeX, Sparkles, Mail, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TelegramIcon } from '../ui/Icons';
import Canvas3D from '../3d/Canvas3D';
import { useLanguage } from '../../context/LanguageContext';
import { PERSONAL_INFO } from '../../data/translations';
import { playHoverSound, playClickSound, playSuccessSound, toggleSound, isSoundEnabled } from '../../utils/soundEffects';

const SHAPES = [
  { id: 'torus', name: 'Torus Knot', icon: Disc },
  { id: 'sphere', name: 'Sphere Core', icon: CircleDot },
  { id: 'cube', name: 'Cyber Cube', icon: Box },
  { id: 'rings', name: 'Gyro Rings', icon: Activity }
];

export default function Hero({ currentTheme }) {
  const { t } = useLanguage();
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(110);
  const [activeShape, setActiveShape] = useState('torus');
  const [soundOn, setSoundOn] = useState(isSoundEnabled());

  const typingWords = t.hero.roles || [
    "Junior Frontend Developer",
    "React & TypeScript Master",
    "Zustand & Redux Specialist",
    "TailwindCSS & 3D Web Creator"
  ];

  useEffect(() => {
    if (!typingWords.length) return;
    const currentWord = typingWords[wordIndex % typingWords.length];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.substring(0, text.length + 1));
        if (text.length + 1 === currentWord.length) {
          setTypingSpeed(1800);
          setIsDeleting(true);
        } else {
          setTypingSpeed(90);
        }
      } else {
        setText(currentWord.substring(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % typingWords.length);
          setTypingSpeed(300);
        } else {
          setTypingSpeed(45);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, typingWords, typingSpeed]);

  const handleDownloadCV = () => {
    playSuccessSound();
    alert("Rezyume (CV) yuklanmoqda... (PDF formatida)");
  };

  const handleToggleSound = () => {
    const next = toggleSound();
    setSoundOn(next);
    if (next) playSuccessSound();
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        paddingTop: '7.5rem',
        paddingBottom: '4rem',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2.5rem',
            alignItems: 'center'
          }}
          className="hero-grid"
        >
          {/* Left Column: Information & CTAs */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.4rem 1.1rem',
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#10b981',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#10b981',
                    boxShadow: '0 0 10px #10b981'
                  }}
                  className="animate-pulse-glow"
                />
                <span>{t.hero.statusBadge}</span>
              </div>

              <button
                onClick={handleToggleSound}
                className="btn btn-secondary"
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem', borderRadius: '9999px' }}
                title={soundOn ? "Ovozni o'chirish" : "Ovozni yoqish"}
              >
                {soundOn ? <Volume2 size={14} color="var(--primary)" /> : <VolumeX size={14} />}
                <span>{soundOn ? "Ovoz: ON" : "Ovoz: OFF"}</span>
              </button>
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.6rem, 5.5vw, 4.4rem)',
                lineHeight: 1.15,
                fontWeight: 900,
                marginBottom: '1.5rem',
                letterSpacing: '-0.03em'
              }}
            >
              {t.hero.greeting} <br />
              <span className="gradient-text">{t.hero.title}</span>
            </h1>

            <div
              style={{
                fontSize: 'clamp(1.35rem, 2.8vw, 1.95rem)',
                fontWeight: 700,
                color: 'var(--primary)',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                minHeight: '2.6rem'
              }}
            >
              <span>{text}</span>
              <span
                style={{
                  color: 'var(--primary)',
                  fontWeight: 400,
                  animation: 'pulseGlow 1s infinite'
                }}
              >
                |
              </span>
            </div>

            <p
              style={{
                fontSize: '1.15rem',
                color: 'var(--text-muted)',
                lineHeight: 1.8,
                maxWidth: '680px',
                marginBottom: '2.5rem'
              }}
            >
              {t.hero.description}
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '2.5rem'
              }}
            >
              <a
                href="#projects"
                onMouseEnter={playHoverSound}
                onClick={playClickSound}
                className="btn btn-primary btn-glow"
              >
                <span>{t.hero.viewProjects}</span>
                <ArrowRight size={18} />
              </a>

              <button
                onClick={handleDownloadCV}
                onMouseEnter={playHoverSound}
                className="btn btn-secondary"
              >
                <Download size={18} />
                <span>{t.hero.downloadCV}</span>
              </button>

              <a
                href="#contact"
                onMouseEnter={playHoverSound}
                onClick={playClickSound}
                className="btn btn-secondary"
                title={t.hero.contactMe}
              >
                <Send size={16} color="var(--primary)" />
                <span>{t.hero.contactMe}</span>
              </a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-subtle)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Ijtimoiy:
              </span>
              <div style={{ display: 'flex', gap: '0.6rem' }}>
                {[
                  { icon: TelegramIcon, href: PERSONAL_INFO.telegram, label: "Telegram" },
                  { icon: GithubIcon, href: PERSONAL_INFO.github, label: "GitHub" },
                  { icon: LinkedinIcon, href: PERSONAL_INFO.linkedin, label: "LinkedIn" },
                  { icon: Mail, href: `mailto:${PERSONAL_INFO.email}`, label: "Email" }
                ].map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      onMouseEnter={playHoverSound}
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-muted)',
                        transition: 'all 0.25s ease'
                      }}
                      className="social-btn"
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Canvas & 3D Shape Switcher */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div className="hero-canvas-box" style={{ width: '100%', position: 'relative' }}>
              <Canvas3D currentTheme={currentTheme} activeShape={activeShape} />

              <div className="floating-chip chip-1">⚛️ React 19</div>
              <div className="floating-chip chip-2">🔷 TypeScript</div>
              <div className="floating-chip chip-3">🐻 Zustand</div>
              <div className="floating-chip chip-4">🟣 Redux RTK</div>
              <div className="floating-chip chip-5">🚀 Postman API</div>
            </div>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.35rem',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                padding: '0.35rem 0.5rem',
                borderRadius: '9999px',
                backdropFilter: 'blur(12px)',
                marginTop: '0.75rem',
                zIndex: 10,
                maxWidth: '100%'
              }}
            >
              <span style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', fontWeight: 600, paddingLeft: '0.5rem', paddingRight: '0.25rem' }}>
                {t.hero.shapesTitle || "3D SHAKL:"}
              </span>
              {SHAPES.map((shape) => {
                const Icon = shape.icon;
                const isCurrent = activeShape === shape.id;
                return (
                  <button
                    key={shape.id}
                    onClick={() => {
                      playClickSound();
                      setActiveShape(shape.id);
                    }}
                    onMouseEnter={playHoverSound}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.3rem 0.65rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: isCurrent ? '1px solid var(--primary)' : '1px solid transparent',
                      background: isCurrent ? 'linear-gradient(135deg, rgba(var(--primary-rgb), 0.3), rgba(var(--secondary-rgb), 0.3))' : 'transparent',
                      color: isCurrent ? 'var(--primary)' : 'var(--text-muted)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Icon size={12} color={isCurrent ? 'var(--primary)' : 'currentColor'} />
                    <span>{shape.name}</span>
                  </button>
                );
              })}
            </div>

            <div
              className="glass-card"
              style={{
                marginTop: '1.25rem',
                padding: '0.75rem clamp(0.75rem, 3vw, 1.4rem)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'clamp(0.6rem, 3vw, 1.2rem)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-card)',
                maxWidth: '100%',
                zIndex: 10
              }}
            >
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.25rem)', fontWeight: 800, color: 'var(--primary)' }}>
                  {t.hero.stats.projects}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', fontWeight: 500 }}>
                  {t.hero.stats.projectsLabel}
                </div>
              </div>
              <div style={{ width: '1px', height: '24px', background: 'var(--border-color)' }} />
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.25rem)', fontWeight: 800, color: 'var(--secondary)' }}>
                  {t.hero.stats.satisfaction}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', fontWeight: 500 }}>
                  {t.hero.stats.satisfactionLabel}
                </div>
              </div>
              <div style={{ width: '1px', height: '24px', background: 'var(--border-color)' }} />
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.25rem)', fontWeight: 800, color: '#10b981' }}>
                  {t.hero.stats.experience}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', fontWeight: 500 }}>
                  {t.hero.stats.experienceLabel}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
