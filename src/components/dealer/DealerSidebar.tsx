"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Car, LayoutDashboard, Users, Package, GitMerge, CreditCard, FileText, Settings, LogOut, Bell, MessageSquare } from "lucide-react";

const NAV = [
  { href: "/dealer/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dealer/leads", label: "Leads", icon: Users, badge: "12" },
  { href: "/dealer/voorraad", label: "Mijn voorraad", icon: Package },
  { href: "/dealer/matches", label: "Matches", icon: GitMerge, badge: "3" },
  { href: "/dealer/berichten", label: "Berichten", icon: MessageSquare, badge: "2" },
  { href: "/dealer/credits", label: "Credits", icon: CreditCard },
  { href: "/dealer/facturen", label: "Facturen", icon: FileText },
  { href: "/dealer/instellingen", label: "Instellingen", icon: Settings },
];

export default function DealerSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-slate-100 flex flex-col sticky top-0 h-screen">
      {/* Logo */}
      <div className="p-5 border-b border-slate-100">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-slate-900">
          <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center">
            <Car className="w-4 h-4 text-white" />
          </div>
          AutoMatch
        </Link>
        <div className="mt-2 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-900">AutoHuis Rotterdam</div>
            <div className="text-xs text-slate-500">Dealer dashboard</div>
          </div>
          <button className="relative p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
            <Bell className="w-4 h-4 text-slate-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
        </div>
      </div>

      {/* Credits indicator */}
      <div className="px-4 py-3 mx-4 mt-4 bg-slate-50 rounded-xl border border-slate-100">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium text-slate-600">Credits resterend</span>
          <span className="text-xs text-blue-600 font-semibold">Kopen →</span>
        </div>
        <div className="text-xl font-bold text-slate-900">24</div>
        <div className="mt-2 h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 rounded-full" style={{ width: "24%" }} />
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV.map(item => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                active
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${active ? "text-white" : "text-slate-400 group-hover:text-slate-600"}`} />
                {item.label}
              </div>
              {item.badge && (
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${active ? "bg-white/20 text-white" : "bg-blue-100 text-blue-700"}`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-slate-100">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold text-slate-600">
            AH
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-slate-900 truncate">AutoHuis Rotterdam</div>
            <div className="text-xs text-slate-500">dealer@autohuis.nl</div>
          </div>
          <button className="text-slate-400 hover:text-slate-600 transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
