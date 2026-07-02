// utils/paymentUtils.ts

export const TICKET_PRICE = 2000;
export const FEE_PERCENTAGE = 0.02;

export const PAYMENT_PLANS = {
  full: {
    label: "Full Payment",
    depositPercentage: 100,
    depositAmount: TICKET_PRICE,
    feeAmount: TICKET_PRICE * FEE_PERCENTAGE, // R40
    totalDueToday: TICKET_PRICE + TICKET_PRICE * FEE_PERCENTAGE, // R2040
    remainingBalance: 0,
    autoChargeDate: null,
  },

partial: {
  label: "Partial Payment",
  depositPercentage: 50,
  depositAmount: TICKET_PRICE * 0.5, // R1000

  // Fee on today's payment
  feeAmount: (TICKET_PRICE * 0.5) * FEE_PERCENTAGE, // R20

  // Amount to pay today
  totalDueToday:
    (TICKET_PRICE * 0.5) +
    ((TICKET_PRICE * 0.5) * FEE_PERCENTAGE), // R1020

  // Remaining amount including fee
  remainingBalance:
    (TICKET_PRICE * 0.5) +
    ((TICKET_PRICE * 0.5) * FEE_PERCENTAGE), // R1020

  autoChargeDate: "25 June 2026",
},
};

export const calculatePayment = (plan: "full" | "partial") => {
  const payment = PAYMENT_PLANS[plan];

  return {
    totalPrice: TICKET_PRICE,
    depositAmount: payment.depositAmount,
    feeAmount: payment.feeAmount,
    totalDueToday: payment.totalDueToday,
    remainingBalance: payment.remainingBalance,
    depositPercentage: payment.depositPercentage,
    autoChargeDate: payment.autoChargeDate,
    isFullyPaid: plan === "full",
    amountDueToday: payment.totalDueToday,
    amountDueLater: payment.remainingBalance,
  };
};

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 2,
  }).format(amount);