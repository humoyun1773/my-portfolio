import React, { useState } from 'react';
import { Cpu, Boxes, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import TiltCard from '../3d/TiltCard';
import { playClickSound, playSuccessSound } from '../../utils/soundEffects';

export default function LiveStatePlayground() {
  const [activeEngine, setActiveEngine] = useState('zustand');
  
  const [items, setItems] = useState([
    { id: 1, name: "React 19 Component", price: 29, qty: 1 },
    { id: 2, name: "Zustand State Hook", price: 19, qty: 2 }
  ]);

  const [logs, setLogs] = useState([
    { time: '12:00:01', action: 'INIT_STORE', payload: '{ items: 2 }', engine: 'zustand' }
  ]);

  const addLog = (action, payload) => {
    const timeStr = new Date().toLocaleTimeString();
    setLogs((prev) => [
      { time: timeStr, action, payload: JSON.stringify(payload), engine: activeEngine },
      ...prev.slice(0, 6)
    ]);
  };

  const addItem = (productName, price) => {
    playClickSound();
    const existing = items.find((i) => i.name === productName);
    if (existing) {
      setItems(items.map((i) => i.name === productName ? { ...i, qty: i.qty + 1 } : i));
      addLog(activeEngine === 'zustand' ? 'cartStore.increment()' : 'dispatch(cartSlice.actions.increment())', { name: productName });
    } else {
      const newItem = { id: Date.now(), name: productName, price, qty: 1 };
      setItems([...items, newItem]);
      addLog(activeEngine === 'zustand' ? 'cartStore.addItem()' : 'dispatch(cartSlice.actions.addItem())', newItem);
    }
  };

  const decrementItem = (id) => {
    playClickSound();
    const target = items.find((i) => i.id === id);
    if (!target) return;
    if (target.qty > 1) {
      setItems(items.map((i) => i.id === id ? { ...i, qty: i.qty - 1 } : i));
      addLog(activeEngine === 'zustand' ? 'cartStore.decrement()' : 'dispatch(cartSlice.actions.decrement())', { id });
    } else {
      setItems(items.filter((i) => i.id !== id));
      addLog(activeEngine === 'zustand' ? 'cartStore.removeItem()' : 'dispatch(cartSlice.actions.removeItem())', { id });
    }
  };

  const clearStore = () => {
    playSuccessSound();
    setItems([]);
    addLog(activeEngine === 'zustand' ? 'cartStore.reset()' : 'dispatch(cartSlice.actions.clear())', {});
  };

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalCount = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <section id="playground" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <Cpu size={14} />
            <span>Jonli Texnik Tajriba</span>
          </div>
          <h2 className="section-title">
            Interaktiv <span className="gradient-text">State Management</span> Laboratoriyasi
          </h2>
          <p className="section-desc">
            Zustand va Redux Toolkit qanday ishlashini to'g'ridan-to'g'ri brauzeringizda real vaqtda sinab ko'ring.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '2.5rem'
          }}
        >
          <button
            onClick={() => {
              playClickSound();
              setActiveEngine('zustand');
            }}
            style={{
              padding: '0.65rem 1.6rem',
              borderRadius: '9999px',
              fontWeight: 700,
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              cursor: 'pointer',
              border: activeEngine === 'zustand' ? '1px solid #4338CA' : '1px solid rgba(255, 255, 255, 0.08)',
              background: activeEngine === 'zustand' ? 'linear-gradient(135deg, rgba(67, 56, 202, 0.4), rgba(6, 182, 212, 0.3))' : 'rgba(255, 255, 255, 0.03)',
              color: activeEngine === 'zustand' ? '#ffffff' : 'var(--text-muted)',
              boxShadow: activeEngine === 'zustand' ? '0 0 20px rgba(67, 56, 202, 0.4)' : 'none',
              transition: 'all 0.3s ease'
            }}
          >
            <Cpu size={18} color="#818CF8" />
            <span>Zustand Engine (Store Hook)</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              setActiveEngine('redux');
            }}
            style={{
              padding: '0.65rem 1.6rem',
              borderRadius: '9999px',
              fontWeight: 700,
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              cursor: 'pointer',
              border: activeEngine === 'redux' ? '1px solid #764ABC' : '1px solid rgba(255, 255, 255, 0.08)',
              background: activeEngine === 'redux' ? 'linear-gradient(135deg, rgba(118, 74, 188, 0.4), rgba(236, 72, 153, 0.3))' : 'rgba(255, 255, 255, 0.03)',
              color: activeEngine === 'redux' ? '#ffffff' : 'var(--text-muted)',
              boxShadow: activeEngine === 'redux' ? '0 0 20px rgba(118, 74, 188, 0.4)' : 'none',
              transition: 'all 0.3s ease'
            }}
          >
            <Boxes size={18} color="#C084FC" />
            <span>Redux Toolkit (RTK Slice)</span>
          </button>
        </div>

        <div className="grid-2" style={{ gap: '2rem', alignItems: 'stretch' }}>
          <TiltCard style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <ShoppingBag size={20} color="var(--primary)" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff' }}>
                  Live Store: E-Commerce State
                </h3>
              </div>

              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  padding: '0.2rem 0.6rem',
                  borderRadius: '9999px',
                  background: activeEngine === 'zustand' ? 'rgba(67, 56, 202, 0.2)' : 'rgba(118, 74, 188, 0.2)',
                  color: activeEngine === 'zustand' ? '#818CF8' : '#C084FC',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                {activeEngine === 'zustand' ? 'useCartStore()' : 'useAppSelector()'}
              </span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <button
                onClick={() => addItem('TypeScript Pro Module', 35)}
                className="btn btn-secondary"
                style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}
              >
                <Plus size={14} color="var(--primary)" />
                <span>+ TS Module ($35)</span>
              </button>

              <button
                onClick={() => addItem('Tailwind 3D Theme', 25)}
                className="btn btn-secondary"
                style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}
              >
                <Plus size={14} color="var(--primary)" />
                <span>+ Tailwind Theme ($25)</span>
              </button>

              <button
                onClick={() => addItem('Postman API Mock', 15)}
                className="btn btn-secondary"
                style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}
              >
                <Plus size={14} color="var(--primary)" />
                <span>+ API Mock ($15)</span>
              </button>
            </div>

            <div
              style={{
                flexGrow: 1,
                minHeight: '160px',
                maxHeight: '220px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem',
                marginBottom: '1.25rem',
                paddingRight: '0.25rem'
              }}
            >
              {items.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-subtle)', fontSize: '0.9rem' }}>
                  Savatcha bo'sh. Yuqoridagi tugmalar orqali element qo'shing!
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.6rem 0.85rem',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: 'var(--radius-sm)'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#ffffff' }}>{item.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>
                        ${item.price} × {item.qty} = <span style={{ color: 'var(--primary)' }}>${item.price * item.qty}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <button
                        onClick={() => decrementItem(item.id)}
                        className="btn btn-secondary"
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ fontSize: '0.88rem', fontWeight: 700, minWidth: '18px', textAlign: 'center' }}>
                        {item.qty}
                      </span>
                      <button
                        onClick={() => addItem(item.name, item.price)}
                        className="btn btn-secondary"
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>Umumiy qiymat ({totalCount} dona):</div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#10b981' }}>${totalPrice}</div>
              </div>

              <button
                onClick={clearStore}
                className="btn btn-secondary"
                style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem', color: '#ef4444' }}
              >
                <Trash2 size={14} />
                <span>Tozalash</span>
              </button>
            </div>
          </TiltCard>

          <div className="terminal-window" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', fontWeight: 600 }}>
                {activeEngine === 'zustand' ? 'ZUSTAND DEVTOOLS LOGGER' : 'REDUX TIME TRAVEL INSPECTOR'}
              </div>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  boxShadow: '0 0 8px #10b981'
                }}
              />
            </div>

            <div className="terminal-body" style={{ flexGrow: 1, padding: '1.25rem', minHeight: '300px' }}>
              <div style={{ color: 'var(--text-subtle)', fontSize: '0.78rem', marginBottom: '0.75rem' }}>
                // Real-time Action Dispatch Stream & JSON State Tree:
              </div>

              {logs.map((log, index) => (
                <div
                  key={index}
                  style={{
                    marginBottom: '0.75rem',
                    padding: '0.5rem 0.65rem',
                    background: 'rgba(255, 255, 255, 0.02)',
                    borderLeft: `2px solid ${log.engine === 'zustand' ? '#818CF8' : '#C084FC'}`,
                    borderRadius: '0 4px 4px 0'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.2rem' }}>
                    <span style={{ color: log.engine === 'zustand' ? '#818CF8' : '#C084FC', fontWeight: 700 }}>
                      ⚡ {log.action}
                    </span>
                    <span style={{ color: 'var(--text-subtle)' }}>{log.time}</span>
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
                    payload: <span style={{ color: '#38bdf8' }}>{log.payload}</span>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                padding: '0.75rem 1.25rem',
                background: '#070b14',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                fontSize: '0.78rem',
                color: 'var(--text-muted)',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <span>State: <strong style={{ color: '#10b981' }}>Synchronized (200 OK)</strong></span>
              <span>Memory: <strong style={{ color: 'var(--primary)' }}>0.42 MB</strong></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
