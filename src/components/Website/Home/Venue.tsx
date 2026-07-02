import React from 'react';
import { MapPin, Calendar, Clock, Users, ExternalLink } from 'lucide-react';

const Venue = () => {
  const details = [
    { icon: MapPin, label: 'Location', value: 'Ethereal, Newcastle, KwaZulu-Natal' },
    { icon: Calendar, label: 'Date', value: '21 November 2026' },
    { icon: Clock, label: 'Time', value: '09:00 – 18:00 SAST' },
    { icon: Users, label: 'Capacity', value: '150 Guests (Invitation Only)' }
  ];

  return (
    <section className="py-[100px_24px] bg-[#111827]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-[11px] font-bold tracking-[0.25em] text-[#d4af37]/70 uppercase mb-[14px]">Location</div>
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold text-white tracking-[-0.02em]">Event Venue</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="relative rounded-2xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=500&fit=crop&auto=format" 
              alt="Luxury event venue" 
              className="w-full h-[400px] object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl"></div>
          </div>
          <div>
            <div className="bg-gradient-to-br from-white/5 to-white/0 border border-[#d4af37]/50 rounded-2xl backdrop-blur-md shadow-[0_0_40px_rgba(212,175,55,0.1),0_20px_60px_rgba(0,0,0,0.4)] p-9 mb-5">
              <div className="text-[11px] font-bold tracking-[0.2em] text-[#d4af37] uppercase mb-4">Venue Details</div>
              {details.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3.5 mb-4">
                  <div className="w-[38px] h-[38px] rounded-[10px] bg-[#d4af37]/15 flex items-center justify-center flex-shrink-0 border border-[#d4af37]/25">
                    <item.icon size={15} className="text-[#d4af37]" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-white/35 tracking-[0.15em] uppercase">{item.label}</div>
                    <div className="text-sm font-semibold text-white/80 mt-0.5">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.3)] p-0 overflow-hidden h-[160px]">
              <div className="w-full h-full bg-gradient-to-br from-[#111827]/80 to-[#0a0a0a]/80 flex items-center justify-center gap-2.5">
                <MapPin size={22} className="text-[#d4af37]" />
                <span className="text-sm font-semibold text-white/50">Ethereal, Newcastle, KwaZulu-Natal</span>
                <ExternalLink size={14} className="text-[#d4af37]/50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Venue;