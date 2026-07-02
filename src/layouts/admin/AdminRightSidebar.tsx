// layouts/admin/AdminRightSidebar.tsx
import React from "react";
import { 
  Shield, 
  DollarSign, 
  Upload, 
  Eye, 
  CircleAlert, 
  MessageSquare,
  Calendar,
  Ticket,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Activity
} from "lucide-react";

interface AdminRightSidebarProps {
  isOpen?: boolean;
}

const AdminRightSidebar = ({ isOpen = true }: AdminRightSidebarProps) => {
  const activities = [
    {
      id: 1,
      initials: "AD",
      name: "Admin",
      action: "approved founder",
      target: "Michael Chen - Quantum Bio",
      icon: Shield,
      iconColor: "text-green-400",
      time: "5m ago",
    },
    {
      id: 2,
      initials: "SJ",
      name: "Sarah Jones",
      action: "submitted soft commit",
      target: "$1.5M SAFE",
      icon: DollarSign,
      iconColor: "text-[#C9A227]",
      time: "12m ago",
    },
    {
      id: 3,
      initials: "DK",
      name: "David Kim",
      action: "uploaded",
      target: "Pitch Deck v4.2",
      icon: Upload,
      iconColor: "text-[#C9A227]",
      time: "28m ago",
    },
    {
      id: 4,
      initials: "LW",
      name: "Lisa Wang",
      action: "requested access to",
      target: "NeuralFlow AI deal room",
      icon: Eye,
      iconColor: "text-blue-400",
      time: "45m ago",
    },
    {
      id: 5,
      initials: "SY",
      name: "System",
      action: "flagged",
      target: "Delayed Q&A response",
      icon: CircleAlert,
      iconColor: "text-red-400",
      time: "1h ago",
    },
    {
      id: 6,
      initials: "TA",
      name: "Tom Anderson",
      action: "posted question in",
      target: "Apex Dynamics Q&A",
      icon: MessageSquare,
      iconColor: "text-[#C9A227]",
      time: "2h ago",
    },
  ];

  const systemStatus = [
    { label: "Platform Health", value: "Operational", status: "success" },
    { label: "Active Users", value: "127", status: "info" },
    { label: "Pending Actions", value: "8", status: "warning" },
  ];

  const events = [
    {
      title: "Startup Investor Summit 2026",
      type: "Conference",
      price: "$299",
      progress: 85,
    },
    {
      title: "Due Diligence Masterclass",
      type: "Workshop",
      price: "$149",
      progress: 87,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-400 bg-green-400/10 border-green-400/30";
      case "warning":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30";
      case "info":
        return "text-[#C9A227] bg-[#C9A227]/10 border-[#C9A227]/30";
      default:
        return "text-white/30 bg-white/5 border-white/10";
    }
  };

  if (!isOpen) return null;

  return (
    <aside className="hidden lg:block fixed right-0 top-16 bottom-0 z-20 w-80 border-l border-white/5 overflow-y-auto custom-scrollbar bg-[#0A0707]/50">
      <div className="p-6">
        {/* Activity Feed */}
        <div className="bg-[#0E0909]/30 backdrop-blur-xl border border-white/5 rounded-xl p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold tracking-tight mb-1 text-white">Platform Activity Feed</h3>
            <p className="text-xs text-white/30">Real-time system events</p>
          </div>

          <div className="space-y-4">
            {activities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-white/5 last:border-0 last:pb-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9A227]/20 to-[#DFBA3A]/10 flex items-center justify-center text-xs font-bold shrink-0 text-white/80">
                    {activity.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 mb-1">
                      <Icon className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${activity.iconColor}`} />
                      <p className="text-xs leading-relaxed">
                        <span className="font-medium text-white">{activity.name}</span>
                        <span className="text-white/40"> {activity.action} </span>
                        <span className="font-medium text-white">{activity.target}</span>
                      </p>
                    </div>
                    <p className="text-xs text-white/25">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* System Status */}
          <div className="mt-6 pt-6 border-t border-white/5">
            <h4 className="text-sm font-bold mb-3 tracking-tight text-white">System Status</h4>
            <div className="space-y-2">
              {systemStatus.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded-lg">
                  <span className="text-xs text-white/40">{item.label}</span>
                  <span className={`text-xs px-2 py-0.5 rounded border ${getStatusColor(item.status)}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-6 pt-6 border-t border-white/5">
            <h4 className="text-sm font-bold mb-3 tracking-tight text-white">Events & Tickets</h4>
            <div className="space-y-4">
              {events.map((event, index) => (
                <div key={index} className="p-4 bg-white/5 border border-white/5 rounded-xl">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium text-white">{event.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-white/30 bg-white/5 px-2 py-0.5 rounded-full">{event.type}</span>
                        <span className="text-[10px] text-white/30">{event.price}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-white/40">Progress</span>
                      <p className="text-sm font-bold text-[#C9A227]">{event.progress}%</p>
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#C9A227] to-[#DFBA3A] rounded-full transition-all duration-500"
                      style={{ width: `${event.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 pt-6 border-t border-white/5">
            <button className="w-full py-2.5 text-xs font-medium text-[#050505] bg-gradient-to-r from-[#C9A227] to-[#DFBA3A] rounded-lg hover:shadow-lg hover:shadow-[#C9A227]/25 transition-all">
              View All Activity
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminRightSidebar;