// components/auth/PaymentStep.tsx
import React from "react";
import { CreditCard, Building, Smartphone, Check, Lock } from "lucide-react";

interface PaymentStepProps {
  selectedPlan: "full" | "partial" | null;
  paymentMethod: string | null;
  setPaymentMethod: (method: string) => void;
  acceptedTerms: boolean;
  setAcceptedTerms: (accepted: boolean) => void;
  cardDetails: {
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cvv: string;
  };
  handleCardChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
  loading?: boolean;
}

const PaymentStep: React.FC<PaymentStepProps> = ({
  selectedPlan,
  paymentMethod,
  setPaymentMethod,
  acceptedTerms,
  setAcceptedTerms,
  cardDetails,
  handleCardChange,
  error,
  loading,
}) => {
  const paymentMethods = [
    { id: "card", label: "Credit / Debit Card", icon: CreditCard, description: "Visa, Mastercard, Amex", available: true },
    { id: "bank", label: "Bank Transfer", icon: Building, description: "EFT / Wire Transfer", available: false },
    { id: "mobile", label: "Mobile Money", icon: Smartphone, description: "Pay via mobile wallet", available: false },
  ];

  const totalAmount = selectedPlan === "full" ? "R2,035" : "R1,018";
  const remainingBalance = selectedPlan === "full" ? "R0" : "R1,017";

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleaned;
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    let formattedValue = value;
    if (id === 'cardNumber') formattedValue = formatCardNumber(value);
    if (id === 'expiryDate') formattedValue = formatExpiry(value);
    const event = { ...e, target: { ...e.target, id, value: formattedValue } } as React.ChangeEvent<HTMLInputElement>;
    handleCardChange(event);
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

      {/* Payment Summary */}
      <div className="rounded-2xl p-4 mb-6 bg-[#C9A227]/5 border border-[#C9A227]/10">
        <div className="flex justify-between items-center">
          <span className="text-sm text-white/40">Total Due Today</span>
          <span className="text-white font-bold text-xl">{totalAmount}</span>
        </div>
        {selectedPlan === "partial" && (
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-white/20">Remaining balance: {remainingBalance} due 25 June 2026</span>
          </div>
        )}
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>
      )}

      {/* Payment Methods */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-white/60">Select Payment Method *</label>
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          const isSelected = paymentMethod === method.id;

          return (
            <button
              key={method.id}
              onClick={() => method.available && setPaymentMethod(method.id)}
              disabled={!method.available}
              className={`w-full p-4 rounded-xl text-left transition-all duration-200 flex items-center gap-4 ${
                !method.available ? 'cursor-not-allowed opacity-50' : ''
              } ${isSelected && method.available ? 'bg-[#C9A227]/10 border border-[#C9A227]' : 'bg-white/5 border border-white/5'}`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                isSelected && method.available ? 'bg-[#C9A227]/20' : 'bg-white/5'
              }`}>
                <Icon className={`w-5 h-5 ${isSelected && method.available ? 'text-[#C9A227]' : 'text-white/30'}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium text-sm">{method.label}</span>
                  {!method.available && (
                    <span className="text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#C9A227]/15 border border-[#C9A227]/20 text-[#C9A227]">
                      Coming Soon
                    </span>
                  )}
                </div>
                <div className="text-xs text-white/20">{method.description}</div>
              </div>
              {isSelected && method.available && <Check className="w-5 h-5 text-[#C9A227]" />}
              {!method.available && <Lock className="w-4 h-4 text-white/20" />}
            </button>
          );
        })}
      </div>

      {/* Card Details */}
      {paymentMethod === "card" && (
        <div className="rounded-xl p-4 space-y-4 bg-white/5 border border-[#C9A227]/15">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#C9A227]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#C9A227]">Card Details</span>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.18em] mb-1.5 text-white/35">Card Number *</label>
            <input
              id="cardNumber"
              type="text"
              value={cardDetails.cardNumber}
              onChange={handleCardInputChange}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all duration-200 bg-[#0A0707] border border-white/7 focus:border-[#C9A227] font-['Manrope']"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.18em] mb-1.5 text-white/35">Card Holder Name *</label>
            <input
              id="cardHolder"
              type="text"
              value={cardDetails.cardHolder}
              onChange={handleCardChange}
              placeholder="John Doe"
              className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all duration-200 bg-[#0A0707] border border-white/7 focus:border-[#C9A227] font-['Manrope']"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.18em] mb-1.5 text-white/35">Expiry Date *</label>
              <input
                id="expiryDate"
                type="text"
                value={cardDetails.expiryDate}
                onChange={handleCardInputChange}
                placeholder="MM/YY"
                maxLength={5}
                className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all duration-200 bg-[#0A0707] border border-white/7 focus:border-[#C9A227] font-['Manrope']"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.18em] mb-1.5 text-white/35">CVV *</label>
              <input
                id="cvv"
                type="password"
                value={cardDetails.cvv}
                onChange={handleCardChange}
                placeholder="•••"
                maxLength={4}
                className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all duration-200 bg-[#0A0707] border border-white/7 focus:border-[#C9A227] font-['Manrope']"
              />
            </div>
          </div>
        </div>
      )}

      {/* Terms */}
      <div className="flex items-start gap-3 pt-2">
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

      {loading && (
        <div className="flex items-center justify-center py-4">
          <div className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin border-[#C9A227]" />
          <span className="text-sm ml-3 text-white/40">Processing payment...</span>
        </div>
      )}
    </div>
  );
};

export default PaymentStep;