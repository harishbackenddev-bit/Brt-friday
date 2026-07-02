// components/auth/TicketStep.tsx
import React from "react";
import { Ticket, Calendar, MapPin, Users, Download, Share2, CheckCircle, Crown } from "lucide-react";

interface TicketStepProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  selectedPlan: "full" | "partial" | null;
}

const TicketStep: React.FC<TicketStepProps> = ({ formData, selectedPlan }) => {
  const fullName = `${formData.firstName} ${formData.lastName}`.trim() || 'Attendee';

  return (
    <div className="space-y-6 text-center">
      <div className="mb-8">
        <div className="text-[10px] font-bold uppercase tracking-[0.25em] mb-3 text-[#C9A227]">Step 5 of 5</div>
        
        <div className="relative w-24 h-24 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full animate-ping bg-[#C9A227]/20" />
          <div className="relative w-24 h-24 rounded-full flex items-center justify-center bg-gradient-to-r from-[#C9A227] to-[#DFBA3A]">
            <CheckCircle className="w-12 h-12 text-[#050505]" />
          </div>
        </div>

        <h1 className="text-white font-bold text-3xl mb-3">You're In! 🎉</h1>
        <p className="text-sm font-medium max-w-xs mx-auto leading-relaxed text-white/40">
          Your spot at BRT150 Demo Day is confirmed. We can't wait to see you there!
        </p>
      </div>

      {/* Digital Ticket */}
      <div className="rounded-2xl p-6 text-left relative overflow-hidden bg-gradient-to-br from-[#151010] to-[#0E0909] border border-[#C9A227]/25 shadow-[0_0_40px_rgba(201,162,39,0.08)]">
        <div className="absolute top-0 right-0 px-4 py-1 text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-[#C9A227] to-[#DFBA3A] text-[#050505] rotate-45 translate-x-[30px] -translate-y-[10px] w-[120px] text-center">
          Confirmed
        </div>

        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Crown className="w-4 h-4 text-[#C9A227]" />
              <span className="text-xs font-bold text-[#C9A227]">BRT150</span>
            </div>
            <h3 className="text-white font-bold text-lg">Demo Day 2026</h3>
          </div>
          <Ticket className="w-8 h-8 text-[#C9A227]/30" />
        </div>

        <div className="space-y-3 pt-3 border-t border-white/5">
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-white/20" />
            <span className="text-sm text-white/60">21 November 2026</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-white/20" />
            <span className="text-sm text-white/60">Ethereal, Newcastle, KwaZulu-Natal</span>
          </div>
          <div className="flex items-center gap-3">
            <Users className="w-4 h-4 text-white/20" />
            <span className="text-sm text-white/60">{fullName}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 p-3 rounded-xl bg-[#22C55E]/5 border border-[#22C55E]/15">
          <span className="text-xs font-medium text-white/40">Payment Status</span>
          <span className="text-xs font-bold text-[#22C55E]">
            {selectedPlan === "full" ? 'Paid in Full' : 'Deposit Paid'}
          </span>
        </div>

        <div className="flex items-center justify-center p-3 mt-4 rounded-xl bg-white/5 border border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg flex items-center justify-center bg-white/5">
              <span className="text-2xl">⬛</span>
            </div>
            <div className="text-left">
              <p className="text-[10px] font-medium text-white/20">TICKET #</p>
              <p className="text-sm font-mono text-white/50">BRT150-2026-{String(Math.floor(Math.random() * 1000)).padStart(3, '0')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all hover:bg-white/5 bg-white/5 border border-white/5 text-white/60">
          <Download className="w-4 h-4" />
          Download Ticket
        </button>
        <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all hover:bg-white/5 bg-white/5 border border-white/5 text-white/60">
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>

      <p className="text-xs text-white/20">
        A confirmation email has been sent to {formData.email}
      </p>
    </div>
  );
};

export default TicketStep;