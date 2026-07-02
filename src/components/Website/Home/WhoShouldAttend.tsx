import React from 'react';
import { Zap, Building2, TrendingUp } from 'lucide-react';

const WhoShouldAttend = () => {
  const categories = [
    { icon: Zap, title: 'Entrepreneur', items: ['Raising capital', 'Seeking partnerships', 'Scaling businesses'] },
    { icon: Building2, title: 'Professional', items: ['Accountants & Attorneys', 'Doctors & Engineers', 'Executives & Leaders'] },
    { icon: TrendingUp, title: 'Investor', items: ['Angel Investors', 'Venture Capital Firms', 'Family Offices'] }
  ];

  return (
    <section className="py-[100px_24px] bg-[#111827]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-[11px] font-bold tracking-[0.25em] text-[#d4af37]/70 uppercase mb-[14px]">Your Seat at the Table</div>
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold text-white tracking-[-0.02em]">Who Should Attend</h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
          {categories.map((item, idx) => (
            <div key={idx} className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.3)] p-[30px_28px] transition-all duration-300 hover:border-[#d4af37]/30">
              <div className="w-12 h-12 rounded-[13px] bg-[#d4af37]/15 flex items-center justify-center mb-[18px] border border-[#d4af37]/30">
                <item.icon size={20} className="text-[#d4af37]" />
              </div>
              <h3 className="text-base font-extrabold text-white mb-[14px]">{item.title}</h3>
              {item.items.map((text, idx2) => (
                <div key={idx2} className="flex items-center gap-2.5 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37] flex-shrink-0"></div>
                  <span className="text-[13px] font-normal text-white/50">{text}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoShouldAttend;