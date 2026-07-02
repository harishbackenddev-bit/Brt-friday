// components/auth/PlanStep.tsx
import React from "react";
import { Crown, Check } from "lucide-react";

interface PlanStepProps {
  selectedPlan: "full" | "partial" | null;
  setSelectedPlan: (plan: "full" | "partial") => void;
}

const PlanStep: React.FC<PlanStepProps> = ({ selectedPlan, setSelectedPlan }) => {
  const plans = [
    {
      id: "full" as const,
      title: "Full Payment",
      badge: "Save on fees",
      badgeColor: "rgba(34, 197, 94, 0.12)",
      badgeBorder: "rgba(34, 197, 94, 0.25)",
      badgeText: "#22C55E",
      price: "R2,035",
      priceLabel: "today",
      deposit: "R2,035",
      balance: "R0",
      chargeDate: "None",
      description: "Single payment today",
    },
    {
      id: "partial" as const,
      title: "Partial Payment",
      badge: "Flexible",
      badgeColor: "rgba(201, 162, 39, 0.1)",
      badgeBorder: "rgba(201, 162, 39, 0.25)",
      badgeText: "#C9A227",
      price: "R1,018",
      priceLabel: "today",
      deposit: "R1,018",
      balance: "R1,017",
      chargeDate: "25 June 2026",
      description: "Deposit now · balance later",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="text-[10px] font-bold uppercase tracking-[0.25em] mb-3" style={{ color: '#C9A227' }}>
          Step 3 of 5
        </div>
        <h1 className="text-white font-bold text-3xl mb-3">Choose How You'd Like to Pay</h1>
        <p className="text-sm font-medium max-w-xs mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.38)' }}>
          One seat. One pass. Pick the payment option that works for you.
        </p>
      </div>

      {/* Event Card */}
      <div 
        className="rounded-2xl p-7 mb-6"
        style={{
          background: 'linear-gradient(135deg, #151010 0%, #0E0909 100%)',
          border: '1px solid rgba(201, 162, 39, 0.35)',
          boxShadow: '0 0 40px rgba(201, 162, 39, 0.12), 0 20px 60px rgba(0,0,0,0.5)',
        }}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5" style={{ color: '#C9A227' }}>
              BRT150 Networking Event - 21st November 2026
            </div>
            <h2 className="text-white font-bold text-xl">Purchase tickets for the BRT150 2026 Event</h2>
          </div>
          <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'rgba(201, 162, 39, 0.15)' }}>
            <Crown className="w-5 h-5" style={{ color: '#C9A227' }} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 mb-6">
          {["Full Event Access", "All Keynote & Demo Sessions", "Networking Dinners", "Digital Ticket", "Post-Event Report", "1:1 Meeting Bookings"].map((feature) => (
            <div key={feature} className="flex items-center gap-2.5">
              <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(201, 162, 39, 0.18)' }}>
                <Check className="w-[9px] h-[9px]" strokeWidth={3} style={{ color: '#C9A227' }} />
              </div>
              <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex items-end gap-2 pt-5" style={{ borderTop: '1px solid rgba(201, 162, 39, 0.15)' }}>
          <span 
            className="font-black"
            style={{
              fontSize: '38px',
              background: 'linear-gradient(90deg, #C9A227, #DFBA3A)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}
          >
            R2,000
          </span>
          <span className="text-sm font-bold mb-1" style={{ color: 'rgba(255,255,255,0.3)' }}>ZAR</span>
        </div>
      </div>

      {/* Plan Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {plans.map((plan) => (
          <button
            key={plan.id}
            onClick={() => setSelectedPlan(plan.id)}
            className="p-6 rounded-2xl text-left transition-all duration-200"
            style={{
              background: selectedPlan === plan.id 
                ? 'linear-gradient(135deg, rgba(201, 162, 39, 0.15), rgba(201, 162, 39, 0.05))'
                : 'linear-gradient(135deg, #151010 0%, #0E0909 100%)',
              border: selectedPlan === plan.id 
                ? '1px solid #C9A227'
                : '1px solid rgba(255,255,255,0.06)',
              boxShadow: selectedPlan === plan.id 
                ? '0 0 30px rgba(201, 162, 39, 0.1)'
                : 'none',
              transform: selectedPlan === plan.id ? 'scale(1.02)' : 'none',
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-bold text-base">{plan.title}</span>
                  <span 
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{
                      background: plan.badgeColor,
                      border: `1px solid ${plan.badgeBorder}`,
                      color: plan.badgeText,
                    }}
                  >
                    {plan.badge}
                  </span>
                </div>
                <p className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  {plan.description}
                </p>
              </div>
              <div 
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{
                  background: selectedPlan === plan.id ? '#C9A227' : 'transparent',
                  border: selectedPlan === plan.id ? 'none' : '1px solid rgba(255,255,255,0.18)',
                }}
              >
                {selectedPlan === plan.id && <Check className="w-3 h-3" strokeWidth={3} style={{ color: '#050505' }} />}
              </div>
            </div>

            <div className="mb-4 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <span 
                className="font-black"
                style={{
                  fontSize: '28px',
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                }}
              >
                {plan.price}
              </span>
              <span className="text-xs font-semibold ml-1.5" style={{ color: 'rgba(255,255,255,0.28)' }}>
                {plan.priceLabel}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.28)' }}>
                  Amount Due Today
                </span>
                <span className="text-[11px] font-bold" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {plan.deposit}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.28)' }}>
                  Remaining Balance
                </span>
                <span className="text-[11px] font-bold" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {plan.balance}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.28)' }}>
                  Auto-Charge Date
                </span>
                <span className="text-[11px] font-bold" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {plan.chargeDate}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <p className="text-center text-xs mt-4" style={{ color: 'rgba(255,255,255,0.18)' }}>
        Partial payment ticket issued only after full amount is received.
      </p>
    </div>
  );
};

export default PlanStep;