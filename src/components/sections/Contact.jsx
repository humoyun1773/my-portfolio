import React, { useState } from 'react';
import { Send, MessageCircle, Mail, Phone, MapPin, Copy, Check, CheckCircle2, Globe2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import TiltCard from '../3d/TiltCard';
import CyberGlobe3D from '../3d/CyberGlobe3D';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { playClickSound, playSuccessSound, playHoverSound } from '../../utils/soundEffects';

export default function Contact({ currentTheme }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (text, key) => {
    playClickSound();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    playSuccessSound();
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 }
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Send size={14} />
            <span>Aloqa & Hamkorlik</span>
          </div>
          <h2 className="section-title">
            Birgalikda <span className="gradient-text">Ajoyib Loyihalar</span> Yaratamiz
          </h2>
          <p className="section-desc">
            Yangi loyiha, jamoaga qo'shilish yoki hamkorlik takliflari bo'yicha istalgan vaqtda bog'lanishingiz mumkin.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid-2" style={{ alignItems: 'start', gap: '2.5rem' }}>
          {/* Left Column: 3D Cyber Globe & Direct Reach Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* 3D Cyber Globe Widget */}
            <TiltCard style={{ padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)' }}>
                  <Globe2 size={16} />
                  <span>3D GLOBAL MANZIL</span>
                </div>
                <span
                  style={{
                    fontSize: '0.72rem',
                    padding: '0.2rem 0.6rem',
                    background: 'rgba(16, 185, 129, 0.15)',
                    color: '#10b981',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '9999px',
                    fontWeight: 600
                  }}
                >
                  🟢 Toshkent, O'zbekiston
                </span>
              </div>

              {/* 3D WebGL Globe */}
              <CyberGlobe3D currentTheme={currentTheme} />
              
              <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', marginTop: '0.25rem' }}>
                (3D Globusni aylantirish uchun ushlab torting)
              </div>
            </TiltCard>

            {/* Direct Reach Channels */}
            <TiltCard style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '1.25rem' }}>
                Tezkor Bog'lanish Kanallari
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Telegram */}
                <div className="contact-channel-item">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        background: 'rgba(6, 182, 212, 0.15)',
                        color: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <MessageCircle size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', fontWeight: 500 }}>Telegram</div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#ffffff', wordBreak: 'break-all' }}>{PERSONAL_INFO.telegramUsername}</div>
                    </div>
                  </div>

                  <div className="contact-channel-actions">
                    <button
                      onClick={() => handleCopy(PERSONAL_INFO.telegramUsername, 'telegram')}
                      onMouseEnter={playHoverSound}
                      className="btn btn-secondary"
                      style={{ padding: '0.4rem 0.65rem', fontSize: '0.8rem' }}
                      title="Nusxalash"
                    >
                      {copiedKey === 'telegram' ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                    </button>
                    <a
                      href={PERSONAL_INFO.telegram}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={playHoverSound}
                      onClick={playClickSound}
                      className="btn btn-primary"
                      style={{ padding: '0.4rem 0.9rem', fontSize: '0.8rem' }}
                    >
                      Yozish
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="contact-channel-item">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        background: 'rgba(139, 92, 246, 0.15)',
                        color: 'var(--secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <Mail size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', fontWeight: 500 }}>Email Pochta</div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#ffffff', wordBreak: 'break-all' }}>{PERSONAL_INFO.email}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                    onMouseEnter={playHoverSound}
                    className="btn btn-secondary"
                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                    title="Nusxalash"
                  >
                    {copiedKey === 'email' ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                  </button>
                </div>

                {/* Phone */}
                <div className="contact-channel-item">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        background: 'rgba(16, 185, 129, 0.15)',
                        color: '#10b981',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <Phone size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', fontWeight: 500 }}>Telefon</div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#ffffff' }}>{PERSONAL_INFO.phone}</div>
                    </div>
                  </div>

                  <div className="contact-channel-actions">
                    <button
                      onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                      onMouseEnter={playHoverSound}
                      className="btn btn-secondary"
                      style={{ padding: '0.4rem 0.65rem', fontSize: '0.8rem' }}
                      title="Nusxalash"
                    >
                      {copiedKey === 'phone' ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                    </button>
                    <a
                      href={`tel:${PERSONAL_INFO.phone}`}
                      onMouseEnter={playHoverSound}
                      onClick={playClickSound}
                      className="btn btn-primary"
                      style={{ padding: '0.4rem 0.9rem', fontSize: '0.8rem' }}
                    >
                      Qo'ng'iroq
                    </a>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Right Column: Interactive Form */}
          <TiltCard style={{ padding: '2rem' }}>
            {isSubmitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'rgba(16, 185, 129, 0.2)',
                    color: '#10b981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem auto'
                  }}
                >
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.6rem' }}>
                  Xabaringiz Qabul Qilindi! 🎉
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  E'tiboringiz uchun tashakkur! Tez orada ko'rsatilgan elektron pochta yoki Telegram orqali javob qaytaraman.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="btn btn-primary"
                  style={{ padding: '0.6rem 1.5rem' }}
                >
                  Yana xabar yozish
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>
                  Xabar Yuborish
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  Formani to'ldiring va to'g'ridan-to'g'ri bog'laning.
                </p>

                <div style={{ marginBottom: '1.2rem' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                    Ismingiz
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Masalan: Sardor"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: 'var(--radius-sm)',
                      color: '#ffffff',
                      fontSize: '0.92rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.2rem' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                    Email Manzilingiz
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="example@mail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: 'var(--radius-sm)',
                      color: '#ffffff',
                      fontSize: '0.92rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                    Xabar Matni
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Loyiha haqida yoki taklifingizni yozing..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: 'var(--radius-sm)',
                      color: '#ffffff',
                      fontSize: '0.92rem',
                      outline: 'none',
                      resize: 'none'
                    }}
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-glow" style={{ width: '100%', padding: '0.85rem' }}>
                  <Send size={18} />
                  <span>Xabarni Yuborish</span>
                </button>
              </form>
            )}
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
