"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, getLeadScoreLabel, getBuyIntentUrgency } from "@/lib/data";
import {
  ArrowRight, Bell, Clock, MessageSquare,
  Eye, Search, BadgeCheck, ChevronRight
} from "lucide-react";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Goedemorgen";
  if (h < 18) return "Goedemiddag";
  return "Goedenavond";
}

const MY_REQUESTS = [
  {
    id: "req1",
    brand: "Audi", model: "Q5",
    budgetMin: 35000, budgetMax: 55000,
    buyIntent: "Binnen 30 dagen",
    status: "actief",
    placedAt: "9 jun 2025",
    offersCount: 3,
    unreadOffers: 2,
    mustHave: ["Apple CarPlay", "Panoramadak"],
  },
  {
    id: "req2",
    brand: "Volkswagen", model: "Golf",
    budgetMin: 20000, budgetMax: 30000,
    buyIntent: "Oriënterend",
    status: "gepauzeerd",
    placedAt: "2 jun 2025",
    offersCount: 1,
    unreadOffers: 0,
    mustHave: ["Airco", "Apple CarPlay"],
  },
];

const RECENT_OFFERS = [
  {
    id: "off1",
    reqId: "req1",
    dealer: "AutoHuis Rotterdam",
    verified: true,
    rating: 4.8,
    car: "Audi Q5 50 TFSI e · 2022 · 38.400 km",
    price: 47950,
    matchScore: 96,
    date: "2 uur geleden",
    read: false,
  },
  {
    id: "off2",
    reqId: "req1",
    dealer: "Garage Westside",
    verified: true,
    rating: 4.5,
    car: "Audi Q5 40 TDI · 2021 · 51.200 km",
    price: 43500,
    matchScore: 82,
    date: "5 uur geleden",
    read: false,
  },
  {
    id: "off3",
    reqId: "req1",
    dealer: "Premium Cars NL",
    verified: true,
    rating: 4.7,
    car: "Audi Q5 45 TFSI · 2022 · 29.800 km",
    price: 52000,
    matchScore: 88,
    date: "Gisteren",
    read: true,
  },
];

export default function PortaalOverzicht() {
  const unreadTotal = RECENT_OFFERS.filter(o => !o.read).length;
  const activeRequests = MY_REQUESTS.filter(r => r.status === "actief").length;

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">{greeting()} 👋</h1>
        <p className="text-slate-500 mt-1">
          Je hebt <strong>{unreadTotal} nieuwe aanbiedingen</strong> ontvangen op jouw zoekopdracht.
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Actieve aanvragen", value: String(activeRequests), icon: Search, color: "text-blue-600 bg-blue-50" },
          { label: "Nieuwe aanbiedingen", value: String(unreadTotal), icon: Bell, color: "text-orange-600 bg-orange-50" },
          { label: "Ongelezen berichten", value: "1", icon: MessageSquare, color: "text-red-600 bg-red-50" },
          { label: "Bekeken aanbiedingen", value: "1", icon: Eye, color: "text-green-600 bg-green-50" },
        ].map((s, i) => {
          const Icon = s.icon;
          const [tc, bg] = s.color.split(" ");
          return (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5">
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${tc}`} />
              </div>
              <div className="text-2xl font-bold text-slate-900">{s.value}</div>
              <div className="text-sm text-slate-500 mt-0.5">{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* My requests summary */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden mb-6">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-50">
          <h2 className="font-bold text-slate-900">Jouw zoekopdrachten</h2>
          <Link href="/portaal/aanvragen" className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
            Alle aanvragen <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="divide-y divide-slate-50">
          {MY_REQUESTS.map(req => {
            const intent = getBuyIntentUrgency(req.buyIntent);
            return (
              <Link
                key={req.id}
                href="/portaal/aanvragen"
                className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-sm flex-shrink-0">
                  {req.brand.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-900">{req.brand} {req.model}</div>
                  <div className="flex items-center gap-2 text-sm text-slate-500 mt-0.5">
                    <span>{formatCurrency(req.budgetMin)} – {formatCurrency(req.budgetMax)}</span>
                    <span className="text-slate-300">·</span>
                    <span>{req.placedAt}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${intent.color}`}>
                    {req.buyIntent}
                  </span>
                  <Badge variant="outline" className={`text-xs ${
                    req.status === "actief" ? "text-green-700 border-green-200 bg-green-50" : "text-slate-500 border-slate-200"
                  }`}>
                    {req.status === "actief" ? "● Actief" : "⏸ Gepauzeerd"}
                  </Badge>
                  {req.unreadOffers > 0 && (
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                      {req.unreadOffers}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-50">
          <Link href="/zoeken">
            <Button variant="outline" size="sm" className="rounded-full gap-2 text-xs">
              <Search className="w-3.5 h-3.5" /> Nieuwe zoekopdracht plaatsen
            </Button>
          </Link>
        </div>
      </div>

      {/* Recent offers */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-50">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-slate-900">Laatste aanbiedingen</h2>
            {unreadTotal > 0 && (
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                {unreadTotal}
              </span>
            )}
          </div>
          <Link href="/portaal/aanbiedingen" className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
            Alle aanbiedingen <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="divide-y divide-slate-50">
          {RECENT_OFFERS.map(offer => {
            const scoreLabel = getLeadScoreLabel(offer.matchScore);
            return (
              <Link
                key={offer.id}
                href="/portaal/aanbiedingen"
                className={`flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors ${!offer.read ? "bg-blue-50/30" : ""}`}
              >
                {!offer.read && <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />}
                {offer.read && <span className="w-2 h-2 flex-shrink-0" />}
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-sm flex-shrink-0">
                  {offer.dealer.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 text-sm">{offer.dealer}</span>
                    {offer.verified && <BadgeCheck className="w-3.5 h-3.5 text-blue-500" />}
                    <span className="text-xs text-slate-400">★ {offer.rating}</span>
                  </div>
                  <div className="text-sm text-slate-500 mt-0.5 truncate">{offer.car}</div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-right">
                    <div className="font-bold text-slate-900">{formatCurrency(offer.price)}</div>
                    <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-1 justify-end">
                      <Clock className="w-3 h-3" />{offer.date}
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${scoreLabel.color}`}>
                    {offer.matchScore}%
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-50">
          <Link href="/portaal/aanbiedingen">
            <Button size="sm" className="bg-slate-900 text-white hover:bg-slate-800 rounded-full text-xs gap-2">
              Vergelijk alle {RECENT_OFFERS.length} aanbiedingen <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
