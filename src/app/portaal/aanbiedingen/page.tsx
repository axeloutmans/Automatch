"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, getLeadScoreLabel } from "@/lib/data";
import {
  BadgeCheck, CheckCircle, X, Star, Clock, MessageSquare,
  ChevronDown, ChevronUp, Phone, Mail, ExternalLink, Filter, SortAsc
} from "lucide-react";

const ALL_OFFERS = [
  {
    id: "off1", reqLabel: "Audi Q5",
    dealer: "AutoHuis Rotterdam", dealerCity: "Rotterdam",
    verified: true, rating: 4.8, reviews: 142,
    car: "Audi Q5 50 TFSI e", year: 2022, km: 38400,
    fuel: "Plug-in hybride", transmission: "Automaat",
    price: 47950, marketAvg: 44500,
    matchScore: 96,
    mustHaveHit: ["Apple CarPlay ✓", "Panoramadak ✓", "LED verlichting ✓"],
    mustHaveMiss: [],
    niceToHaveHit: ["Stoelverwarming ✓"],
    extras: "Trekhaak aanwezig. Volledig Audi-onderhoudshistorie.",
    message: "Wij hebben precies wat u zoekt. Onze Q5 is uniek onderhouden bij Audi en heeft een trekhaak als extra. Graag tonen wij u de auto.",
    date: "2 uur geleden", read: false,
    status: "nieuw" as const,
  },
  {
    id: "off2", reqLabel: "Audi Q5",
    dealer: "Garage Westside Autos", dealerCity: "Amsterdam",
    verified: true, rating: 4.5, reviews: 89,
    car: "Audi Q5 40 TDI", year: 2021, km: 51200,
    fuel: "Diesel", transmission: "Automaat",
    price: 43500, marketAvg: 44500,
    matchScore: 82,
    mustHaveHit: ["Apple CarPlay ✓", "LED verlichting ✓"],
    mustHaveMiss: ["Panoramadak ✗"],
    niceToHaveHit: ["Adaptive cruise control ✓"],
    extras: "Panoramadak niet aanwezig, maar we geven €500 korting als compensatie.",
    message: "Mooie Q5 met laag verbruik. Panoramadak ontbreekt maar we compenseren dit in de vraagprijs. Rijklaar geleverd.",
    date: "5 uur geleden", read: false,
    status: "nieuw" as const,
  },
  {
    id: "off3", reqLabel: "Audi Q5",
    dealer: "Premium Cars NL", dealerCity: "Utrecht",
    verified: true, rating: 4.7, reviews: 201,
    car: "Audi Q5 45 TFSI e", year: 2022, km: 29800,
    fuel: "Plug-in hybride", transmission: "Automaat",
    price: 52000, marketAvg: 44500,
    matchScore: 88,
    mustHaveHit: ["Apple CarPlay ✓", "Panoramadak ✓", "LED verlichting ✓"],
    mustHaveMiss: [],
    niceToHaveHit: ["Stoelverwarming ✓", "Adaptive cruise control ✓"],
    extras: "Matrix LED, luchtvering en head-up display aanwezig.",
    message: "Een bijzondere Q5 met zeer lage kilometerstand en extra luxe uitrusting. Prijs is negotiabel bij contact.",
    date: "Gisteren", read: true,
    status: "bekeken" as const,
  },
];

type SortKey = "score" | "prijs-laag" | "prijs-hoog" | "datum";

