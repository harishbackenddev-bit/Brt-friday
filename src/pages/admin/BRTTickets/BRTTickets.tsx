// pages/admin/BRTTickets.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  Eye, 
  Send,
  Funnel,
  Loader2
} from "lucide-react";

interface Ticket {
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
  contactMethod?: string;
  contactValue?: string;
  companyName?: string;
  businessUrl?: string;
  linkedInUrl?: string;
  projectDescription?: string;
  createdAt?: string;
  updatedAt?: string;
  // ✅ NEW: manual partial-payment workflow status (see ticket-schema.ts)
  partialWorkflowStatus?: string | null;
  depositAmount?: number | null;
  paymentLink?: string | null;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    totalTickets: number;
    fullPaymentCount: number;
    partialPaymentCount: number;
    tickets: Ticket[];
  };
}

// ✅ NOTE: this already includes '/api' — routes below must NOT
// prepend another '/api' segment.
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const BRTTickets = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPayment, setFilterPayment] = useState("All");
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sendingLinkFor, setSendingLinkFor] = useState<string | null>(null);

  // Stats
  const [stats, setStats] = useState({
    totalApplications: 0,
    fullPayment: 0,
    partialPayment: 0,
    totalCollected: 0,
    totalOutstanding: 0,
  });

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");

      // ✅ FIXED: was `${API_BASE_URL}/api/admin/tickets`, which doubled
      // the /api segment (API_BASE_URL already ends in /api).
      const response = await fetch(`${API_BASE_URL}/api/admin/tickets`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch tickets');
      }
      
      const result: ApiResponse = await response.json();
      
      if (result.success && result.data) {
        // Extract tickets from the nested data structure
        const ticketList = result.data.tickets || [];
        setTickets(ticketList);
        
        // Use the stats from the API response
        setStats({
          totalApplications: result.data.totalTickets || ticketList.length,
          fullPayment: result.data.fullPaymentCount || 0,
          partialPayment: result.data.partialPaymentCount || 0,
          totalCollected: ticketList.reduce((sum, t) => sum + (t.amountPaid || 0), 0),
          totalOutstanding: ticketList.reduce((sum, t) => sum + (t.outstandingBalance || 0), 0),
        });
      } else {
        throw new Error(result.message || 'Failed to fetch tickets');
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
      setError(error instanceof Error ? error.message : 'Failed to load tickets');
    } finally {
      setLoading(false);
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
      default: return role || "Unknown";
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
    switch (status?.toLowerCase()) {
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

  const handleViewDetails = (mongoId: string) => {
    navigate(`/admin/brt-tickets/${mongoId}`);
  };

  // ✅ FIXED: previously POSTed to a nonexistent
  // '/api/tickets/:id/send-payment-link' route with no body — there was
  // no actual payment link being sent anywhere. This now:
  //   1. Prompts the admin for the PayFast link + deposit amount
  //      (matches the manual workflow: staff creates the link in the
  //      PayFast dashboard themselves, then pastes it here)
  //   2. Calls the real endpoint, keyed by the ticket's `ticketId`
  //      string (e.g. "BRT-2026-0042") — NOT the Mongo `_id`, since
  //      that's what the partial-payment routes expect
  const handleSendPaymentLink = async (ticket: Ticket) => {
    const paymentLink = window.prompt(
      `Paste the PayFast payment link for ${ticket.firstName} ${ticket.lastName} (${ticket.ticketId}):`
    );
    if (!paymentLink) return;

    const depositAmountStr = window.prompt(
      `Deposit amount for this link (R), out of R${ticket.totalAmount}:`,
      String(ticket.depositAmount ?? Math.round(ticket.totalAmount / 2))
    );
    if (!depositAmountStr) return;

    const depositAmount = Number(depositAmountStr);
    if (isNaN(depositAmount) || depositAmount <= 0) {
      alert("Please enter a valid deposit amount.");
      return;
    }

    setSendingLinkFor(ticket._id);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_BASE_URL}/api/admin/partial-payments/${ticket.ticketId}/payment-link`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ paymentLink, depositAmount }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to send payment link');
      }

      alert(result.message || 'Payment link sent successfully!');
      fetchTickets(); // refresh so the row reflects the new workflow status
    } catch (error) {
      console.error('Error sending payment link:', error);
      alert(error instanceof Error ? error.message : 'Failed to send payment link. Please try again.');
    } finally {
      setSendingLinkFor(null);
    }
  };

  const filteredTickets = tickets.filter((ticket) => {
    const fullName = `${ticket.firstName || ''} ${ticket.lastName || ''}`.toLowerCase();
    const matchesSearch = 
      fullName.includes(searchTerm.toLowerCase()) ||
      (ticket.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ticket.ticketId || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterPayment === "All" || ticket.selectedPlan === filterPayment.toLowerCase().replace(" ", "");
    return matchesSearch && matchesFilter;
  });

  const paymentFilters = ["All", "Full Payment", "Partial Payment"];

  // A partial ticket can still be sent a link if it hasn't reached a
  // terminal workflow state yet (Fully Paid / Ticket Issued).
  const canSendPaymentLink = (ticket: Ticket) => {
    if (ticket.selectedPlan !== "partial") return false;
    const terminal = ["Fully Paid", "Ticket Issued"];
    return !terminal.includes(ticket.partialWorkflowStatus || "");
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#050505]">
        <div className="flex items-center gap-3 text-white/40">
          <Loader2 className="w-5 h-5 animate-spin" />
          Loading tickets...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#050505]">
        <div className="text-red-400 text-lg mb-3">Error loading tickets</div>
        <p className="text-white/40 mb-4">{error}</p>
        <button
          onClick={fetchTickets}
          className="px-4 py-2 text-sm text-[#C9A227] border border-[#C9A227]/30 rounded-lg hover:bg-[#C9A227]/10 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar bg-[#050505]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">BRT Tickets</h1>
        <p className="text-white/40">Review and manage ticket applications for BRT150 2026</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 mb-8">
        <div className="bg-[#0E0909] border border-white/5 rounded-xl p-4">
          <p className="text-[11px] text-white/40 mb-1 leading-tight">Total Applications</p>
          <p className="text-xl font-bold text-white">{stats.totalApplications}</p>
        </div>
        <div className="bg-[#0E0909] border border-white/5 rounded-xl p-4">
          <p className="text-[11px] text-white/40 mb-1 leading-tight">Full Payment</p>
          <p className="text-xl font-bold text-green-400">{stats.fullPayment}</p>
        </div>
        <div className="bg-[#0E0909] border border-white/5 rounded-xl p-4">
          <p className="text-[11px] text-white/40 mb-1 leading-tight">Partial Payment</p>
          <p className="text-xl font-bold text-orange-400">{stats.partialPayment}</p>
        </div>
        <div className="bg-[#0E0909] border border-white/5 rounded-xl p-4">
          <p className="text-[11px] text-white/40 mb-1 leading-tight">Collected</p>
          <p className="text-xl font-bold text-[#C9A227]">R{stats.totalCollected.toLocaleString()}</p>
        </div>
        <div className="bg-[#0E0909] border border-white/5 rounded-xl p-4">
          <p className="text-[11px] text-white/40 mb-1 leading-tight">Outstanding</p>
          <p className="text-xl font-bold text-orange-400">R{stats.totalOutstanding.toLocaleString()}</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-white/30" />
          <input
            type="text"
            placeholder="Search by name, email, or ticket ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-[#0A0707] border border-white/7 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A227] text-white placeholder-white/30 text-sm"
          />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Funnel className="w-[15px] h-[15px] text-white/30" />
          {paymentFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setFilterPayment(filter)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors border whitespace-nowrap ${
                filterPayment === filter
                  ? "bg-[#C9A227] text-[#050505] border-[#C9A227]"
                  : "bg-[#0A0707] border-white/7 text-white/40 hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0E0909] border border-white/5 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/5 border-b border-white/5">
              <tr>
                <th className="px-5 py-3.5 text-left text-xs font-medium text-white/30 uppercase tracking-wide whitespace-nowrap">Ticket ID</th>
                <th className="px-5 py-3.5 text-left text-xs font-medium text-white/30 uppercase tracking-wide whitespace-nowrap">First Name</th>
                <th className="px-5 py-3.5 text-left text-xs font-medium text-white/30 uppercase tracking-wide whitespace-nowrap">Last Name</th>
                <th className="px-5 py-3.5 text-left text-xs font-medium text-white/30 uppercase tracking-wide whitespace-nowrap">Email</th>
                <th className="px-5 py-3.5 text-left text-xs font-medium text-white/30 uppercase tracking-wide whitespace-nowrap">Phone</th>
                <th className="px-5 py-3.5 text-left text-xs font-medium text-white/30 uppercase tracking-wide whitespace-nowrap">Role</th>
                <th className="px-5 py-3.5 text-left text-xs font-medium text-white/30 uppercase tracking-wide whitespace-nowrap">Payment</th>
                <th className="px-5 py-3.5 text-left text-xs font-medium text-white/30 uppercase tracking-wide whitespace-nowrap">Status</th>
                <th className="px-5 py-3.5 text-left text-xs font-medium text-white/30 uppercase tracking-wide whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-5 py-8 text-center text-white/30">
                    No tickets found
                  </td>
                </tr>
              ) : (
                filteredTickets.map((ticket) => (
                  <tr key={ticket._id} className="hover:bg-white/5 transition-colors">
                    <td className="px-5 py-4 font-mono text-xs text-white/30 whitespace-nowrap">{ticket.ticketId || 'N/A'}</td>
                    <td className="px-5 py-4 font-medium text-white whitespace-nowrap">{ticket.firstName || 'N/A'}</td>
                    <td className="px-5 py-4 font-medium text-white whitespace-nowrap">{ticket.lastName || 'N/A'}</td>
                    <td className="px-5 py-4 text-white/50 max-w-[150px] truncate">{ticket.email || 'N/A'}</td>
                    <td className="px-5 py-4 text-white/50 whitespace-nowrap">{ticket.phoneNumber || 'N/A'}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs px-2 py-1 rounded border whitespace-nowrap ${getCategoryColor(ticket.selectedRole)}`}>
                        {getCategoryLabel(ticket.selectedRole)}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="space-y-1">
                        <span className={`text-xs px-2 py-1 rounded border whitespace-nowrap ${getPaymentColor(ticket.selectedPlan)}`}>
                          {getPaymentLabel(ticket.selectedPlan)}
                        </span>
                        {ticket.selectedPlan === "partial" && (
                          <>
                            <div className="text-xs text-white/30">
                              <span className="text-green-400">R{ticket.amountPaid?.toLocaleString() || 0}</span>
                              <span className="mx-1">/</span>
                              <span>R{ticket.totalAmount?.toLocaleString() || 0}</span>
                            </div>
                            <div className="text-orange-400 text-xs mt-0.5">
                              Owes: R{ticket.outstandingBalance?.toLocaleString() || 0}
                            </div>
                            {ticket.partialWorkflowStatus && (
                              <div className="text-xs text-[#C9A227] mt-0.5">
                                {ticket.partialWorkflowStatus}
                              </div>
                            )}
                            {/* Show contact method from callback request */}
                            {ticket.contactMethod && ticket.contactValue && (
                              <div className="text-xs text-white/30">
                                {ticket.contactMethod}: <span className="text-white">{ticket.contactValue}</span>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs px-2 py-1 rounded border whitespace-nowrap ${getStatusColor(ticket.status)}`}>
                        {ticket.status || 'Pending'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <button 
                          onClick={() => handleViewDetails(ticket._id)}
                          title="View details" 
                          className="p-1.5 hover:bg-[#C9A227]/10 rounded transition-colors"
                        >
                          <Eye className="w-[15px] h-[15px] text-[#C9A227]" />
                        </button>
                        {canSendPaymentLink(ticket) && (
                          <button 
                            onClick={() => handleSendPaymentLink(ticket)}
                            disabled={sendingLinkFor === ticket._id}
                            title="Send payment link" 
                            className="p-1.5 hover:bg-blue-400/10 rounded transition-colors disabled:opacity-40"
                          >
                            {sendingLinkFor === ticket._id ? (
                              <Loader2 className="w-[15px] h-[15px] text-blue-400 animate-spin" />
                            ) : (
                              <Send className="w-[15px] h-[15px] text-blue-400" />
                            )}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BRTTickets;