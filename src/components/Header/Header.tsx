import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Logo from "@/assets/home/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navItems = ['About', 'Speakers', 'Agenda', 'FAQ'];

  return (
    <>
      {/* Main Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-black/90 backdrop-blur-md border-b border-white/10' 
            : 'bg-black/70 backdrop-blur-md border-b border-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-[68px] flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <img 
              src={Logo}
              alt="The Black Roundtable" 
              className="h-10 w-auto object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-white/55 text-[13px] font-semibold no-underline tracking-[0.04em] hover:text-white transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <Link 
          to="/onboarding"
          className="hidden md:inline-flex bg-gradient-to-r from-[#d4af37] to-[#f2ca46] text-black font-extrabold text-sm tracking-[0.04em] rounded-xl px-8 py-[14px] border-none cursor-pointer items-center gap-2.5 transition-all duration-200 hover:shadow-lg hover:shadow-[#d4af37]/20 hover:scale-[1.02] font-manrope">
            Reserve Your Spot
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2 hover:text-[#d4af37] transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-lg transition-all duration-300 md:hidden ${
          isMobileMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
        style={{ top: '68px' }}
      >
        <div className="flex flex-col items-center justify-start pt-12 px-6 space-y-8">
          {navItems.map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white/70 text-xl font-semibold no-underline tracking-[0.04em] hover:text-white transition-colors duration-200"
            >
              {item}
            </a>
          ))}
          <Link 
            to="/onboarding"
            className="mt-4 bg-gradient-to-r from-[#d4af37] to-[#f2ca46] text-black font-extrabold text-base tracking-[0.04em] rounded-xl px-10 py-4 border-none cursor-pointer w-full max-w-[280px] transition-all duration-200 hover:shadow-lg hover:shadow-[#d4af37]/20"
          >
            Reserve Your Spot
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;