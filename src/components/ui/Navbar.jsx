import React, { useState, useEffect } from 'react';
import { Menu, X, Code, ChevronDown, Check, Send } from 'lucide-react';
import { THEMES } from '../../data/portfolioData';
import { playClickSound, playHoverSound } from '../../utils/soundEffects';

export default function Navbar({ currentTheme, setCurrentTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Asosiy", href: "#hero" },
    { name: "Ko'nikmalar", href: "#skills" },
    { name: "Loyihalar", href: "#projects" },
    { name: "Yo'l xaritasi", href: "#roadmap" },
    { name: "Aloqa", href: "#contact" }
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
          ? 'rgba(10, 14, 26, 0.85)'
          : 'rgba(10, 14, 26, 0.4)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: isScrolled
          ? '1px solid rgba(255, 255, 255, 0.08)'
          : '1px solid transparent',
        padding: isScrolled ? '0.75rem 0' : '1.25rem 0'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <a
          href="#hero"
          onClick={playClickSound}
          onMouseEnter={playHoverSound}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontWeight: 800,
            fontSize: '1.25rem',
            letterSpacing: '-0.02em',
            textDecoration: 'none'
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
              color: '#fff'
            }}
          >
            <Code size={20} />
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
                fontWeight: 500,
                color: 'var(--text-muted)',
                transition: 'color 0.2s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                playHoverSound();
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right Actions: Theme Selector & Contact Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Theme Selector Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => {
                playClickSound();
                setThemeDropdownOpen(!themeDropdownOpen);
              }}
              onMouseEnter={playHoverSound}
              className="btn btn-secondary"
              style={{
                padding: '0.5rem 0.9rem',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              title="Rang temasini o'zgartirish"
            >
              <span
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: currentTheme.previewColor,
                  boxShadow: `0 0 8px ${currentTheme.previewColor}`
                }}
              />
              <span className="theme-name-text">
                {currentTheme.name}
              </span>
              <ChevronDown size={14} />
            </button>

            {themeDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '110%',
                  right: 0,
                  width: '200px',
                  background: 'rgba(15, 23, 42, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.5rem',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)',
                  zIndex: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem'
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-subtle)', padding: '0.25rem 0.5rem' }}>
                  RANG TEMALARI
                </div>
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      playClickSound();
                      setCurrentTheme(t);
                      setThemeDropdownOpen(false);
                    }}
                    onMouseEnter={playHoverSound}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '0.5rem 0.6rem',
                      background: currentTheme.id === t.id ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      color: currentTheme.id === t.id ? '#ffffff' : 'var(--text-muted)',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      textAlign: 'left',
                      transition: 'background 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span
                        style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          backgroundColor: t.previewColor,
                          boxShadow: `0 0 8px ${t.previewColor}`
                        }}
                      />
                      {t.name}
                    </div>
                    {currentTheme.id === t.id && <Check size={14} color="var(--primary)" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Contact CTA */}
          <a
            href="#contact"
            onClick={playClickSound}
            onMouseEnter={playHoverSound}
            className="btn btn-primary nav-contact-btn"
            style={{
              padding: '0.55rem 1.1rem',
              fontSize: '0.88rem'
            }}
          >
            <Send size={15} />
            <span>Bog'lanish</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => {
              playClickSound();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="btn btn-secondary nav-mobile-toggle"
            style={{
              padding: '0.5rem',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
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
            background: 'rgba(10, 14, 26, 0.98)',
            backdropFilter: 'blur(24px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8)'
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '1.05rem',
                fontWeight: 600,
                color: 'var(--text-main)',
                padding: '0.5rem 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
              }}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            <Send size={16} />
            <span>Bog'lanish</span>
          </a>
        </div>
      )}
    </nav>
  );
}
