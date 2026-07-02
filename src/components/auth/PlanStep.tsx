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
      badgeBg: "bg-[#22C55E]/15",
      badgeBorder: "border-[#22C55E]/25",
      badgeText: "text-[#22C55E]",
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
      badgeBg: "bg-[#C9A227]/10",
      badgeBorder: "border-[#C9A227]/25",
      badgeText: "text-[#C9A227]",
      price: "R1,018",
      priceLabel: "today",
      deposit: "R1,018",
      balance: "R1,017",
      chargeDate: "25 June 2026",
      description: "Deposit now · balance later",
    },
  ];

  const features = [
    "Full Event Access",
    "All Keynote & Demo Sessions",
    "Networking Dinners",
    "Digital Ticket",
    "Post-Event Report",
    "1:1 Meeting Bookings",
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="text-[10px] font-bold uppercase tracking-[0.25em] mb-3 text-[#C9A227]">
          Step 3 of 5
        </div>
        <h1 className="text-white font-bold text-3xl mb-3">Choose How You'd Like to Pay</h1>
        <p className="text-sm font-medium max-w-xs mx-auto leading-relaxed text-white/40">
          One seat. One pass. Pick the payment option that works for you.
        </p>
      </div>

      {/* Event Card */}
      <div className="rounded-2xl p-7 mb-6 bg-gradient-to-br from-[#151010] to-[#0E0909] border border-[#C9A227]/35 shadow-[0_0_40px_rgba(201,162,39,0.12),0_20px_60px_rgba(0,0,0,0.5)]">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5 text-[#C9A227]">
              BRT150 Networking Event - 21st November 2026
            </div>
            <h2 className="text-white font-bold text-xl">Purchase tickets for the BRT150 2026 Event</h2>
          </div>
          <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-[#C9A227]/15">
            <Crown className="w-5 h-5 text-[#C9A227]" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 mb-6">
          {features.map((feature) => (
            <div key={feature} className="flex items-center gap-2.5">
              <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 bg-[#C9A227]/20">
                <Check className="w-[9px] h-[9px] stroke-[3] text-[#C9A227]" />
              </div>
              <span className="text-xs font-medium text-white/60">{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex items-end gap-2 pt-5 border-t border-[#C9A227]/15">
          <span className="font-black text-[38px] leading-none tracking-[-0.03em] bg-gradient-to-r from-[#C9A227] to-[#DFBA3A] bg-clip-text text-transparent">
            R2,000
          </span>
          <span className="text-sm font-bold mb-1 text-white/30">ZAR</span>
        </div>
      </div>

      {/* Plan Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {plans.map((plan) => (
          <button
            key={plan.id}
            onClick={() => setSelectedPlan(plan.id)}
            className={`p-6 rounded-2xl text-left transition-all duration-200 ${
              selectedPlan === plan.id
                ? 'bg-gradient-to-br from-[#C9A227]/15 to-[#C9A227]/5 border border-[#C9A227] shadow-[0_0_30px_rgba(201,162,39,0.1)] scale-[1.02]'
                : 'bg-gradient-to-br from-[#151010] to-[#0E0909] border border-white/5'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-bold text-base">{plan.title}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${plan.badgeBg} ${plan.badgeBorder} ${plan.badgeText}`}>
                    {plan.badge}
                  </span>
                </div>
                <p className="text-xs font-medium text-white/30">{plan.description}</p>
              </div>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                selectedPlan === plan.id ? 'bg-[#C9A227]' : 'border border-white/20'
              }`}>
                {selectedPlan === plan.id && <Check className="w-3 h-3 stroke-[3] text-[#050505]" />}
              </div>
            </div>

            <div className="mb-4 pb-4 border-b border-white/5">
              <span className="font-black text-[28px] text-white tracking-[-0.02em]">{plan.price}</span>
              <span className="text-xs font-semibold ml-1.5 text-white/30">{plan.priceLabel}</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-[11px] font-medium text-white/30">Amount Due Today</span>
                <span className="text-[11px] font-bold text-white/50">{plan.deposit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[11px] font-medium text-white/30">Remaining Balance</span>
                <span className="text-[11px] font-bold text-white/50">{plan.balance}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[11px] font-medium text-white/30">Auto-Charge Date</span>
                <span className="text-[11px] font-bold text-white/50">{plan.chargeDate}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <p className="text-center text-xs mt-4 text-white/20">
        Partial payment ticket issued only after full amount is received.
      </p>
    </div>
  );
};

export default PlanStep;