import React from "react";

import PlutoLogo from "@/assets/home/pluto.jpeg";
import IzinhloliLogo from "@/assets/home/izinhlloi.jpeg";
import EsihleLogo from "@/assets/home/esihle.jpeg";
import AudiLogo from "@/assets/home/audi.png";
import AmajubaLogo from "@/assets/home/amajuba.png";

interface Partner {
  image: string;
  name: string;
  category: string;
}

const partners: Partner[] = [
  {
    image: PlutoLogo,
    name: "Pluto",
    category: "Technology Partner",
  },
  {
    image: IzinhloliLogo,
    name: "Izinhloli Security Services",
    category: "Security Partner",
  },
  {
    image: EsihleLogo,
    name: "Esihle Networks Co.",
    category: "Medical Consulting",
  },
  {
    image: AudiLogo,
    name: "Audi",
    category: "Automotive Partner",
  },
  {
    image: AmajubaLogo,
    name: "Amajuba District Municipality",
    category: "Government Partner",
  },
];

const PartnerCard: React.FC<{ partner: Partner }> = ({ partner }) => (
  <div
    className="flex items-center gap-4 flex-shrink-0 rounded-[20px] px-5 py-6 backdrop-blur-[12px]"
    style={{
      width: "320px",
      background:
        "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
      border: "1px solid rgba(212,175,55,0.3)",
      boxShadow:
        "0 0 40px rgba(212,175,55,0.1), 0 20px 60px rgba(0,0,0,0.4)",
    }}
  >
    {/* Logo */}
    <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center overflow-hidden flex-shrink-0 p-2">
      <img
        src={partner.image}
        alt={partner.name}
        className="w-full h-full object-contain"
      />
    </div>

    {/* Content */}
    <div className="min-w-0">
      <div className="text-base font-bold text-white truncate">
        {partner.name}
      </div>

      <div className="text-sm text-white/50 truncate">
        {partner.category}
      </div>
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
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
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

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-[11px] font-bold tracking-[0.25em] uppercase mb-3.5 text-[#D4AF37]/70">
            Supporting BRT150
          </div>

          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold text-white tracking-[-0.02em]">
            Partners & Sponsors
          </h2>

          <p className="text-[15px] text-white/40 max-w-[520px] mx-auto mt-4 leading-relaxed">
            Proudly supported by leading organisations who share our vision of
            connecting Africa's business ecosystem.
          </p>
        </div>

        {/* Marquee */}
        <div
          className="partners-marquee-wrap relative"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="partners-marquee-track flex gap-6 w-max">
            {[...partners, ...partners].map((partner, index) => (
              <PartnerCard
                key={`${partner.name}-${index}`}
                partner={partner}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSponsors;
