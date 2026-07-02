import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from "react-router-dom";
const CTA = () => {
  return (
    <section className="py-[120px_24px] bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(212,175,55,0.07)_0%,transparent_65%)] rounded-full pointer-events-none"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent"></div>
      <div className="max-w-[700px] mx-auto text-center relative">
        <div className="text-[11px] font-bold tracking-[0.25em] text-[#d4af37]/70 uppercase mb-5">Seats Are Limited</div>
        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black text-white tracking-[-0.02em] mb-[18px] leading-[1.1]">
          Ready to Join <span className="bg-gradient-to-r from-[#d4af37] to-[#f2ca46] text-transparent bg-clip-text">BRT150?</span>
        </h2>
        <p className="text-[17px] font-normal text-white/50 leading-[1.8] mb-[52px]">
          Become part of an exclusive network of entrepreneurs, investors, and professionals. 150 seats available — once they're gone, they're gone.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
<Link
  to="/onboarding"
  className="bg-gradient-to-r from-[#d4af37] to-[#f2ca46] text-black font-extrabold text-sm tracking-[0.04em] rounded-xl px-8 py-[14px] inline-flex items-center gap-2.5 transition-all duration-200 hover:shadow-lg hover:shadow-[#d4af37]/20 font-manrope"
>
  Reserve Your Spot <ArrowRight size={17} />
</Link>
          <button className="bg-transparent text-white/75 font-extrabold text-sm tracking-[0.04em] rounded-xl px-8 py-[14px] border border-[#d4af37]/55 cursor-pointer inline-flex items-center gap-2.5 transition-all duration-200 hover:bg-white/5 font-manrope">
            Contact Our Team
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;