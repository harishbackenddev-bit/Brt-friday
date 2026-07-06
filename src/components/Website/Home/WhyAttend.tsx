import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from "react-router-dom";
import WhYattend from "@/assets/home/whynew.jpeg";

const WhyAttend = () => {
  const benefits = [
    'Access to a curated business ecosystem',
    'High-value networking opportunities',
    'Strategic introductions',
    'Founder-investor engagement',
    'Exclusive industry conversations',
    'Partnership opportunities',
    'Thought leadership discussions'
  ];

  return (
    <section className="py-[100px_24px] bg-black mobilepad" id="whybrt">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="relative rounded-2xl overflow-hidden object-fit">
          <img 
            src={WhYattend}
            alt="Professional business networking" 
            className="w-full h-[580px] object-cover rounded-2xl"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-[#d4af37]/10 rounded-2xl"></div> */}
          {/* <div className="absolute bottom-7 left-7 right-7">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 px-6 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
              <div className="text-[11px] font-bold tracking-[0.2em] text-[#d4af37] uppercase mb-1.5">Exclusive Event</div>
              <div className="text-base font-bold text-white">150 Curated Attendees · 21 Nov 2026</div>
            </div>
          </div> */}
        </div>
        <div>
          <div className="text-[11px] font-bold tracking-[0.25em] text-[#d4af37]/70 uppercase mb-4">The BRT Difference</div>
          <h2 className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-extrabold text-white mb-8 leading-[1.2] tracking-[-0.02em]">
            Why Attend <span className="bg-gradient-to-r from-[#d4af37] to-[#f2ca46] text-transparent bg-clip-text">BRT150?</span>
          </h2>
          <div className="flex flex-col gap-3.5 mb-11">
            {benefits.map((text, idx) => (
              <div key={idx} className="flex items-center gap-3.5">
                <div className="w-6 h-6 rounded-full bg-[#d4af37]/25 border border-[#d4af37]/50 flex items-center justify-center flex-shrink-0">
                  <Check size={11} strokeWidth={3} className="text-[#d4af37]" />
                </div>
                <span className="text-sm font-medium text-white/70">{text}</span>
              </div>
            ))}
          </div>
<Link
  to="/onboarding"
  className="bg-gradient-to-r from-[#d4af37] to-[#f2ca46] text-black font-extrabold text-sm tracking-[0.04em] rounded-xl px-8 py-[14px] inline-flex items-center gap-2.5 transition-all duration-200 hover:shadow-lg hover:shadow-[#d4af37]/20 font-manrope"
>
  Reserve Your Spot <ArrowRight size={17} />
</Link>
        </div>
      </div>
    </section>
  );
};

export default WhyAttend;