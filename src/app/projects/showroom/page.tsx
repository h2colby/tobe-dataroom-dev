'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ShowroomPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/projects/node-01');
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0f] font-mono text-white/50">
      <p className="text-sm">Redirecting to NODE-01...</p>
    </div>
  );
}
