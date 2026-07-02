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
  const fullName = `${formData.firstName} ${formData.lastName}`;

  return (
    <div className="space-y-6 text-center">
      <div className="mb-8">
        <div className="text-[10px] font-bold uppercase tracking-[0.25em] mb-3" style={{ color: '#C9A227' }}>
          Step 5 of 5
        </div>
        
        {/* Success Animation */}
        <div className="relative w-24 h-24 mx-auto mb-4">
          <div 
            className="absolute inset-0 rounded-full animate-ping"
            style={{ background: 'rgba(201, 162, 39, 0.2)' }}
          />
          <div 
            className="relative w-24 h-24 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #C9A227, #DFBA3A)' }}
          >
            <CheckCircle className="w-12 h-12" style={{ color: '#050505' }} />
          </div>
        </div>

        <h1 className="text-white font-bold text-3xl mb-3">You're In! 🎉</h1>
        <p className="text-sm font-medium max-w-xs mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.38)' }}>
          Your spot at BRT150 Demo Day is confirmed. We can't wait to see you there!
        </p>
      </div>

      {/* Digital Ticket */}
      <div 
        className="rounded-2xl p-6 text-left relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #151010 0%, #0E0909 100%)',
          border: '1px solid rgba(201, 162, 39, 0.25)',
          boxShadow: '0 0 40px rgba(201, 162, 39, 0.08)',
        }}
      >
        {/* Ticket Ribbon */}
        <div 
          className="absolute top-0 right-0 px-4 py-1 text-[10px] font-bold uppercase tracking-wider"
          style={{
            background: 'linear-gradient(90deg, #C9A227, #DFBA3A)',
            color: '#050505',
            transform: 'rotate(45deg) translate(30px, -10px)',
            width: '120px',
            textAlign: 'center',
          }}
        >
          Confirmed
        </div>

        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Crown className="w-4 h-4" style={{ color: '#C9A227' }} />
              <span className="text-xs font-bold" style={{ color: '#C9A227' }}>BRT150</span>
            </div>
            <h3 className="text-white font-bold text-lg">Demo Day 2026</h3>
          </div>
          <Ticket className="w-8 h-8" style={{ color: 'rgba(201, 162, 39, 0.3)' }} />
        </div>

        <div className="space-y-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.2)' }} />
            <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>21 November 2026</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.2)' }} />
            <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>Ethereal, Newcastle, KwaZulu-Natal</span>
          </div>
          <div className="flex items-center gap-3">
            <Users className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.2)' }} />
            <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{fullName || 'Attendee'}</span>
          </div>
        </div>

        {/* Payment Status */}
        <div 
          className="flex items-center justify-between mt-4 p-3 rounded-xl"
          style={{
            background: 'rgba(34, 197, 94, 0.05)',
            border: '1px solid rgba(34, 197, 94, 0.15)',
          }}
        >
          <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>Payment Status</span>
          <span className="text-xs font-bold" style={{ color: '#22C55E' }}>
            {selectedPlan === "full" ? 'Paid in Full' : 'Deposit Paid'}
          </span>
        </div>

        {/* QR Code Placeholder */}
        <div 
          className="flex items-center justify-center p-3 mt-4 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <span className="text-2xl">⬛</span>
            </div>
            <div className="text-left">
              <p className="text-[10px] font-medium" style={{ color: 'rgba(255,255,255,0.2)' }}>TICKET #</p>
              <p className="text-sm font-mono" style={{ color: 'rgba(255,255,255,0.5)' }}>BRT150-2026-{String(Math.floor(Math.random() * 1000)).padStart(3, '0')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-center">
        <button 
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all hover:bg-white/5"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.06)',
            color: 'rgba(255,255,255,0.6)',
          }}
        >
          <Download className="w-4 h-4" />
          Download Ticket
        </button>
        <button 
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all hover:bg-white/5"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.06)',
            color: 'rgba(255,255,255,0.6)',
          }}
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>

      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.15)' }}>
        A confirmation email has been sent to {formData.email}
      </p>
    </div>
  );
};

export default TicketStep;