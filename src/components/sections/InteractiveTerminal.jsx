import React, { useState, useRef, useEffect } from 'react';
import { Terminal, CornerDownLeft, Play } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO, THEMES } from '../../data/portfolioData';
import { playClickSound, playSuccessSound } from '../../utils/soundEffects';

export default function InteractiveTerminal({ currentTheme, setCurrentTheme }) {
  const [history, setHistory] = useState([
    { type: 'system', text: "Junior Developer Terminal v2.4 (Interaktiv Rejim)" },
    { type: 'system', text: "Yordam uchun 'help' buyrug'ini kiriting yoki pastdagi teglarni bosing." }
  ]);
  const [inputVal, setInputVal] = useState('');
  const terminalEndRef = useRef(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmdStr) => {
    const rawCmd = cmdStr.trim();
    if (!rawCmd) return;

    const lower = rawCmd.toLowerCase();
    const parts = lower.split(' ');
    const mainCmd = parts[0];

    const newHistory = [...history, { type: 'user', text: `$ ${rawCmd}` }];

    switch (mainCmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `Mavjud buyruqlar:\n  • skills    - Barcha texnik ko'nikmalar ro'yxati\n  • projects  - Eng sara loyihalar\n  • about     - Dasturchi haqida qisqacha\n  • contact   - Aloqa ma'lumotlari (Telegram/Email)\n  • hire      - Dasturchini ishga yollash / Taklif yuborish\n  • theme     - Temani o'zgartirish (cyber, amber, emerald, aurora)\n  • clear     - Terminalni tozalash`
        });
        break;

      case 'skills':
        newHistory.push({
          type: 'output',
          text: `🔥 ASOSIY STACK:\n- HTML5 & CSS3 (Semantika, 3D Transforms, Responsive)\n- JavaScript (ES6+) & TypeScript\n- React.js (Hooks, Virtual DOM, SPA)\n- TailwindCSS (Utility UI & Custom Themes)\n- Zustand & Redux Toolkit (Global State Mastery)\n- Postman (REST API Testing & Debugging)\n- Git & GitHub / Vite`
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'output',
          text: `🚀 LOYIHALAR:\n1. E-Commerce Store (React + Zustand + Tailwind)\n2. Crypto Dashboard (React + TypeScript + Redux Toolkit)\n3. TaskFlow Kanban (React + Zustand + Drag&Drop)\n4. WeatherCast 3D (JS + Postman API + CSS3 Animations)\n5. MovieVerse (TypeScript + Redux + TMDB API)`
        });
        break;

      case 'about':
        newHistory.push({
          type: 'output',
          text: `👨‍💻 JUNIOR FRONTEND DEVELOPER\n${PERSONAL_INFO.bio}`
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          text: `📬 ALOQA:\n- Telegram: ${PERSONAL_INFO.telegram}\n- Email: ${PERSONAL_INFO.email}\n- Telefon: ${PERSONAL_INFO.phone}\n- Manzil: ${PERSONAL_INFO.location}`
        });
        break;

      case 'hire':
        playSuccessSound();
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
        newHistory.push({
          type: 'output-success',
          text: `🎉 Ajoyib tanlov! Men yangi loyihalarga va jamoaga qo'shilishga tayyorman.\nTelegram orqali darhol bog'laning: ${PERSONAL_INFO.telegram}`
        });
        break;

      case 'theme':
        if (parts[1]) {
          const targetTheme = THEMES.find((t) => t.id === parts[1]);
          if (targetTheme) {
            setCurrentTheme(targetTheme);
            newHistory.push({
              type: 'output-success',
              text: `🎨 Rang temasi muvaffaqiyatli "${targetTheme.name}"ga o'zgartirildi!`
            });
          } else {
            newHistory.push({
              type: 'output',
              text: `Noma'lum tema! Quyidagilardan birini tanlang: cyber, amber, emerald, aurora.`
            });
          }
        } else {
          newHistory.push({
            type: 'output',
            text: `Foydalanish: theme <cyber | amber | emerald | aurora>`
          });
        }
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        newHistory.push({
          type: 'output-error',
          text: `"${rawCmd}" buyrug'i topilmadi. Yordam uchun 'help' deb yozing.`
        });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      playClickSound();
      executeCommand(inputVal);
    }
  };

  const quickCommands = ["help", "skills", "projects", "hire", "theme cyber", "theme amber", "clear"];

  return (
    <section id="terminal" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <Terminal size={14} />
            <span>Antiqa Interaktiv Rejim</span>
          </div>
          <h2 className="section-title">
            Jonli <span className="gradient-text">Developer Terminali</span>
          </h2>
          <p className="section-desc">
            Quyidagi mini CLI terminaliga buyruq yuborib portfolioni jonli ravishda sinab ko'ring.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            justifyContent: 'center',
            marginBottom: '1.5rem'
          }}
        >
          <span style={{ fontSize: '0.85rem', color: 'var(--text-subtle)', alignSelf: 'center', marginRight: '0.4rem' }}>
            Tezkor buyruqlar:
          </span>
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              onClick={() => {
                playClickSound();
                executeCommand(cmd);
              }}
              className="tech-chip"
              style={{ cursor: 'pointer', fontFamily: 'var(--font-mono)' }}
            >
              <Play size={12} color="var(--primary)" />
              <span>{cmd}</span>
            </button>
          ))}
        </div>

        <div className="terminal-window" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div className="terminal-header">
            <div className="terminal-dots">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>
              bash — humoyun@portfolio: ~
            </div>
            <div style={{ width: '40px' }} />
          </div>

          <div className="terminal-body" style={{ minHeight: '260px' }}>
            {history.map((line, idx) => (
              <div key={idx} style={{ marginBottom: '0.6rem', whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
                {line.type === 'user' && (
                  <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{line.text}</span>
                )}
                {line.type === 'system' && (
                  <span style={{ color: 'var(--text-subtle)' }}>{line.text}</span>
                )}
                {line.type === 'output' && (
                  <span style={{ color: '#cbd5e1' }}>{line.text}</span>
                )}
                {line.type === 'output-success' && (
                  <span style={{ color: '#10b981', fontWeight: 600 }}>{line.text}</span>
                )}
                {line.type === 'output-error' && (
                  <span style={{ color: '#ef4444' }}>{line.text}</span>
                )}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0.75rem 1.2rem',
              background: '#0a0f1c',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              gap: '0.6rem'
            }}
          >
            <span style={{ color: 'var(--primary)', fontWeight: 700 }}>$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Buyruq kiriting (masalan: help, hire, skills)..."
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#ffffff',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem'
              }}
            />
            <button
              onClick={() => {
                playClickSound();
                executeCommand(inputVal);
              }}
              className="btn btn-primary"
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderRadius: 'var(--radius-sm)' }}
              title="Yuborish"
            >
              <CornerDownLeft size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
