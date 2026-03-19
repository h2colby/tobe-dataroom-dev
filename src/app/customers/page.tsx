import { PipelineDashboard } from '@/components/PipelineNetwork';

export const metadata = {
  title: 'Customers | Tobe Energy',
  description: 'Customer pipeline and deployment overview',
};

export default function CustomersPage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0f] font-mono text-white">
      {/* Scanline overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[100]"
        style={{
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
        }}
      />

      {/* Grid background */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,107,53,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,53,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Terminal frame header */}
      <div className="border-b border-white/10 px-6 py-6">
        <div className="mx-auto max-w-7xl">
          <pre className="mb-4 text-xs leading-tight text-[#ff6b35]/70 sm:text-sm" style={{ whiteSpace: 'pre' }}>
{`┌─── SECTION 04 ─── CUSTOMER PIPELINE ────────────────────┐`}
          </pre>
          <pre className="text-[0.6rem] leading-tight text-[#00d4ff]/50 sm:text-xs" style={{ whiteSpace: 'pre' }}>
{`╔══════════════════════════════════════════════════════════╗
║  PIPELINE COMMAND INTERFACE                              ║
║  STATUS: ● LIVE        REFRESH: REAL-TIME                ║
║  CLASSIFICATION: CONFIDENTIAL // INVESTOR ACCESS         ║
╚══════════════════════════════════════════════════════════╝`}
          </pre>
        </div>
      </div>

      {/* Pipeline Dashboard */}
      <PipelineDashboard />

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8">
        <div className="mx-auto max-w-5xl text-center">
          <pre className="text-xs text-white/20" style={{ whiteSpace: 'pre' }}>
{`═══════════════════════════════════════════════════════════
 TOBE ENERGY CORP // CONFIDENTIAL // 2026
═══════════════════════════════════════════════════════════`}
          </pre>
        </div>
      </footer>
    </div>
  );
}
