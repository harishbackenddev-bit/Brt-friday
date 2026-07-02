import React from 'react';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&h=1080&fit=crop&auto=format')] bg-cover bg-center opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-black/97 via-black/90 to-[#111827]/90"></div>
      <div className="absolute top-[15%] -left-[5%] w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(212,175,55,0.07)_0%,transparent_65%)] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[10%] -right-[5%] w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(212,175,55,0.05)_0%,transparent_65%)] rounded-full pointer-events-none"></div>
      
      <div className="relative max-w-6xl mx-auto px-6 py-[140px_24px_100px] w-full">
        <div className="flex gap-3 mb-8 flex-wrap">
          <div className="inline-flex items-center gap-2 px-[18px] py-2 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] text-xs font-semibold tracking-[0.06em]">
            <Calendar size={13} className="text-[#d4af37] flex-shrink-0" />
            21 November 2026
          </div>
          <div className="inline-flex items-center gap-2 px-[18px] py-2 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] text-xs font-semibold tracking-[0.06em]">
            <MapPin size={13} className="text-[#d4af37] flex-shrink-0" />
            Ethereal, Newcastle, KwaZulu-Natal
          </div>
        </div>
        <div className="text-[11px] font-bold tracking-[0.3em] text-[#d4af37]/60 uppercase mb-5">
          The Black Round Table Presents
        </div>
        <h1 className="text-[clamp(2.8rem,6.5vw,5rem)] font-black leading-[1.05] mb-5 tracking-[-0.02em]">
          <span className="bg-gradient-to-r from-[#d4af37] to-[#f2ca46] text-transparent bg-clip-text">BRT150</span>
          <br />
          <span className="text-white">NETWORKING EVENT</span>
        </h1>
        <p className="text-xl font-medium text-white/60 max-w-[560px] leading-relaxed mb-[14px]">
          Connecting Entrepreneurs, Professionals &amp; Investors
        </p>
        <p className="text-[15px] font-normal text-white/40 max-w-[560px] leading-[1.9] mb-[52px]">
          Join a highly curated gathering of founders, investors, executives, and strategic partners for meaningful conversations, business opportunities, and high-value networking.
        </p>
        <div className="flex gap-[14px] flex-wrap">
<Link
  to="/onboarding"
  className="bg-gradient-to-r from-[#d4af37] to-[#f2ca46] text-black font-extrabold text-sm tracking-[0.04em] rounded-xl px-8 py-[14px] inline-flex items-center gap-2.5 transition-all duration-200 hover:shadow-lg hover:shadow-[#d4af37]/20 font-manrope"
>
  Reserve Your Spot <ArrowRight size={17} />
</Link>
          <button className="bg-transparent text-white/75 font-extrabold text-sm tracking-[0.04em] rounded-xl px-8 py-[14px] border border-[#d4af37]/55 cursor-pointer inline-flex items-center gap-2.5 transition-all duration-200 hover:bg-white/5 font-manrope">
            View Event Agenda
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;