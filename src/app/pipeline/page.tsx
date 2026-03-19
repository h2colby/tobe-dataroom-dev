import { PipelineNetwork } from '@/components/PipelineNetwork';

export const metadata = {
  title: 'Pipeline Network | Tobe Energy',
  description: 'Real-time opportunity pipeline visualization',
};

export default function PipelinePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] p-8">
      <div className="max-w-7xl mx-auto">
        <PipelineNetwork />
      </div>
    </main>
  );
}
