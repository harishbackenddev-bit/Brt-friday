// pages/admin/BRTTickets.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  Eye, 
  Send,
  Funnel
} from "lucide-react";

interface Ticket {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  category: "Entrepreneur" | "Investor" | "Professional";
  paymentType: "Full Payment" | "Partial Payment";
  amountPaid: number;
  totalAmount: number;
  contactMethod?: string;
  contactValue?: string;
  businessUrl?: string;
  companyName?: string;
  jobTitle?: string;
  submittedOn?: string;
  status?: "approved" | "pending" | "rejected";
}

const BRTTickets = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPayment, setFilterPayment] = useState("All");

  const tickets: Ticket[] = [
    {
      id: "BRT-001",
      firstName: "Sipho",
      lastName: "Dlamini",
      email: "sipho.dlamini@techventures.co.za",
      phone: "+27 82 345 6789",
      category: "Entrepreneur",
      paymentType: "Full Payment",
      amountPaid: 2000,
      totalAmount: 2000,
      businessUrl: "https://techventures.co.za",
      companyName: "TechVentures",
      jobTitle: "Founder & CEO",
      submittedOn: "10 June 2026 at 14:45",
      status: "approved",
    },
    {
      id: "BRT-002",
      firstName: "Amara",
      lastName: "Osei",
      email: "amara.osei@capitalgroup.com",
      phone: "+27 71 234 5678",
      category: "Investor",
      paymentType: "Full Payment",
      amountPaid: 2000,
      totalAmount: 2000,
      businessUrl: "https://capitalgroup.com",
      companyName: "Capital Group",
      jobTitle: "Investment Director",
      submittedOn: "09 June 2026 at 10:30",
      status: "approved",
    },
    {
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
    {
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
    {
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
    {
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
  ];

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
    return paymentType === "Full Payment" 
      ? "text-green-400 bg-green-400/10 border-green-400/30"
      : "text-orange-400 bg-orange-400/10 border-orange-400/30";
  };

  const handleViewDetails = (ticketId: string) => {
    navigate(`/admin/brt-tickets/${ticketId}`);
  };

  // Stats
  const totalApplications = tickets.length;
  const fullPayment = tickets.filter(t => t.paymentType === "Full Payment").length;
  const partialPayment = tickets.filter(t => t.paymentType === "Partial Payment").length;
  const totalCollected = tickets.reduce((sum, t) => sum + t.amountPaid, 0);
  const totalOutstanding = tickets.reduce((sum, t) => sum + (t.totalAmount - t.amountPaid), 0);

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch = 
      ticket.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterPayment === "All" || ticket.paymentType === filterPayment;
    return matchesSearch && matchesFilter;
  });

  const paymentFilters = ["All", "Full Payment", "Partial Payment"];

  return (
    <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar bg-[#050505]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">BRT Tickets</h1>
        <p className="text-white/40">Review and manage ticket applications for BRT150 2027</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 mb-8">
        <div className="bg-[#0E0909] border border-white/5 rounded-xl p-4">
          <p className="text-[11px] text-white/40 mb-1 leading-tight">Total Applications</p>
          <p className="text-xl font-bold text-white">{totalApplications}</p>
        </div>
        <div className="bg-[#0E0909] border border-white/5 rounded-xl p-4">
          <p className="text-[11px] text-white/40 mb-1 leading-tight">Full Payment</p>
          <p className="text-xl font-bold text-green-400">{fullPayment}</p>
        </div>
        <div className="bg-[#0E0909] border border-white/5 rounded-xl p-4">
          <p className="text-[11px] text-white/40 mb-1 leading-tight">Partial Payment</p>
          <p className="text-xl font-bold text-orange-400">{partialPayment}</p>
        </div>
        <div className="bg-[#0E0909] border border-white/5 rounded-xl p-4">
          <p className="text-[11px] text-white/40 mb-1 leading-tight">Collected</p>
          <p className="text-xl font-bold text-[#C9A227]">R{totalCollected.toLocaleString()}</p>
        </div>
        <div className="bg-[#0E0909] border border-white/5 rounded-xl p-4">
          <p className="text-[11px] text-white/40 mb-1 leading-tight">Outstanding</p>
          <p className="text-xl font-bold text-orange-400">R{totalOutstanding.toLocaleString()}</p>
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
                <th className="px-5 py-3.5 text-left text-xs font-medium text-white/30 uppercase tracking-wide whitespace-nowrap">ID</th>
                <th className="px-5 py-3.5 text-left text-xs font-medium text-white/30 uppercase tracking-wide whitespace-nowrap">First Name</th>
                <th className="px-5 py-3.5 text-left text-xs font-medium text-white/30 uppercase tracking-wide whitespace-nowrap">Last Name</th>
                <th className="px-5 py-3.5 text-left text-xs font-medium text-white/30 uppercase tracking-wide whitespace-nowrap">Email Address</th>
                <th className="px-5 py-3.5 text-left text-xs font-medium text-white/30 uppercase tracking-wide whitespace-nowrap">Phone Number</th>
                <th className="px-5 py-3.5 text-left text-xs font-medium text-white/30 uppercase tracking-wide whitespace-nowrap">Category</th>
                <th className="px-5 py-3.5 text-left text-xs font-medium text-white/30 uppercase tracking-wide whitespace-nowrap">Payment</th>
                <th className="px-5 py-3.5 text-left text-xs font-medium text-white/30 uppercase tracking-wide whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-5 py-4 font-mono text-xs text-white/30 whitespace-nowrap">{ticket.id}</td>
                  <td className="px-5 py-4 font-medium text-white whitespace-nowrap">{ticket.firstName}</td>
                  <td className="px-5 py-4 font-medium text-white whitespace-nowrap">{ticket.lastName}</td>
                  <td className="px-5 py-4 text-white/50">{ticket.email}</td>
                  <td className="px-5 py-4 text-white/50 whitespace-nowrap">{ticket.phone}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs px-2 py-1 rounded border whitespace-nowrap ${getCategoryColor(ticket.category)}`}>
                      {ticket.category}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="space-y-1">
                      <span className={`text-xs px-2 py-1 rounded border whitespace-nowrap ${getPaymentColor(ticket.paymentType)}`}>
                        {ticket.paymentType}
                      </span>
                      {ticket.paymentType === "Partial Payment" && (
                        <>
                          <div className="text-xs text-white/30">
                            <span className="text-green-400">R{ticket.amountPaid.toLocaleString()}</span>
                            <span className="mx-1">/</span>
                            <span>R{ticket.totalAmount.toLocaleString()}</span>
                          </div>
                          <div className="text-orange-400 text-xs mt-0.5">
                            Owes: R{(ticket.totalAmount - ticket.amountPaid).toLocaleString()}
                          </div>
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
                    <div className="flex items-center gap-1.5">
                      <button 
                        onClick={() => handleViewDetails(ticket.id)}
                        title="View details" 
                        className="p-1.5 hover:bg-[#C9A227]/10 rounded transition-colors"
                      >
                        <Eye className="w-[15px] h-[15px] text-[#C9A227]" />
                      </button>
                      {ticket.paymentType === "Partial Payment" && (
                        <button 
                          title="Send payment link" 
                          className="p-1.5 hover:bg-blue-400/10 rounded transition-colors"
                        >
                          <Send className="w-[15px] h-[15px] text-blue-400" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BRTTickets;