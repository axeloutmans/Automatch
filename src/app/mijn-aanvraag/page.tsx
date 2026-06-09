"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, getBuyIntentUrgency } from "@/lib/data";
import { CheckCircle, Clock, MapPin, BadgeCheck, MessageSquare, Eye, EyeOff, Trash2, Pause } from "lucide-react";
import Link from "next/link";

const DEMO_OFFERS = [
  {
    id: "1",
    dealer: "AutoHuis Rotterdam",
    dealerVerified: true,
    dealerRating: 4.8,
    dealerReviews: 142,
    car: "Audi Q5 50 TFSI e · 2022 · 38.400 km",
    price: 47950,
    fuel: "Plug-in hybride",
    transmission: "Automaat",
    options: ["Apple CarPlay ✓", "Panoramadak ✓", "LED verlichting ✓", "Stoelverwarming ✓"],
    matchScore: 96,
    message: "Wij hebben precies wat u zoekt. Onze Audi Q5 is volledig onderhouden bij Audi en heeft een trekhaak als extra.",
    date: "2 uur geleden",
    read: true,
  },
  {
    id: "2",
    dealer: "Garage Westside Autos",
    dealerVerified: true,
    dealerRating: 4.5,
    dealerReviews: 89,
    car: "Audi Q5 40 TDI · 2021 · 51.200 km",
    price: 43500,
    fuel: "Diesel",
    transmission: "Automaat",
    options: ["Apple CarPlay ✓", "LED verlichting ✓", "Panoramadak ✗", "Adaptive cruise control ✓"],
    matchScore: 82,
    message: "Mooie Q5 met laag verbruik en ruim uitgerust. Panoramadak niet aanwezig maar we kunnen dit compenseren in de prijs.",
    date: "5 uur geleden",
    read: false,
  },
];

export default function MijnAanvraagPage() {
  const [phoneVisible, setPhoneVisible] = useState(false);
  const [requestActive, setRequestActive] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-16">

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-slate-900">Mijn zoekopdracht</h1>
              <Badge className={requestActive ? "bg-green-100 text-green-700 border-green-200" : "bg-slate-100 text-slate-500 border-slate-200"}>
                {requestActive ? "● Actief" : "Gepauzeerd"}
              </Badge>
            </div>
            <p className="text-slate-500">Geplaatst op 9 juni 2025 · Geverifieerd ✓</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full gap-1.5 text-xs"
              onClick={() => setRequestActive(v => !v)}
            >
              <Pause className="w-3.5 h-3.5" />
              {requestActive ? "Pauzeren" : "Hervatten"}
            </Button>
            <Button variant="outline" size="sm" className="rounded-full gap-1.5 text-xs text-red-600 border-red-200 hover:bg-red-50">
              <Trash2 className="w-3.5 h-3.5" /> Verwijderen
            </Button>
          </div>
        </div>

        {/* Request summary */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 mb-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div><span className="text-xs text-slate-500 uppercase tracking-wide font-semibold">Auto</span><div className="font-semibold text-slate-900 mt-1">Audi Q5</div></div>
          <div><span className="text-xs text-slate-500 uppercase tracking-wide font-semibold">Budget</span><div className="font-semibold text-slate-900 mt-1">€ 35.000 – € 55.000</div></div>
          <div><span className="text-xs text-slate-500 uppercase tracking-wide font-semibold">Kooptermijn</span><div className="font-semibold text-slate-900 mt-1">Binnen 30 dagen</div></div>
          <div><span className="text-xs text-slate-500 uppercase tracking-wide font-semibold">Aanbiedingen</span><div className="font-semibold text-slate-900 mt-1">{DEMO_OFFERS.length} ontvangen</div></div>
        </div>

        {/* Privacy settings */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-6 flex items-center justify-between">
          <div className="flex items-start gap-3">
            <BadgeCheck className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <div className="font-semibold text-blue-900">Jouw telefoonnummer is verborgen</div>
              <div className="text-blue-700">Dealers kunnen je alleen via e-mail bereiken. Jij beslist wanneer je jouw nummer deelt.</div>
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="border-blue-200 text-blue-700 hover:bg-blue-100 rounded-full text-xs gap-1.5 flex-shrink-0"
            onClick={() => setPhoneVisible(v => !v)}
          >
            {phoneVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {phoneVisible ? "Verbergen" : "Tonen aan dealers"}
          </Button>
        </div>

        {/* Offers */}
        <h2 className="text-lg font-bold text-slate-900 mb-4">Ontvangen aanbiedingen</h2>
        <div className="space-y-4">
          {DEMO_OFFERS.map(offer => {
            const intent = getBuyIntentUrgency("Binnen 30 dagen");
            return (
              <div key={offer.id} className={`bg-white rounded-2xl border transition-all ${!offer.read ? "border-blue-200 shadow-sm" : "border-slate-100"}`}>
                {!offer.read && (
                  <div className="px-5 pt-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-xs font-semibold text-blue-600">Nieuw</span>
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-bold text-slate-900">{offer.dealer}</span>
                        {offer.dealerVerified && (
                          <BadgeCheck className="w-4 h-4 text-blue-500" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span>{"★".repeat(Math.round(offer.dealerRating))} {offer.dealerRating}</span>
                        <span>·</span>
                        <span>{offer.dealerReviews} beoordelingen</span>
                        <span>·</span>
                        <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" />{offer.date}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-2xl font-bold text-slate-900">{formatCurrency(offer.price)}</div>
                      <div className={`text-xs font-semibold mt-0.5 px-2 py-0.5 rounded-full border inline-block ${offer.matchScore >= 90 ? "text-orange-600 bg-orange-50 border-orange-200" : offer.matchScore >= 70 ? "text-green-700 bg-green-50 border-green-200" : "text-slate-600 bg-slate-50 border-slate-200"}`}>
                        {offer.matchScore}% match
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-3 mb-3">
                    <div className="font-medium text-slate-900 text-sm mb-1">{offer.car}</div>
                    <div className="flex flex-wrap gap-1">
                      {offer.options.map((o, i) => (
                        <span key={i} className={`text-xs px-2 py-0.5 rounded-full ${o.includes("✓") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-600 border border-red-200"}`}>{o}</span>
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 italic mb-4">&ldquo;{offer.message}&rdquo;</p>

                  <div className="flex gap-3">
                    <Button className="bg-slate-900 text-white hover:bg-slate-800 rounded-full gap-2 flex-1">
                      <MessageSquare className="w-4 h-4" /> Reageer op aanbieding
                    </Button>
                    <Button variant="outline" className="rounded-full text-sm">Afwijzen</Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
