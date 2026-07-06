// components/auth/PaymentCancelled.tsx
import React from "react";
import { XCircle, Home } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentCancelled: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 px-4">
      <div className="w-full max-w-md rounded-2xl p-8 text-center bg-[#111] border border-red-500/30">
        {/* Cancel Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center">
            <XCircle className="w-12 h-12 text-red-500" />
          </div>
        </div>

        {/* Content */}
        <h2 className="text-2xl font-bold text-white mb-2">
          Payment Cancelled
        </h2>

        <p className="text-white/60 mb-8">
          Your payment was cancelled and no ticket has been generated.
        </p>

        {/* Home Button */}
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl bg-[#C9A227] text-black font-semibold hover:opacity-90 transition"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentCancelled;