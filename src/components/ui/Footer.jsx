import React from 'react';
import { ArrowUp, Code, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { playClickSound, playHoverSound } from '../../utils/soundEffects';

export default function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-color)',
        padding: '3rem 0 2rem 0',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            paddingBottom: '2rem',
            borderBottom: '1px solid var(--border-color)'
          }}
        >
          {/* Logo & Tagline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
              }}
            >
              <Code size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--text-main)' }}>
                Humoyun<span style={{ color: 'var(--primary)' }}>.Dev</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>
                Qadamov Humoyun | Frontend Developer Portfolio
              </div>
            </div>
          </div>

          {/* Center Quote */}
          <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span>{t.footer.builtWith}</span>
            <Sparkles size={14} color="var(--primary)" />
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            onMouseEnter={playHoverSound}
            className="btn btn-secondary"
            style={{ padding: '0.55rem 1rem', fontSize: '0.85rem' }}
            title={t.footer.backToTop}
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp size={16} />
          </button>
        </div>

        {/* Bottom Copyright */}
        <div
          style={{
            paddingTop: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.82rem',
            color: 'var(--text-subtle)'
          }}
        >
          <div>
            © {new Date().getFullYear()} Qadamov Humoyun. {t.footer.rights}
          </div>
          <div>
            Design & Code by Qadamov Humoyun
          </div>
        </div>
      </div>
    </footer>
  );
}
