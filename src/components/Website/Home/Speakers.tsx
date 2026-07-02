import React from 'react';

const Speakers = () => {
  const speakers = [
    { name: 'Dr. Amara Osei', role: 'Managing Partner', company: 'Frontier Capital', img: 'https://images.unsplash.com/photo-1614890085618-0e1054da74f8?w=400&h=400&fit=crop&auto=format' },
    { name: 'Naledi Dlamini', role: 'CEO & Founder', company: 'TechBridge Africa', img: 'https://images.unsplash.com/photo-1563132337-f159f484226c?w=400&h=400&fit=crop&auto=format' },
    { name: 'Marcus Sithole', role: 'Investment Director', company: 'Ubuntu Ventures', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&auto=format' },
    { name: 'Dr. Priya Naidoo', role: 'Chief Strategy Officer', company: 'Pan-African Growth Fund', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&auto=format' }
  ];

  return (
    <section id="speakers" className="py-[100px_24px] bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-[11px] font-bold tracking-[0.25em] text-[#d4af37]/70 uppercase mb-[14px]">Thought Leaders</div>
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold text-white tracking-[-0.02em]">Featured Speakers</h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-7">
          {speakers.map((speaker, idx) => (
            <div key={idx} className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.3)] overflow-hidden transition-all duration-300 hover:border-[#d4af37]/30 hover:shadow-[0_0_40px_rgba(212,175,55,0.1)]">
              <div className="relative h-[280px] overflow-hidden">
                <img src={speaker.img} alt={speaker.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent"></div>
              </div>
              <div className="p-5 px-6 pb-6">
                <div className="w-9 h-[2px] bg-gradient-to-r from-[#d4af37] to-[#f2ca46] rounded-[2px] mb-[14px]"></div>
                <div className="text-base font-extrabold text-white mb-1">{speaker.name}</div>
                <div className="text-xs font-semibold text-[#d4af37] mb-0.5">{speaker.role}</div>
                <div className="text-xs font-medium text-white/40">{speaker.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Speakers;