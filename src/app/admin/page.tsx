"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DUMMY_LEADS, getLeadScoreLabel, formatCurrency } from "@/lib/data";
import { Users, Car, BarChart3, CreditCard, Activity, Settings, Search, ArrowUpRight, Shield, Zap, TrendingUp, CheckCircle, AlertCircle, Download, RefreshCw } from "lucide-react";
import DealerCharts from "@/components/dealer/DealerCharts";

const STATS = [
  { label: "Totaal gebruikers", value: "4.821", change: "+142 deze week", icon: Users, color: "text-blue-600 bg-blue-50", trend: "+3.0%" },
  { label: "Actieve dealers", value: "312", change: "+8 deze week", icon: Car, color: "text-green-600 bg-green-50", trend: "+2.6%" },
  { label: "Actieve leads", value: "2.847", change: "+287 deze week", icon: Activity, color: "text-purple-600 bg-purple-50", trend: "+11.2%" },
  { label: "Totaal matches", value: "18.420", change: "+1.240 deze week", icon: Zap, color: "text-orange-600 bg-orange-50", trend: "+7.2%" },
  { label: "Revenue MTD", value: "€ 14.820", change: "+23% vs vorige maand", icon: CreditCard, color: "text-slate-700 bg-slate-100", trend: "+23%" },
  { label: "Credits verkocht", value: "8.240", change: "deze maand", icon: BarChart3, color: "text-red-600 bg-red-50", trend: "" },
];

const DEALERS = [
  { id:"1", name:"AutoHuis Rotterdam", city:"Rotterdam", kvk:"12345678", credits:24, plan:"pro", verified:true, opened:47 },
  { id:"2", name:"Garage Westside", city:"Amsterdam", kvk:"87654321", credits:8, plan:"starter", verified:true, opened:12 },
  { id:"3", name:"Premium Cars NL", city:"Utrecht", kvk:"11223344", credits:85, plan:"enterprise", verified:true, opened:134 },
  { id:"4", name:"Auto Centrum Den Haag", city:"Den Haag", kvk:"55667788", credits:0, plan:"starter", verified:false, opened:0 },
];

const USERS = [
  { id:"1", name:"Jan de Vries", email:"jan@mail.nl", leads:2, status:"actief", joined:"8 jun 2025" },
  { id:"2", name:"Sarah Bakker", email:"sarah@mail.nl", leads:1, status:"actief", joined:"7 jun 2025" },
  { id:"3", name:"Mark Jansen", email:"mark@mail.nl", leads:3, status:"actief", joined:"5 jun 2025" },
  { id:"4", name:"Emma de Wit", email:"emma@mail.nl", leads:0, status:"inactief", joined:"1 jun 2025" },
];

const PAYMENTS = [
  { id:"pi_1", dealer:"AutoHuis Rotterdam", amount:5900, credits:25, date:"9 jun 2025", status:"succeeded" },
  { id:"pi_2", dealer:"Premium Cars NL", amount:17900, credits:100, date:"8 jun 2025", status:"succeeded" },
  { id:"pi_3", dealer:"Garage Westside", amount:2900, credits:10, date:"7 jun 2025", status:"succeeded" },
  { id:"pi_4", dealer:"Auto Centrum Arnhem", amount:9900, credits:50, date:"6 jun 2025", status:"refunded" },
];

const TABS = ["Overzicht","Gebruikers","Dealers","Leads","Betalingen","Statistieken"];

