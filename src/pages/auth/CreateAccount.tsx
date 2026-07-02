// pages/CreateAccount.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Lock, Check, ArrowRight, Shield } from "lucide-react";
import Logo from "@/assets/home/logo.png";

// Import step components
import ApplicationStep from "@/components/auth/ApplicationStep";
import VerificationStep from "@/components/auth/VerificationStep";
import PlanStep from "@/components/auth/PlanStep";
import PaymentStep from "@/components/auth/PaymentStep";
import TicketStep from "@/components/auth/TicketStep";

const CreateAccount = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    projectDescription: "",
    isEntrepreneur: false,
    isProfessional: true,
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

  const toggleEntrepreneur = () => {
    setFormData((prev) => ({ 
      ...prev, 
      isEntrepreneur: !prev.isEntrepreneur,
      isProfessional: prev.isEntrepreneur ? true : false
    }));
  };

  const toggleProfessional = () => {
    setFormData((prev) => ({ 
      ...prev, 
      isProfessional: !prev.isProfessional,
      isEntrepreneur: prev.isProfessional ? true : false
    }));
  };

  const validateStep = (): boolean => {
    switch (currentStep) {
      case 1:
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
          setError("Please fill in all required fields");
          return false;
        }
        if (!formData.isProfessional && !formData.isEntrepreneur) {
          setError("Please select your role");
          return false;
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

  // Handle payment submission to external API
  const processPayment = async () => {
    setLoading(true);
    setError(null);

    try {
      const paymentData = {
        plan: selectedPlan,
        paymentMethod: paymentMethod,
        cardDetails: paymentMethod === "card" ? cardDetails : null,
        user: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
        }
      };

      // External API call for payment
      const response = await fetch('https://api.yourpaymentgateway.com/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error('Payment failed');
      }

      const result = await response.json();
      
      // Submit application to external API
      const applicationResponse = await fetch('https://api.yourplatform.com/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          plan: selectedPlan,
          paymentStatus: 'completed',
          transactionId: result.transactionId,
        }),
      });

      if (!applicationResponse.ok) {
        throw new Error('Application submission failed');
      }

      // Success - move to ticket step
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
      // Process payment
      await processPayment();
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
            toggleEntrepreneur={toggleEntrepreneur}
            toggleProfessional={toggleProfessional}
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
        return !formData.firstName || !formData.lastName || !formData.email || !formData.phone;
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
    <div className="min-h-screen bg-[#050505]" style={{ fontFamily: 'Manrope, sans-serif' }}>
      {/* Navigation */}
      <nav 
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: 'rgba(5, 5, 5, 0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-[62px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/')}
              className="mr-2 transition-colors"
              style={{ color: 'rgba(255, 255, 255, 0.3)' }}
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
                <div 
                  className="font-bold tracking-[0.22em] uppercase text-[9px]"
                  style={{ color: '#C9A227' }}
                >
                  Demo Day
                </div>
              </div>
            </div>
          </div>
          <div 
            className="flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase"
            style={{ color: 'rgba(255, 255, 255, 0.2)' }}
          >
            <Lock className="w-[11px] h-[11px]" />
            Secure Registration
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="min-h-screen pt-[62px]" style={{ background: '#050505' }}>
        <div className="max-w-[580px] mx-auto px-6 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 
              className="font-bold leading-[1.15] mb-4"
              style={{ fontSize: 'clamp(2rem, 5vw, 2.75rem)', color: '#FFFFFF' }}
            >
              Secure Your <span style={{ background: 'linear-gradient(90deg, #C9A227, #DFBA3A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Seat</span>
            </h1>
            <p className="text-base font-medium max-w-sm mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.42)' }}>
              21st November, 2026. BRT150, Ethereal, Newcastle, KwaZulu-Natal.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-start justify-center gap-0 mb-12">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-start">
                <div className="flex flex-col items-center gap-2 w-[76px]">
                  <div 
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                    style={{
                      background: step.number < currentStep 
                        ? 'linear-gradient(135deg, #C9A227, #DFBA3A)'
                        : step.number === currentStep
                        ? 'transparent'
                        : 'transparent',
                      border: step.number === currentStep 
                        ? '2px solid #C9A227'
                        : step.number < currentStep
                        ? 'none'
                        : '1px solid rgba(255,255,255,0.1)',
                      color: step.number === currentStep 
                        ? '#C9A227'
                        : step.number < currentStep
                        ? '#050505'
                        : 'rgba(255,255,255,0.22)',
                      boxShadow: step.number < currentStep 
                        ? '0 0 18px rgba(201, 162, 39, 0.3)'
                        : 'none',
                    }}
                  >
                    {step.number < currentStep ? (
                      <Check className="w-[13px] h-[13px]" strokeWidth={3} />
                    ) : (
                      String(step.number).padStart(2, '0')
                    )}
                  </div>
                  <span 
                    className="text-[10px] font-semibold tracking-wide text-center leading-tight"
                    style={{
                      color: step.number === currentStep 
                        ? '#C9A227'
                        : step.number < currentStep
                        ? 'rgba(255,255,255,0.45)'
                        : 'rgba(255,255,255,0.18)'
                    }}
                  >
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div 
                    className="mt-[18px] transition-all duration-500"
                    style={{
                      width: '28px',
                      height: '1px',
                      background: step.number < currentStep 
                        ? 'linear-gradient(90deg, #C9A227, #DFBA3A)'
                        : 'rgba(255,255,255,0.06)'
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Card Container */}
          <div 
            className="rounded-2xl p-8 md:p-10"
            style={{
              background: 'linear-gradient(135deg, #151010 0%, #0E0909 100%)',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
            }}
          >
            {/* Step Content */}
            {renderStepContent()}

            {/* Navigation Buttons */}
            {currentStep < 5 && (
              <div className="flex flex-col gap-3 pt-2 mt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
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
                        : ""
                    }`}
                    style={{
                      background: isContinueDisabled() 
                        ? 'none' 
                        : 'linear-gradient(135deg, #C9A227 0%, #DFBA3A 100%)',
                      color: isContinueDisabled() ? '#666' : '#050505',
                      boxShadow: isContinueDisabled() ? 'none' : '0 4px 20px rgba(201, 162, 39, 0.3)',
                    }}
                  >
                    {getButtonText()}
                    {!loading && <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-center text-xs leading-relaxed pt-1" style={{ color: 'rgba(255,255,255,0.18)' }}>
                  By applying you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Progress Dots */}
      <div 
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full"
        style={{
          background: 'rgba(14, 10, 10, 0.92)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
        }}
      >
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