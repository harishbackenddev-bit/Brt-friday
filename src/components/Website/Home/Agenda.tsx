import React from 'react';
import { Clock } from 'lucide-react';

const Agenda = () => {
  const agendaItems = [
    { time: '01 · 09:00', title: "Registration & Welcome", desc: "Networking reception and introductions." },
    { time: '02 · 10:00', title: "Opening Session", desc: "BRT ecosystem insights and keynote address." },
    { time: '03 · 11:30', title: "Networking Rounds", desc: "Structured networking and curated introductions." },
    { time: '04 · 13:00', title: "Featured Discussions", desc: "Industry leaders and expert panel conversations." },
    { time: '05 · 17:00', title: "Closing Reception", desc: "Relationship building and next steps." }
  ];

  return (
    <section id="agenda" className="py-[100px_24px] bg-[#0a0a0a] overflow-hidden agenda-section mobilepad">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-[72px]">
          <div className="text-[11px] font-bold tracking-[0.25em] text-[#d4af37]/70 uppercase mb-[14px]">Event Schedule</div>
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold text-white tracking-[-0.02em]">Event Experience</h2>
        </div>
        <div className="relative">
          <div className="absolute top-7 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent z-0"></div>
          <div className="grid grid-cols-5 gap-4 relative z-10">
            {agendaItems.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className={`w-14 h-14 rounded-full ${idx === 0 ? 'bg-gradient-to-br from-[#d4af37] to-[#f2ca46] shadow-[0_0_30px_rgba(212,175,55,0.4)]' : 'bg-[#d4af37]/15 border-2 border-[#d4af37]/55 shadow-[0_0_16px_rgba(212,175,55,0.1)]'} flex items-center justify-center mb-5 flex-shrink-0 relative z-10 transition-all duration-300`}>
                  <Clock size={20} className={idx === 0 ? 'text-black' : 'text-[#d4af37]'} />
                </div>
                <div className={`bg-gradient-to-br ${idx === 0 ? 'from-[#d4af37]/15 to-[#d4af37]/5 border-[#d4af37]/50 shadow-[0_0_24px_rgba(212,175,55,0.1)]' : 'from-white/5 to-white/0 border-white/10'} border rounded-xl p-5 px-4 w-full transition-all duration-300 hover:border-[#d4af37]/30`}>
                  <div className={`text-[10px] font-extrabold tracking-[0.2em] uppercase mb-1.5 ${idx === 0 ? 'text-[#f2ca46]' : 'text-[#d4af37]/50'}`}>{item.time}</div>
                  <div className={`text-sm font-extrabold ${idx === 0 ? 'text-white' : 'text-white/80'} mb-2 leading-[1.3]`}>{item.title}</div>
                  <div className="text-xs font-normal text-white/40 leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Agenda;