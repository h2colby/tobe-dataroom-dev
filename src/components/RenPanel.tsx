'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

const CHARS = '⚡░▒▓█╔╗╚╝║═┌┐└┘├┤┬┴┼─│▲▼◄►●○◎◉∎∙·:;,.\'"`~!@#$%^&*()_+-=[]{}|\\/<>?01';
const BOLT_CHARS = '█▓▒░⚡';

const BOLT_SHAPE = [
  [8, 8], [7, 9], [6, 10], [5, 11], [4, 14],
  [3, 15], [6, 12], [8, 10], [10, 8], [7, 14],
  [6, 15], [5, 16], [8, 13], [10, 11], [12, 9],
  [11, 10], [10, 11], [9, 12], [12, 9], [14, 7],
  [13, 8], [12, 9], [14, 7], [15, 6], [16, 5],
  [17, 4], [18, 3],
];

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

function RenPanel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const frameRef = useRef(0);
  const gridRef = useRef<string[][]>([]);
  const brightnessRef = useRef<number[][]>([]);

  const hasMessages = messages.length > 0;

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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

          let inBolt = false;
          if (y >= 2 && y - 2 < BOLT_SHAPE.length) {
            const [indent, width] = BOLT_SHAPE[y - 2];
            if (x >= indent && x < indent + width) inBolt = true;
          }

          if (inBolt) {
            const wave = Math.sin(t + y * 0.3 + x * 0.1) * 0.15;
            const pulse = Math.sin(t * 1.5) * 0.1;
            b = Math.max(0, Math.min(1, b + wave + pulse));

            const flashY = ((t * 8) % (ROWS + 10)) - 5;
            const flashDist = Math.abs(y - flashY);
            if (flashDist < 3) {
              b = Math.min(1, b + (1 - flashDist / 3) * 0.5);
            }

            const cx = x * cellW + cellW / 2;
            const cy = y * cellH + cellH / 2;
            const dx = mousePos.x - cx;
            const dy = mousePos.y - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 80) {
              b = Math.min(1, b + (1 - dist / 80) * 0.4);
            }

            if (Math.random() < 0.01) {
              grid[y][x] = BOLT_CHARS[Math.floor(Math.random() * BOLT_CHARS.length)];
            }

            const edgeDist = (() => {
              if (y >= 2 && y - 2 < BOLT_SHAPE.length) {
                const [indent, width] = BOLT_SHAPE[y - 2];
                const relX = x - indent;
                return Math.min(relX, width - 1 - relX) / (width / 2);
              }
              return 0;
            })();

            if (edgeDist < 0.3) {
              const rb = Math.floor(b * 255);
              ctx.fillStyle = `rgba(${rb}, ${Math.floor(rb * 0.42)}, ${Math.floor(rb * 0.21)}, ${b})`;
            } else {
              const r = Math.floor(255 * b);
              const g = Math.floor(107 * b);
              const bb = Math.floor(53 * b * 0.3);
              ctx.fillStyle = `rgba(${r}, ${g}, ${bb}, ${b})`;
            }
          } else {
            const flicker = Math.sin(t * 3 + x * 7 + y * 11) * 0.03;
            b = Math.max(0, b + flicker);
            ctx.fillStyle = `rgba(255, 107, 53, ${b * 0.4})`;

            if (Math.random() < 0.002) {
              grid[y][x] = Math.random() < 0.5 ? CHARS[Math.floor(Math.random() * CHARS.length)] : ' ';
              brightness[y][x] = grid[y][x] === ' ' ? 0 : 0.05 + Math.random() * 0.08;
            }
          }

          ctx.fillText(ch, x * cellW + cellW / 2, y * cellH + cellH / 2);
        }
      }

      ctx.font = `bold ${fontSize * 0.8}px monospace`;
      const bottomAlpha = 0.3 + Math.sin(t) * 0.1;
      ctx.fillStyle = `rgba(255, 107, 53, ${bottomAlpha})`;
      ctx.fillText('⚡  A L W A Y S   O N  ⚡', w / 2, h - cellH * 1.5);

      animFrame = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animFrame);
  }, [mousePos]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  }, []);

  // ── Chat functionality (self-contained) ──
  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setChatInput('');
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content }))
        }),
      });

      if (!res.ok) throw new Error('API error');
      const reader = res.body?.getReader();
      if (!reader) throw new Error('No reader');

      const assistantId = (Date.now() + 1).toString();
      let fullText = '';
      setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        for (const line of chunk.split('\n')) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.type === 'text-delta' && data.delta) {
                fullText += data.delta;
                setMessages(prev =>
                  prev.map(m => m.id === assistantId ? { ...m, content: fullText } : m)
                );
              }
            } catch { /* skip */ }
          }
        }
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatInput.trim()) {
      sendMessage(chatInput);
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
        <div className="h-2 w-2 rounded-full bg-[#ff6b35] animate-pulse" style={{ boxShadow: '0 0 8px rgba(255,107,53,0.6)' }} />
      </div>

      {/* Content area — shows bolt+questions OR conversation */}
      {!hasMessages ? (
        /* ── Initial state: Canvas + hover questions ── */
        <div className="relative flex-1" style={{ minHeight: '280px' }}>
          <canvas
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            className={`absolute inset-0 w-full h-full cursor-pointer transition-all duration-700 ${isHovered ? 'opacity-10 blur-sm scale-95' : 'opacity-100'}`}
          />
          <div className={`absolute inset-0 flex flex-col justify-center px-6 py-6 transition-all duration-700 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
            <p className="mb-2 text-[0.65rem] tracking-[0.15em] text-[#ff6b35]">ASK ME ANYTHING</p>
            <p className="mb-4 text-xs text-white/30">Click any question to start a conversation.</p>
            <div className="space-y-2.5">
              {[
                { q: 'How does Tobe compete with grey hydrogen at $20-50/kg delivered?', color: '#ff6b35' },
                { q: 'What are the FY7 revenue and margin projections?', color: '#ff6b35' },
                { q: 'How does >92% system efficiency compare to PEM competitors?', color: '#ff6b35' },
                { q: 'Explain the 45V tax credit — $108M to $324M upside', color: '#ff6b35' },
                { q: 'What makes this team uniquely qualified?', color: '#ff6b35' },
                { q: 'How does on-site production eliminate 85% of delivered cost?', color: '#ff6b35' },
              ].map((item) => (
                <button
                  key={item.q}
                  onClick={() => sendMessage(item.q)}
                  className="w-full rounded border bg-black/40 px-4 py-2.5 text-left text-xs transition-all hover:bg-white/[0.05] hover:scale-[1.02] backdrop-blur-sm"
                  style={{ borderColor: `${item.color}25`, color: item.color, textShadow: `0 0 6px ${item.color}30` }}
                >
                  &ldquo;{item.q}&rdquo;
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ── Conversation state: messages displayed inline ── */
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3" style={{ minHeight: '280px', maxHeight: '400px' }}>
          {messages.map((m) => (
            <div key={m.id} className={`${m.role === 'user' ? 'text-right' : ''}`}>
              <div
                className={`inline-block max-w-[90%] rounded px-3 py-2 text-xs leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-[#ff6b35]/10 text-[#ff6b35] border border-[#ff6b35]/20'
                    : 'bg-white/[0.03] text-white/70 border border-white/5'
                }`}
              >
                <p className="whitespace-pre-wrap">{m.content}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-white/30">
              <span className="animate-pulse">●</span> Thinking...
            </div>
          )}

          {error && (
            <div className="rounded border border-red-500/20 bg-red-500/5 px-3 py-2 text-xs text-red-400">
              {error}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input box — always pinned to bottom */}
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
            disabled={isLoading || !chatInput.trim()}
            className="rounded border border-[#ff6b35]/30 bg-[#ff6b35]/10 px-4 py-2.5 text-xs text-[#ff6b35] transition-all hover:bg-[#ff6b35]/20 disabled:opacity-30"
          >
            ▸
          </button>
        </form>
      </div>
    </div>
  );
}

export default RenPanel;
