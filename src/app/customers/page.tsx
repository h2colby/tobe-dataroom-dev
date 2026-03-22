import { PipelineDashboard } from '@/components/PipelineNetwork';
import DeploymentTimeline from '@/components/DeploymentTimeline';

export const metadata = {
  title: 'Customers | Tobe Energy',
  description: 'Customer pipeline and deployment overview',
};

export default function CustomersPage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0f] font-mono text-white">
      {/* Terminal frame header */}
      <div className="border-b border-white/10 px-6 py-6">
        <div className="mx-auto max-w-7xl">
          <pre className="mb-4 text-xs leading-tight text-[#ff6b35]/70 sm:text-sm" style={{ whiteSpace: 'pre' }}>
{`┌─── CUSTOMER PIPELINE ───────────────────────────────────┐`}
          </pre>
        </div>
      </div>

      {/* Pipeline Dashboard */}
      <PipelineDashboard />

      {/* Deployment Timeline */}
      <DeploymentTimeline />

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
