// components/auth/ApplicationStep.tsx
import React from "react";
import { User, Mail, Phone, Building2, Globe, Zap, Check, Briefcase, TrendingUp, Users } from "lucide-react";

interface ApplicationStepProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    projectDescription: string;
    selectedRole: string; // "entrepreneur" | "professional" | "investor"
    businessUrl: string;
    companyName: string;
    companyUrl: string;
    linkedInUrl: string;
    investmentFocus: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setSelectedRole: (role: string) => void;
  error?: string | null;
}

const ApplicationStep: React.FC<ApplicationStepProps> = ({
  formData,
  handleInputChange,
  setSelectedRole,
  error,
}) => {
  const MAX_PHONE_DIGITS = 15; // E.164 max length

  // Strips everything except digits (keeps a leading "+" if the user typed one),
  // and caps the total number of digits so pasted junk / letters can't get in.
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const hasPlus = raw.trim().startsWith("+");
    const digitsOnly = raw.replace(/\D/g, "").slice(0, MAX_PHONE_DIGITS);
    const cleaned = hasPlus ? `+${digitsOnly}` : digitsOnly;

    handleInputChange({
      ...e,
      target: { ...e.target, id: "phone", value: cleaned },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const isEntrepreneur = formData.selectedRole === "entrepreneur";
  const isProfessional = formData.selectedRole === "professional";
  const isInvestor = formData.selectedRole === "investor";

  // Once Entrepreneur is picked, Professional & Investor sections disappear entirely.
  // Once Professional is picked (Entrepreneur not picked), Investor disappears entirely.
  // Sections earlier in the sequence stay visible (greyed/locked) rather than hidden.
  const showProfessionalSection = formData.selectedRole !== "entrepreneur";
  const showInvestorSection = formData.selectedRole !== "entrepreneur" && formData.selectedRole !== "professional";

  // "URL Link to Company" step number shifts based on how many role sections are showing.
  const visibleRoleSectionCount = 1 + (showProfessionalSection ? 1 : 0) + (showInvestorSection ? 1 : 0);
  const companyStepNumber = String(3 + visibleRoleSectionCount).padStart(2, "0");

  return (
    <div className="space-y-0 application-step">
      {/* Section 1: Personal Details */}
      <div>
        <div className="mb-4">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1 text-[#C9A227]">01</div>
          <div className="text-white font-bold text-base">Personal Details</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* First Name */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.18em] mb-2 text-white/35">
              First Name *
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-white/30" />
              <input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="James"
                className="w-full rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/30 outline-none transition-all duration-200 bg-[#0A0707] border border-white/7 focus:border-[#C9A227] font-['Manrope']"
              />
            </div>
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.18em] mb-2 text-white/35">
              Last Name *
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-white/30" />
              <input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Mokoena"
                className="w-full rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/30 outline-none transition-all duration-200 bg-[#0A0707] border border-white/7 focus:border-[#C9A227] font-['Manrope']"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.18em] mb-2 text-white/35">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-white/30" />
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="james@company.co.za"
                className="w-full rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/30 outline-none transition-all duration-200 bg-[#0A0707] border border-white/7 focus:border-[#C9A227] font-['Manrope']"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.18em] mb-2 text-white/35">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-white/30" />
              <input
                id="phone"
                type="tel"
                inputMode="numeric"
                maxLength={16}
                value={formData.phone}
                onChange={handlePhoneChange}
                placeholder="+27 800 000 000"
                className="w-full rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/30 outline-none transition-all duration-200 bg-[#0A0707] border border-white/7 focus:border-[#C9A227] font-['Manrope']"
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
      <div className="my-8 border-t border-white/5" />

      {/* Section 2: Project Description */}
      <div>
        <div className="mb-4">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1 text-[#C9A227]">02</div>
          <div className="text-white font-bold text-base">Which project are you currently working on?</div>
        </div>

        <textarea
          id="projectDescription"
          rows={3}
          value={formData.projectDescription}
          onChange={handleInputChange}
          placeholder="Describe what you're building — product, stage, traction…"
          className="w-full rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none resize-none transition-all duration-200 bg-[#0A0707] border border-white/7 focus:border-[#C9A227] font-['Manrope']"
        />
      </div>

      {/* Divider */}
      <div className="my-8 border-t border-white/5" />

      {/* Section 3: Are you an Entrepreneur? — always visible */}
      <RoleToggleSection
        number="03"
        title="Are you an Entrepreneur?"
        subtitle="Building or leading a business or startup"
        icon={Zap}
        cardTitle="I'm an Entrepreneur"
        cardDescription="Startup founder, business owner or scaleup leader"
        selected={isEntrepreneur}
        locked={!!formData.selectedRole && !isEntrepreneur}
        onSelect={() => setSelectedRole(isEntrepreneur ? "" : "entrepreneur")}
      />

      {/* Section 4: Are you a Professional? — hidden once Entrepreneur is picked */}
      {showProfessionalSection && (
        <>
          <div className="my-8 border-t border-white/5" />
          <RoleToggleSection
            number="04"
            title="Are you a Professional?"
            subtitle="Accountant, attorney, doctor, engineer, executive or similar"
            icon={Briefcase}
            cardTitle="I'm a Professional"
            cardDescription="Qualified professional with capacity to engage or invest"
            selected={isProfessional}
            locked={!!formData.selectedRole && !isProfessional}
            onSelect={() => setSelectedRole(isProfessional ? "" : "professional")}
          />
        </>
      )}

      {/* Section 5: Are you an Investor? — hidden once Entrepreneur or Professional is picked */}
      {showInvestorSection && (
        <>
          <div className="my-8 border-t border-white/5" />
          <RoleToggleSection
            number="05"
            title="Are you an Investor?"
            subtitle="VC, angel, PE, family office or active investment vehicle"
            icon={TrendingUp}
            cardTitle="I'm an Investor"
            cardDescription="Capital allocator or active investment vehicle"
            selected={isInvestor}
            locked={!!formData.selectedRole && !isInvestor}
            onSelect={() => setSelectedRole(isInvestor ? "" : "investor")}
          />
        </>
      )}

      {/* Message reinforcing what happens next for the selected role */}
      {formData.selectedRole && !isEntrepreneur && (
        <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/5">
          <p className="text-sm text-white/40 text-center">
            {isProfessional
              ? "As a Professional, you'll be able to engage with entrepreneurs and explore investment opportunities."
              : "As an Investor, you'll get access to curated investment opportunities and pitch sessions."}
          </p>
        </div>
      )}

      {/* Divider */}
      <div className="my-8 border-t border-white/5" />

      {/* Section: URL Link to Company — step number shifts based on how many role sections are showing */}
      <div>
        <div className="mb-4">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1 text-[#C9A227]">
            {companyStepNumber}
          </div>
          <div className="text-white font-bold text-base">URL Link to Company</div>
          <div className="text-xs font-medium mt-0.5 text-white/28">Web link / social media link</div>
        </div>

        <div className="space-y-4">
          {/* Business URL — Entrepreneur only */}
          <div className={!isEntrepreneur ? "opacity-30" : undefined}>
            <label className="block text-[10px] font-bold uppercase tracking-[0.18em] mb-2 text-white/35">
              Business URL {isEntrepreneur && "*"}
            </label>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-white/30" />
              <input
                id="businessUrl"
                type="url"
                value={formData.businessUrl}
                onChange={handleInputChange}
                disabled={!isEntrepreneur}
                placeholder="https://yourbusiness.com or social media page"
                className="w-full rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/30 outline-none transition-all duration-200 bg-[#0A0707] border border-white/7 focus:border-[#C9A227] font-['Manrope'] disabled:cursor-not-allowed"
              />
            </div>
            <p className="text-[11px] font-medium mt-1.5 text-white/28">
              You can provide a website link or a social media page link (Facebook, Instagram, LinkedIn, etc.)
            </p>
          </div>

          {/* Company / Employer Name — Professional only */}
          <div className={!isProfessional ? "opacity-30" : undefined}>
            <label className="block text-[10px] font-bold uppercase tracking-[0.18em] mb-2 text-white/35">
              Company / Employer Name {isProfessional && "*"}
            </label>
            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-white/30" />
              <input
                id="companyName"
                type="text"
                value={formData.companyName}
                onChange={handleInputChange}
                disabled={!isProfessional}
                placeholder="e.g. Smith & Associates, City of Johannesburg…"
                className="w-full rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/30 outline-none transition-all duration-200 bg-[#0A0707] border border-white/7 focus:border-[#C9A227] font-['Manrope'] disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Company URL — Professional only */}
          <div className={!isProfessional ? "opacity-30" : undefined}>
            <label className="block text-[10px] font-bold uppercase tracking-[0.18em] mb-2 text-white/35">
              Company URL {isProfessional && "*"}
            </label>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-white/30" />
              <input
                id="companyUrl"
                type="url"
                value={formData.companyUrl}
                onChange={handleInputChange}
                disabled={!isProfessional}
                placeholder="https://yourcompany.co.za or LinkedIn company page"
                className="w-full rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/30 outline-none transition-all duration-200 bg-[#0A0707] border border-white/7 focus:border-[#C9A227] font-['Manrope'] disabled:cursor-not-allowed"
              />
            </div>
            <p className="text-[11px] font-medium mt-1.5 text-white/28">
              Website or social media page — whichever best represents your organisation
            </p>
          </div>

          {/* LinkedIn URL — Investor only */}
          <div className={!isInvestor ? "opacity-30" : undefined}>
            <label className="block text-[10px] font-bold uppercase tracking-[0.18em] mb-2 text-white/35">
              LinkedIn Profile URL {isInvestor && "*"}
            </label>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-white/30" />
              <input
                id="linkedInUrl"
                type="text"
                value={formData.linkedInUrl}
                onChange={handleInputChange}
                disabled={!isInvestor}
                placeholder="linkedin.com/in/yourprofile"
                className="w-full rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/30 outline-none transition-all duration-200 bg-[#0A0707] border border-white/7 focus:border-[#C9A227] font-['Manrope'] disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Investment Focus — Investor only */}
          <div className={!isInvestor ? "opacity-30" : undefined}>
            <label className="block text-[10px] font-bold uppercase tracking-[0.18em] mb-2 text-white/35">
              Investment Focus (optional)
            </label>
            <textarea
              id="investmentFocus"
              rows={2}
              value={formData.investmentFocus}
              onChange={handleInputChange}
              disabled={!isInvestor}
              placeholder="e.g. fintech, property, agri, technology startups…"
              className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none resize-none transition-all duration-200 bg-[#0A0707] border border-white/7 focus:border-[#C9A227] font-['Manrope'] disabled:cursor-not-allowed"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------------- */
/* Reusable single-toggle "role" section (always visible; greys out when  */
/* not selected instead of disappearing).                                 */
/* ---------------------------------------------------------------------- */

interface RoleToggleSectionProps {
  number: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  cardTitle: string;
  cardDescription: string;
  selected: boolean;
  /** true when a *different* role is currently selected — card becomes non-interactive */
  locked: boolean;
  onSelect: () => void;
}

const RoleToggleSection: React.FC<RoleToggleSectionProps> = ({
  number,
  title,
  subtitle,
  icon: Icon,
  cardTitle,
  cardDescription,
  selected,
  locked,
  onSelect,
}) => {
  return (
    <div>
      <div className="mb-4">
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1 text-[#C9A227]">{number}</div>
        <div className="text-white font-bold text-base">{title}</div>
        <div className="text-xs font-medium mt-0.5 text-white/28">{subtitle}</div>
      </div>

      <button
        type="button"
        disabled={locked}
        onClick={onSelect}
        aria-disabled={locked}
        className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-200 ${
          selected
            ? "bg-[#C9A227]/10 border border-[#C9A227] shadow-[0_0_28px_rgba(201,162,39,0.15)] cursor-pointer"
            : locked
            ? "bg-transparent border border-white/5 opacity-20 cursor-not-allowed"
            : "bg-transparent border border-white/5 opacity-40 hover:opacity-60 cursor-pointer"
        }`}
      >
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
            selected ? "bg-[#C9A227]/20" : "bg-white/5"
          }`}
        >
          <Icon className={`w-[18px] h-[18px] ${selected ? "text-[#C9A227]" : "text-white/25"}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className={`font-bold text-sm ${selected ? "text-[#C9A227]" : "text-white/40"}`}>
            {cardTitle}
          </div>
          <div className="text-xs font-medium mt-0.5 text-white/25">{cardDescription}</div>
        </div>
        <div
          className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
            selected ? "bg-gradient-to-r from-[#C9A227] to-[#DFBA3A]" : "border border-white/15"
          }`}
        >
          {selected && <Check className="w-[10px] h-[10px]" strokeWidth={3} style={{ color: "#050505" }} />}
        </div>
      </button>
    </div>
  );
};

export default ApplicationStep;
