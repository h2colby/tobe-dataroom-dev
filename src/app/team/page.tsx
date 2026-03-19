export const metadata = {
  title: 'Team | Tobe Energy',
  description: 'Meet the founders of Tobe Energy',
};

const team = [
  {
    name: 'Colby DeWeese',
    role: 'Co-Founder & CEO',
    bio: 'Colby leads strategy, business development, and investor relations at Tobe Energy. With a background spanning energy markets and technology commercialization, he drives the company\u2019s go-to-market execution and partnership development across industrial hydrogen verticals.',
  },
  {
    name: 'Dr. Caleb Lareau',
    role: 'Co-Founder & CTO',
    bio: 'Caleb leads the engineering and R&D efforts behind Tobe\u2019s membrane-free electrolysis platform. His work on electrode design and system architecture underpins the company\u2019s 94% efficiency benchmark and scalable stack-based deployment model.',
  },
];

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Header */}
      <section className="border-b border-white/10 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 font-mono text-sm tracking-widest text-[#ff6b35] uppercase">
            Leadership
          </p>
          <h1 className="mb-4 font-mono text-4xl font-bold tracking-tight md:text-5xl">
            The Team Behind{' '}
            <span className="text-[#00d4ff]">Tobe Energy</span>
          </h1>
          <p className="max-w-2xl text-lg text-white/60">
            Brothers building the infrastructure layer for the hydrogen economy.
          </p>
        </div>
      </section>

      {/* Bios */}
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
          {team.map((member) => (
            <div
              key={member.name}
              className="rounded border border-white/10 bg-white/[0.02] p-8"
            >
              {/* Avatar placeholder */}
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-[#00d4ff]/30 bg-[#00d4ff]/5">
                <span className="font-mono text-2xl font-bold text-[#00d4ff]">
                  {member.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </span>
              </div>
              <h2 className="font-mono text-xl font-bold">{member.name}</h2>
              <p className="mt-1 font-mono text-sm text-[#ff6b35]">
                {member.role}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/60">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
