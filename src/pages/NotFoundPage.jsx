import React from 'react';
import { Home, ArrowLeft, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import TiltCard from '../components/3d/TiltCard';
import { playClickSound, playHoverSound } from '../utils/soundEffects';

export default function NotFoundPage() {
  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}
    >
      <TiltCard style={{ padding: '3rem', textAlign: 'center', maxWidth: '500px', width: '100%' }}>
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'rgba(239, 68, 68, 0.15)',
            color: '#ef4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto',
            boxShadow: '0 0 25px rgba(239, 68, 68, 0.3)'
          }}
        >
          <AlertTriangle size={36} />
        </div>

        <h1 style={{ fontSize: '4rem', fontWeight: 900, lineHeight: 1, marginBottom: '0.5rem' }}>
          <span className="gradient-text">404</span>
        </h1>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.75rem' }}>
          Sahifa Topilmadi
        </h2>

        <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Siz qidirayotgan sahifa mavjud emas yoki boshqa manzilga ko'chirilgan bo'lishi mumkin.
        </p>

        <Link
          to="/"
          onClick={playClickSound}
          onMouseEnter={playHoverSound}
          className="btn btn-primary btn-glow"
          style={{ width: '100%', padding: '0.85rem' }}
        >
          <Home size={18} />
          <span>Bosh Sahifaga Qaytish</span>
        </Link>
      </TiltCard>
    </div>
  );
}