export default function AanbiedingenPage() {
  const [expanded, setExpanded] = useState<string | null>("off1");
  const [sort, setSort] = useState<SortKey>("score");
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [accepted, setAccepted] = useState<Set<string>>(new Set());

  const active = ALL_OFFERS.filter(o => !dismissed.has(o.id));
  const sorted = [...active].sort((a, b) => {
    if (sort === "score") return b.matchScore - a.matchScore;
    if (sort === "prijs-laag") return a.price - b.price;
    if (sort === "prijs-hoog") return b.price - a.price;
    return 0;
  });

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Aanbiedingen</h1>
          <p className="text-slate-500 mt-1">{active.length} aanbiedingen ontvangen · {active.filter(o => !o.read).length} ongelezen</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Sorteren:</span>
          {(["score", "prijs-laag", "prijs-hoog", "datum"] as SortKey[]).map(s => (
            <button
              key={s}
              onClick={() => setSort(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                sort === s ? "bg-slate-900 text-white border-slate-900" : "border-slate-200 text-slate-600 hover:border-slate-400"
              }`}
            >
              {s === "score" ? "Match" : s === "prijs-laag" ? "Prijs ↑" : s === "prijs-hoog" ? "Prijs ↓" : "Datum"}
            </button>
          ))}
        </div>
      </div>

      {/* Compare summary (top 3) */}
      {sorted.length >= 2 && (
        <div className="bg-slate-50 rounded-2xl border border-slate-100 p-4 mb-6">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Snelsvergelijking top 3</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {sorted.slice(0, 3).map((o, i) => {
              const score = getLeadScoreLabel(o.matchScore);
              return (
                <div key={o.id} className={`bg-white rounded-xl border p-3 text-sm ${i === 0 ? "border-green-200 ring-1 ring-green-200" : "border-slate-100"}`}>
                  {i === 0 && <div className="text-xs text-green-700 font-semibold mb-1">⭐ Beste match</div>}
                  <div className="font-semibold text-slate-900 truncate">{o.dealer}</div>
                  <div className="text-slate-500 text-xs mt-0.5">{o.car} · {o.year}</div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-slate-900">{formatCurrency(o.price)}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${score.color}`}>{o.matchScore}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Offer cards */}
      <div className="space-y-4">
        {sorted.map(offer => {
          const isOpen = expanded === offer.id;
          const score = getLeadScoreLabel(offer.matchScore);
          const isAccepted = accepted.has(offer.id);
          const priceDiff = offer.price - offer.marketAvg;

          return (
            <div key={offer.id} className={`bg-white rounded-2xl border overflow-hidden transition-all ${
              isAccepted ? "border-green-200 shadow-sm" :
              !offer.read ? "border-blue-100 shadow-sm" :
              "border-slate-100 hover:border-slate-200"
            }`}>
              {/* Status strip */}
              {!offer.read && !isAccepted && (
                <div className="h-1 bg-blue-500" />
              )}
              {isAccepted && (
                <div className="h-1 bg-green-500" />
              )}

              {/* Main row */}
              <div
                className="flex items-start gap-4 p-5 cursor-pointer"
                onClick={() => setExpanded(isOpen ? null : offer.id)}
              >
                <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-sm flex-shrink-0">
                  {offer.dealer.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-bold text-slate-900">{offer.dealer}</span>
                    {offer.verified && <BadgeCheck className="w-4 h-4 text-blue-500" />}
                    <span className="text-xs text-slate-500">★ {offer.rating} ({offer.reviews})</span>
                    <span className="text-xs text-slate-400">· {offer.dealerCity}</span>
                    {isAccepted && <Badge className="text-xs bg-green-100 text-green-700 border-green-200">Geaccepteerd</Badge>}
                    {!offer.read && !isAccepted && <Badge className="text-xs bg-blue-100 text-blue-700 border-blue-200">Nieuw</Badge>}
                  </div>
                  <div className="text-sm text-slate-600">
                    {offer.car} · {offer.year} · {offer.km.toLocaleString("nl-NL")} km · {offer.fuel}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    {offer.mustHaveHit.map((m, i) => (
                      <span key={i} className="text-xs text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">{m}</span>
                    ))}
                    {offer.mustHaveMiss.map((m, i) => (
                      <span key={i} className="text-xs text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">{m}</span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <div className="text-right">
                    <div className="text-xl font-bold text-slate-900">{formatCurrency(offer.price)}</div>
                    <div className={`text-xs font-medium mt-0.5 ${priceDiff > 0 ? "text-orange-600" : "text-green-600"}`}>
                      {priceDiff > 0 ? `+${formatCurrency(priceDiff)} boven gem.` : `${formatCurrency(Math.abs(priceDiff))} onder gem.`}
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${score.color}`}>
                    {score.emoji} {offer.matchScore}%
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" />{offer.date}</span>
                </div>
              </div>

              {/* Expanded */}
              {isOpen && (
                <div className="border-t border-slate-50 px-5 py-5 space-y-4 animate-fade-in">
                  {/* Extras */}
                  {offer.extras && (
                    <div className="text-sm text-slate-600 bg-slate-50 rounded-xl p-3 border border-slate-100">
                      <span className="font-semibold text-slate-800">Extra&apos;s: </span>{offer.extras}
                    </div>
                  )}

                  {/* Dealer message */}
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm">
                    <div className="font-semibold text-slate-900 mb-1">{offer.dealer} schrijft:</div>
                    <p className="text-slate-600 italic">&ldquo;{offer.message}&rdquo;</p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3">
                    <Button
                      onClick={() => setAccepted(prev => {
                        const next = new Set(prev);
                        next.has(offer.id) ? next.delete(offer.id) : next.add(offer.id);
                        return next;
                      })}
                      className={`rounded-full gap-2 ${isAccepted ? "bg-green-600 hover:bg-green-700 text-white" : "bg-slate-900 hover:bg-slate-800 text-white"}`}
                    >
                      {isAccepted ? <><CheckCircle className="w-4 h-4" /> Geaccepteerd</> : <><MessageSquare className="w-4 h-4" /> Reageer op aanbieding</>}
                    </Button>
                    <Button variant="outline" className="rounded-full gap-2 text-sm">
                      <Phone className="w-4 h-4" /> Dealer bellen
                    </Button>
                    <Button variant="outline" className="rounded-full gap-2 text-sm">
                      <Mail className="w-4 h-4" /> E-mail sturen
                    </Button>
                    <Button
                      variant="ghost"
                      className="rounded-full gap-2 text-sm text-slate-400 hover:text-red-500 ml-auto"
                      onClick={() => { setDismissed(prev => new Set([...prev, offer.id])); setExpanded(null); }}
                    >
                      <X className="w-4 h-4" /> Afwijzen
                    </Button>
                  </div>

                  {/* Dealer info */}
                  <div className="flex items-center gap-3 pt-2 border-t border-slate-50 text-sm text-slate-500">
                    <BadgeCheck className="w-4 h-4 text-blue-500" />
                    <span>KvK geverifieerd</span>
                    <span className="text-slate-200">·</span>
                    <span>RDW-erkend</span>
                    <span className="text-slate-200">·</span>
                    <button className="text-blue-600 hover:underline flex items-center gap-1">
                      Bekijk dealerprofiel <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {dismissed.size > 0 && (
        <div className="mt-4 text-sm text-slate-400 text-center">
          {dismissed.size} aanbieding{dismissed.size > 1 ? "en" : ""} afgewezen.{" "}
          <button onClick={() => setDismissed(new Set())} className="text-blue-600 hover:underline">Ongedaan maken</button>
        </div>
      )}
    </div>
  );
}
