"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, getBuyIntentUrgency } from "@/lib/data";
import {
  Search, Plus, Pause, Play, Trash2, Edit2,
  ChevronDown, ChevronUp, BadgeCheck, Clock,
  Eye, EyeOff, Bell, Shield, Info
} from "lucide-react";

const MY_REQUESTS = [
  {
    id: "req1",
    brand: "Audi", model: "Q5",
    budgetMin: 35000, budgetMax: 55000,
    yearMin: 2020, yearMax: 2024,
    fuel: "Hybride", transmission: "Automaat",
    postcode: "1012 AB", location: "Amsterdam",
    buyIntent: "Binnen 30 dagen",
    status: "actief" as const,
    placedAt: "9 jun 2025",
    expiresAt: "9 sep 2025",
    offersCount: 3,
    unreadOffers: 2,
    mustHave: ["Apple CarPlay", "Panoramadak", "LED verlichting"],
    niceToHave: ["Stoelverwarming", "Adaptive cruise control"],
    hasTradeIn: true,
    tradeInLicense: "AB-123-C",
    phoneShared: false,
    emailVerified: true,
    dealersNotified: 14,
  },
  {
    id: "req2",
    brand: "Volkswagen", model: "Golf",
    budgetMin: 20000, budgetMax: 30000,
    yearMin: 2019, yearMax: 2023,
    fuel: "Benzine", transmission: "Automaat",
    postcode: "1012 AB", location: "Amsterdam",
    buyIntent: "Oriënterend",
    status: "gepauzeerd" as const,
    placedAt: "2 jun 2025",
    expiresAt: "2 sep 2025",
    offersCount: 1,
    unreadOffers: 0,
    mustHave: ["Airco", "Apple CarPlay"],
    niceToHave: ["Parkeersensoren"],
    hasTradeIn: false,
    tradeInLicense: "",
    phoneShared: false,
    emailVerified: true,
    dealersNotified: 7,
  },
];

