// pages/TicketPage.tsx
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Loader2, AlertCircle, Home } from 'lucide-react';
import Logo from '@/assets/home/logo.png';
import TicketStep from '@/components/auth/TicketStep';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface TicketData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  selectedPlan: 'full' | 'partial';
  ticketId: string;
  paymentStatus: string;
  status: string;
  amountPaid: number;
  totalAmount: number;
}

const Ticket = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [selectedPlan, setSelectedPlan] = useState<'full' | 'partial' | null>(null);
  const [ticketId, setTicketId] = useState<string>('');

  const ticketRef = searchParams.get('ref') || searchParams.get('ticketId');

  useEffect(() => {
    const fetchTicket = async () => {
      if (!ticketRef) {
        setError('No ticket reference found');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/payments/tickets/${ticketRef}`);
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || 'Failed to fetch ticket');
        }

        const data = result.data;
        setFormData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          phone: data.phoneNumber || '',
        });
        setSelectedPlan(data.selectedPlan || null);
        setTicketId(data.ticketId || ticketRef);
        setLoading(false);

      } catch (err) {
        console.error('Error fetching ticket:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch ticket');
        setLoading(false);
      }
    };

    fetchTicket();
  }, [ticketRef]);

  // If loading, show loader
  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-[#C9A227]" />
          <p className="text-white/40 text-sm">Loading your ticket...</p>
        </div>
      </div>
    );
  }

  // If error, show error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
          <p className="text-white/40 text-sm mb-6">{error}</p>
          <div className="flex gap-3 justify-center">
            <button 
              onClick={() => navigate('/')}
              className="px-6 py-2.5 bg-[#C9A227] text-[#050505] rounded-lg hover:bg-[#DFBA3A] transition-colors font-medium flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Go Home
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 border border-white/10 text-white/60 rounded-lg hover:bg-white/5 transition-colors font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Success - Show Ticket
  return (
    <div className="min-h-screen bg-[#050505] font-['Manrope']">
      {/* Minimal Navigation - Only Logo and Back */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/85 backdrop-blur-[20px] border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-6 h-[62px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
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
            </Link>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </nav>

      {/* Main Content - Just Ticket Step */}
      <div className="min-h-screen pt-[62px] bg-[#050505]">
        <div className="max-w-[680px] mx-auto px-6 py-16">
          {/* Ticket ID Badge */}
          <div className="text-center mb-6">
            <span className="inline-block px-4 py-1.5 text-xs font-mono text-white/30 bg-white/5 border border-white/5 rounded-full">
              Ticket #{ticketId}
            </span>
          </div>

          {/* Ticket Step Component */}
          <TicketStep formData={formData} selectedPlan={selectedPlan} />
        </div>
      </div>
    </div>
  );
};

export default Ticket;