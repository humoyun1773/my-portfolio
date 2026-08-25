import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Interactive3DBackground from './components/3d/Interactive3DBackground';
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';
import { AppRoutes } from './routes';
import { THEMES } from './data/portfolioData';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  const [currentTheme, setCurrentTheme] = useState(THEMES[0]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scroll = (totalScroll / windowHeight) * 100;
        setScrollProgress(scroll);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
            {/* Top Scroll Neon Progress Bar */}
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: `${scrollProgress}%`,
                height: '3px',
                background: 'linear-gradient(90deg, var(--primary) 0%, var(--secondary) 50%, #ec4899 100%)',
                boxShadow: '0 0 12px var(--primary)',
                zIndex: 9999,
                transition: 'width 0.1s ease-out'
              }}
            />

            {/* Dynamic Cursor Ambient Glow */}
            <div
              style={{
                position: 'fixed',
                top: mousePos.y - 250,
                left: mousePos.x - 250,
                width: '500px',
                height: '500px',
                background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 1,
                opacity: 0.18,
                transition: 'transform 0.1s ease-out',
                filter: 'blur(40px)'
              }}
            />

            {/* Static Background Ambient Lights */}
            <div className="bg-ambient-orb orb-1" />
            <div className="bg-ambient-orb orb-2" />

            {/* Full-Page Interactive 3D Starfield Background */}
            <Interactive3DBackground currentTheme={currentTheme} />

            {/* Navigation Bar */}
            <Navbar currentTheme={currentTheme} setCurrentTheme={setCurrentTheme} />

            {/* Application Routes */}
            <AppRoutes
              currentTheme={currentTheme}
              setCurrentTheme={setCurrentTheme}
            />

            {/* Footer */}
            <Footer />
          </div>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}
