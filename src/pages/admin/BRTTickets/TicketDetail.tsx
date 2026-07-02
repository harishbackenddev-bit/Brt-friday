// pages/admin/TicketDetail.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Tag,
  ExternalLink,
  CreditCard,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Building2,
  Globe,
  Briefcase,
  FileText
} from "lucide-react";

interface TicketDetailData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  category: "Entrepreneur" | "Investor" | "Professional";
  paymentType: "Full Payment" | "Partial Payment" | "Pending";
  businessUrl?: string;
  companyName?: string;
  jobTitle?: string;
  amountPaid: number;
  totalAmount: number;
  submittedOn: string;
  status: "approved" | "pending" | "rejected";
  contactMethod?: string;
  contactValue?: string;
}

// Mock data - in real app, fetch from API
const mockTickets: Record<string, TicketDetailData> = {
  "BRT-001": {
    id: "BRT-001",
    firstName: "Sipho",
    lastName: "Dlamini",
    email: "sipho.dlamini@techventures.co.za",
    phone: "+27 82 345 6789",
    category: "Entrepreneur",
    paymentType: "Full Payment",
    businessUrl: "https://techventures.co.za",
    companyName: "TechVentures",
    jobTitle: "Founder & CEO",
    amountPaid: 2000,
    totalAmount: 2000,
    submittedOn: "10 June 2026 at 14:45",
    status: "approved",
  },
  "BRT-002": {
    id: "BRT-002",
    firstName: "Amara",
    lastName: "Osei",
    email: "amara.osei@capitalgroup.com",
    phone: "+27 71 234 5678",
    category: "Investor",
    paymentType: "Full Payment",
    businessUrl: "https://capitalgroup.com",
    companyName: "Capital Group",
    jobTitle: "Investment Director",
    amountPaid: 2000,
    totalAmount: 2000,
    submittedOn: "09 June 2026 at 10:30",
    status: "approved",
  },
  "BRT-003": {
    id: "BRT-003",
    firstName: "Zanele",
    lastName: "Mokoena",
    email: "zanele@standardbank.co.za",
    phone: "+27 83 987 6543",
    category: "Professional",
    paymentType: "Partial Payment",
    amountPaid: 1000,
    totalAmount: 2000,
    contactMethod: "WhatsApp",
    contactValue: "+27 83 987 6543",
    businessUrl: "https://standardbank.co.za",
    companyName: "Standard Bank",
    jobTitle: "Senior Analyst",
    submittedOn: "08 June 2026 at 09:15",
    status: "pending",
  },
  "BRT-004": {
    id: "BRT-004",
    firstName: "Kwame",
    lastName: "Asante",
    email: "kwame.asante@gmail.com",
    phone: "+27 79 456 7890",
    category: "Entrepreneur",
    paymentType: "Partial Payment",
    amountPaid: 500,
    totalAmount: 2000,
    contactMethod: "Email",
    contactValue: "kwame.asante@gmail.com",
    businessUrl: "https://asanteventures.com",
    companyName: "Asante Ventures",
    jobTitle: "Co-Founder",
    submittedOn: "07 June 2026 at 16:20",
    status: "pending",
  },
  "BRT-005": {
    id: "BRT-005",
    firstName: "Naledi",
    lastName: "Khumalo",
    email: "naledi@deloitte.co.za",
    phone: "+27 61 123 4567",
    category: "Professional",
    paymentType: "Full Payment",
    amountPaid: 2000,
    totalAmount: 2000,
    businessUrl: "https://deloitte.co.za",
    companyName: "Deloitte",
    jobTitle: "Management Consultant",
    submittedOn: "06 June 2026 at 11:00",
    status: "approved",
  },
  "BRT-006": {
    id: "BRT-006",
    firstName: "Tendai",
    lastName: "Mutasa",
    email: "tendai.mutasa@ventures.zw",
    phone: "+263 77 234 5678",
    category: "Investor",
    paymentType: "Partial Payment",
    amountPaid: 1500,
    totalAmount: 2000,
    contactMethod: "Direct Contact",
    contactValue: "+263 77 234 5678",
    businessUrl: "https://mutasaventures.com",
    companyName: "Mutasa Ventures",
    jobTitle: "Angel Investor",
    submittedOn: "05 June 2026 at 13:45",
    status: "rejected",
  },
};

const TicketDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [ticketData, setTicketData] = useState<TicketDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchTicket = () => {
      setLoading(true);
      // In real app: fetch from API
      // const response = await fetch(`/api/tickets/${id}`);
      // const data = await response.json();
      
      const data = mockTickets[id || ""];
      setTicketData(data || null);
      setLoading(false);
    };

    fetchTicket();
  }, [id]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Entrepreneur":
        return "text-blue-400 bg-blue-400/10 border-blue-400/30";
      case "Investor":
        return "text-amber-400 bg-amber-400/10 border-amber-400/30";
      case "Professional":
        return "text-purple-400 bg-purple-400/10 border-purple-400/30";
      default:
        return "text-white/40 bg-white/5 border-white/10";
    }
  };

  const getPaymentColor = (paymentType: string) => {
    switch (paymentType) {
      case "Full Payment":
        return "text-green-400 bg-green-400/10 border-green-400/30";
      case "Partial Payment":
        return "text-orange-400 bg-orange-400/10 border-orange-400/30";
      case "Pending":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30";
      default:
        return "text-white/40 bg-white/5 border-white/10";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-400 bg-green-400/10 border-green-400/30";
      case "pending":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30";
      case "rejected":
        return "text-red-400 bg-red-400/10 border-red-400/30";
      default:
        return "text-white/40 bg-white/5 border-white/10";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case "rejected":
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#050505]">
        <div className="text-white/40">Loading ticket details...</div>
      </div>
    );
  }

  if (!ticketData) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#050505]">
        <div className="text-white/40">Ticket not found</div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar bg-[#050505]">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <button
            onClick={() => navigate("/admin/brt-tickets")}
            className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-3"
          >
            <ArrowLeft className="w-[15px] h-[15px]" />
            Back to BRT Tickets
          </button>
          <h1 className="text-3xl font-bold text-white mb-2">
            {ticketData.firstName} {ticketData.lastName}
          </h1>
          <div className="flex items-center gap-2 flex-wrap mt-2">
            <span className="font-mono text-xs text-white/30">{ticketData.id}</span>
            <span className={`text-xs px-2 py-1 rounded border capitalize ${getCategoryColor(ticketData.category)}`}>
              {ticketData.category}
            </span>
            <span className={`text-xs px-2 py-1 rounded border ${getPaymentColor(ticketData.paymentType)}`}>
              {ticketData.paymentType}
            </span>
            <span className={`text-xs px-2 py-1 rounded border flex items-center gap-1 ${getStatusColor(ticketData.status)}`}>
              {getStatusIcon(ticketData.status)}
              {ticketData.status.charAt(0).toUpperCase() + ticketData.status.slice(1)}
            </span>
          </div>
        </div>
        {/* <div className="flex items-center gap-2">
          <button className="px-4 py-2 text-xs font-medium text-white/60 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
            Edit
          </button>
          <button className="px-4 py-2 text-xs font-medium text-[#050505] bg-gradient-to-r from-[#C9A227] to-[#DFBA3A] rounded-lg hover:shadow-lg hover:shadow-[#C9A227]/25 transition-all">
            Download Ticket
          </button>
        </div> */}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Personal Info & Category */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-[#0E0909] border border-white/5 rounded-xl p-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-5">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex items-start gap-3">
                <User className="w-[14px] h-[14px] text-white/30 mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/40 mb-0.5">First Name</p>
                  <div className="text-sm font-medium text-white break-words">{ticketData.firstName}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <User className="w-[14px] h-[14px] text-white/30 mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/40 mb-0.5">Last Name</p>
                  <div className="text-sm font-medium text-white break-words">{ticketData.lastName}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-[14px] h-[14px] text-white/30 mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/40 mb-0.5">Email Address</p>
                  <div className="text-sm font-medium text-white break-words">{ticketData.email}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-[14px] h-[14px] text-white/30 mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/40 mb-0.5">Phone Number</p>
                  <div className="text-sm font-medium text-white break-words">{ticketData.phone}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Attendee Category */}
          <div className="bg-[#0E0909] border border-white/5 rounded-xl p-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-5">
              Attendee Category
            </h2>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <Tag className="w-[14px] h-[14px] text-white/30 mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/40 mb-0.5">Category</p>
                  <div className="text-sm font-medium break-words">
                    <span className={`inline-flex text-xs px-2 py-1 rounded border ${getCategoryColor(ticketData.category)}`}>
                      {ticketData.category}
                    </span>
                  </div>
                </div>
              </div>
              {ticketData.companyName && (
                <div className="flex items-start gap-3">
                  <Building2 className="w-[14px] h-[14px] text-white/30 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/40 mb-0.5">Company</p>
                    <div className="text-sm font-medium text-white break-words">{ticketData.companyName}</div>
                  </div>
                </div>
              )}
              {ticketData.jobTitle && (
                <div className="flex items-start gap-3">
                  <Briefcase className="w-[14px] h-[14px] text-white/30 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/40 mb-0.5">Job Title</p>
                    <div className="text-sm font-medium text-white break-words">{ticketData.jobTitle}</div>
                  </div>
                </div>
              )}
              {ticketData.businessUrl && (
                <div className="flex items-start gap-3">
                  <Globe className="w-[14px] h-[14px] text-white/30 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/40 mb-0.5">Business URL</p>
                    <div className="text-sm font-medium break-words">
                      <a 
                        href={ticketData.businessUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#C9A227] hover:underline break-all flex items-center gap-1"
                      >
                        {ticketData.businessUrl}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
              {ticketData.contactMethod && ticketData.contactValue && (
                <div className="flex items-start gap-3">
                  <Phone className="w-[14px] h-[14px] text-white/30 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/40 mb-0.5">Contact Method</p>
                    <div className="text-sm font-medium text-white break-words">
                      {ticketData.contactMethod}: {ticketData.contactValue}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Payment & Submission */}
        <div className="space-y-6">
          {/* Payment */}
          <div className="bg-[#0E0909] border border-white/5 rounded-xl p-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-5">
              Payment
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CreditCard className="w-[14px] h-[14px] text-white/30 mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/40 mb-0.5">Payment Type</p>
                  <div className="text-sm font-medium break-words">
                    <span className={`inline-flex text-xs px-2 py-1 rounded border ${getPaymentColor(ticketData.paymentType)}`}>
                      {ticketData.paymentType}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/40 mb-0.5">Ticket Price</p>
                  <div className="text-sm font-medium text-white break-words">
                    R{ticketData.totalAmount.toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/40 mb-0.5">Amount Paid</p>
                  <div className="text-sm font-medium break-words">
                    {ticketData.amountPaid === ticketData.totalAmount ? (
                      <span className="text-green-400">R{ticketData.amountPaid.toLocaleString()} — Paid in Full</span>
                    ) : (
                      <>
                        <span className="text-green-400">R{ticketData.amountPaid.toLocaleString()}</span>
                        <span className="text-white/30"> / </span>
                        <span className="text-white/50">R{ticketData.totalAmount.toLocaleString()}</span>
                        <div className="text-orange-400 text-xs mt-1">
                          Owes: R{(ticketData.totalAmount - ticketData.amountPaid).toLocaleString()}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submission */}
          <div className="bg-[#0E0909] border border-white/5 rounded-xl p-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-5">
              Submission
            </h2>
            <div className="flex items-start gap-3">
              <Calendar className="w-[14px] h-[14px] text-white/30 mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-white/40 mb-0.5">Submitted On</p>
                <div className="text-sm font-medium text-white break-words">{ticketData.submittedOn}</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          {/* <div className="bg-[#0E0909] border border-white/5 rounded-xl p-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">
              Actions
            </h2>
            <div className="space-y-2">
              {ticketData.paymentType === "Partial Payment" && (
                <button className="w-full px-4 py-2.5 text-sm font-medium text-[#050505] bg-gradient-to-r from-[#C9A227] to-[#DFBA3A] rounded-lg hover:shadow-lg hover:shadow-[#C9A227]/25 transition-all">
                  Send Payment Reminder
                </button>
              )}
              <button className="w-full px-4 py-2.5 text-sm font-medium text-white/60 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
                View Full Application
              </button>
              <button className="w-full px-4 py-2.5 text-sm font-medium text-red-400 border border-red-400/20 rounded-lg hover:bg-red-400/10 transition-colors">
                Cancel Ticket
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;