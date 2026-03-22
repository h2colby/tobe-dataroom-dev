'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

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
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {!isOpen && (
          <div 
            onClick={() => setIsOpen(true)}
            className="cursor-pointer rounded border border-[#ff6b35]/20 bg-[#0a0a0f]/95 px-3 py-1.5 font-mono text-xs text-[#ff6b35] shadow-lg backdrop-blur-sm transition-all hover:border-[#ff6b35]/40"
            style={{ textShadow: '0 0 8px rgba(255,107,53,0.4)' }}
          >
            <span className="text-[#00ff88]">●</span> Ask AI
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

      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 flex h-[480px] w-[400px] flex-col overflow-hidden rounded border border-white/10 bg-[#0a0a0f] font-mono shadow-2xl">
          <div className="border-b border-white/10 bg-[#12121a] px-4 py-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[0.65rem] tracking-[0.15em] text-[#ff6b35]">TOBE ENERGY // AI ASSISTANT</p>
                <p className="text-xs text-white/40">Ask anything about Tobe Energy</p>
              </div>
              <div className="h-2 w-2 rounded-full bg-[#00ff88]" style={{ boxShadow: '0 0 6px rgba(0,255,136,0.5)' }} />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <p className="text-[#ff6b35] text-sm mb-2">⚡</p>
                <p className="text-xs text-white/30">Ask me about our technology, financials,</p>
                <p className="text-xs text-white/30">competitive position, or deployment plans.</p>
                <div className="mt-4 space-y-2">
                  {[
                    'What makes Tobe different from PEM?',
                    'What are the FY7 revenue projections?',
                    'How does the 45V tax credit work?',
                  ].map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="block w-full rounded border border-white/5 bg-white/[0.02] px-3 py-2 text-left text-xs text-white/50 transition-all hover:border-[#ff6b35]/20 hover:text-white/70"
                    >
                      {q}
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

          <form onSubmit={handleSubmit} className="border-t border-white/10 bg-[#12121a] px-4 py-3">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Tobe Energy..."
                className="flex-1 rounded border border-white/10 bg-[#0a0a0f] px-3 py-2 text-xs text-white placeholder-white/20 outline-none focus:border-[#ff6b35]/30"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="rounded border border-[#ff6b35]/30 bg-[#ff6b35]/10 px-3 py-2 text-xs text-[#ff6b35] transition-all hover:bg-[#ff6b35]/20 disabled:opacity-30"
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
