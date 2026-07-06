import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// Define the FAQ item type
interface FAQItem {
  question: string;
  answer: string;
}

// Define the props type
interface FAQProps {
  faqs: FAQItem[];
}

const FAQ: React.FC<FAQProps> = ({ faqs }) => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number): void => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <section id="faq" className="py-[100px_24px] bg-black mobilepad">
      <div className="max-w-[780px] mx-auto">
        <div className="text-center mb-16">
          <div className="text-[11px] font-bold tracking-[0.25em] text-[#d4af37]/70 uppercase mb-[14px]">
            Common Questions
          </div>
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold text-white tracking-[-0.02em]">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="flex flex-col gap-3">
          {faqs.map((faq: FAQItem, idx: number) => (
            <div 
              key={idx} 
              className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.3)] overflow-hidden transition-all duration-300 hover:border-[#d4af37]/20"
            >
              <button 
                onClick={() => toggleFaq(idx)}
                className="w-full py-[22px] px-7 flex items-center justify-between gap-4 bg-transparent border-none cursor-pointer text-left"
              >
                <span className="text-[15px] font-bold text-white flex-1">
                  {faq.question}
                </span>
                <div className={`transform transition-transform duration-300 flex-shrink-0 ${expandedFaq === idx ? 'rotate-180' : ''}`}>
                  <ChevronDown size={18} className="text-white/30" />
                </div>
              </button>
              {expandedFaq === idx && (
                <div className="px-7 pb-6 text-sm text-white/50 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;