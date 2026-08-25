import React, { useState, useEffect } from 'react';
import { Menu, X, Code, ChevronDown, Check, Send, Sun, Moon, Globe, Palette } from 'lucide-react';
import { THEMES } from '../../data/portfolioData';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { playClickSound, playHoverSound } from '../../utils/soundEffects';

const LANG_OPTIONS = [
  { code: 'uz', label: "O'zbekcha", flag: '🇺🇿', short: 'UZ' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺', short: 'RU' },
  { code: 'en', label: 'English', flag: '🇬🇧', short: 'EN' }
];

export default function Navbar({ currentTheme, setCurrentTheme }) {
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme, isDark } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.about, href: "#hero" },
    { name: t.nav.skills, href: "#skills" },
    { name: t.nav.projects, href: "#projects" },
    { name: t.nav.roadmap, href: "#roadmap" },
    { name: t.nav.contact, href: "#contact" }
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.3s ease',
        background: isScrolled
          ? (isDark ? 'rgba(10, 14, 26, 0.92)' : 'rgba(255, 255, 255, 0.92)')
          : (isDark ? 'rgba(10, 14, 26, 0.5)' : 'rgba(255, 255, 255, 0.5)'),
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: isScrolled
          ? '1px solid var(--border-color)'
          : '1px solid transparent',
        padding: isScrolled ? '0.65rem 0' : '1.1rem 0'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={playClickSound}
          onMouseEnter={playHoverSound}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontWeight: 800,
            fontSize: '1.2rem',
            letterSpacing: '-0.02em',
            textDecoration: 'none',
            color: 'var(--text-main)',
            flexShrink: 0
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px var(--primary-glow)',
              color: '#fff',
              flexShrink: 0
            }}
          >
            <Code size={18} />
          </div>
          <span>
            Humoyun<span style={{ color: 'var(--primary)' }}>.Dev</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div
          style={{
            alignItems: 'center',
            gap: '1.75rem'
          }}
          className="desktop-nav-links"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={playClickSound}
              onMouseEnter={playHoverSound}
              style={{
                fontSize: '0.92rem',
                fontWeight: 600,
                color: 'var(--text-muted)',
                transition: 'color 0.2s ease',
                position: 'relative'
              }}
              onMouseEnterCapture={(e) => (e.currentTarget.style.color = 'var(--primary)')}
              onMouseLeaveCapture={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right Actions Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          {/* Language Switcher */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => {
                playClickSound();
                setLangMenuOpen(!langMenuOpen);
              }}
              onMouseEnter={playHoverSound}
              className="btn btn-secondary"
              style={{
                padding: '0.45rem 0.75rem',
                fontSize: '0.82rem',
                gap: '0.35rem',
                borderRadius: 'var(--radius-sm)'
              }}
              title="Tilni tanlang (Language)"
            >
              <Globe size={15} color="var(--primary)" />
              <span style={{ fontWeight: 700 }}>
                {LANG_OPTIONS.find((l) => l.code === lang)?.short || 'UZ'}
              </span>
            </button>

            {langMenuOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '125%',
                  right: 0,
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.35rem',
                  boxShadow: 'var(--shadow-card)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.2rem',
                  minWidth: '140px',
                  zIndex: 200
                }}
              >
                {LANG_OPTIONS.map((opt) => (
                  <button
                    key={opt.code}
                    onClick={() => {
                      playClickSound();
                      setLang(opt.code);
                      setLangMenuOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.55rem',
                      padding: '0.45rem 0.75rem',
                      background: lang === opt.code ? 'rgba(var(--primary-rgb), 0.15)' : 'transparent',
                      color: lang === opt.code ? 'var(--primary)' : 'var(--text-main)',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      textAlign: 'left'
                    }}
                  >
                    <span>{opt.flag}</span>
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={() => {
              playClickSound();
              toggleTheme();
            }}
            onMouseEnter={playHoverSound}
            className="btn btn-secondary"
            style={{
              padding: '0.45rem',
              borderRadius: 'var(--radius-sm)',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
            title={isDark ? "Yorug' rejim (Light Mode)" : "Qorong'u rejim (Dark Mode)"}
            aria-label="Toggle Dark Light Mode"
          >
            {isDark ? <Sun size={17} color="#f59e0b" /> : <Moon size={17} color="#7c3aed" />}
          </button>

          {/* 3D Color Theme Selector Dropdown (Visible on Desktop / Tablets >= 640px) */}
          {setCurrentTheme && (
            <div style={{ position: 'relative' }} className="desktop-theme-dropdown">
              <button
                onClick={() => {
                  playClickSound();
                  setThemeDropdownOpen(!themeDropdownOpen);
                }}
                onMouseEnter={playHoverSound}
                className="btn btn-secondary"
                style={{
                  padding: '0.45rem 0.8rem',
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  borderRadius: 'var(--radius-sm)'
                }}
                title="3D Rang temasini tanlash"
              >
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: currentTheme?.previewColor || '#06b6d4',
                    boxShadow: `0 0 8px ${currentTheme?.previewColor || '#06b6d4'}`
                  }}
                />
                <span className="theme-name-text">
                  {currentTheme?.name}
                </span>
                <ChevronDown size={13} />
              </button>

              {themeDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '115%',
                    right: 0,
                    width: '190px',
                    background: 'var(--bg-surface)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.5rem',
                    boxShadow: 'var(--shadow-card)',
                    zIndex: 200,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem'
                  }}
                >
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-subtle)', padding: '0.25rem 0.5rem' }}>
                    3D NEON TEMALARI
                  </div>
                  {THEMES.map((tItem) => (
                    <button
                      key={tItem.id}
                      onClick={() => {
                        playClickSound();
                        setCurrentTheme(tItem);
                        setThemeDropdownOpen(false);
                      }}
                      onMouseEnter={playHoverSound}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        padding: '0.5rem 0.6rem',
                        background: currentTheme?.id === tItem.id ? 'rgba(var(--primary-rgb), 0.15)' : 'transparent',
                        border: 'none',
                        borderRadius: 'var(--radius-sm)',
                        color: currentTheme?.id === tItem.id ? 'var(--primary)' : 'var(--text-main)',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        textAlign: 'left'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <span
                          style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: tItem.previewColor,
                            boxShadow: `0 0 8px ${tItem.previewColor}`
                          }}
                        />
                        {tItem.name}
                      </div>
                      {currentTheme?.id === tItem.id && <Check size={14} color="var(--primary)" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Desktop Contact CTA */}
          <a
            href="#contact"
            onClick={playClickSound}
            onMouseEnter={playHoverSound}
            className="btn btn-primary nav-contact-btn"
            style={{
              padding: '0.5rem 1.1rem',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <Send size={14} />
            <span>{t.nav.hireMe}</span>
          </a>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => {
              playClickSound();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="btn btn-secondary nav-mobile-toggle"
            style={{
              padding: '0.45rem',
              width: '36px',
              height: '36px',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 'var(--radius-sm)',
              flexShrink: 0
            }}
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'var(--bg-surface)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            borderBottom: '1px solid var(--border-color)',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            boxShadow: 'var(--shadow-card)',
            maxHeight: 'calc(100vh - 70px)',
            overflowY: 'auto'
          }}
        >
          {/* Nav Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--text-main)',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  transition: 'background 0.2s ease',
                  display: 'block'
                }}
                onMouseEnterCapture={(e) => (e.currentTarget.style.background = 'rgba(var(--primary-rgb), 0.1)')}
                onMouseLeaveCapture={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* 3D Color Theme Switcher in Mobile Drawer */}
          {setCurrentTheme && (
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-subtle)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                3D RANG TEMALARI:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.4rem' }}>
                {THEMES.map((tItem) => {
                  const isCurrent = currentTheme?.id === tItem.id;
                  return (
                    <button
                      key={tItem.id}
                      onClick={() => {
                        playClickSound();
                        setCurrentTheme(tItem);
                      }}
                      className={`btn ${isCurrent ? 'btn-primary' : 'btn-secondary'}`}
                      style={{
                        padding: '0.45rem 0.65rem',
                        fontSize: '0.78rem',
                        justifyContent: 'flex-start',
                        gap: '0.45rem'
                      }}
                    >
                      <span
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: tItem.previewColor,
                          boxShadow: `0 0 6px ${tItem.previewColor}`
                        }}
                      />
                      <span>{tItem.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Mobile Direct Contact Button */}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '0.25rem', padding: '0.75rem' }}
          >
            <Send size={16} />
            <span>{t.nav.hireMe}</span>
          </a>
        </div>
      )}
    </nav>
  );
}
