'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

const CHARS = '⚡░▒▓█╔╗╚╝║═┌┐└┘├┤┬┴┼─│▲▼◄►●○◎◉∎∙·:;,.\'"`~!@#$%^&*()_+-=[]{}|\\/<>?01';
const BOLT_CHARS = '█▓▒░⚡';

// Lightning bolt shape — each row is [indent, width]
const BOLT_SHAPE = [
  [8, 8], [7, 9], [6, 10], [5, 11], [4, 14],
  [3, 15], [6, 12], [8, 10], [10, 8], [7, 14],
  [6, 15], [5, 16], [8, 13], [10, 11], [12, 9],
  [11, 10], [10, 11], [9, 12], [12, 9], [14, 7],
  [13, 8], [12, 9], [14, 7], [15, 6], [16, 5],
  [17, 4], [18, 3],
];

function RenPanel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [chatInput, setChatInput] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const frameRef = useRef(0);
  const gridRef = useRef<string[][]>([]);
  const brightnessRef = useRef<number[][]>([]);

  // Hide floating chat button when this panel is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
          const floatingChat = document.querySelector('[class*="fixed bottom-6 right-6"]') as HTMLElement;
          if (floatingChat) {
            floatingChat.style.transition = 'opacity 0.3s, transform 0.3s';
            floatingChat.style.opacity = entry.isIntersecting ? '0' : '1';
            floatingChat.style.pointerEvents = entry.isIntersecting ? 'none' : 'auto';
            floatingChat.style.transform = entry.isIntersecting ? 'translateY(20px)' : 'translateY(0)';
          }
        });
      },
      { threshold: 0.3 }
    );
    if (panelRef.current) observer.observe(panelRef.current);
    return () => observer.disconnect();
  }, []);

  const COLS = 44;
  const ROWS = 32;

  const initGrid = useCallback(() => {
    const grid: string[][] = [];
    const brightness: number[][] = [];
    for (let y = 0; y < ROWS; y++) {
      const row: string[] = [];
      const bRow: number[] = [];
      for (let x = 0; x < COLS; x++) {
        // Check if this position is part of the bolt
        let inBolt = false;
        if (y >= 2 && y - 2 < BOLT_SHAPE.length) {
          const [indent, width] = BOLT_SHAPE[y - 2];
          if (x >= indent && x < indent + width) {
            inBolt = true;
          }
        }
        if (inBolt) {
          row.push(BOLT_CHARS[Math.floor(Math.random() * BOLT_CHARS.length)]);
          bRow.push(0.6 + Math.random() * 0.4);
        } else {
          // Scatter some ambient noise chars
          if (Math.random() < 0.15) {
            row.push(CHARS[Math.floor(Math.random() * CHARS.length)]);
            bRow.push(0.05 + Math.random() * 0.1);
          } else {
            row.push(' ');
            bRow.push(0);
          }
        }
      }
      grid.push(row);
      brightness.push(bRow);
    }
    gridRef.current = grid;
    brightnessRef.current = brightness;
  }, []);

  useEffect(() => {
    initGrid();
  }, [initGrid]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const cellW = w / COLS;
    const cellH = h / ROWS;
    const fontSize = Math.min(cellW * 1.2, cellH * 0.9, 14);

    let animFrame: number;
    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, w, h);
      ctx.font = `${fontSize}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const grid = gridRef.current;
      const brightness = brightnessRef.current;
      const t = frame * 0.02;

      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          const ch = grid[y]?.[x];
          let b = brightness[y]?.[x] || 0;
          if (!ch || ch === ' ' || b === 0) continue;

          // Check if in bolt shape
          let inBolt = false;
          if (y >= 2 && y - 2 < BOLT_SHAPE.length) {
            const [indent, width] = BOLT_SHAPE[y - 2];
            if (x >= indent && x < indent + width) inBolt = true;
          }

          if (inBolt) {
            // Subtle wave animation through the bolt
            const wave = Math.sin(t + y * 0.3 + x * 0.1) * 0.15;
            const pulse = Math.sin(t * 1.5) * 0.1;
            b = Math.max(0, Math.min(1, b + wave + pulse));

            // Occasional bright flash traveling down the bolt
            const flashY = ((t * 8) % (ROWS + 10)) - 5;
            const flashDist = Math.abs(y - flashY);
            if (flashDist < 3) {
              b = Math.min(1, b + (1 - flashDist / 3) * 0.5);
            }

            // Mouse proximity glow
            const cx = x * cellW + cellW / 2;
            const cy = y * cellH + cellH / 2;
            const dx = mousePos.x - cx;
            const dy = mousePos.y - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 80) {
              b = Math.min(1, b + (1 - dist / 80) * 0.4);
            }

            // Randomly mutate some chars
            if (Math.random() < 0.01) {
              grid[y][x] = BOLT_CHARS[Math.floor(Math.random() * BOLT_CHARS.length)];
            }

            // Color: orange core, green edges
            const edgeDist = (() => {
              if (y >= 2 && y - 2 < BOLT_SHAPE.length) {
                const [indent, width] = BOLT_SHAPE[y - 2];
                const relX = x - indent;
                return Math.min(relX, width - 1 - relX) / (width / 2);
              }
              return 0;
            })();

            if (edgeDist < 0.3) {
              // Edge — green/cyan glow
              const gb = Math.floor(b * 255);
              ctx.fillStyle = `rgba(0, ${gb}, ${Math.floor(gb * 0.55)}, ${b})`;
            } else {
              // Core — orange
              const r = Math.floor(255 * b);
              const g = Math.floor(107 * b);
              const bb = Math.floor(53 * b * 0.3);
              ctx.fillStyle = `rgba(${r}, ${g}, ${bb}, ${b})`;
            }
          } else {
            // Ambient noise — very subtle
            const flicker = Math.sin(t * 3 + x * 7 + y * 11) * 0.03;
            b = Math.max(0, b + flicker);
            ctx.fillStyle = `rgba(255, 107, 53, ${b * 0.4})`;

            // Randomly respawn/despawn noise
            if (Math.random() < 0.002) {
              grid[y][x] = Math.random() < 0.5 ? CHARS[Math.floor(Math.random() * CHARS.length)] : ' ';
              brightness[y][x] = grid[y][x] === ' ' ? 0 : 0.05 + Math.random() * 0.08;
            }
          }

          ctx.fillText(ch, x * cellW + cellW / 2, y * cellH + cellH / 2);
        }
      }

      // Draw "ALWAYS ON" text at bottom
      ctx.font = `bold ${fontSize * 0.8}px monospace`;
      const bottomAlpha = 0.3 + Math.sin(t) * 0.1;
      ctx.fillStyle = `rgba(0, 255, 136, ${bottomAlpha})`;
      ctx.fillText('⚡  A L W A Y S   O N  ⚡', w / 2, h - cellH * 1.5);

      animFrame = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animFrame);
  }, [mousePos]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  }, []);

  const openChat = useCallback((prefill?: string) => {
    // Show the floating chat first
    const floatingChat = document.querySelector('[class*="fixed bottom-6 right-6"]') as HTMLElement;
    if (floatingChat) {
      floatingChat.style.opacity = '1';
      floatingChat.style.pointerEvents = 'auto';
      floatingChat.style.transform = 'translateY(0)';
    }
    // Click the chat button
    const chatBtn = document.querySelector('[class*="fixed bottom-6 right-6"] button') as HTMLElement;
    if (chatBtn) chatBtn.click();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatInput.trim()) {
      openChat(chatInput);
      setChatInput('');
    }
  };

  return (
    <div
      ref={panelRef}
      className="group/ai flex flex-col rounded border border-[#ff6b35]/20 bg-[#0a0a0f] overflow-hidden relative"
      style={{ boxShadow: '0 0 30px rgba(255,107,53,0.08)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="border-b border-[#ff6b35]/20 bg-[#12121a] px-5 py-3 flex items-center justify-between z-10">
        <div>
          <p className="text-[0.65rem] tracking-[0.15em] text-[#ff6b35]">REN // AI OPERATING LAYER</p>
          <p className="text-xs text-white/30">I know every number in this data room.</p>
        </div>
        <div className="h-2 w-2 rounded-full bg-[#00ff88] animate-pulse" style={{ boxShadow: '0 0 8px rgba(0,255,136,0.6)' }} />
      </div>

      {/* Canvas + Questions container */}
      <div className="relative flex-1" style={{ minHeight: '280px' }}>
        {/* Animated Canvas — the lightning bolt */}
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          className={`absolute inset-0 w-full h-full cursor-pointer transition-all duration-700 ${isHovered ? 'opacity-10 blur-sm scale-95' : 'opacity-100'}`}
          onClick={openChat}
        />

        {/* Questions — appear on hover */}
        <div className={`absolute inset-0 flex flex-col justify-center px-6 py-6 transition-all duration-700 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          <p className="mb-2 text-[0.65rem] tracking-[0.15em] text-[#ff6b35]">ASK ME ANYTHING</p>
          <p className="mb-4 text-xs text-white/30">Click any question to start a conversation.</p>

          <div className="space-y-2.5">
            {[
              { q: 'How does Tobe compete with grey hydrogen at $20-50/kg delivered?', color: '#00ff88' },
              { q: 'What are the FY7 revenue and margin projections?', color: '#00d4ff' },
              { q: 'How does >92% system efficiency compare to PEM competitors?', color: '#ff6b35' },
              { q: 'Explain the 45V tax credit — $108M to $324M upside', color: '#00ff88' },
              { q: 'What makes this team uniquely qualified?', color: '#00d4ff' },
              { q: 'How does on-site production eliminate 85% of delivered cost?', color: '#ff6b35' },
            ].map((item) => (
              <button
                key={item.q}
                onClick={openChat}
                className="w-full rounded border bg-black/40 px-4 py-2.5 text-left text-xs transition-all hover:bg-white/[0.05] hover:scale-[1.02] backdrop-blur-sm"
                style={{ borderColor: `${item.color}25`, color: item.color, textShadow: `0 0 6px ${item.color}30` }}
              >
                &ldquo;{item.q}&rdquo;
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Input box — pinned to bottom */}
      <div className="border-t border-[#ff6b35]/20 bg-[#12121a] px-5 py-3 z-20 mt-auto">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Ask about Tobe Energy..."
            className="flex-1 rounded border border-white/10 bg-[#0a0a0f] px-4 py-2.5 text-xs text-white placeholder-white/20 outline-none focus:border-[#ff6b35]/30 transition-colors"
          />
          <button
            type="submit"
            className="rounded border border-[#ff6b35]/30 bg-[#ff6b35]/10 px-4 py-2.5 text-xs text-[#ff6b35] transition-all hover:bg-[#ff6b35]/20"
          >
            ▸
          </button>
        </form>
      </div>
    </div>
  );
}

export default RenPanel;
