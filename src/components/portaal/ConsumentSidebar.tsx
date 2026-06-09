"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Car, LayoutDashboard, FileText, MessageSquare,
  Bell, Settings, LogOut, Plus, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV = [
  { href: "/portaal", label: "Overzicht", icon: LayoutDashboard, exact: true },
  { href: "/portaal/aanvragen", label: "Mijn aanvragen", icon: FileText, badge: "2" },
  { href: "/portaal/aanbiedingen", label: "Aanbiedingen", icon: Bell, badge: "3", badgeColor: "bg-blue-600" },
  { href: "/portaal/berichten", label: "Berichten", icon: MessageSquare, badge: "1", badgeColor: "bg-red-500" },
  { href: "/portaal/instellingen", label: "Instellingen", icon: Settings },
];

export default function ConsumentSidebar() {
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
        <div className="mt-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-700">
            JV
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-slate-900 truncate">Jan de Vries</div>
            <div className="text-xs text-slate-500 truncate">jan@voorbeeld.nl</div>
          </div>
        </div>
      </div>

      {/* New request CTA */}
      <div className="p-4">
        <Link href="/zoeken">
          <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl gap-2 text-sm">
            <Plus className="w-4 h-4" />
            Nieuwe zoekopdracht
          </Button>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {NAV.map(item => {
          const Icon = item.icon;
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
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
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full text-white ${
                  active ? "bg-white/20" : (item.badgeColor || "bg-slate-400")
                }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-slate-100 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          Terug naar homepage
        </Link>
        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all text-left">
          <LogOut className="w-4 h-4" />
          Uitloggen
        </button>
      </div>
    </aside>
  );
}
