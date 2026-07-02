// pages/admin/Events.tsx
import React, { useState } from "react";
import { 
  Plus, 
  Search, 
  Calendar as CalendarIcon, 
  MapPin, 
  Users, 
  Eye,
  SquarePen,
  Trash2,
  ChevronDown
} from "lucide-react";

interface Event {
  id: number;
  title: string;
  status: "Upcoming" | "Ongoing" | "Completed" | "Cancelled";
  type: "Conference" | "Workshop" | "Networking" | "Webinar";
  date: string;
  location: string;
  registered: number;
  capacity: number;
  price: string;
  progress: number;
}

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const events: Event[] = [
    {
      id: 1,
      title: "Startup Investor Summit 2026",
      status: "Upcoming",
      type: "Conference",
      date: "15/05/2026 at 09:00 AM",
      location: "San Francisco Convention Center",
      registered: 423,
      capacity: 500,
      price: "$299",
      progress: 85,
    },
    {
      id: 2,
      title: "Due Diligence Masterclass",
      status: "Upcoming",
      type: "Workshop",
      date: "08/05/2026 at 02:00 PM",
      location: "Virtual",
      registered: 87,
      capacity: 100,
      price: "$149",
      progress: 87,
    },
    {
      id: 3,
      title: "Angel Investor Networking",
      status: "Ongoing",
      type: "Networking",
      date: "30/04/2026 at 06:00 PM",
      location: "WeWork Downtown",
      registered: 72,
      capacity: 80,
      price: "Free",
      progress: 90,
    },
    {
      id: 4,
      title: "Founder Pitch Night Q2",
      status: "Completed",
      type: "Networking",
      date: "25/04/2026 at 07:00 PM",
      location: "Tech Hub Auditorium",
      registered: 134,
      capacity: 150,
      price: "Free",
      progress: 89,
    },
    {
      id: 5,
      title: "Term Sheet Negotiation Workshop",
      status: "Upcoming",
      type: "Webinar",
      date: "20/05/2026 at 10:00 AM",
      location: "Virtual",
      registered: 156,
      capacity: 200,
      price: "$99",
      progress: 78,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "text-blue-400 bg-blue-400/10 border-blue-400/30";
      case "Ongoing":
        return "text-green-400 bg-green-400/10 border-green-400/30";
      case "Completed":
        return "text-muted-foreground bg-muted/10 border-border";
      case "Cancelled":
        return "text-red-400 bg-red-400/10 border-red-400/30";
      default:
        return "text-muted-foreground bg-muted/10 border-border";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Conference":
        return "text-purple-400 bg-purple-400/10 border-purple-400/30";
      case "Workshop":
        return "text-orange-400 bg-orange-400/10 border-orange-400/30";
      case "Networking":
        return "text-cyan-400 bg-cyan-400/10 border-cyan-400/30";
      case "Webinar":
        return "text-pink-400 bg-pink-400/10 border-pink-400/30";
      default:
        return "text-muted-foreground bg-muted/10 border-border";
    }
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "All" || event.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Stats
  const totalEvents = events.length;
  const upcomingEvents = events.filter(e => e.status === "Upcoming").length;
  const totalAttendees = events.reduce((sum, e) => sum + e.registered, 0);
  const totalRevenue = events.reduce((sum, e) => {
    if (e.price === "Free") return sum;
    const priceNum = parseInt(e.price.replace('$', ''));
    return sum + (priceNum * e.registered);
  }, 0);

  const statusOptions = ["All", "Upcoming", "Ongoing", "Completed", "Cancelled"];

  return (
    <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Events &amp; Tickets</h1>
          <p className="text-white/40">Manage events and registrations</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#C9A227] to-[#DFBA3A] text-[#050505] rounded-lg hover:shadow-lg hover:shadow-[#C9A227]/25 transition-all">
          <Plus className="w-[18px] h-[18px]" />
          Add Event
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#0E0909]/30 backdrop-blur-xl border border-white/5 rounded-xl p-6">
          <p className="text-sm text-white/40 mb-1">Total Events</p>
          <p className="text-3xl font-bold text-white">{totalEvents}</p>
        </div>
        <div className="bg-[#0E0909]/30 backdrop-blur-xl border border-white/5 rounded-xl p-6">
          <p className="text-sm text-white/40 mb-1">Upcoming</p>
          <p className="text-3xl font-bold text-blue-400">{upcomingEvents}</p>
        </div>
        <div className="bg-[#0E0909]/30 backdrop-blur-xl border border-white/5 rounded-xl p-6">
          <p className="text-sm text-white/40 mb-1">Total Attendees</p>
          <p className="text-3xl font-bold text-green-400">{totalAttendees}</p>
        </div>
        <div className="bg-[#0E0909]/30 backdrop-blur-xl border border-white/5 rounded-xl p-6">
          <p className="text-sm text-white/40 mb-1">Revenue</p>
          <p className="text-3xl font-bold text-[#C9A227]">${totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-white/30" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-[#0A0707] border border-white/7 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A227] text-white placeholder-white/30"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-3 bg-[#0A0707] border border-white/7 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A227] text-white"
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="bg-[#0E0909]/30 backdrop-blur-xl border border-white/5 rounded-xl p-6 hover:border-[#C9A227]/50 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-medium text-lg text-white mb-2">{event.title}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs px-2 py-1 border rounded ${getStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                  <span className={`text-xs px-2 py-1 border rounded ${getTypeColor(event.type)}`}>
                    {event.type}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-[#C9A227]/10 rounded-lg transition-colors">
                  <SquarePen className="w-4 h-4 text-[#C9A227]" />
                </button>
                <button className="p-2 hover:bg-red-400/10 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-white/40">
                <CalendarIcon className="w-4 h-4" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/40">
                <MapPin className="w-4 h-4" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/40">
                <Users className="w-4 h-4" />
                <span>{event.registered} / {event.capacity} registered</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <div>
                <p className="text-sm text-white/40">Price</p>
                <p className="text-lg font-medium text-white">{event.price}</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#C9A227]/10 text-[#C9A227] border border-[#C9A227]/30 rounded-lg hover:bg-[#C9A227]/20 transition-colors">
                <Eye className="w-4 h-4" />
                View Details
              </button>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-white/30 mb-1">
                <span>Registration Progress</span>
                <span>{event.progress}%</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#C9A227] to-[#DFBA3A] transition-all"
                  style={{ width: `${event.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;