export default function AdminPage() {
  const [tab, setTab] = useState("Overzicht");
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-slate-900 text-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center"><Shield className="w-4 h-4 text-white" /></div>
            <span className="font-bold">AutoMatch Admin</span>
            <span className="text-slate-400 text-xs ml-2">beheerdersdashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">● Alle systemen operationeel</Badge>
            <Link href="/" className="text-sm text-slate-400 hover:text-white">← Site</Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 flex gap-1 overflow-x-auto">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${tab===t?"border-white text-white":"border-transparent text-slate-400 hover:text-white"}`}>{t}</button>
          ))}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {tab === "Overzicht" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div><h1 className="text-2xl font-bold text-slate-900">Platformoverzicht</h1><p className="text-slate-500 text-sm mt-0.5">bijgewerkt 1 min geleden</p></div>
              <Button variant="outline" size="sm" className="rounded-full gap-2"><RefreshCw className="w-3.5 h-3.5" />Vernieuwen</Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {STATS.map((s,i)=>{const Icon=s.icon;const[tc,bg]=s.color.split(" ");return(
                <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5">
                  <div className="flex items-start justify-between mb-3"><div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}><Icon className={`w-5 h-5 ${tc}`}/></div>{s.trend&&<span className="text-xs font-semibold text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">{s.trend}</span>}</div>
                  <div className="text-2xl font-bold text-slate-900">{s.value}</div>
                  <div className="text-sm font-medium text-slate-700 mt-0.5">{s.label}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{s.change}</div>
                </div>
              );})}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5"><DealerCharts /></div>
          </div>
        )}

        {tab === "Gebruikers" && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h1 className="text-2xl font-bold text-slate-900">Gebruikers <span className="text-slate-400 font-normal text-xl">({USERS.length})</span></h1>
              <div className="flex gap-2"><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"/><Input className="pl-9 w-56" placeholder="Zoek..." value={search} onChange={e=>setSearch(e.target.value)}/></div><Button variant="outline" size="sm" className="rounded-full gap-2"><Download className="w-3.5 h-3.5"/>CSV</Button></div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
              <div className="grid grid-cols-5 text-xs font-semibold text-slate-500 uppercase tracking-wide px-5 py-3 border-b bg-slate-50"><div className="col-span-2">Gebruiker</div><div>Leads</div><div>Status</div><div>Acties</div></div>
              {USERS.filter(u=>!search||u.name.toLowerCase().includes(search.toLowerCase())).map(u=>(
                <div key={u.id} className="grid grid-cols-5 items-center px-5 py-4 border-b border-slate-50 hover:bg-slate-50">
                  <div className="col-span-2 flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">{u.name.split(" ").map(n=>n[0]).join("").slice(0,2)}</div><div><div className="font-medium text-slate-900 text-sm">{u.name}</div><div className="text-xs text-slate-400">{u.email}</div></div></div>
                  <div className="text-sm text-slate-700">{u.leads}</div>
                  <div><span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${u.status==="actief"?"text-green-700 bg-green-50 border-green-200":"text-slate-500 bg-slate-50 border-slate-200"}`}>{u.status}</span></div>
                  <div className="flex gap-2"><Button size="sm" variant="outline" className="rounded-full text-xs h-7">Bekijken</Button><Button size="sm" variant="ghost" className="rounded-full text-xs h-7 text-red-500 hover:bg-red-50">Blokkeren</Button></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "Dealers" && (
          <div>
            <div className="flex items-center justify-between mb-5"><h1 className="text-2xl font-bold text-slate-900">Dealers <span className="text-slate-400 font-normal text-xl">({DEALERS.length})</span></h1><Button variant="outline" size="sm" className="rounded-full gap-2"><Download className="w-3.5 h-3.5"/>CSV</Button></div>
            <div className="space-y-3">
              {DEALERS.map(d=>(
                <div key={d.id} className="bg-white rounded-2xl border border-slate-100 p-5 flex items-center gap-4 hover:border-slate-200">
                  <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-sm flex-shrink-0">{d.name.slice(0,2).toUpperCase()}</div>
                  <div className="flex-1 min-w-0"><div className="flex items-center gap-2"><span className="font-bold text-slate-900">{d.name}</span>{d.verified?<CheckCircle className="w-4 h-4 text-green-500"/>:<AlertCircle className="w-4 h-4 text-orange-400"/>}</div><div className="text-sm text-slate-500">{d.city} · KvK: {d.kvk}</div></div>
                  <div className="flex items-center gap-6 text-sm flex-shrink-0">
                    <div className="text-center"><div className="font-bold text-slate-900">{d.credits}</div><div className="text-xs text-slate-500">credits</div></div>
                    <div className="text-center"><div className="font-bold text-slate-900">{d.opened}</div><div className="text-xs text-slate-500">geopend</div></div>
                    <Badge variant="outline" className={`text-xs ${d.plan==="enterprise"?"text-purple-700 border-purple-200 bg-purple-50":d.plan==="pro"?"text-blue-700 border-blue-200 bg-blue-50":"text-slate-500"}`}>{d.plan}</Badge>
                  </div>
                  <div className="flex gap-2">{!d.verified&&<Button size="sm" className="rounded-full text-xs bg-green-600 hover:bg-green-700 text-white">Goedkeuren</Button>}<Button size="sm" variant="outline" className="rounded-full text-xs">Bewerken</Button><Button size="sm" variant="ghost" className="rounded-full text-xs text-red-500 hover:bg-red-50">Blokkeren</Button></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "Leads" && (
          <div>
            <div className="flex items-center justify-between mb-5"><h1 className="text-2xl font-bold text-slate-900">Leads <span className="text-slate-400 font-normal text-xl">({DUMMY_LEADS.length})</span></h1><Button variant="outline" size="sm" className="rounded-full gap-2"><Download className="w-3.5 h-3.5"/>CSV</Button></div>
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
              <div className="grid grid-cols-7 text-xs font-semibold text-slate-500 uppercase tracking-wide px-5 py-3 border-b bg-slate-50"><div className="col-span-2">Auto</div><div>Budget</div><div>Intentie</div><div>Locatie</div><div>Score</div><div>Status</div></div>
              {DUMMY_LEADS.map(lead=>{const score=getLeadScoreLabel(lead.score);return(
                <div key={lead.id} className="grid grid-cols-7 items-center px-5 py-4 border-b border-slate-50 hover:bg-slate-50">
                  <div className="col-span-2"><div className="font-semibold text-slate-900 text-sm">{lead.brand} {lead.model}</div><div className="text-xs text-slate-400">{lead.date}</div></div>
                  <div className="text-sm font-medium text-slate-700">{formatCurrency(lead.budgetMin)}–{formatCurrency(lead.budgetMax)}</div>
                  <div className="text-xs text-slate-600">{lead.buyIntent}</div>
                  <div className="text-sm text-slate-600">{lead.location}</div>
                  <div><span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${score.color}`}>{score.emoji} {lead.score}%</span></div>
                  <div><Badge variant="outline" className={`text-xs ${lead.verified?"text-green-700 border-green-200 bg-green-50":"text-slate-500"}`}>{lead.verified?"Geverifieerd":"Onbevestigd"}</Badge></div>
                </div>
              );})}
            </div>
          </div>
        )}

        {tab === "Betalingen" && (
          <div>
            <div className="flex items-center justify-between mb-5"><h1 className="text-2xl font-bold text-slate-900">Betalingen</h1><Button variant="outline" size="sm" className="rounded-full gap-2"><Download className="w-3.5 h-3.5"/>CSV</Button></div>
            <div className="grid grid-cols-3 gap-4 mb-5">
              {[{label:"Revenue MTD",value:"€ 14.820",icon:CreditCard,color:"text-green-600 bg-green-50"},{label:"Transacties MTD",value:"187",icon:BarChart3,color:"text-blue-600 bg-blue-50"},{label:"Refunds MTD",value:"€ 99",icon:TrendingUp,color:"text-red-600 bg-red-50"}].map((s,i)=>{const Icon=s.icon;const[tc,bg]=s.color.split(" ");return(<div key={i} className="bg-white rounded-2xl border border-slate-100 p-5"><div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}><Icon className={`w-5 h-5 ${tc}`}/></div><div className="text-2xl font-bold text-slate-900">{s.value}</div><div className="text-sm text-slate-500">{s.label}</div></div>);})}
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
              <div className="grid grid-cols-5 text-xs font-semibold text-slate-500 uppercase tracking-wide px-5 py-3 border-b bg-slate-50"><div>ID</div><div className="col-span-2">Dealer</div><div>Bedrag</div><div>Status</div></div>
              {PAYMENTS.map(p=>(
                <div key={p.id} className="grid grid-cols-5 items-center px-5 py-4 border-b border-slate-50 hover:bg-slate-50">
                  <div className="text-xs font-mono text-blue-600">{p.id}</div>
                  <div className="col-span-2 text-sm font-medium text-slate-900">{p.dealer}<div className="text-xs text-slate-400">{p.date}</div></div>
                  <div className="text-sm font-bold text-slate-900">€ {(p.amount/100).toFixed(2)}<div className="text-xs text-slate-400 font-normal">{p.credits} credits</div></div>
                  <div><span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${p.status==="succeeded"?"text-green-700 bg-green-50 border-green-200":"text-red-700 bg-red-50 border-red-200"}`}>{p.status==="succeeded"?"✓ Geslaagd":"↩ Teruggestort"}</span></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "Statistieken" && (
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-6">Platformstatistieken</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5"><DealerCharts /></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[{label:"Gem. leads/dag",value:"38"},{label:"Gem. offers/lead",value:"3.4"},{label:"Gem. credits/dealer/mnd",value:"26"},{label:"Conversieratio platform",value:"18%"}].map((s,i)=>(
                <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5 text-center"><div className="text-3xl font-bold text-slate-900 mb-1">{s.value}</div><div className="text-sm text-slate-500">{s.label}</div></div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
