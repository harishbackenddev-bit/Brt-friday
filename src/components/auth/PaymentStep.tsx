// components/auth/PaymentStep.tsx
import React from "react";
import { CreditCard, Smartphone, Building, Lock, Shield, Check, CircleCheckBig, Crown, Apple } from "lucide-react";

interface PaymentStepProps {
  selectedPlan: "full" | "partial" | null;
  paymentMethod: string | null;
  setPaymentMethod: (method: string) => void;
  acceptedTerms: boolean;
  setAcceptedTerms: (accepted: boolean) => void;
  error?: string | null;
  loading?: boolean;
  onPay?: () => void;
  onBack?: () => void;
}

const PaymentStep: React.FC<PaymentStepProps> = ({
  selectedPlan,
  paymentMethod,
  setPaymentMethod,
  acceptedTerms,
  setAcceptedTerms,
  error,
  loading,
  onPay,
  onBack,
}) => {
  const paymentMethods = [
    { id: "card", label: "Card", icon: CreditCard, available: true, code: "cc" },
    { id: "apple", label: "Apple Pay", icon: Apple, available: true, code: "ap" },
    { id: "google", label: "Google Pay", icon: Smartphone, available: true, code: "gp" },
    { id: "bank", label: "Bank Transfer", icon: Building, available: true, code: "ef" },
  ];

  const totalAmount = selectedPlan === "full" ? "R2,040" : "R1,018";

  const getSelectedMethodCode = () => {
    const method = paymentMethods.find(m => m.id === paymentMethod);
    return method?.code || 'cc';
  };

  const handlePayClick = () => {
    if (!loading && acceptedTerms && paymentMethod) {
      onPay?.();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="text-[10px] font-bold uppercase tracking-[0.25em] mb-3 text-[#C9A227]">Step 4 of 5</div>
        <h1 className="text-white font-bold text-3xl mb-3">Payment</h1>
        <p className="text-sm font-medium max-w-xs mx-auto leading-relaxed text-white/40">
          Complete your payment to secure your spot
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[440px_1fr] gap-8">
        {/* Order Summary Card - Left */}
        <div className="flex flex-col gap-5">
          <div className="rounded-2xl p-7 bg-gradient-to-br from-[#151010] to-[#0E0909] border border-white/6 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6 text-[#C9A227]">Order Summary</div>
            
            <div className="flex items-center gap-4 p-4 rounded-xl mb-6 bg-white/5 border border-white/6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#C9A227]/15">
                <Crown className="w-5 h-5 text-[#C9A227]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-bold text-sm truncate">Purchase tickets for the BRT150 2026 Event</div>
                <div className="text-xs font-medium mt-0.5 text-white/35 truncate">BRT150 Demo Day · Lagos, 2026</div>
              </div>
              <div className="ml-auto font-bold text-base text-white flex-shrink-0">R2,000</div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-white/38">Subtotal</span>
                <span className="text-sm font-semibold text-white/60">R2,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-white/38">Processing Fee</span>
                <span className="text-sm font-semibold text-white/60">R40</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-5 border-t border-white/7">
              <span className="text-white font-bold text-lg">Total</span>
              <span className="font-bold text-2xl bg-gradient-to-r from-[#C9A227] to-[#DFBA3A] bg-clip-text text-transparent tracking-[-0.02em]">
                R2,040
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="flex items-center gap-2 flex-1 justify-center">
              <Shield className="w-3.5 h-3.5 text-[#C9A227]/60" />
              <span className="text-[10px] font-semibold text-white/25">SSL Encrypted</span>
            </div>
            <div className="flex items-center gap-2 flex-1 justify-center">
              <Lock className="w-3.5 h-3.5 text-[#C9A227]/60" />
              <span className="text-[10px] font-semibold text-white/25">PCI DSS Secure</span>
            </div>
            <div className="flex items-center gap-2 flex-1 justify-center">
              <CircleCheckBig className="w-3.5 h-3.5 text-[#C9A227]/60" />
              <span className="text-[10px] font-semibold text-white/25">Verified Payment</span>
            </div>
          </div>
        </div>

        {/* Secure Payment Card - Right */}
        <div className="rounded-2xl p-8 bg-gradient-to-br from-[#151010] to-[#0E0909] border border-white/6 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] mb-7 text-[#C9A227]">Secure Payment</div>

          <div className="flex items-center justify-between p-3.5 rounded-xl mb-7 bg-[#C9A227]/7 border border-[#C9A227]/20">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#C9A227]">
                {selectedPlan === "full" ? "Full Payment" : "Partial Payment"}
              </div>
              <div className="text-xs font-medium mt-0.5 text-white/40">
                {selectedPlan === "full" ? "R2,040 due today" : `${totalAmount} due today`}
              </div>
            </div>
            <span className="font-black text-lg bg-gradient-to-r from-[#C9A227] to-[#DFBA3A] bg-clip-text text-transparent">
              {totalAmount}
            </span>
          </div>

          <div className="border-t border-white/5 mb-7"></div>

          <div className="text-[10px] font-bold uppercase tracking-[0.18em] mb-3 text-white/35">Payment Method</div>
          
          <div className="flex rounded-xl p-1 mb-7 gap-1 bg-[#0A0707] flex-wrap">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              const isSelected = paymentMethod === method.id;
              const isAvailable = method.available;

              return (
                <button
                  key={method.id}
                  onClick={() => isAvailable && setPaymentMethod(method.id)}
                  disabled={!isAvailable}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-bold transition-all duration-200 min-w-[80px] ${
                    isSelected && isAvailable
                      ? "bg-gradient-to-r from-[#C9A227] to-[#DFBA3A] text-[#050505]"
                      : "bg-transparent text-white/30"
                  } ${!isAvailable ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{method.label}</span>
                </button>
              );
            })}
          </div>

          {/* Payment Info Message */}
          <div className="mb-6 p-4 rounded-xl bg-[#C9A227]/5 border border-[#C9A227]/20 text-center">
            <div className="text-xs text-white/60 mb-2">
              You will be redirected to PayFast to complete your payment securely.
            </div>
            <div className="text-[10px] text-white/30">
              This is a secure payment processed by PayFast.
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-start gap-3 mb-6">
              <button
                onClick={() => setAcceptedTerms(!acceptedTerms)}
                className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                  acceptedTerms ? 'bg-[#C9A227]' : 'bg-white/5 border border-white/10'
                }`}
              >
                {acceptedTerms && <Check className="w-3 h-3 stroke-[3] text-[#050505]" />}
              </button>
              <label className="text-xs leading-relaxed cursor-pointer text-white/30">
                I agree to the <span className="text-[#C9A227]">Terms & Conditions</span> and <span className="text-[#C9A227]">Privacy Policy</span>. I understand that tickets are non-refundable.
              </label>
            </div>

            <button
              onClick={handlePayClick}
              disabled={loading || !acceptedTerms || !paymentMethod}
              className="inline-flex items-center justify-center gap-2.5 font-bold rounded-xl transition-all duration-200 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed w-full px-8 py-4 text-[15px] bg-gradient-to-r from-[#C9A227] to-[#DFBA3A] text-[#050505] shadow-[0_4px_24px_rgba(201,162,39,0.25)]"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin border-[#050505]" />
                  Processing...
                </>
              ) : (
                <>
                  {paymentMethod === "apple" && <Apple className="w-4 h-4" />}
                  {paymentMethod === "google" && <Smartphone className="w-4 h-4" />}
                  {paymentMethod === "card" && <Lock className="w-4 h-4" />}
                  Pay {totalAmount} {selectedPlan === "full" ? "in Full" : "Today"}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStep;
