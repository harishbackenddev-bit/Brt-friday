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
  FileText,
  Loader2,
  Send,
  MessageSquare,
  X
} from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface TicketDetailData {
  _id: string;
  ticketId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  selectedRole: string;
  selectedPlan: string;
  paymentMethod: string;
  paymentStatus: string;
  amountPaid: number;
  totalAmount: number;
  outstandingBalance: number;
  transactionId: string;
  eventName: string;
  eventDate: string;
  status: string;
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
  contactMethod?: string;
  contactValue?: string;
  companyName?: string;
  businessUrl?: string;
  linkedInUrl?: string;
  projectDescription?: string;
  companyUrl?: string;
  investmentFocus?: string;
}

const TicketDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [ticketData, setTicketData] = useState<TicketDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sendingLink, setSendingLink] = useState(false);

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const fetchTicket = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/tickets/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch ticket');
      }
      const result = await response.json();
      
      if (result.success && result.data) {
        setTicketData(result.data);
      } else {
        throw new Error(result.message || 'Ticket not found');
      }
    } catch (error) {
      console.error('Error fetching ticket:', error);
      setError(error instanceof Error ? error.message : 'Failed to load ticket');
    } finally {
      setLoading(false);
    }
  };

  const handleSendPaymentLink = async () => {
    if (!ticketData) return;
    
    setSendingLink(true);
    try {
      const response = await fetch(`${API_BASE_URL}/tickets/${ticketData._id}/send-payment-link`, {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('Failed to send payment link');
      }
      
      const result = await response.json();
      alert(result.message || 'Payment link sent successfully!');
    } catch (error) {
      console.error('Error sending payment link:', error);
      alert('Failed to send payment link. Please try again.');
    } finally {
      setSendingLink(false);
    }
  };

  const getCategoryColor = (role: string) => {
    switch (role) {
      case "entrepreneur":
        return "text-blue-400 bg-blue-400/10 border-blue-400/30";
      case "investor":
        return "text-amber-400 bg-amber-400/10 border-amber-400/30";
      case "professional":
        return "text-purple-400 bg-purple-400/10 border-purple-400/30";
      default:
        return "text-white/40 bg-white/5 border-white/10";
    }
  };

  const getCategoryLabel = (role: string) => {
    switch (role) {
      case "entrepreneur": return "Entrepreneur";
      case "investor": return "Investor";
      case "professional": return "Professional";
      default: return role;
    }
  };

  const getPaymentColor = (paymentType: string) => {
    return paymentType === "full" 
      ? "text-green-400 bg-green-400/10 border-green-400/30"
      : "text-orange-400 bg-orange-400/10 border-orange-400/30";
  };

  const getPaymentLabel = (paymentType: string) => {
    return paymentType === "full" ? "Full Payment" : "Partial Payment";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
      case "approved":
        return "text-green-400 bg-green-400/10 border-green-400/30";
      case "pending":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30";
      case "rejected":
      case "cancelled":
        return "text-red-400 bg-red-400/10 border-red-400/30";
      default:
        return "text-white/40 bg-white/5 border-white/10";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
      case "approved":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case "rejected":
      case "cancelled":
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-ZA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#050505]">
        <div className="flex items-center gap-3 text-white/40">
          <Loader2 className="w-5 h-5 animate-spin" />
          Loading ticket details...
        </div>
      </div>
    );
  }

  if (error || !ticketData) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#050505]">
        <div className="text-red-400 text-lg mb-3">Error loading ticket</div>
        <p className="text-white/40 mb-4">{error || 'Ticket not found'}</p>
        <button
          onClick={() => navigate("/admin/brt-tickets")}
          className="px-4 py-2 text-sm text-[#C9A227] border border-[#C9A227]/30 rounded-lg hover:bg-[#C9A227]/10 transition-colors"
        >
          Back to Tickets
        </button>
      </div>
    );
  }

  const isPartial = ticketData.selectedPlan === "partial";
  const hasCallbackData = ticketData.contactMethod && ticketData.contactValue;

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
            <span className="font-mono text-xs text-white/30">{ticketData.ticketId}</span>
            <span className={`text-xs px-2 py-1 rounded border capitalize ${getCategoryColor(ticketData.selectedRole)}`}>
              {getCategoryLabel(ticketData.selectedRole)}
            </span>
            <span className={`text-xs px-2 py-1 rounded border ${getPaymentColor(ticketData.selectedPlan)}`}>
              {getPaymentLabel(ticketData.selectedPlan)}
            </span>
            <span className={`text-xs px-2 py-1 rounded border flex items-center gap-1 ${getStatusColor(ticketData.status)}`}>
              {getStatusIcon(ticketData.status)}
              {ticketData.status.charAt(0).toUpperCase() + ticketData.status.slice(1)}
            </span>
          </div>
        </div>
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
                  <div className="text-sm font-medium text-white break-words">{ticketData.phoneNumber}</div>
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
                    <span className={`inline-flex text-xs px-2 py-1 rounded border ${getCategoryColor(ticketData.selectedRole)}`}>
                      {getCategoryLabel(ticketData.selectedRole)}
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

              {ticketData.companyUrl && (
                <div className="flex items-start gap-3">
                  <Globe className="w-[14px] h-[14px] text-white/30 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/40 mb-0.5">Company URL</p>
                    <div className="text-sm font-medium break-words">
                      <a 
                        href={ticketData.companyUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#C9A227] hover:underline break-all flex items-center gap-1"
                      >
                        {ticketData.companyUrl}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {ticketData.linkedInUrl && (
                <div className="flex items-start gap-3">
                  <ExternalLink className="w-[14px] h-[14px] text-white/30 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/40 mb-0.5">LinkedIn</p>
                    <div className="text-sm font-medium break-words">
                      <a 
                        href={ticketData.linkedInUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#C9A227] hover:underline break-all flex items-center gap-1"
                      >
                        {ticketData.linkedInUrl}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {ticketData.projectDescription && (
                <div className="flex items-start gap-3">
                  <FileText className="w-[14px] h-[14px] text-white/30 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/40 mb-0.5">Project Description</p>
                    <div className="text-sm font-medium text-white break-words">{ticketData.projectDescription}</div>
                  </div>
                </div>
              )}

              {ticketData.investmentFocus && (
                <div className="flex items-start gap-3">
                  <Tag className="w-[14px] h-[14px] text-white/30 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/40 mb-0.5">Investment Focus</p>
                    <div className="text-sm font-medium text-white break-words">{ticketData.investmentFocus}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Callback Request Data - Only for Partial Payment */}
          {isPartial && hasCallbackData && (
            <div className="bg-[#0E0909] border border-[#C9A227]/20 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <MessageSquare className="w-4 h-4 text-[#C9A227]" />
                <h2 className="text-xs font-semibold uppercase tracking-wider text-[#C9A227]">
                  Callback Request Details
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-[14px] h-[14px] text-white/30 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/40 mb-0.5">Contact Method</p>
                    <div className="text-sm font-medium text-white break-words">
                      {ticketData.contactMethod}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <User className="w-[14px] h-[14px] text-white/30 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/40 mb-0.5">Contact Value</p>
                    <div className="text-sm font-medium text-white break-words">
                      {ticketData.contactValue}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-[14px] h-[14px] text-white/30 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/40 mb-0.5">Requested On</p>
                    <div className="text-sm font-medium text-white break-words">
                      {formatDate(ticketData.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Payment & Submission */}
        <div className="space-y-6">
          {/* Payment */}
          <div className="bg-[#0E0909] border border-white/5 rounded-xl p-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-5">
              Payment Details
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CreditCard className="w-[14px] h-[14px] text-white/30 mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/40 mb-0.5">Payment Type</p>
                  <div className="text-sm font-medium break-words">
                    <span className={`inline-flex text-xs px-2 py-1 rounded border ${getPaymentColor(ticketData.selectedPlan)}`}>
                      {getPaymentLabel(ticketData.selectedPlan)}
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
                          Owes: R{ticketData.outstandingBalance.toLocaleString()}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {ticketData.paymentMethod && (
                <div className="flex items-start gap-3">
                  <Tag className="w-[14px] h-[14px] text-white/30 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/40 mb-0.5">Payment Method</p>
                    <div className="text-sm font-medium text-white break-words capitalize">
                      {ticketData.paymentMethod}
                    </div>
                  </div>
                </div>
              )}

              {ticketData.transactionId && (
                <div className="flex items-start gap-3">
                  <FileText className="w-[14px] h-[14px] text-white/30 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/40 mb-0.5">Transaction ID</p>
                    <div className="text-sm font-medium text-white break-words font-mono text-xs">
                      {ticketData.transactionId}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submission */}
          <div className="bg-[#0E0909] border border-white/5 rounded-xl p-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-5">
              Submission Info
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-[14px] h-[14px] text-white/30 mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/40 mb-0.5">Submitted On</p>
                  <div className="text-sm font-medium text-white break-words">
                    {formatDate(ticketData.submittedAt || ticketData.createdAt)}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-[14px] h-[14px] text-white/30 mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/40 mb-0.5">Last Updated</p>
                  <div className="text-sm font-medium text-white break-words">
                    {formatDate(ticketData.updatedAt)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          {/* <div className="bg-[#0E0909] border border-white/5 rounded-xl p-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">
              Actions
            </h2>
            <div className="space-y-2">
              {isPartial && ticketData.status !== "confirmed" && (
                <button 
                  onClick={handleSendPaymentLink}
                  disabled={sendingLink}
                  className="w-full px-4 py-2.5 text-sm font-medium text-[#050505] bg-gradient-to-r from-[#C9A227] to-[#DFBA3A] rounded-lg hover:shadow-lg hover:shadow-[#C9A227]/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {sendingLink ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Payment Reminder
                    </>
                  )}
                </button>
              )}
              
              {isPartial && hasCallbackData && (
                <button 
                  onClick={() => {
                    // Open WhatsApp or call
                    const value = ticketData.contactValue;
                    if (ticketData.contactMethod === "WhatsApp" && value) {
                      window.open(`https://wa.me/${value.replace(/[^0-9]/g, '')}`, '_blank');
                    } else if (ticketData.contactMethod === "Direct Contact" && value) {
                      window.location.href = `tel:${value}`;
                    } else if (ticketData.contactMethod === "Email" && value) {
                      window.location.href = `mailto:${value}`;
                    }
                  }}
                  className="w-full px-4 py-2.5 text-sm font-medium text-white/60 border border-white/10 rounded-lg hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Contact {ticketData.contactMethod || 'Applicant'}
                </button>
              )}
              
              <button 
                onClick={() => window.open(`/ticket/${ticketData._id}`, '_blank')}
                className="w-full px-4 py-2.5 text-sm font-medium text-white/60 border border-white/10 rounded-lg hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                View Public Ticket
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;