export default function AanvragenPage() {
  const [expanded, setExpanded] = useState<string | null>("req1");
  const [phoneShared, setPhoneShared] = useState<Record<string, boolean>>({ req1: false, req2: false });
  const [paused, setPaused] = useState<Record<string, boolean>>({ req1: false, req2: true });

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Mijn aanvragen</h1>
          <p className="text-slate-500 mt-1">Beheer jouw actieve en gepauzeerde zoekopdrachten.</p>
        </div>
        <Link href="/zoeken">
          <Button className="bg-slate-900 text-white hover:bg-slate-800 rounded-full gap-2">
            <Plus className="w-4 h-4" /> Nieuwe aanvraag
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {MY_REQUESTS.map(req => {
          const isOpen = expanded === req.id;
          const isPaused = paused[req.id];
          const intent = getBuyIntentUrgency(req.buyIntent);

          return (
            <div key={req.id} className={`bg-white rounded-2xl border transition-all overflow-hidden ${isPaused ? "border-slate-100 opacity-80" : "border-slate-100 hover:border-slate-200 hover:shadow-sm"}`}>

              {/* Header row */}
              <div
                className="flex items-center gap-4 px-6 py-5 cursor-pointer"
                onClick={() => setExpanded(isOpen ? null : req.id)}
              >
                <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-sm flex-shrink-0">
                  {req.brand.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-slate-900 text-lg">{req.brand} {req.model}</span>
                    <Badge variant="outline" className={`text-xs ${
                      isPaused ? "text-slate-500 border-slate-200" : "text-green-700 border-green-200 bg-green-50"
                    }`}>
                      {isPaused ? "⏸ Gepauzeerd" : "● Actief"}
                    </Badge>
                    {req.unreadOffers > 0 && (
                      <span className="flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                        <Bell className="w-3 h-3" /> {req.unreadOffers} nieuw
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-slate-500">
                    <span>{formatCurrency(req.budgetMin)} – {formatCurrency(req.budgetMax)}</span>
                    <span className="text-slate-300">·</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${intent.color}`}>{req.buyIntent}</span>
                    <span className="text-slate-300">·</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Geplaatst {req.placedAt}</span>
                    <span className="text-slate-300">·</span>
                    <span>{req.dealersNotified} dealers genotificeerd</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-sm text-slate-600 font-medium hidden md:block">
                    {req.offersCount} aanbieding{req.offersCount !== 1 ? "en" : ""}
                  </span>
                  {isOpen
                    ? <ChevronUp className="w-4 h-4 text-slate-400" />
                    : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </div>

              {/* Expanded detail */}
              {isOpen && (
                <div className="border-t border-slate-50 px-6 py-5 space-y-5 animate-fade-in">

                  {/* Specs grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    {[
                      { k: "Bouwjaar", v: `${req.yearMin} – ${req.yearMax}` },
                      { k: "Brandstof", v: req.fuel },
                      { k: "Transmissie", v: req.transmission },
                      { k: "Postcode", v: req.postcode },
                      { k: "Verloopt op", v: req.expiresAt },
                      { k: "Inruil", v: req.hasTradeIn ? `Ja (${req.tradeInLicense})` : "Nee" },
                      { k: "E-mail geverifieerd", v: req.emailVerified ? "✓ Ja" : "Nee" },
                      { k: "Dealers bereikt", v: `${req.dealersNotified} dealers` },
                    ].map(item => (
                      <div key={item.k} className="bg-slate-50 rounded-xl p-3">
                        <div className="text-xs text-slate-400 uppercase tracking-wide font-semibold mb-1">{item.k}</div>
                        <div className="font-medium text-slate-900">{item.v}</div>
                      </div>
                    ))}
                  </div>

                  {/* Options */}
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Geselecteerde opties</div>
                    <div className="flex flex-wrap gap-2">
                      {req.mustHave.map(o => (
                        <span key={o} className="text-xs bg-slate-900 text-white px-2.5 py-1 rounded-full font-medium">★ {o}</span>
                      ))}
                      {req.niceToHave.map(o => (
                        <span key={o} className="text-xs bg-slate-50 text-slate-600 border border-slate-200 px-2.5 py-1 rounded-full">○ {o}</span>
                      ))}
                    </div>
                  </div>

                  {/* Privacy toggle */}
                  <div className="bg-slate-50 rounded-xl border border-slate-100 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-medium text-slate-900 text-sm">Telefoonnummer zichtbaar voor dealers</div>
                          <div className="text-xs text-slate-500 mt-0.5">
                            {phoneShared[req.id]
                              ? "Dealers kunnen jou nu bellen. Schakel uit om dit te stoppen."
                              : "Standaard verborgen. Dealers kunnen alleen e-mailen."}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setPhoneShared(p => ({ ...p, [req.id]: !p[req.id] }))}
                        className={`w-11 h-6 rounded-full transition-all flex-shrink-0 relative ${
                          phoneShared[req.id] ? "bg-slate-900" : "bg-slate-200"
                        }`}
                      >
                        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${
                          phoneShared[req.id] ? "left-6" : "left-1"
                        }`} />
                      </button>
                    </div>
                    {phoneShared[req.id] && (
                      <div className="mt-3 flex items-center gap-2 text-xs text-orange-700 bg-orange-50 border border-orange-200 rounded-lg px-3 py-2">
                        <Info className="w-3.5 h-3.5 flex-shrink-0" />
                        Jouw nummer is nu zichtbaar. Houd er rekening mee dat dealers jou kunnen bellen.
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <Link href="/portaal/aanbiedingen">
                      <Button className="bg-slate-900 text-white hover:bg-slate-800 rounded-full gap-2 text-sm">
                        <BadgeCheck className="w-4 h-4" />
                        Bekijk {req.offersCount} aanbieding{req.offersCount !== 1 ? "en" : ""}
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="rounded-full gap-2 text-sm"
                      onClick={() => setPaused(p => ({ ...p, [req.id]: !p[req.id] }))}
                    >
                      {isPaused ? <><Play className="w-4 h-4" /> Hervatten</> : <><Pause className="w-4 h-4" /> Pauzeren</>}
                    </Button>
                    <Button variant="outline" className="rounded-full gap-2 text-sm">
                      <Edit2 className="w-4 h-4" /> Aanpassen
                    </Button>
                    <Button variant="ghost" className="rounded-full gap-2 text-sm text-red-500 hover:text-red-700 hover:bg-red-50 ml-auto">
                      <Trash2 className="w-4 h-4" /> Verwijderen
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty state hint */}
      <div className="mt-6 p-5 bg-slate-50 rounded-2xl border border-slate-100 text-sm text-slate-500 flex items-start gap-3">
        <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-500" />
        <div>
          <strong className="text-slate-700">Aanvragen verlopen na 90 dagen.</strong>{" "}
          Je ontvangt 7 dagen van tevoren een herinnering. Je kunt een aanvraag altijd herplaatsen of aanpassen.
        </div>
      </div>
    </div>
  );
}
