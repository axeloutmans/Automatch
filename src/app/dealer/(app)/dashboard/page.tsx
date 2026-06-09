import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DUMMY_LEADS, getLeadScoreLabel, formatCurrency, getBuyIntentUrgency } from "@/lib/data";
import {
  TrendingUp, Users, Eye, MessageSquare, Percent, CreditCard,
  ArrowUpRight, ArrowRight, Clock, BadgeCheck, Phone, PhoneOff,
  CheckCircle, AlertCircle
} from "lucide-react";
import Link from "next/link";
import DealerCharts from "@/components/dealer/DealerCharts";

export default function DashboardPage() {
  const stats = [
    { label: "Nieuwe leads", value: "12", change: "+3 vandaag", icon: Users, color: "text-blue-600", bg: "bg-blue-50", href: "/dealer/leads" },
    { label: "Nieuwe matches", value: "3", change: "+1 vandaag", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50", href: "/dealer/matches" },
    { label: "Geopende leads", value: "47", change: "deze maand", icon: Eye, color: "text-purple-600", bg: "bg-purple-50", href: "/dealer/leads" },
    { label: "Reacties verstuurd", value: "28", change: "deze maand", icon: MessageSquare, color: "text-orange-600", bg: "bg-orange-50", href: "/dealer/leads" },
    { label: "Conversieratio", value: "18%", change: "+2% vs vorige maand", icon: Percent, color: "text-slate-700", bg: "bg-slate-100", href: "/dealer/dashboard" },
    { label: "Credits resterend", value: "24", change: "van 100 · bij 0 opzegging", icon: CreditCard, color: "text-red-600", bg: "bg-red-50", href: "/dealer/credits" },
  ];

  const hotLeads = DUMMY_LEADS.filter(l => l.score >= 80 && l.verified).slice(0, 4);

  return (
    <div className="p-6 md:p-8 max-w-7xl">

      {/* Onboarding checklist (shown until completed) */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="font-bold text-blue-900">Account instellen (4 van 5 voltooid)</div>
            <div className="text-sm text-blue-700 mt-0.5">Voltooi jouw profiel om de beste leads te ontvangen</div>
          </div>
          <button className="text-xs text-blue-500 hover:text-blue-700 transition-colors">Verbergen</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
          {[
            { label: "Account aangemaakt", done: true },
            { label: "Bedrijfsgegevens ingevuld", done: true },
            { label: "Merk/model filter ingesteld", done: true },
            { label: "Radius ingesteld", done: true },
            { label: "Voorraad koppelen", done: false, href: "/dealer/voorraad", cta: "Koppelen" },
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium ${item.done ? "bg-white text-green-700 border border-green-100" : "bg-white text-slate-500 border border-slate-200"}`}>
              {item.done
                ? <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                : <AlertCircle className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />}
              <span className="truncate">{item.label}</span>
              {!item.done && item.href && (
                <Link href={item.href} className="ml-auto text-blue-600 hover:text-blue-800 whitespace-nowrap">{item.cta} →</Link>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Goedemorgen, AutoHuis Rotterdam</h1>
          <p className="text-slate-500 mt-1">Je hebt vandaag <strong>3 nieuwe geverifieerde leads</strong> en 1 nieuwe match ontvangen.</p>
        </div>
        <Link href="/dealer/leads">
          <Button className="bg-slate-900 text-white hover:bg-slate-800 rounded-full">
            Bekijk alle leads <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Link key={i} href={stat.href} className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-sm hover:border-slate-200 transition-all group">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-200 group-hover:text-slate-400 transition-colors" />
              </div>
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-sm font-medium text-slate-700 mt-0.5">{stat.label}</div>
              <div className="text-xs text-slate-400 mt-0.5">{stat.change}</div>
            </Link>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        <DealerCharts />
      </div>

      {/* Hot Leads */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-50">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-slate-900">Hot leads</h2>
            <Badge className="bg-orange-50 text-orange-600 border-orange-200 text-xs">🔥 {hotLeads.length} actief</Badge>
            <Badge className="bg-green-50 text-green-700 border-green-200 text-xs">✓ Geverifieerd</Badge>
          </div>
          <Link href="/dealer/leads" className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
            Alle leads <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="divide-y divide-slate-50">
          {hotLeads.map(lead => {
            const score = getLeadScoreLabel(lead.score);
            const intent = getBuyIntentUrgency(lead.buyIntent);
            return (
              <div key={lead.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 font-bold text-slate-600 text-sm">
                  {lead.brand.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-900">{lead.brand} {lead.model}</div>
                  <div className="text-sm text-slate-500 flex items-center gap-2 flex-wrap">
                    <span>{formatCurrency(lead.budgetMin)} – {formatCurrency(lead.budgetMax)}</span>
                    <span className="text-slate-300">·</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{lead.date}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${intent.color}`}>{intent.label}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  {/* Verification icons */}
                  {lead.verified && <BadgeCheck className="w-4 h-4 text-green-500" />}
                  {lead.phoneVerified ? (
                    <Phone className="w-4 h-4 text-blue-500" />
                  ) : (
                    <PhoneOff className="w-4 h-4 text-slate-300" />
                  )}
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${score.color}`}>
                    {score.emoji} {lead.score}%
                  </span>
                  <Link href="/dealer/leads">
                    <Button size="sm" variant="outline" className="rounded-full text-xs">
                      Openen · 1 credit
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
