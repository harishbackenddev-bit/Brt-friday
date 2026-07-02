import React from 'react';
import { Zap, Building2, TrendingUp } from 'lucide-react';

const Highlights = () => {
  const highlights = [
    { icon: Zap, title: 'Entrepreneur', desc: 'Connect with investors and strategic partners to accelerate your venture.' },
    { icon: Building2, title: 'Professional', desc: 'Expand your network, unlock partnerships and explore investment opportunities.' },
    { icon: TrendingUp, title: 'Investor', desc: 'Discover curated opportunities and promising ventures across Africa.' }
  ];

  return (
    <section id="highlights" className="py-[100px_24px] bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-[11px] font-bold tracking-[0.25em] text-[#d4af37]/70 uppercase mb-[14px]">
            Who's at BRT150
          </div>
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold text-white tracking-[-0.02em]">
            Event Highlights
          </h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
          {highlights.map((item, idx) => (
            <div key={idx} className={`bg-gradient-to-br from-white/5 to-white/0 border border-[${idx === 0 ? '#d4af37/50' : 'white/10'}] rounded-2xl backdrop-blur-md shadow-[${idx === 0 ? '0_0_40px_rgba(212,175,55,0.1),0_20px_60px_rgba(0,0,0,0.4)' : '0_20px_60px_rgba(0,0,0,0.3)'}] p-8 transition-all duration-300 hover:border-[#d4af37]/50 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]`}>
              <div className="w-[52px] h-[52px] rounded-[14px] bg-[#d4af37]/20 flex items-center justify-center mb-[22px] border border-[#d4af37]/30">
                <item.icon size={22} className="text-[#d4af37]" />
              </div>
              <h3 className="text-lg font-extrabold text-white mb-2.5">{item.title}</h3>
              <p className="text-sm font-normal text-white/45 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;