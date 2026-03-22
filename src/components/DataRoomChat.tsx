'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

// ── Lightning bolt canvas (mini version for chat header) ──
const CHARS = '⚡░▒▓█╔╗╚╝║═┌┐└┘├┤┬┴┼─│▲▼◄►●○◎◉∎∙·:;,.\'"`~!@#$%^&*()_+-=[]{}|\\/<>?01';
const BOLT_CHARS = '█▓▒░⚡';
const BOLT_SHAPE = [
  [4, 4], [3, 5], [3, 5], [2, 6], [2, 7],
  [1, 8], [3, 6], [4, 5], [5, 4], [3, 7],
  [3, 8], [2, 8], [4, 7], [5, 6], [6, 5],
  [6, 5], [5, 6], [5, 6], [6, 5], [7, 4],
  [7, 4], [6, 5], [7, 4], [8, 3], [8, 3],
  [9, 2],
];

function MiniBoltCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const COLS = 14;
    const ROWS = 26;
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const cellW = w / COLS;
    const cellH = h / ROWS;
    const fontSize = Math.min(cellW * 1.1, cellH * 0.85, 10);

    const grid: string[][] = [];
    const brightness: number[][] = [];
    for (let y = 0; y < ROWS; y++) {
      const row: string[] = [];
      const bRow: number[] = [];
      for (let x = 0; x < COLS; x++) {
        let inBolt = false;
        if (y < BOLT_SHAPE.length) {
          const [indent, width] = BOLT_SHAPE[y];
          if (x >= indent && x < indent + width) inBolt = true;
        }
        if (inBolt) {
          row.push(BOLT_CHARS[Math.floor(Math.random() * BOLT_CHARS.length)]);
          bRow.push(0.5 + Math.random() * 0.5);
        } else {
          row.push(Math.random() < 0.1 ? CHARS[Math.floor(Math.random() * CHARS.length)] : ' ');
          bRow.push(Math.random() * 0.08);
        }
      }
      grid.push(row);
      brightness.push(bRow);
    }

    let frame: number;
    const draw = () => {
      ctx.fillStyle = '#0a0a0f';
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${fontSize}px monospace`;
      ctx.textBaseline = 'middle';

      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          if (brightness[y][x] <= 0) continue;
          // Shimmer
          const b = brightness[y][x] * (0.7 + Math.sin(Date.now() * 0.003 + x * 0.5 + y * 0.3) * 0.3);
          ctx.fillStyle = `rgba(255, 107, 53, ${b})`;
          ctx.fillText(grid[y][x], x * cellW, y * cellH + cellH / 2);
          // Randomly swap chars
          if (Math.random() < 0.02) {
            const inBolt = y < BOLT_SHAPE.length && x >= BOLT_SHAPE[y][0] && x < BOLT_SHAPE[y][0] + BOLT_SHAPE[y][1];
            grid[y][x] = inBolt
              ? BOLT_CHARS[Math.floor(Math.random() * BOLT_CHARS.length)]
              : CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
      }
      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frame);
  }, []);

  return <canvas ref={canvasRef} className={className} />;
}

// ── Main Chat Component ──
export function DataRoomChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  // Expose global function for RenPanel to send messages directly
  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;
    
    setIsOpen(true);

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
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
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.type === 'text-delta' && data.delta) {
                fullText += data.delta;
                setMessages(prev =>
                  prev.map(m => m.id === assistantId ? { ...m, content: fullText } : m)
                );
              }
            } catch {
              // skip non-JSON lines
            }
          }
        }
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading]);

  // Expose sendMessage globally so RenPanel can use it
  useEffect(() => {
    (window as unknown as Record<string, unknown>).__renChatSend = sendMessage;
    (window as unknown as Record<string, unknown>).__renChatOpen = () => setIsOpen(true);
    return () => {
      delete (window as unknown as Record<string, unknown>).__renChatSend;
      delete (window as unknown as Record<string, unknown>).__renChatOpen;
    };
  }, [sendMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const suggestedQuestions = [
    'How does Tobe compete with grey hydrogen?',
    'What are the FY7 revenue projections?',
    'How does the 45V tax credit work?',
    'What makes this team uniquely qualified?',
  ];

  return (
    <>
      {/* Floating trigger */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {!isOpen && (
          <div
            onClick={() => setIsOpen(true)}
            className="cursor-pointer rounded border border-[#ff6b35]/20 bg-[#0a0a0f]/95 px-3 py-1.5 font-mono text-xs text-[#ff6b35] shadow-lg backdrop-blur-sm transition-all hover:border-[#ff6b35]/40"
            style={{ textShadow: '0 0 8px rgba(255,107,53,0.4)' }}
          >
            Ask Ren
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#ff6b35]/30 bg-[#0a0a0f] font-mono text-sm text-[#ff6b35] shadow-lg transition-all hover:border-[#ff6b35]/60 hover:shadow-[0_0_15px_rgba(255,107,53,0.2)]"
          style={{ textShadow: '0 0 10px rgba(255,107,53,0.5)' }}
        >
          {isOpen ? '✕' : '⚡'}
        </button>
      </div>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 flex h-[560px] w-[420px] flex-col overflow-hidden rounded border border-[#ff6b35]/20 bg-[#0a0a0f] font-mono shadow-2xl"
          style={{ boxShadow: '0 0 40px rgba(255,107,53,0.1)' }}>

          {/* Header with mini bolt */}
          <div className="relative border-b border-[#ff6b35]/20 bg-[#12121a] overflow-hidden">
            <MiniBoltCanvas className="absolute inset-0 w-full h-full opacity-20" />
            <div className="relative z-10 px-5 py-3 flex items-center justify-between">
              <div>
                <p className="text-[0.65rem] tracking-[0.15em] text-[#ff6b35]">REN // AI OPERATING LAYER</p>
                <p className="text-xs text-white/30">I know every number in this data room.</p>
              </div>
              <div className="h-2 w-2 rounded-full bg-[#ff6b35] animate-pulse" style={{ boxShadow: '0 0 8px rgba(255,107,53,0.6)' }} />
            </div>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.length === 0 && (
              <div className="py-4">
                <p className="mb-3 text-[0.6rem] tracking-[0.15em] text-[#ff6b35]">ASK ME ANYTHING</p>
                <div className="space-y-2">
                  {suggestedQuestions.map((q, i) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="w-full rounded border bg-black/40 px-3 py-2.5 text-left text-xs transition-all hover:bg-white/[0.05]"
                      style={{
                        borderColor: ['#ff6b35', '#ff6b35', '#ff6b35', '#ff6b35'][i] + '25',
                        color: ['#ff6b35', '#ff6b35', '#ff6b35', '#ff6b35'][i],
                        textShadow: `0 0 6px ${['#ff6b35', '#ff6b35', '#ff6b35', '#ff6b35'][i]}30`,
                      }}
                    >
                      &ldquo;{q}&rdquo;
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m) => (
              <div key={m.id} className={`${m.role === 'user' ? 'text-right' : ''}`}>
                <div
                  className={`inline-block max-w-[85%] rounded px-3 py-2 text-xs leading-relaxed ${
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

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-[#ff6b35]/20 bg-[#12121a] px-4 py-3">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Tobe Energy..."
                className="flex-1 rounded border border-white/10 bg-[#0a0a0f] px-3 py-2.5 text-xs text-white placeholder-white/20 outline-none focus:border-[#ff6b35]/30 transition-colors"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="rounded border border-[#ff6b35]/30 bg-[#ff6b35]/10 px-3 py-2.5 text-xs text-[#ff6b35] transition-all hover:bg-[#ff6b35]/20 disabled:opacity-30"
              >
                ▸
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
