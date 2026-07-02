// pages/CreateAccount.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Lock, Check, ArrowRight } from "lucide-react";
import Logo from "@/assets/home/logo.png";

// Import step components
import ApplicationStep from "@/components/auth/ApplicationStep";
import VerificationStep from "@/components/auth/VerificationStep";
import PlanStep from "@/components/auth/PlanStep";
import PaymentStep from "@/components/auth/PaymentStep";
import TicketStep from "@/components/auth/TicketStep";

// Constants
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const TICKET_PRICE = 2000;

// Payment calculation
const calculatePayment = (plan: "full" | "partial") => {
  if (plan === "full") {
    return {
      totalAmount: TICKET_PRICE,
      depositAmount: TICKET_PRICE,
      remainingBalance: 0,
      depositPercentage: 100,
      autoChargeDate: null,
      isFullyPaid: true,
    };
  } else {
    return {
      totalAmount: TICKET_PRICE,
      depositAmount: TICKET_PRICE * 0.5,
      remainingBalance: TICKET_PRICE * 0.5,
      depositPercentage: 50,
      autoChargeDate: "25 June 2026",
      isFullyPaid: false,
    };
  }
};

// Generate ticket ID
const generateTicketId = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
  return `BRT-${year}-${random}`;
};

const CreateAccount = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transactionId, setTransactionId] = useState<string>("");
  
  // Form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    projectDescription: "",
    selectedRole: "", // "entrepreneur" | "professional" | "investor"
    businessUrl: "",
    companyName: "",
    companyUrl: "",
    linkedInUrl: "",
    investmentFocus: "",
  });

  // Payment states
  const [selectedPlan, setSelectedPlan] = useState<"full" | "partial" | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
  // Card details for card payment
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });

  const totalSteps = 5;
  const steps = [
    { number: 1, label: "Application" },
    { number: 2, label: "Verification" },
    { number: 3, label: "Plan" },
    { number: 4, label: "Payment" },
    { number: 5, label: "Ticket" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [id]: value }));
  };

  const setSelectedRole = (role: string) => {
    setFormData((prev) => ({ ...prev, selectedRole: role }));
  };

  const validateStep = (): boolean => {
    switch (currentStep) {
      case 1:
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
          setError("Please fill in all required fields");
          return false;
        }
        if (!formData.selectedRole) {
          setError("Please select your role");
          return false;
        }
        if (formData.selectedRole === "entrepreneur") {
          if (!formData.businessUrl || !formData.companyName || !formData.companyUrl || !formData.linkedInUrl) {
            setError("Please fill in all business details");
            return false;
          }
        }
        break;
      case 3:
        if (!selectedPlan) {
          setError("Please select a payment plan");
          return false;
        }
        break;
      case 4:
        if (!paymentMethod) {
          setError("Please select a payment method");
          return false;
        }
        if (paymentMethod === "card") {
          if (!cardDetails.cardNumber || !cardDetails.cardHolder || !cardDetails.expiryDate || !cardDetails.cvv) {
            setError("Please fill in all card details");
            return false;
          }
        }
        if (!acceptedTerms) {
          setError("Please accept the terms and conditions");
          return false;
        }
        break;
    }
    setError(null);
    return true;
  };

  // Handle payment submission with direct API calls
  const processPaymentAndSave = async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. Calculate payment amounts
      const paymentDetails = calculatePayment(selectedPlan!);
      
      // 2. Prepare payment data
      const paymentData = {
        plan: selectedPlan!,
        paymentMethod: paymentMethod!,
        cardDetails: paymentMethod === "card" ? {
          cardNumber: cardDetails.cardNumber,
          cardHolder: cardDetails.cardHolder,
          expiryDate: cardDetails.expiryDate,
          cvv: cardDetails.cvv,
        } : null,
        user: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
        },
        amount: paymentDetails.depositAmount,
      };

      // 3. Process payment through external gateway
      const paymentResponse = await fetch(`${API_BASE_URL}/payments/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (!paymentResponse.ok) {
        const errorData = await paymentResponse.json();
        throw new Error(errorData.message || 'Payment processing failed');
      }

      const paymentResult = await paymentResponse.json();
      
      if (!paymentResult.success) {
        throw new Error(paymentResult.message || 'Payment failed');
      }

      const transactionId = paymentResult.transactionId || paymentResult.data?.transactionId;

      // 4. Prepare application data
      const applicationData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        projectDescription: formData.projectDescription,
        selectedRole: formData.selectedRole,
        businessUrl: formData.businessUrl || "",
        companyName: formData.companyName || "",
        companyUrl: formData.companyUrl || "",
        linkedInUrl: formData.linkedInUrl || "",
        investmentFocus: formData.investmentFocus || "",
        plan: selectedPlan!,
        paymentStatus: selectedPlan === "full" ? "completed" : "partial",
        transactionId: transactionId,
        amountPaid: paymentDetails.depositAmount,
        totalAmount: TICKET_PRICE,
        outstandingBalance: paymentDetails.remainingBalance,
        paymentMethod: paymentMethod!,
      };

      // 5. Submit application
      const applicationResponse = await fetch(`${API_BASE_URL}/applications/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      });

      if (!applicationResponse.ok) {
        const errorData = await applicationResponse.json();
        throw new Error(errorData.message || 'Application submission failed');
      }

      const applicationResult = await applicationResponse.json();
      
      if (!applicationResult.success) {
        throw new Error(applicationResult.message || 'Application submission failed');
      }

      // 6. Create ticket
      const ticketData = {
        ticketId: generateTicketId(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phone,
        projectDescription: formData.projectDescription,
        selectedRole: formData.selectedRole,
        businessUrl: formData.businessUrl || "",
        companyName: formData.companyName || "",
        companyUrl: formData.companyUrl || "",
        linkedInUrl: formData.linkedInUrl || "",
        investmentFocus: formData.investmentFocus || "",
        selectedPlan: selectedPlan!,
        paymentMethod: paymentMethod!,
        paymentStatus: selectedPlan === "full" ? "completed" : "partial",
        amountPaid: paymentDetails.depositAmount,
        totalAmount: TICKET_PRICE,
        outstandingBalance: paymentDetails.remainingBalance,
        transactionId: transactionId,
        paymentDate: new Date().toISOString(),
        cardLastFour: paymentMethod === "card" ? cardDetails.cardNumber.slice(-4) : null,
        cardType: paymentMethod === "card" ? "Unknown" : null,
        status: "pending",
        eventName: "BRT150 Demo Day",
        nextDueDate: "2026-12-21",
        eventDate: new Date("2026-11-21").toISOString(),
        isGuest: true,
        submittedAt: new Date().toISOString(),
      };

      const ticketResponse = await fetch(`${API_BASE_URL}/tickets/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketData),
      });

      if (!ticketResponse.ok) {
        const errorData = await ticketResponse.json();
        throw new Error(errorData.message || 'Ticket creation failed');
      }

      const ticketResult = await ticketResponse.json();
      
      if (!ticketResult.success) {
        throw new Error(ticketResult.message || 'Ticket creation failed');
      }

      // 7. Save transaction ID for display
      setTransactionId(transactionId);

      // 8. Success - move to ticket step
      setCurrentStep(5);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment processing failed');
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = async () => {
    if (!validateStep()) return;

    if (currentStep === 2) {
      setCurrentStep(3);
      return;
    }

    if (currentStep === 4) {
      await processPaymentAndSave();
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError(null);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ApplicationStep
            formData={formData}
            handleInputChange={handleInputChange}
            setSelectedRole={setSelectedRole}
            error={error}
          />
        );
      case 2:
        return (
          <VerificationStep 
            formData={formData}
            onConfirm={() => {
              if (validateStep()) {
                setCurrentStep(3);
              }
            }}
          />
        );
      case 3:
        return (
          <PlanStep
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
          />
        );
      case 4:
        return (
          <PaymentStep
            selectedPlan={selectedPlan}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            acceptedTerms={acceptedTerms}
            setAcceptedTerms={setAcceptedTerms}
            cardDetails={cardDetails}
            handleCardChange={handleCardChange}
            error={error}
            loading={loading}
          />
        );
      case 5:
        return <TicketStep formData={formData} selectedPlan={selectedPlan} />;
      default:
        return null;
    }
  };

  const isContinueDisabled = () => {
    if (loading) return true;

    switch (currentStep) {
      case 1:
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) return true;
        if (!formData.selectedRole) return true;
        if (formData.selectedRole === "entrepreneur") {
          if (!formData.businessUrl || !formData.companyName || !formData.companyUrl || !formData.linkedInUrl) return true;
        }
        return false;
      case 3:
        return !selectedPlan;
      case 4:
        if (!paymentMethod) return true;
        if (paymentMethod === "card") {
          return !cardDetails.cardNumber || !cardDetails.cardHolder || !cardDetails.expiryDate || !cardDetails.cvv;
        }
        return !acceptedTerms;
      default:
        return false;
    }
  };

  const getButtonText = () => {
    if (loading) return "Processing...";
    if (currentStep === 4) return "Pay Now";
    if (currentStep === 5) return "Get Your Ticket";
    return "Continue";
  };

  return (
    <div className="min-h-screen bg-[#050505] font-['Manrope']">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/85 backdrop-blur-[20px] border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-6 h-[62px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/')}
              className="mr-2 transition-colors text-white/30 hover:text-white/60"
            >
              <ChevronLeft className="w-[18px] h-[18px]" />
            </button>
            <div className="flex items-center gap-3">
              <img 
                src={Logo} 
                alt="BRT150" 
                className="h-8 w-auto object-contain"
              />
              <div>
                <div className="text-white font-bold text-sm leading-none mb-0.5">BRT150</div>
                <div className="font-bold tracking-[0.22em] uppercase text-[9px] text-[#C9A227]">
                  Demo Day
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase text-white/20">
            <Lock className="w-[11px] h-[11px]" />
            Secure Registration
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="min-h-screen pt-[62px] bg-[#050505]">
        <div className="max-w-[680px] mx-auto px-6 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-bold leading-[1.15] mb-4 text-[clamp(2rem,5vw,2.75rem)] text-white">
              Secure Your <span className="bg-gradient-to-r from-[#C9A227] to-[#DFBA3A] bg-clip-text text-transparent">Seat</span>
            </h1>
            <p className="text-base font-medium max-w-sm mx-auto leading-relaxed text-white/40">
              21st November, 2026. BRT150, Ethereal, Newcastle, KwaZulu-Natal.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-start justify-center gap-0 mb-12">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-start">
                <div className="flex flex-col items-center gap-2 w-[76px]">
                  <div 
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      step.number < currentStep 
                        ? 'bg-gradient-to-r from-[#C9A227] to-[#DFBA3A] text-[#050505] shadow-[0_0_18px_rgba(201,162,39,0.3)]'
                        : step.number === currentStep
                        ? 'border-2 border-[#C9A227] text-[#C9A227] bg-transparent'
                        : 'border border-white/10 text-white/20 bg-transparent'
                    }`}
                  >
                    {step.number < currentStep ? (
                      <Check className="w-[13px] h-[13px]" strokeWidth={3} />
                    ) : (
                      String(step.number).padStart(2, '0')
                    )}
                  </div>
                  <span 
                    className={`text-[10px] font-semibold tracking-wide text-center leading-tight ${
                      step.number === currentStep 
                        ? 'text-[#C9A227]'
                        : step.number < currentStep
                        ? 'text-white/45'
                        : 'text-white/20'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div 
                    className={`mt-[18px] transition-all duration-500 w-[28px] h-[1px] ${
                      step.number < currentStep 
                        ? 'bg-gradient-to-r from-[#C9A227] to-[#DFBA3A]'
                        : 'bg-white/5'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Card Container */}
          <div className="rounded-2xl p-8 md:p-10 bg-gradient-to-br from-[#151010] to-[#0E0909] border border-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
            {/* Step Content */}
            {renderStepContent()}

            {/* Navigation Buttons */}
            {currentStep < 5 && (
              <div className="flex flex-col gap-3 pt-2 mt-8 border-t border-white/5">
                <div className="flex justify-between">
                  <button
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all ${
                      currentStep === 1
                        ? "opacity-50 cursor-not-allowed text-gray-600"
                        : "text-white hover:bg-white/5"
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </button>

                  <button
                    onClick={handleContinue}
                    disabled={isContinueDisabled()}
                    className={`inline-flex items-center justify-center gap-2.5 font-bold rounded-xl transition-all duration-200 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed px-8 py-4 text-[15px] ${
                      isContinueDisabled()
                        ? "bg-gray-700 text-gray-400"
                        : "bg-gradient-to-r from-[#C9A227] to-[#DFBA3A] text-[#050505] shadow-[0_4px_20px_rgba(201,162,39,0.3)]"
                    }`}
                  >
                    {getButtonText()}
                    {!loading && <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-center text-xs leading-relaxed pt-1 text-white/20">
                  By applying you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Progress Dots */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0E0A0A]/90 backdrop-blur-[20px] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
        {steps.map((step) => (
          <button
            key={step.number}
            className="transition-all duration-200"
            style={{
              width: step.number === currentStep ? '28px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: step.number === currentStep
                ? 'linear-gradient(90deg, #C9A227, #DFBA3A)'
                : step.number < currentStep
                ? 'rgba(201, 162, 39, 0.5)'
                : 'rgba(255,255,255,0.15)',
            }}
            onClick={() => {
              if (step.number < currentStep) {
                setCurrentStep(step.number);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CreateAccount;