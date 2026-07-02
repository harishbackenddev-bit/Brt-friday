// components/auth/VerificationStep.tsx
import React from "react";
import { 
  Mail, 
  Phone, 
  FileText, 
  Globe, 
  Zap,
  Building2,
  CheckCircle,
  ArrowRight,
  User
} from "lucide-react";

interface VerificationStepProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    projectDescription: string;
    isEntrepreneur: boolean;
    isProfessional: boolean;
    businessUrl: string;
    companyName: string;
    companyUrl: string;
    linkedInUrl: string;
    investmentFocus: string;
  };
  onConfirm: () => void;
}

const VerificationStep: React.FC<VerificationStepProps> = ({ 
  formData, 
  onConfirm 
}) => {
  const fullName = `${formData.firstName} ${formData.lastName}`.trim() || 'Not provided';
  const initials = `${formData.firstName?.[0] || ''}${formData.lastName?.[0] || ''}`.toUpperCase() || '?';

  const roleLabel = formData.isEntrepreneur 
    ? 'Entrepreneur' 
    : formData.isProfessional 
    ? 'Professional' 
    : 'Role not selected';

  const roleIcon = formData.isEntrepreneur 
    ? Zap 
    : formData.isProfessional 
    ? Building2 
    : User;

  const RoleIcon = roleIcon;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-6">
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle, rgba(201, 162, 39, 0.2) 0%, rgba(201, 162, 39, 0.03) 70%)',
              border: '1px solid rgba(201, 162, 39, 0.28)',
              boxShadow: '0 0 60px rgba(201, 162, 39, 0.2)',
            }}
          >
            <CheckCircle className="w-9 h-9" strokeWidth={1.5} style={{ color: '#C9A227' }} />
          </div>
        </div>
        <div className="text-[10px] font-bold uppercase tracking-[0.25em] mb-3" style={{ color: '#C9A227' }}>
          Step 2 of 5
        </div>
        <h1 className="text-white font-bold text-3xl mb-3">Review Your Profile</h1>
        <p className="text-sm font-medium leading-relaxed max-w-xs mx-auto" style={{ color: 'rgba(255,255,255,0.38)' }}>
          Please review your application details below before proceeding.
        </p>
      </div>

      {/* Profile Preview Card */}
      <div 
        className="rounded-2xl p-7"
        style={{
          background: 'linear-gradient(135deg, #151010 0%, #0E0909 100%)',
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        }}
      >
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: '#C9A227' }}>
          Profile Preview
        </div>

        {/* User Header */}
        <div 
          className="flex items-center gap-4 p-4 rounded-xl mb-5"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div 
            className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-base"
            style={{
              background: 'linear-gradient(135deg, #C9A227, #DFBA3A)',
              color: '#050505',
              letterSpacing: '0.04em',
            }}
          >
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white font-bold text-base truncate">
              {fullName}
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <div 
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                style={{
                  background: 'rgba(201, 162, 39, 0.12)',
                  border: '1px solid rgba(201, 162, 39, 0.25)',
                }}
              >
                <RoleIcon className="w-[11px] h-[11px]" style={{ color: '#C9A227' }} />
                <span className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: '#C9A227' }}>
                  {roleLabel}
                </span>
              </div>
            </div>
          </div>
          <div 
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full flex-shrink-0"
            style={{
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.2)',
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#22C55E' }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: '#22C55E' }}>
              Ready
            </span>
          </div>
        </div>

        {/* Profile Details */}
        <div 
          className="rounded-xl overflow-hidden mb-7"
          style={{ border: '1px solid rgba(255,255,255,0.06)' }}
        >
          {/* Email */}
          <div 
            className="flex items-center gap-3 px-4 py-3"
            style={{
              borderBottom: '1px solid rgba(255,255,255,0.04)',
              background: 'rgba(255,255,255,0.016)',
            }}
          >
            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(201, 162, 39, 0.1)' }}>
              <Mail className="w-[13px] h-[13px]" style={{ color: '#C9A227' }} />
            </div>
            <span className="text-xs font-semibold w-24 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Email
            </span>
            <span className="text-sm font-medium truncate flex-1" style={{ color: 'rgba(255,255,255,0.75)' }}>
              {formData.email || 'Not provided'}
            </span>
          </div>

          {/* Phone */}
          <div 
            className="flex items-center gap-3 px-4 py-3"
            style={{
              borderBottom: '1px solid rgba(255,255,255,0.04)',
              background: 'transparent',
            }}
          >
            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(201, 162, 39, 0.1)' }}>
              <Phone className="w-[13px] h-[13px]" style={{ color: '#C9A227' }} />
            </div>
            <span className="text-xs font-semibold w-24 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Phone
            </span>
            <span className="text-sm font-medium truncate flex-1" style={{ color: 'rgba(255,255,255,0.75)' }}>
              {formData.phone || 'Not provided'}
            </span>
          </div>

          {/* Project */}
          <div 
            className="flex items-center gap-3 px-4 py-3"
            style={{
              borderBottom: '1px solid rgba(255,255,255,0.04)',
              background: 'rgba(255,255,255,0.016)',
            }}
          >
            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(201, 162, 39, 0.1)' }}>
              <FileText className="w-[13px] h-[13px]" style={{ color: '#C9A227' }} />
            </div>
            <span className="text-xs font-semibold w-24 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Project
            </span>
            <span className="text-sm font-medium truncate flex-1" style={{ color: 'rgba(255,255,255,0.75)' }}>
              {formData.projectDescription || 'Not provided'}
            </span>
          </div>

          {/* Company Name */}
          <div 
            className="flex items-center gap-3 px-4 py-3"
            style={{
              borderBottom: '1px solid rgba(255,255,255,0.04)',
              background: 'transparent',
            }}
          >
            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(201, 162, 39, 0.1)' }}>
              <Building2 className="w-[13px] h-[13px]" style={{ color: '#C9A227' }} />
            </div>
            <span className="text-xs font-semibold w-24 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Company
            </span>
            <span className="text-sm font-medium truncate flex-1" style={{ color: 'rgba(255,255,255,0.75)' }}>
              {formData.companyName || 'Not provided'}
            </span>
          </div>

          {/* Business URL */}
          <div 
            className="flex items-center gap-3 px-4 py-3"
            style={{
              borderBottom: '1px solid rgba(255,255,255,0.04)',
              background: 'rgba(255,255,255,0.016)',
            }}
          >
            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(201, 162, 39, 0.1)' }}>
              <Globe className="w-[13px] h-[13px]" style={{ color: '#C9A227' }} />
            </div>
            <span className="text-xs font-semibold w-24 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Business URL
            </span>
            <span className="text-sm font-medium truncate flex-1" style={{ color: 'rgba(255,255,255,0.75)' }}>
              {formData.businessUrl || 'Not provided'}
            </span>
          </div>

          {/* Company URL */}
          <div 
            className="flex items-center gap-3 px-4 py-3"
            style={{
              borderBottom: '1px solid rgba(255,255,255,0.04)',
              background: 'transparent',
            }}
          >
            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(201, 162, 39, 0.1)' }}>
              <Globe className="w-[13px] h-[13px]" style={{ color: '#C9A227' }} />
            </div>
            <span className="text-xs font-semibold w-24 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Company URL
            </span>
            <span className="text-sm font-medium truncate flex-1" style={{ color: 'rgba(255,255,255,0.75)' }}>
              {formData.companyUrl || 'Not provided'}
            </span>
          </div>

          {/* LinkedIn */}
          <div 
            className="flex items-center gap-3 px-4 py-3"
            style={{
              background: 'rgba(255,255,255,0.016)',
            }}
          >
            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(201, 162, 39, 0.1)' }}>
              {/* <Linkedin className="w-[13px] h-[13px]" style={{ color: '#C9A227' }} /> */}
            </div>
            <span className="text-xs font-semibold w-24 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.3)' }}>
              LinkedIn
            </span>
            <span className="text-sm font-medium truncate flex-1" style={{ color: 'rgba(255,255,255,0.75)' }}>
              {formData.linkedInUrl || 'Not provided'}
            </span>
          </div>

          {/* Investment Focus - shown if provided */}
          {formData.investmentFocus && (
            <div 
              className="flex items-center gap-3 px-4 py-3"
              style={{
                borderTop: '1px solid rgba(255,255,255,0.04)',
                background: 'rgba(255,255,255,0.016)',
              }}
            >
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(201, 162, 39, 0.1)' }}>
                <FileText className="w-[13px] h-[13px]" style={{ color: '#C9A227' }} />
              </div>
              <span className="text-xs font-semibold w-24 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Investment Focus
              </span>
              <span className="text-sm font-medium truncate flex-1" style={{ color: 'rgba(255,255,255,0.75)' }}>
                {formData.investmentFocus}
              </span>
            </div>
          )}
        </div>

        {/* Confirm Button */}
        <button
          onClick={onConfirm}
          className="inline-flex items-center justify-center gap-2.5 font-bold rounded-xl transition-all duration-200 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed w-full px-8 py-4 text-[15px]"
          style={{
            background: 'linear-gradient(135deg, #C9A227 0%, #DFBA3A 100%)',
            color: '#050505',
            boxShadow: '0 4px 24px rgba(201, 162, 39, 0.25)',
            fontFamily: 'Manrope, sans-serif',
          }}
        >
          Confirm & Proceed
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default VerificationStep;