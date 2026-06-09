"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DUMMY_LEADS, getLeadScoreLabel, formatCurrency } from "@/lib/data";
import { CheckCircle, X, TrendingUp, MapPin } from "lucide-react";

const MATCH_REASONS = {
  "1": ["Merk match", "Model match", "Budget match", "Bouwjaar match", "Must Have opties aanwezig", "Locatie match"],
  "2": ["Merk match", "Model match", "Budget match", "Bouwjaar match", "Transmissie match"],
  "5": ["Merk match", "Model match", "Budget match", "Must Have opties aanwezig"],
};

const MATCHES = DUMMY_LEADS.slice(0, 4).map((lead, i) => ({
  ...lead,
  matchScore: [96, 88, 74, 82][i] || lead.score,
  stockCar: [
    "Audi Q5 50 TFSI e · 2022 · 38.400 km · € 47.950",
    "BMW X3 xDrive20d · 2021 · 52.000 km · € 42.500",
    "Volkswagen Golf 8 R-Line · 2023 · 15.200 km · € 31.900",
    "Cupra Formentor VZ · 2022 · 28.100 km · € 39.800",
  ][i],
}));

export default function MatchesPage() {
  return (
    <div className="p-6 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Matches</h1>
        <p className="text-slate-500 mt-1">AutoMatch heeft jouw voorraad gekoppeld aan actieve zoekopdrachten.</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Totaal matches", value: "4", icon: TrendingUp, color: "text-blue-600 bg-blue-50" },
          { label: "Gemiddelde score", value: "85%", icon: CheckCircle, color: "text-green-600 bg-green-50" },
          { label: "Wachten op reactie", value: "3", icon: TrendingUp, color: "text-orange-600 bg-orange-50" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5">
              <div className={`w-10 h-10 rounded-xl ${stat.color.split(" ")[1]} flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${stat.color.split(" ")[0]}`} />
              </div>
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="space-y-4">
        {MATCHES.map((match) => {
          const score = getLeadScoreLabel(match.matchScore);
          const reasons = MATCH_REASONS[match.id as keyof typeof MATCH_REASONS] || MATCH_REASONS["2"];
          return (
            <div key={match.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-sm transition-all">
              <div className="p-5">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-slate-900 text-lg">{match.brand} {match.model} gevraagd</h3>
                      <span className={`text-sm font-bold px-3 py-1 rounded-full border ${score.color}`}>
                        {score.emoji} {match.matchScore}% match
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{match.location}</span>
                      <span>·</span>
                      <span>{match.buyIntent}</span>
                      <span>·</span>
                      <span>{formatCurrency(match.budgetMin)} – {formatCurrency(match.budgetMax)}</span>
                    </div>
                  </div>
                </div>

                {/* Match score visualization */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Matchredenen</div>
                    <div className="space-y-1.5">
                      {reasons.map((r, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-slate-700">{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-slate-900 rounded-xl p-4 text-white">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Jouw voorraad</div>
                    <div className="font-semibold mb-3">{match.stockCar}</div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" className="bg-white text-slate-900 hover:bg-slate-100 rounded-full text-xs flex-1">
                        Reageer nu
                      </Button>
                      <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white rounded-full">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Must-haves */}
                <div className="flex flex-wrap gap-1.5">
                  {match.mustHaveOptions.map(opt => (
                    <span key={opt} className="text-xs bg-slate-900 text-white px-2.5 py-1 rounded-full">★ {opt}</span>
                  ))}
                  {match.niceToHaveOptions.map(opt => (
                    <span key={opt} className="text-xs bg-slate-50 text-slate-500 border border-slate-100 px-2.5 py-1 rounded-full">○ {opt}</span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
