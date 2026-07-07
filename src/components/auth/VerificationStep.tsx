// components/auth/VerificationStep.tsx - Fixed mobile alignment
import React from "react";
import { Mail, Phone, FileText, Globe, Zap, Building2, CheckCircle, ArrowRight, TrendingUp, Briefcase, Link2 } from "lucide-react";

interface VerificationStepProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    projectDescription: string;
    selectedRole: string;
    businessUrl: string;
    companyName: string;
    companyUrl: string;
    linkedInUrl: string;
    investmentFocus: string;
  };
  onConfirm: () => void;
}

const VerificationStep: React.FC<VerificationStepProps> = ({ formData, onConfirm }) => {
  const fullName = `${formData.firstName} ${formData.lastName}`.trim() || 'Not provided';
  const initials = `${formData.firstName?.[0] || ''}${formData.lastName?.[0] || ''}`.toUpperCase() || '?';

  const roleMap: Record<string, { label: string; icon: any }> = {
    entrepreneur: { label: 'Entrepreneur', icon: Zap },
    professional: { label: 'Professional', icon: Briefcase },
    investor: { label: 'Investor', icon: TrendingUp },
  };

  const roleInfo = roleMap[formData.selectedRole] || { label: 'Role not selected', icon: null };
  const RoleIcon = roleInfo.icon;

  const isEntrepreneur = formData.selectedRole === "entrepreneur";
  const isProfessional = formData.selectedRole === "professional";
  const isInvestor = formData.selectedRole === "investor";

  return (
    <div className="space-y-6 verification-step">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full flex items-center justify-center bg-[radial-gradient(circle,rgba(201,162,39,0.2)_0%,rgba(201,162,39,0.03)_70%)] border border-[#C9A227]/30 shadow-[0_0_60px_rgba(201,162,39,0.2)]">
            <CheckCircle className="w-9 h-9 stroke-[1.5] text-[#C9A227]" />
          </div>
        </div>
        <div className="text-[10px] font-bold uppercase tracking-[0.25em] mb-3 text-[#C9A227]">
          Step 2 of 5
        </div>
        <h1 className="text-white font-bold text-3xl mb-3">Review Your Profile</h1>
        <p className="text-sm font-medium leading-relaxed max-w-xs mx-auto text-white/40">
          Please review your application details below before proceeding.
        </p>
      </div>

      {/* Profile Preview Card */}
      <div className="rounded-2xl p-4 sm:p-7 bg-gradient-to-br from-[#151010] to-[#0E0909] border border-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-[#C9A227]">
          Profile Preview
        </div>

        {/* User Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl mb-5 bg-white/5 border border-white/5">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-base bg-gradient-to-r from-[#C9A227] to-[#DFBA3A] text-[#050505] tracking-[0.04em]">
            {initials}
          </div>
          <div className="flex-1 min-w-0 w-full sm:w-auto">
            <div className="text-white font-bold text-base truncate">{fullName}</div>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#C9A227]/15 border border-[#C9A227]/25">
                {RoleIcon && <RoleIcon className="w-[11px] h-[11px] text-[#C9A227]" />}
                <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#C9A227]">
                  {roleInfo.label}
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full flex-shrink-0 bg-[#22C55E]/10 border border-[#22C55E]/20">
                <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#22C55E]">Ready</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details - Mobile Optimized */}
        <div className="rounded-xl overflow-hidden mb-7 border border-white/5">
          {/* Email */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 border-b border-white/5 bg-white/5">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#C9A227]/10">
                <Mail className="w-[13px] h-[13px] text-[#C9A227]" />
              </div>
              <span className="text-xs font-semibold sm:w-24 flex-shrink-0 text-white/30">Email</span>
            </div>
            <span className="text-sm font-medium truncate w-full sm:flex-1 text-white/75 pl-10 sm:pl-0">
              {formData.email || 'Not provided'}
            </span>
          </div>

          {/* Phone */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 border-b border-white/5 bg-transparent">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#C9A227]/10">
                <Phone className="w-[13px] h-[13px] text-[#C9A227]" />
              </div>
              <span className="text-xs font-semibold sm:w-24 flex-shrink-0 text-white/30">Phone</span>
            </div>
            <span className="text-sm font-medium truncate w-full sm:flex-1 text-white/75 pl-10 sm:pl-0">
              {formData.phone || 'Not provided'}
            </span>
          </div>

          {/* Project */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 border-b border-white/5 bg-white/5">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#C9A227]/10">
                <FileText className="w-[13px] h-[13px] text-[#C9A227]" />
              </div>
              <span className="text-xs font-semibold sm:w-24 flex-shrink-0 text-white/30">Project</span>
            </div>
            <span className="text-sm font-medium truncate w-full sm:flex-1 text-white/75 pl-10 sm:pl-0">
              {formData.projectDescription || 'Not provided'}
            </span>
          </div>

          {/* Role */}
          <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 ${
            (isEntrepreneur || isProfessional || isInvestor) ? "border-b border-white/5" : ""
          } bg-transparent`}>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#C9A227]/10">
                {RoleIcon ? <RoleIcon className="w-[13px] h-[13px] text-[#C9A227]" /> : <FileText className="w-[13px] h-[13px] text-[#C9A227]" />}
              </div>
              <span className="text-xs font-semibold sm:w-24 flex-shrink-0 text-white/30">Role</span>
            </div>
            <span className="text-sm font-medium truncate w-full sm:flex-1 text-white/75 pl-10 sm:pl-0">
              {roleInfo.label}
            </span>
          </div>

          {/* Entrepreneur — Business URL only */}
          {isEntrepreneur && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 bg-white/5">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#C9A227]/10">
                  <Globe className="w-[13px] h-[13px] text-[#C9A227]" />
                </div>
                <span className="text-xs font-semibold sm:w-24 flex-shrink-0 text-white/30">Business URL</span>
              </div>
              <span className="text-sm font-medium truncate w-full sm:flex-1 text-white/75 pl-10 sm:pl-0">
                {formData.businessUrl || 'Not provided'}
              </span>
            </div>
          )}

          {/* Professional — Company / Employer Name + Company URL */}
          {isProfessional && (
            <>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 border-b border-white/5 bg-white/5">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#C9A227]/10">
                    <Building2 className="w-[13px] h-[13px] text-[#C9A227]" />
                  </div>
                  <span className="text-xs font-semibold sm:w-24 flex-shrink-0 text-white/30">Company</span>
                </div>
                <span className="text-sm font-medium truncate w-full sm:flex-1 text-white/75 pl-10 sm:pl-0">
                  {formData.companyName || 'Not provided'}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 bg-transparent">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#C9A227]/10">
                    <Globe className="w-[13px] h-[13px] text-[#C9A227]" />
                  </div>
                  <span className="text-xs font-semibold sm:w-24 flex-shrink-0 text-white/30">Company URL</span>
                </div>
                <span className="text-sm font-medium truncate w-full sm:flex-1 text-white/75 pl-10 sm:pl-0">
                  {formData.companyUrl || 'Not provided'}
                </span>
              </div>
            </>
          )}

          {/* Investor — LinkedIn Profile URL + Investment Focus */}
          {isInvestor && (
            <>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 border-b border-white/5 bg-white/5">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#C9A227]/10">
                    <Link2 className="w-[13px] h-[13px] text-[#C9A227]" />
                  </div>
                  <span className="text-xs font-semibold sm:w-24 flex-shrink-0 text-white/30">LinkedIn</span>
                </div>
                <span className="text-sm font-medium truncate w-full sm:flex-1 text-white/75 pl-10 sm:pl-0">
                  {formData.linkedInUrl || 'Not provided'}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 bg-transparent">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#C9A227]/10">
                    <FileText className="w-[13px] h-[13px] text-[#C9A227]" />
                  </div>
                  <span className="text-xs font-semibold sm:w-24 flex-shrink-0 text-white/30">Investment Focus</span>
                </div>
                <span className="text-sm font-medium truncate w-full sm:flex-1 text-white/75 pl-10 sm:pl-0">
                  {formData.investmentFocus || 'Not provided'}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Confirm Button */}
        <button
          onClick={onConfirm}
          className="inline-flex items-center justify-center gap-2.5 font-bold rounded-xl transition-all duration-200 active:scale-[0.99] w-full px-8 py-4 text-[15px] bg-gradient-to-r from-[#C9A227] to-[#DFBA3A] text-[#050505] shadow-[0_4px_24px_rgba(201,162,39,0.25)] hover:shadow-[0_4px_32px_rgba(201,162,39,0.35)]"
        >
          Confirm & Proceed
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default VerificationStep;
