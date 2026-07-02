// components/auth/ApplicationStep.tsx
import React from "react";
import { User, Mail, Phone, Building2, Globe, Zap, Lock, Check } from "lucide-react";

interface ApplicationStepProps {
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
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  toggleEntrepreneur: () => void;
  toggleProfessional: () => void;
  error?: string | null;
}

const ApplicationStep: React.FC<ApplicationStepProps> = ({
  formData,
  handleInputChange,
  toggleEntrepreneur,
  toggleProfessional,
  error,
}) => {
  return (
    <div className="space-y-0">
      {/* Section 1: Personal Details */}
      <div>
        <div className="mb-4">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1" style={{ color: '#C9A227' }}>
            01
          </div>
          <div className="text-white font-bold text-base">Personal Details</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* First Name */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
              First Name *
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'rgba(255,255,255,0.3)' }}>
                <User className="w-[14px] h-[14px]" />
              </div>
              <input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="James"
                className="w-full rounded-xl py-3.5 text-sm text-white placeholder-white/30 outline-none transition-all duration-200"
                style={{
                  background: '#0A0707',
                  border: '1px solid rgba(255,255,255,0.07)',
                  paddingLeft: '2.75rem',
                  paddingRight: '1rem',
                  fontFamily: 'Manrope, sans-serif',
                  color: '#FFFFFF',
                }}
              />
            </div>
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Last Name *
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'rgba(255,255,255,0.3)' }}>
                <User className="w-[14px] h-[14px]" />
              </div>
              <input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Mokoena"
                className="w-full rounded-xl py-3.5 text-sm text-white placeholder-white/30 outline-none transition-all duration-200"
                style={{
                  background: '#0A0707',
                  border: '1px solid rgba(255,255,255,0.07)',
                  paddingLeft: '2.75rem',
                  paddingRight: '1rem',
                  fontFamily: 'Manrope, sans-serif',
                  color: '#FFFFFF',
                }}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Email Address *
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'rgba(255,255,255,0.3)' }}>
                <Mail className="w-[14px] h-[14px]" />
              </div>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="james@company.co.za"
                className="w-full rounded-xl py-3.5 text-sm text-white placeholder-white/30 outline-none transition-all duration-200"
                style={{
                  background: '#0A0707',
                  border: '1px solid rgba(255,255,255,0.07)',
                  paddingLeft: '2.75rem',
                  paddingRight: '1rem',
                  fontFamily: 'Manrope, sans-serif',
                  color: '#FFFFFF',
                }}
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Phone Number *
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'rgba(255,255,255,0.3)' }}>
                <Phone className="w-[14px] h-[14px]" />
              </div>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+27 800 000 000"
                className="w-full rounded-xl py-3.5 text-sm text-white placeholder-white/30 outline-none transition-all duration-200"
                style={{
                  background: '#0A0707',
                  border: '1px solid rgba(255,255,255,0.07)',
                  paddingLeft: '2.75rem',
                  paddingRight: '1rem',
                  fontFamily: 'Manrope, sans-serif',
                  color: '#FFFFFF',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Divider */}
      <div className="my-8" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }} />

      {/* Section 2: Project Description */}
      <div>
        <div className="mb-4">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1" style={{ color: '#C9A227' }}>
            02
          </div>
          <div className="text-white font-bold text-base">Which project are you currently working on?</div>
        </div>

        <div style={{ position: 'relative' }}>
          <textarea
            id="projectDescription"
            rows={3}
            value={formData.projectDescription}
            onChange={handleInputChange}
            placeholder="Describe what you're building — product, stage, traction…"
            className="w-full rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none resize-none transition-all duration-200"
            style={{
              background: '#0A0707',
              border: '1px solid rgba(255,255,255,0.07)',
              fontFamily: 'Manrope, sans-serif',
              color: '#FFFFFF',
            }}
          />
        </div>
      </div>

      {/* Divider */}
      <div className="my-8" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }} />

      {/* Section 3: Entrepreneur */}
      <div>
        <div className="mb-4">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1" style={{ color: '#C9A227' }}>
            03
          </div>
          <div className="text-white font-bold text-base">Are you an Entrepreneur?</div>
          <div className="text-xs font-medium mt-0.5" style={{ color: 'rgba(255,255,255,0.28)' }}>
            Building or leading a business or startup
          </div>
        </div>

        <button
          onClick={toggleEntrepreneur}
          className="w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-200"
          style={{
            background: formData.isEntrepreneur ? 'rgba(201, 162, 39, 0.07)' : '#0A0707',
            border: formData.isEntrepreneur ? '1px solid #C9A227' : '1px solid rgba(255,255,255,0.06)',
            boxShadow: formData.isEntrepreneur ? '0 0 28px rgba(201, 162, 39, 0.15)' : 'none',
          }}
        >
          <div 
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: formData.isEntrepreneur ? 'rgba(201, 162, 39, 0.18)' : 'rgba(255,255,255,0.05)',
            }}
          >
            <Zap className="w-[18px] h-[18px]" style={{ color: formData.isEntrepreneur ? '#C9A227' : 'rgba(255,255,255,0.35)' }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-sm" style={{ color: formData.isEntrepreneur ? '#C9A227' : 'rgba(255,255,255,0.8)' }}>
              I'm an Entrepreneur
            </div>
            <div className="text-xs font-medium mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Startup founder, business owner or scaleup leader
            </div>
          </div>
          <div 
            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background: formData.isEntrepreneur ? 'linear-gradient(135deg, #C9A227, #DFBA3A)' : 'transparent',
              border: formData.isEntrepreneur ? 'none' : '1px solid rgba(255,255,255,0.15)',
            }}
          >
            {formData.isEntrepreneur && <Check className="w-[10px] h-[10px]" strokeWidth={3} style={{ color: '#050505' }} />}
          </div>
        </button>
      </div>

      {/* Divider */}
      <div className="my-8" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }} />

      {/* Section 4: Professional */}
      <div>
        <div className="mb-4">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1" style={{ color: '#C9A227' }}>
            04
          </div>
          <div className="text-white font-bold text-base">Are you a Professional?</div>
          <div className="text-xs font-medium mt-0.5" style={{ color: 'rgba(255,255,255,0.28)' }}>
            Accountant, attorney, doctor, engineer, executive or similar
          </div>
        </div>

        <button
          onClick={toggleProfessional}
          className="w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-200"
          style={{
            background: formData.isProfessional ? 'rgba(201, 162, 39, 0.07)' : '#0A0707',
            border: formData.isProfessional ? '1px solid #C9A227' : '1px solid rgba(255,255,255,0.06)',
            boxShadow: formData.isProfessional ? '0 0 28px rgba(201, 162, 39, 0.15)' : 'none',
          }}
        >
          <div 
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: formData.isProfessional ? 'rgba(201, 162, 39, 0.18)' : 'rgba(255,255,255,0.05)',
            }}
          >
            <Building2 className="w-[18px] h-[18px]" style={{ color: formData.isProfessional ? '#C9A227' : 'rgba(255,255,255,0.35)' }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-sm" style={{ color: formData.isProfessional ? '#C9A227' : 'rgba(255,255,255,0.8)' }}>
              I'm a Professional
            </div>
            <div className="text-xs font-medium mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Qualified professional with capacity to engage or invest
            </div>
          </div>
          <div 
            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background: formData.isProfessional ? 'linear-gradient(135deg, #C9A227, #DFBA3A)' : 'transparent',
              border: formData.isProfessional ? 'none' : '1px solid rgba(255,255,255,0.15)',
            }}
          >
            {formData.isProfessional && <Check className="w-[10px] h-[10px]" strokeWidth={3} style={{ color: '#050505' }} />}
          </div>
        </button>
      </div>

      {/* Divider */}
      <div className="my-8" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }} />

      {/* Section 5: Company URLs */}
      <div>
        <div className="mb-4">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1" style={{ color: '#C9A227' }}>
            05
          </div>
          <div className="text-white font-bold text-base">URL Link to Company</div>
          <div className="text-xs font-medium mt-0.5" style={{ color: 'rgba(255,255,255,0.28)' }}>
            Web link / social media link
          </div>
        </div>

        <div className="space-y-4">
          {/* Business URL */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Business URL *
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'rgba(255,255,255,0.3)' }}>
                <Globe className="w-[14px] h-[14px]" />
              </div>
              <input
                id="businessUrl"
                type="url"
                value={formData.businessUrl}
                onChange={handleInputChange}
                placeholder="https://yourbusiness.com or social media page"
                className="w-full rounded-xl py-3.5 text-sm text-white placeholder-white/30 outline-none transition-all duration-200"
                style={{
                  background: '#0A0707',
                  border: '1px solid rgba(255,255,255,0.07)',
                  paddingLeft: '2.75rem',
                  paddingRight: '1rem',
                  fontFamily: 'Manrope, sans-serif',
                  color: '#FFFFFF',
                }}
              />
            </div>
            <p className="text-[11px] font-medium mt-1.5" style={{ color: 'rgba(255,255,255,0.28)' }}>
              You can provide a website link or a social media page link (Facebook, Instagram, LinkedIn, etc.)
            </p>
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Company / Employer Name *
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'rgba(255,255,255,0.3)' }}>
                <Building2 className="w-[14px] h-[14px]" />
              </div>
              <input
                id="companyName"
                type="text"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="e.g. Smith & Associates, City of Johannesburg…"
                className="w-full rounded-xl py-3.5 text-sm text-white placeholder-white/30 outline-none transition-all duration-200"
                style={{
                  background: '#0A0707',
                  border: '1px solid rgba(255,255,255,0.07)',
                  paddingLeft: '2.75rem',
                  paddingRight: '1rem',
                  fontFamily: 'Manrope, sans-serif',
                  color: '#FFFFFF',
                }}
              />
            </div>
          </div>

          {/* Company URL */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Company URL *
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'rgba(255,255,255,0.3)' }}>
                <Globe className="w-[14px] h-[14px]" />
              </div>
              <input
                id="companyUrl"
                type="url"
                value={formData.companyUrl}
                onChange={handleInputChange}
                placeholder="https://yourcompany.co.za or LinkedIn company page"
                className="w-full rounded-xl py-3.5 text-sm text-white placeholder-white/30 outline-none transition-all duration-200"
                style={{
                  background: '#0A0707',
                  border: '1px solid rgba(255,255,255,0.07)',
                  paddingLeft: '2.75rem',
                  paddingRight: '1rem',
                  fontFamily: 'Manrope, sans-serif',
                  color: '#FFFFFF',
                }}
              />
            </div>
            <p className="text-[11px] font-medium mt-1.5" style={{ color: 'rgba(255,255,255,0.28)' }}>
              Website or social media page — whichever best represents your organisation
            </p>
          </div>

          {/* LinkedIn URL */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
              LinkedIn Profile URL *
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'rgba(255,255,255,0.3)' }}>
                {/* <Linkedin className="w-[14px] h-[14px]" /> */}
              </div>
              <input
                id="linkedInUrl"
                type="text"
                value={formData.linkedInUrl}
                onChange={handleInputChange}
                placeholder="linkedin.com/in/yourprofile"
                className="w-full rounded-xl py-3.5 text-sm text-white placeholder-white/30 outline-none transition-all duration-200"
                style={{
                  background: '#0A0707',
                  border: '1px solid rgba(255,255,255,0.07)',
                  paddingLeft: '2.75rem',
                  paddingRight: '1rem',
                  fontFamily: 'Manrope, sans-serif',
                  color: '#FFFFFF',
                }}
              />
            </div>
          </div>

          {/* Investment Focus */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Investment Focus (optional)
            </label>
            <textarea
              id="investmentFocus"
              rows={2}
              value={formData.investmentFocus}
              onChange={handleInputChange}
              placeholder="e.g. fintech, property, agri, technology startups…"
              className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none resize-none transition-all duration-200"
              style={{
                background: '#0A0707',
                border: '1px solid rgba(255,255,255,0.07)',
                fontFamily: 'Manrope, sans-serif',
                color: '#FFFFFF',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationStep;