import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from "react-router-dom";
import Logo from "@/assets/home/logo.png";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md border-b border-transparent transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 h-[68px] flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src={Logo}
            alt="The Black Roundtable" 
            className="h-10 w-auto object-contain"
          />
        </div>
        <div className="hidden md:flex items-center gap-8">
          {['About', 'Speakers', 'Agenda', 'FAQ'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-white/55 text-[13px] font-semibold no-underline tracking-[0.04em] hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
<Link
  to="/onboarding"
  className="bg-gradient-to-r from-[#d4af37] to-[#f2ca46] text-black font-extrabold text-sm tracking-[0.04em] rounded-xl px-8 py-[14px] inline-flex items-center gap-2.5 transition-all duration-200 hover:shadow-lg hover:shadow-[#d4af37]/20 font-manrope"
>
  Reserve Your Spot <ArrowRight size={17} />
</Link>
      </div>
    </nav>
  );
};

export default Navigation;