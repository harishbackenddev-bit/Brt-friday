import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

interface StatItem {
  label: string;
  value: number;
  suffix?: string;
}

interface StatsProps {
  stats?: StatItem[];
}

const Stats: React.FC<StatsProps> = ({ 
  stats = [
    { label: 'Attendees', value: 150 },
    { label: 'Investors', value: 25 },
    { label: 'Entrepreneurs', value: 85 },
    { label: 'Professionals', value: 40 }
  ]
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="stats"
      ref={ref}
      className="py-[100px_24px] bg-gradient-to-br from-black via-[#d4af37]/10 to-black border-y border-[#d4af37]/10 mobilepad"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="transform transition-all duration-300 hover:scale-105">
              <div className="text-[clamp(2.5rem,5vw,4rem)] font-black tracking-[-0.03em] leading-none mb-2 bg-gradient-to-r from-[#d4af37] to-[#f2ca46] text-transparent bg-clip-text">
                {inView ? (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={2.5}
                    separator=","
                    suffix={stat.suffix || '+'}
                  />
                ) : (
                  `0${stat.suffix || '+'}`
                )}
              </div>
              <div className="text-[13px] font-semibold text-white/45 tracking-[0.08em] uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;