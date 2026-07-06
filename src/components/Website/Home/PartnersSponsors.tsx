import React from "react";

interface Partner {
  initials: string;
  name: string;
  category: string;
}

const partners: Partner[] = [
  { initials: "SB", name: "Standard Bank", category: "Financial Services" },
  { initials: "INV", name: "Investec", category: "Investment Banking" },
  { initials: "VM", name: "Vodacom", category: "Telecommunications" },
  { initials: "DSC", name: "Discovery", category: "Insurance & Wellness" },
];

const sponsors: Partner[] = [
  { initials: "OM", name: "Old Mutual", category: "Asset Management" },
  { initials: "FNB", name: "FNB", category: "Banking" },
  { initials: "AB", name: "Absa", category: "Banking" },
  { initials: "LIB", name: "Liberty", category: "Insurance" },
  { initials: "MTN", name: "MTN Group", category: "Telecommunications" },
];

const PartnerCard: React.FC<{ partner: Partner }> = ({ partner }) => (
  <div
    className="flex items-center gap-4 flex-shrink-0 rounded-[20px] px-5 py-6 backdrop-blur-[12px]"
    style={{
      width: "280px",
      background:
        "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
      border: "1px solid rgba(212,175,55,0.3)",
      boxShadow:
        "0 0 40px rgba(212,175,55,0.1), 0 20px 60px rgba(0,0,0,0.4)",
    }}
  >
    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
      style={{
        background: "linear-gradient(135deg, #D4AF37, #F2CA46)",
      }}
    >
      <span className="font-black text-xs tracking-[0.04em] text-[#050505]">
        {partner.initials}
      </span>
    </div>
    <div className="min-w-0">
      <div className="text-sm font-extrabold text-white mb-0.5 truncate">{partner.name}</div>
      <div className="text-[11px] font-medium text-white/38 truncate">{partner.category}</div>
    </div>
  </div>
);

const SponsorCard: React.FC<{ sponsor: Partner }> = ({ sponsor }) => (
  <div
    className="flex flex-col items-center gap-2.5 text-center rounded-[20px] px-4 py-5 backdrop-blur-[12px]"
    style={{
      background:
        "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
      border: "1px solid rgba(255,255,255,0.07)",
      boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    }}
  >
    <div
      className="w-11 h-11 rounded-[11px] flex items-center justify-center"
      style={{
        background: "rgba(212,175,55,0.1)",
        border: "1px solid rgba(212,175,55,0.2)",
      }}
    >
      <span className="font-black text-[11px] tracking-[0.04em] text-[#D4AF37]">
        {sponsor.initials}
      </span>
    </div>
    <div>
      <div className="text-xs font-bold text-white/75 mb-0.5">{sponsor.name}</div>
      <div className="text-[10px] font-medium text-white/32">{sponsor.category}</div>
    </div>
  </div>
);

const PartnersSponsors: React.FC = () => {
  return (
    <section
      id="partners-sponsors"
      className="py-24 px-6 overflow-hidden mobilepad"
      style={{ background: "#0a0a0a" }}
    >
      <style>{`
        @keyframes partners-marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .partners-marquee-track {
          animation: partners-marquee-scroll 28s linear infinite;
        }
        .partners-marquee-wrap:hover .partners-marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .partners-marquee-track {
            animation: none;
          }
        }
        @media (max-width: 640px) {
          .partners-marquee-track {
            animation-duration: 18s;
          }
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-[11px] font-bold tracking-[0.25em] uppercase mb-3.5 text-[#D4AF37]/70">
            Supporting BRT150
          </div>
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold text-white tracking-[-0.02em]">
            Partners &amp; Sponsors
          </h2>
          <p className="text-[15px] font-normal text-white/40 max-w-[480px] mx-auto mt-4 leading-relaxed">
            Proudly supported by leading organisations who share our vision of connecting Africa's business ecosystem.
          </p>
        </div>

        {/* Partners — sliding marquee */}
        <div className="mb-12">
          <div className="text-[10px] font-bold tracking-[0.22em] uppercase text-center mb-6 text-[#D4AF37]/55">
            Partners
          </div>

          <div
            className="partners-marquee-wrap relative"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }}
          >
            <div className="partners-marquee-track flex gap-5 w-max">
              {/* Render the list twice, back to back, for a seamless loop */}
              {[...partners, ...partners].map((partner, idx) => (
                <PartnerCard key={`${partner.name}-${idx}`} partner={partner} />
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-sm font-medium text-white/40 mb-5">
            Interested in partnering or sponsoring BRT150 Black Carpet Gala?
          </p>
          <button
            className="inline-flex items-center gap-2.5 font-extrabold text-sm tracking-[0.04em] rounded-xl px-8 py-3.5 transition-colors duration-200 hover:bg-white/5"
            style={{
              background: "transparent",
              color: "rgba(255,255,255,0.75)",
              border: "1px solid rgba(212,175,55,0.35)",
              fontFamily: "Manrope, sans-serif",
            }}
          >
            Become a Partner or Sponsor
          </button>
        </div>
      </div>
    </section>
  );
};

export default PartnersSponsors;
