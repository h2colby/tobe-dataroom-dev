import { PipelineDashboard } from '@/components/PipelineNetwork';
import DeploymentTimeline from '@/components/DeploymentTimeline';

export const metadata = {
  title: 'Customers | Tobe Energy',
  description: 'Customer pipeline and deployment overview',
};

export default function CustomersPage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0f] font-mono text-white">
      {/* Hero */}
      <section className="relative border-b border-white/10 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-5 text-[0.7rem] tracking-[0.2em] text-[#ff6b35] glow-orange">
            ┌─── CUSTOMER PIPELINE ───┐
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            Pipeline &{' '}
            <span className="text-[#ff6b35]" style={{ textShadow: '0 0 12px rgba(255,107,53,0.5)' }}>
              Deployments
            </span>
          </h1>
          <p className="max-w-2xl text-lg text-white/60">
            $100M pipeline across 12 opportunities.
          </p>
        </div>
      </section>

      {/* Pipeline Dashboard */}
      <PipelineDashboard />

      {/* Deployment Timeline */}
      <DeploymentTimeline />

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-6">
        <div className="mx-auto max-w-6xl text-center">
          <pre className="text-xs text-[#ff6b35]/20" style={{ textShadow: '0 0 6px rgba(255,107,53,0.08)' }}>
{`TOBE ENERGY CORP // OKLAHOMA CITY, USA // EST. 2024
CONFIDENTIAL — AUTHORIZED INVESTOR ACCESS ONLY`}
          </pre>
        </div>
      </footer>
    </div>
  );
}
