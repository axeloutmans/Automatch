"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DUMMY_LEADS, getLeadScoreLabel, formatCurrency, getBuyIntentUrgency } from "@/lib/data";
import {
  Search, MapPin, Clock, Unlock, Eye, BadgeCheck, Phone,
  PhoneOff, Info, Star, Zap, ChevronDown
} from "lucide-react";

const RADIUS_OPTIONS = [25, 50, 75, 100, 150];

export default function LeadsPage() {
  const [scoreFilter, setScoreFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [radius, setRadius] = useState(75);
  const [brandFilter, setBrandFilter] = useState("all");
  const [openedLeads, setOpenedLeads] = useState<Set<string>>(new Set(["1"]));
  const [showFilters, setShowFilters] = useState(false);

  const brands = ["all", ...Array.from(new Set(DUMMY_LEADS.map(l => l.brand)))];

  const filtered = DUMMY_LEADS.filter(lead => {
    const matchSearch = !search ||
      lead.brand.toLowerCase().includes(search.toLowerCase()) ||
      lead.model.toLowerCase().includes(search.toLowerCase()) ||
      lead.location.toLowerCase().includes(search.toLowerCase());
    const matchScore = scoreFilter === "all" ? true :
      scoreFilter === "hot" ? lead.score >= 90 :
      scoreFilter === "goed" ? lead.score >= 70 && lead.score < 90 :
      scoreFilter === "gemiddeld" ? lead.score >= 50 && lead.score < 70 : true;
    const matchBrand = brandFilter === "all" || lead.brand === brandFilter;
    return matchSearch && matchScore && matchBrand;
  });

  const openLead = (id: string) => setOpenedLeads(prev => new Set([...prev, id]));

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Leads</h1>
          <p className="text-slate-500 mt-1">{filtered.length} leads beschikbaar op basis van jouw profiel.</p>
        </div>
        <Button
          variant="outline"
          className="rounded-full gap-2 text-sm"
          onClick={() => setShowFilters(v => !v)}
        >
          <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          Filters
          {(scoreFilter !== "all" || brandFilter !== "all" || radius !== 75) && (
            <span className="w-2 h-2 bg-blue-600 rounded-full" />
          )}
        </Button>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="bg-white rounded-2xl border border-slate-100 p-5 mb-5 animate-fade-in space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Brand filter */}
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 block">Merk</label>
              <div className="flex flex-wrap gap-1.5">
                {brands.map(b => (
                  <button
                    key={b}
                    onClick={() => setBrandFilter(b)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${brandFilter === b ? "bg-slate-900 text-white border-slate-900" : "border-slate-200 text-slate-600 hover:border-slate-400"}`}
                  >
                    {b === "all" ? "Alle merken" : b}
                  </button>
                ))}
              </div>
            </div>

            {/* Score filter */}
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 block">Lead kwaliteit</label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { key: "all", label: "Alle leads" },
                  { key: "hot", label: "🔥 Hot (90+)" },
                  { key: "goed", label: "✅ Goed (70-89)" },
                  { key: "gemiddeld", label: "🟡 Gemiddeld (50-69)" },
                ].map(f => (
                  <button
                    key={f.key}
                    onClick={() => setScoreFilter(f.key)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${scoreFilter === f.key ? "bg-slate-900 text-white border-slate-900" : "border-slate-200 text-slate-600 hover:border-slate-400"}`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Radius filter */}
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 block">
                Radius: {radius} km
              </label>
              <div className="flex flex-wrap gap-1.5">
                {RADIUS_OPTIONS.map(r => (
                  <button
                    key={r}
                    onClick={() => setRadius(r)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${radius === r ? "bg-slate-900 text-white border-slate-900" : "border-slate-200 text-slate-600 hover:border-slate-400"}`}
                  >
                    {r} km
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input className="pl-9" placeholder="Zoek op merk, model, locatie..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {/* Lead cards */}
      <div className="space-y-3">
        {filtered.map(lead => {
          const score = getLeadScoreLabel(lead.score);
          const intent = getBuyIntentUrgency(lead.buyIntent);
          const isOpen = openedLeads.has(lead.id);
          const creditCost = lead.exclusive ? (lead.exclusiveCredits || 3) : 1;

          return (
            <div key={lead.id} className={`bg-white rounded-2xl border transition-all overflow-hidden ${isOpen ? "border-slate-200 shadow-sm" : "border-slate-100 hover:border-slate-200"}`}>
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-sm flex-shrink-0 mt-0.5">
                    {lead.brand.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <div className="font-bold text-slate-900 text-lg">{lead.brand} {lead.model}</div>
                        <div className="flex flex-wrap items-center gap-3 mt-1 text-sm">
                          <span className="flex items-center gap-1 text-slate-500"><MapPin className="w-3.5 h-3.5" />{lead.location}</span>
                          <span className="flex items-center gap-1 text-slate-500"><Clock className="w-3.5 h-3.5" />{lead.date}</span>
                          <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold ${intent.color}`}>{intent.label}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
                        {/* Verification badges */}
                        {lead.verified && (
                          <span className="flex items-center gap-1 text-xs text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full font-semibold">
                            <BadgeCheck className="w-3.5 h-3.5" /> E-mail geverifieerd
                          </span>
                        )}
                        {lead.phoneVerified && (
                          <span className="flex items-center gap-1 text-xs text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full font-semibold">
                            <Phone className="w-3.5 h-3.5" /> Tel. geverifieerd
                          </span>
                        )}
                        {!lead.phoneVerified && (
                          <span className="flex items-center gap-1 text-xs text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full">
                            <PhoneOff className="w-3.5 h-3.5" /> Tel. niet geverifieerd
                          </span>
                        )}
                        <span className={`text-sm font-bold px-3 py-1.5 rounded-full border ${score.color}`}>
                          {score.emoji} {lead.score}%
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                      <span className="font-semibold text-slate-900">{formatCurrency(lead.budgetMin)} – {formatCurrency(lead.budgetMax)}</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-slate-600">{lead.fuel}</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-slate-600">{lead.transmission}</span>
                      {lead.hasTradeIn && <Badge variant="outline" className="text-xs text-blue-600 border-blue-200">Heeft inruil</Badge>}
                      {lead.exclusive && <Badge className="text-xs bg-amber-100 text-amber-700 border-amber-200">⭐ Exclusief beschikbaar</Badge>}
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {lead.mustHaveOptions.map(opt => (
                        <span key={opt} className="text-xs bg-slate-900 text-white px-2.5 py-1 rounded-full font-medium">★ {opt}</span>
                      ))}
                      {lead.niceToHaveOptions.map(opt => (
                        <span key={opt} className="text-xs bg-slate-50 text-slate-500 border border-slate-100 px-2.5 py-1 rounded-full">○ {opt}</span>
                      ))}
                    </div>

                    {/* Opened: full details */}
                    {isOpen && (
                      <div className="mt-4 pt-4 border-t border-slate-100 animate-fade-in">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                          <div><span className="text-slate-400 text-xs uppercase tracking-wide">Bouwjaar</span><div className="font-semibold text-slate-900 mt-1">{lead.yearMin}–{lead.yearMax}</div></div>
                          <div><span className="text-slate-400 text-xs uppercase tracking-wide">Regio</span><div className="font-semibold text-slate-900 mt-1">{lead.location} ({lead.postcode})</div></div>
                          <div><span className="text-slate-400 text-xs uppercase tracking-wide">Kooptermijn</span><div className="font-semibold text-slate-900 mt-1">{lead.buyIntent}</div></div>
                          <div><span className="text-slate-400 text-xs uppercase tracking-wide">Inruil</span><div className="font-semibold text-slate-900 mt-1">{lead.hasTradeIn ? "Ja" : "Nee"}</div></div>
                        </div>

                        {/* Contact info */}
                        <div className="bg-slate-50 rounded-xl p-4 mb-4">
                          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Contactgegevens</div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div><span className="text-slate-500">Naam:</span> <span className="font-medium text-slate-900">J. de Vries</span></div>
                            <div><span className="text-slate-500">E-mail:</span> <span className="font-medium text-blue-600 underline cursor-pointer">j.devries@mail.nl</span></div>
                            {lead.phoneVerified ? (
                              <div><span className="text-slate-500">Telefoon:</span> <span className="font-medium text-slate-900">06-{lead.id}2345678</span></div>
                            ) : (
                              <div className="flex items-center gap-2 text-slate-400"><PhoneOff className="w-3.5 h-3.5" /> Telefoonnummer niet gedeeld</div>
                            )}
                          </div>
                        </div>

                        {/* Refund notice */}
                        <div className="flex items-start gap-2 text-xs text-slate-500 bg-blue-50 border border-blue-100 rounded-xl p-3 mb-4">
                          <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-blue-500" />
                          Geen reactie van de consument binnen 48 uur? Jouw credit wordt automatisch teruggestort.
                        </div>

                        <div className="flex gap-3">
                          <Button className="bg-slate-900 text-white hover:bg-slate-800 rounded-full">Stuur een aanbieding</Button>
                          <Button variant="outline" className="rounded-full text-slate-500">Lead opslaan</Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action bar */}
              {!isOpen && (
                <div className="px-5 py-3 bg-slate-50/80 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-xs text-slate-500 flex items-center gap-1.5">
                    {lead.score >= 70 ? <Zap className="w-3.5 h-3.5 text-orange-500" /> : <Info className="w-3.5 h-3.5" />}
                    {lead.score >= 90 ? "Hoge conversiekans" : lead.score >= 70 ? "Goede kwaliteit lead" : "Gemiddelde kwaliteit"}
                    {lead.exclusive && <span className="ml-2 text-amber-600 font-medium">· Exclusief voor 1 dealer</span>}
                  </span>
                  <Button
                    size="sm"
                    onClick={() => openLead(lead.id)}
                    className="bg-slate-900 text-white hover:bg-slate-800 rounded-full text-xs gap-1.5"
                  >
                    <Unlock className="w-3 h-3" />
                    Openen · {creditCost} credit{creditCost > 1 ? "s" : ""}
                    {lead.exclusive && <Star className="w-3 h-3 text-amber-300" />}
                  </Button>
                </div>
              )}
              {isOpen && (
                <div className="px-5 py-2.5 bg-green-50 border-t border-green-100 flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5 text-green-600" />
                  <span className="text-xs text-green-700 font-medium">Lead geopend · Contactgegevens zichtbaar</span>
                  {!lead.phoneVerified && <span className="text-xs text-slate-400 ml-1">· Telefoon niet gedeeld door koper</span>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
