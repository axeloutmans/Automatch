"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CAR_BRANDS, CAR_MODELS, BODY_TYPES, FUEL_TYPES,
  TRANSMISSION_TYPES, DRIVE_TYPES, OPTIONS_CATEGORIES,
  MARKET_PRICES, ALTERNATIVES, formatCurrency, getLeadScoreLabel,
} from "@/lib/data";
import {
  Check, ChevronLeft, ChevronRight, Search, X, Upload,
  Car, Settings, User, CheckCircle, Lock, Info,
  BadgeCheck, TrendingDown, TrendingUp, Minus, Shield,
  Flame, Star, Lightbulb, ChevronDown,
} from "lucide-react";
import Link from "next/link";

/* ─── Types ─── */
type OptionPref = "must-have" | "nice-to-have";
type Step = 1 | 2 | 3 | "verify" | "success";

interface FormData {
  brands: string[];
  models: string[];
  bodyTypes: string[];
  fuelTypes: string[];
  transmissions: string[];
  driveTypes: string[];
  priceMin: string;
  priceMax: string;
  yearMin: string;
  yearMax: string;
  mileageMax: string;
  options: Record<string, OptionPref>;
  extraWishes: string;
  openToAlternatives: boolean | null;
  hasTradeIn: boolean | null;
  tradeInLicense: string;
  tradeInMileage: string;
  tradeInRemarks: string;
  buyIntent: string;
  name: string;
  email: string;
  phone: string;
  postcode: string;
  sharePhone: boolean;
}

const initial: FormData = {
  brands: [], models: [], bodyTypes: [], fuelTypes: [], transmissions: [], driveTypes: [],
  priceMin: "", priceMax: "", yearMin: "", yearMax: "", mileageMax: "",
  options: {},
  extraWishes: "",
  openToAlternatives: null,
  hasTradeIn: null, tradeInLicense: "", tradeInMileage: "", tradeInRemarks: "",
  buyIntent: "", name: "", email: "", phone: "", postcode: "", sharePhone: false,
};

const STEPS = [
  { id: 1, label: "Auto", icon: Car },
  { id: 2, label: "Wensen", icon: Settings },
  { id: 3, label: "Contact", icon: User },
];

/* ─── Lead score berekening ─── */
function calcLeadScore(data: FormData): number {
  let score = 0;
  // Merk + model geselecteerd
  if (data.brands.length > 0) score += 10;
  if (data.models.length > 0) score += 10;
  // Budget
  const budgetMax = parseInt(data.priceMax) || 0;
  if (budgetMax > 0) {
    const key = data.brands.length === 1 && data.models.length === 1
      ? `${data.brands[0]} ${data.models[0]}` : null;
    const mp = key ? MARKET_PRICES[key] : null;
    if (mp && budgetMax >= mp.min) score += 20;
    else if (budgetMax > 0) score += 10;
  }
  // Koopintentie
  if (data.buyIntent === "Binnen 1 week") score += 25;
  else if (data.buyIntent === "Binnen 30 dagen") score += 20;
  else if (data.buyIntent === "Binnen 3 maanden") score += 10;
  else if (data.buyIntent === "Oriënterend") score += 2;
  // Telefoon
  if (data.phone.trim().length > 5) score += 15;
  // Inruil
  if (data.hasTradeIn) score += 10;
  // Opties geselecteerd
  if (Object.keys(data.options).length >= 3) score += 5;
  // Extra wensen
  if (data.extraWishes.trim().length > 10) score += 5;
  return Math.min(score, 100);
}

/* ─── Searchable Multi Select ─── */
function SearchableMultiSelect({
  placeholder,
  options,
  selected,
  onChange,
  disabled,
  renderTag,
}: {
  placeholder: string;
  options: string[];
  selected: string[];
  onChange: (v: string[]) => void;
  disabled?: boolean;
  renderTag?: (v: string) => string;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = options.filter(o =>
    o.toLowerCase().includes(query.toLowerCase()) && !selected.includes(o)
  );

  function toggle(val: string) {
    if (selected.includes(val)) onChange(selected.filter(v => v !== val));
    else onChange([...selected, val]);
  }

  const tagLabel = renderTag ?? ((v: string) => v);

  return (
    <div ref={ref} className="relative">
      {/* Tags */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {selected.map(v => (
            <span
              key={v}
              className="inline-flex items-center gap-1 bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded-full font-medium"
            >
              🏷️ {tagLabel(v)}
              <button
                onClick={() => toggle(v)}
                className="ml-0.5 hover:opacity-70 transition-opacity"
                type="button"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
      {/* Input */}
      <button
        type="button"
        onClick={() => !disabled && setOpen(o => !o)}
        className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm text-left transition-all ${
          disabled
            ? "bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed"
            : open
              ? "border-slate-900 ring-2 ring-slate-900/10 bg-white"
              : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"
        }`}
      >
        <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
        <span className="flex-1 text-slate-400">{placeholder}</span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 w-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden">
          <div className="p-2 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Zoeken..."
                className="w-full pl-8 pr-3 py-1.5 text-sm bg-slate-50 rounded-lg border border-slate-100 focus:outline-none focus:ring-1 focus:ring-slate-300"
              />
            </div>
          </div>
          <div className="max-h-60 overflow-y-auto">
            {/* Already selected shown at top */}
            {selected.map(v => (
              <button
                key={v}
                type="button"
                onClick={() => toggle(v)}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm bg-slate-900 text-white hover:bg-slate-800 transition-colors text-left"
              >
                <Check className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{tagLabel(v)}</span>
              </button>
            ))}
            {/* Filtered unselected */}
            {filtered.length > 0 ? filtered.map(v => (
              <button
                key={v}
                type="button"
                onClick={() => toggle(v)}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors text-left"
              >
                <div className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{v}</span>
              </button>
            )) : (
              <div className="px-3 py-4 text-sm text-slate-400 text-center">
                {query ? `Geen resultaten voor "${query}"` : "Alles geselecteerd"}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Main form ─── */
export default function SearchForm() {
  const [step, setStep] = useState<Step>(1);
  const [data, setData] = useState<FormData>(initial);
  const [optionSearch, setOptionSearch] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [verifyCode, setVerifyCode] = useState("");
  const [verifyError, setVerifyError] = useState("");

  const setField = useCallback(<K extends keyof FormData>(k: K, v: FormData[K]) => {
    setData(p => ({ ...p, [k]: v }));
  }, []);

  const toggleStr = useCallback(
    (field: "brands" | "models" | "bodyTypes" | "fuelTypes" | "transmissions" | "driveTypes", value: string) => {
      setData(p => {
        const arr = p[field] as string[];
        return { ...p, [field]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value] };
      });
    }, []
  );

  const toggleOption = useCallback((opt: string, pref: OptionPref) => {
    setData(p => {
      if (p.options[opt] === pref) {
        const rest = Object.fromEntries(Object.entries(p.options).filter(([k]) => k !== opt)) as Record<string, OptionPref>;
        return { ...p, options: rest };
      }
      return { ...p, options: { ...p.options, [opt]: pref } };
    });
  }, []);

  // Alle modellen van geselecteerde merken
  const allModels = data.brands.flatMap(b => (CAR_MODELS[b] || []).map(m => `${b} ${m}`));

  // Marktprijs lookup
  const marketKey = data.brands.length === 1 && data.models.length === 1
    ? data.models[0]
    : data.brands.length === 1 && data.models.length === 0
      ? null
      : null;
  const marketData = marketKey ? MARKET_PRICES[marketKey] : null;

  const budgetMax = parseInt(data.priceMax) || 0;
  const yearMin = parseInt(data.yearMin) || 0;
  const mileageMax = parseInt(data.mileageMax) || 0;

  // Pas marktprijzen aan op bouwjaar en kilometerstand
  const adjustedMarket = marketData ? (() => {
    let factor = 1;
    // Bouwjaar: ~8% duurder per jaar nieuwer dan gemiddelde
    if (yearMin > 0) {
      factor *= Math.pow(1.08, yearMin - marketData.avgYear);
    }
    // Kilometerstand: lage max km = duurdere auto's beschikbaar
    // Gebruik (avgKm / mileageMax)^0.3 zodat extreme waarden niet doorslaan
    if (mileageMax > 0) {
      factor *= Math.pow(marketData.avgKm / mileageMax, 0.3);
    }
    return {
      min: Math.round(marketData.min * factor),
      max: Math.round(marketData.max * factor),
      avg: Math.round(marketData.avg * factor),
    };
  })() : null;

  // "Goed" = budget ligt tussen 55% en 130% van het gecorrigeerde gemiddelde
  // Te laag = onder 55% van gemiddelde (onrealistisch voor die specs)
  // Hoog = boven 130% van gemiddelde (ruim budget)
  const budgetSignal = adjustedMarket && budgetMax > 0
    ? budgetMax < adjustedMarket.avg * 0.55 ? "low"
    : budgetMax > adjustedMarket.avg * 1.3 ? "high"
    : "good"
    : null;

  const selectedOptCount = Object.keys(data.options).length;

  const filteredCats = OPTIONS_CATEGORIES.map(cat => ({
    ...cat,
    options: cat.options.filter(o => o.toLowerCase().includes(optionSearch.toLowerCase())),
  })).filter(c => c.options.length > 0);

  const leadScore = calcLeadScore(data);
  const scoreInfo = getLeadScoreLabel(leadScore);

  // Alternatieven
  const altSuggestions = data.models.length > 0
    ? [...new Set(data.models.flatMap(m => ALTERNATIVES[m] || []))]
    : [];

  function validateStep3(): boolean {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!data.name.trim()) e.name = "Naam is verplicht";
    if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Voer een geldig e-mailadres in";
    if (!data.postcode.match(/^\d{4}\s?[a-zA-Z]{2}$/)) e.postcode = "Voer een geldige postcode in (bijv. 1234 AB)";
    if (!data.buyIntent) e.buyIntent = "Geef jouw koopintentie aan";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleVerify() {
    if (verifyCode.length < 4) return;
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brands: data.brands,
          models: data.models,
          bodyTypes: data.bodyTypes,
          fuelTypes: data.fuelTypes,
          transmissions: data.transmissions,
          driveTypes: data.driveTypes,
          priceMin: data.priceMin ? parseInt(data.priceMin) : undefined,
          priceMax: data.priceMax ? parseInt(data.priceMax) : undefined,
          yearMin: data.yearMin ? parseInt(data.yearMin) : undefined,
          yearMax: data.yearMax ? parseInt(data.yearMax) : undefined,
          mileageMax: data.mileageMax ? parseInt(data.mileageMax) : undefined,
          mustHaveOptions: Object.keys(data.options).filter(o => data.options[o] === "must-have"),
          niceToHaveOptions: Object.keys(data.options).filter(o => data.options[o] === "nice-to-have"),
          extraWishes: data.extraWishes,
          openToAlternatives: data.openToAlternatives,
          hasTradeIn: data.hasTradeIn || false,
          tradeInLicense: data.tradeInLicense,
          tradeInMileage: data.tradeInMileage ? parseInt(data.tradeInMileage) : undefined,
          tradeInRemarks: data.tradeInRemarks,
          buyIntent: data.buyIntent,
          name: data.name,
          email: data.email,
          phone: data.phone,
          postcode: data.postcode,
          sharePhone: data.sharePhone,
          leadScore,
        }),
      });
      const json = await res.json();
      if (json.success) setStep("success");
      else setVerifyError(json.error || "Er is een fout opgetreden. Probeer opnieuw.");
    } catch {
      setStep("success");
    }
  }

  const progress = step === 1 ? 33 : step === 2 ? 66 : step === 3 ? 90 : step === "verify" ? 95 : 100;

  if (step === "verify") return (
    <VerifyStep
      email={data.email}
      code={verifyCode}
      onCodeChange={setVerifyCode}
      onVerify={handleVerify}
      onBack={() => setStep(3)}
      error={verifyError}
    />
  );

  if (step === "success") return <SuccessScreen data={data} leadScore={leadScore} />;

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Sticky header */}
      <div className="bg-white border-b border-slate-100 sticky top-16 z-30">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-lg font-bold text-slate-900">Zoekopdracht plaatsen</h1>
            <span className="text-sm text-slate-400 font-medium">Stap {step} van 3</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-slate-900 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center gap-1">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const active = s.id === step;
              const done = typeof step === "number" && s.id < step;
              return (
                <div key={s.id} className="flex items-center gap-1 flex-1">
                  <button
                    onClick={() => done && setStep(s.id as Step)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                      active ? "bg-slate-900 text-white" :
                      done ? "bg-green-100 text-green-700 cursor-pointer hover:bg-green-200" :
                      "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {done ? <Check className="w-3 h-3" /> : <Icon className="w-3 h-3" />}
                    {s.label}
                  </button>
                  {i < STEPS.length - 1 && (
                    <div className={`flex-1 h-px ${done ? "bg-green-200" : "bg-slate-100"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* ═══════════ STAP 1: AUTO ═══════════ */}
        {step === 1 && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">Welke auto zoek je?</h2>
              <p className="text-slate-500 text-sm">Selecteer merk en model. Je kunt meerdere opties kiezen.</p>
            </div>

            {/* Merk */}
            <Section title="Merk" subtitle="Verplicht — selecteer één of meerdere merken" required>
              <SearchableMultiSelect
                placeholder="Zoek op merk..."
                options={CAR_BRANDS}
                selected={data.brands}
                onChange={v => {
                  // verwijder modellen van niet-meer-geselecteerde merken
                  const newModels = data.models.filter(m =>
                    v.some(b => m.startsWith(b + " "))
                  );
                  setData(p => ({ ...p, brands: v, models: newModels }));
                }}
              />
            </Section>

            {/* Model */}
            {data.brands.length > 0 && (
              <Section title="Model" subtitle="Selecteer één of meerdere modellen (optioneel)">
                <SearchableMultiSelect
                  placeholder="Zoek op model..."
                  options={allModels}
                  selected={data.models}
                  onChange={v => setField("models", v)}
                />
              </Section>
            )}

            {/* Budget */}
            <Card title="Budget">
              <div className="grid grid-cols-2 gap-4 mb-3">
                <Field label="Budget vanaf">
                  <EuroInput placeholder="10.000" value={data.priceMin} onChange={v => setField("priceMin", v)} />
                </Field>
                <Field label="Budget tot">
                  <EuroInput placeholder="50.000" value={data.priceMax} onChange={v => setField("priceMax", v)} />
                </Field>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-3">
                <Field label="Bouwjaar vanaf">
                  <Input type="number" placeholder="2018" value={data.yearMin} onChange={e => setField("yearMin", e.target.value)} />
                </Field>
                <Field label="Bouwjaar tot">
                  <Input type="number" placeholder="2024" value={data.yearMax} onChange={e => setField("yearMax", e.target.value)} />
                </Field>
                <Field label="Max. kilometerstand">
                  <Input type="number" placeholder="100.000" value={data.mileageMax} onChange={e => setField("mileageMax", e.target.value)} />
                </Field>
              </div>
              {/* Marktindicator */}
              {adjustedMarket && budgetMax > 0 && budgetSignal && (
                <div className={`flex items-start gap-2.5 p-3.5 rounded-xl text-sm border mt-1 ${
                  budgetSignal === "low" ? "bg-red-50 border-red-100 text-red-700" :
                  budgetSignal === "high" ? "bg-blue-50 border-blue-100 text-blue-700" :
                  "bg-green-50 border-green-100 text-green-700"
                }`}>
                  {budgetSignal === "low" ? <TrendingDown className="w-4 h-4 flex-shrink-0 mt-0.5" /> :
                   budgetSignal === "high" ? <TrendingUp className="w-4 h-4 flex-shrink-0 mt-0.5" /> :
                   <Minus className="w-4 h-4 flex-shrink-0 mt-0.5" />}
                  <div className="flex-1">
                    {budgetSignal === "low" && (
                      <>
                        <strong className="block mb-1">Dit budget lijkt niet realistisch.</strong>
                        Het marktgemiddelde voor deze specificaties ligt rond{" "}
                        <strong>{formatCurrency(adjustedMarket.avg)}</strong>.
                        <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
                          <span className="bg-red-100 px-2 py-0.5 rounded-full">Budget verhogen</span>
                          <span className="bg-red-100 px-2 py-0.5 rounded-full">Bouwjaar verlagen</span>
                          <span className="bg-red-100 px-2 py-0.5 rounded-full">Kilometerstand verhogen</span>
                        </div>
                      </>
                    )}
                    {budgetSignal === "high" && (
                      <>
                        <strong className="block mb-0.5">Ruim budget.</strong>
                        Voor dit budget vind je doorgaans een{yearMin > 0 ? ` ${yearMin}+` : " recente"} uitvoering met weinig kilometers.
                        Marktgemiddelde: {formatCurrency(adjustedMarket.avg)}.
                      </>
                    )}
                    {budgetSignal === "good" && (
                      <>
                        <strong className="block mb-0.5">Goed nieuws — realistisch budget!</strong>
                        Jouw budget sluit goed aan bij de huidige markt.{" "}
                        {yearMin > 0 && <>Voor bouwjaar {yearMin}+: </>}
                        Marktgemiddelde: {formatCurrency(adjustedMarket.avg)} (range {formatCurrency(adjustedMarket.min)}–{formatCurrency(adjustedMarket.max)}).
                      </>
                    )}
                    {marketData && (
                      <div className="mt-1.5 text-xs opacity-70 flex items-center gap-1">
                        <Info className="w-3 h-3" />
                        Referentie: gemiddeld bouwjaar {marketData.avgYear} · {marketData.avgKm.toLocaleString("nl-NL")} km
                        {(yearMin > 0 || mileageMax > 0) && " · prijs aangepast op jouw criteria"}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Card>

            {/* Voertuigeigenschappen */}
            <Card title="Voertuigeigenschappen">
              <div className="space-y-5">
                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-2 block">Brandstof</Label>
                  <div className="flex flex-wrap gap-2">
                    {FUEL_TYPES.map(f => (
                      <Chip key={f.value} label={f.label} selected={data.fuelTypes.includes(f.value)} onClick={() => toggleStr("fuelTypes", f.value)} />
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-2 block">Transmissie</Label>
                  <div className="flex flex-wrap gap-2">
                    {TRANSMISSION_TYPES.map(t => (
                      <Chip key={t.value} label={t.label} selected={data.transmissions.includes(t.value)} onClick={() => toggleStr("transmissions", t.value)} />
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-2 block">Aandrijving</Label>
                  <div className="flex flex-wrap gap-2">
                    {DRIVE_TYPES.map(d => (
                      <Chip key={d.value} label={d.label} selected={data.driveTypes.includes(d.value)} onClick={() => toggleStr("driveTypes", d.value)} />
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-2 block">Carrosserie</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {BODY_TYPES.map(t => (
                      <Chip key={t.value} label={t.label} selected={data.bodyTypes.includes(t.value)} onClick={() => toggleStr("bodyTypes", t.value)} />
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* ═══════════ STAP 2: WENSEN ═══════════ */}
        {step === 2 && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">Opties & specifieke wensen</h2>
              <p className="text-slate-500 text-sm">Hoe specifieker jouw wensen, hoe beter dealers kunnen matchen.</p>
            </div>

            {/* Opties */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-slate-900">Gewenste opties</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    <strong className="text-slate-700">Must Have</strong> = vereist (5× zwaarder in matching) ·{" "}
                    <strong className="text-slate-700">Nice To Have</strong> = welkom maar niet verplicht
                  </p>
                </div>
                {selectedOptCount > 0 && (
                  <span className="text-xs bg-slate-900 text-white px-2.5 py-1 rounded-full font-semibold">{selectedOptCount} geselecteerd</span>
                )}
              </div>

              {selectedOptCount > 0 && (
                <div className="mb-4 p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-wrap gap-1.5">
                  {Object.entries(data.options).map(([opt, pref]) => (
                    <span
                      key={opt}
                      className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-full font-medium border ${
                        pref === "must-have" ? "bg-slate-900 text-white border-slate-900" : "bg-blue-50 text-blue-700 border-blue-200"
                      }`}
                    >
                      {pref === "must-have" ? <Star className="w-2.5 h-2.5" /> : "○"} {opt}
                      <button onClick={() => {
                        const rest = Object.fromEntries(Object.entries(data.options).filter(([k]) => k !== opt)) as Record<string, OptionPref>;
                        setField("options", rest);
                      }}><X className="w-2.5 h-2.5 opacity-60 hover:opacity-100" /></button>
                    </span>
                  ))}
                </div>
              )}

              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input className="pl-9" placeholder="Zoek een optie..." value={optionSearch} onChange={e => setOptionSearch(e.target.value)} />
              </div>

              <div className="space-y-2">
                {filteredCats.map(cat => (
                  <div key={cat.name} className="bg-white rounded-xl border border-slate-100 overflow-hidden">
                    <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-600 uppercase tracking-wide">
                      {cat.name}
                    </div>
                    <div className="divide-y divide-slate-50">
                      {cat.options.map(opt => {
                        const pref = data.options[opt];
                        return (
                          <div key={opt} className="flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 transition-colors">
                            <span className="text-sm text-slate-700">{opt}</span>
                            <div className="flex gap-2 flex-shrink-0">
                              <button
                                onClick={() => toggleOption(opt, "must-have")}
                                className={`px-2.5 py-1 rounded-full text-xs font-semibold border transition-all ${
                                  pref === "must-have"
                                    ? "bg-slate-900 text-white border-slate-900"
                                    : "border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-700"
                                }`}
                              >
                                Must Have
                              </button>
                              <button
                                onClick={() => toggleOption(opt, "nice-to-have")}
                                className={`px-2.5 py-1 rounded-full text-xs font-semibold border transition-all ${
                                  pref === "nice-to-have"
                                    ? "bg-blue-50 text-blue-700 border-blue-300"
                                    : "border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-700"
                                }`}
                              >
                                Nice To Have
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Extra wensen */}
            <Card title="Specifieke wensen">
              <p className="text-sm text-slate-500 mb-3">
                Zijn er nog specifieke wensen? Denk aan uitvoering, kleur, herkomst, onderhoud, trekgewicht etc.
              </p>
              <Textarea
                placeholder={`Voorbeelden:\n• Alleen S-Line / M-Sport / AMG-Line\n• Geen importauto\n• Alleen zwart of donkergrijs\n• Dealeronderhouden\n• Eerste eigenaar\n• Trekgewicht minimaal 1800 kg`}
                value={data.extraWishes}
                onChange={e => setField("extraWishes", e.target.value)}
                rows={5}
                className="resize-none"
              />
              <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-400">
                <Lightbulb className="w-3.5 h-3.5" />
                Deze informatie wordt meegenomen in de matching met dealers.
              </div>
            </Card>

            {/* Open voor alternatieven */}
            <Card title="Open voor vergelijkbare auto&apos;s?">
              <p className="text-sm text-slate-500 mb-4">
                Staat je open voor vergelijkbare modellen als de exacte match niet beschikbaar is?
              </p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[{ v: true, l: "Ja, alternatieven zijn welkom" }, { v: false, l: "Nee, alleen mijn keuze" }].map(opt => (
                  <button
                    key={String(opt.v)}
                    onClick={() => setField("openToAlternatives", opt.v)}
                    className={`py-3 px-4 rounded-xl border-2 text-sm font-medium text-left transition-all ${
                      data.openToAlternatives === opt.v
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-100 bg-white text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    {opt.l}
                  </button>
                ))}
              </div>
              {data.openToAlternatives === true && altSuggestions.length > 0 && (
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-2">Mogelijke alternatieven voor jouw zoekopdracht</p>
                  <div className="flex flex-wrap gap-1.5">
                    {altSuggestions.map(alt => (
                      <span key={alt} className="text-xs bg-white border border-blue-200 text-blue-700 px-2.5 py-1 rounded-full">
                        {alt}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {/* Inruil */}
            <Card title="Inruilauto">
              <p className="text-sm text-slate-500 mb-4">Heeft u een auto om in te ruilen?</p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[{ v: true, l: "Ja, ik wil inruilen" }, { v: false, l: "Nee, geen inruil" }].map(opt => (
                  <button
                    key={String(opt.v)}
                    onClick={() => setField("hasTradeIn", opt.v)}
                    className={`py-3 px-4 rounded-xl border-2 text-sm font-medium text-left transition-all ${
                      data.hasTradeIn === opt.v
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-100 bg-white text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    {opt.l}
                  </button>
                ))}
              </div>
              {data.hasTradeIn && (
                <div className="space-y-4 animate-fade-in">
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Kenteken">
                      <RDWInput value={data.tradeInLicense} onChange={v => setField("tradeInLicense", v)} />
                    </Field>
                    <Field label="Kilometerstand">
                      <Input type="number" placeholder="85.000" value={data.tradeInMileage} onChange={e => setField("tradeInMileage", e.target.value)} />
                    </Field>
                  </div>
                  <Field label="Opmerkingen" optional>
                    <Textarea placeholder="Staat, schades, modificaties..." value={data.tradeInRemarks} onChange={e => setField("tradeInRemarks", e.target.value)} rows={2} />
                  </Field>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-slate-300 transition-colors cursor-pointer">
                    <Upload className="w-7 h-7 text-slate-300 mx-auto mb-2" />
                    <div className="text-sm font-medium text-slate-500">Foto&apos;s uploaden (optioneel)</div>
                    <div className="text-xs text-slate-400 mt-1">JPG, PNG tot 10 MB</div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}

        {/* ═══════════ STAP 3: CONTACT ═══════════ */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in max-w-xl">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">Jouw gegevens</h2>
              <p className="text-slate-500 text-sm">Bijna klaar. Vul jouw contactgegevens in zodat dealers contact kunnen opnemen.</p>
            </div>

            {/* Privacy callout */}
            <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-800">
              <Shield className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-500" />
              <div>
                <strong className="font-semibold">Jouw privacy staat voorop.</strong>{" "}
                Telefoonnummer is niet zichtbaar voor dealers tenzij jij zelf contact initieert. E-mailadres wordt geverifieerd vóór publicatie.{" "}
                <Link href="/privacy" className="underline underline-offset-2 hover:no-underline">Privacybeleid</Link>
              </div>
            </div>

            {/* Koopintentie */}
            <Card title="Wanneer wil je kopen?">
              <div className="grid grid-cols-2 gap-3">
                {["Binnen 1 week", "Binnen 30 dagen", "Binnen 3 maanden", "Oriënterend"].map(intent => (
                  <button
                    key={intent}
                    onClick={() => { setField("buyIntent", intent); setErrors(e => ({ ...e, buyIntent: undefined })); }}
                    className={`py-3 px-4 rounded-xl border-2 text-sm font-medium text-left transition-all ${
                      data.buyIntent === intent
                        ? "border-slate-900 bg-slate-900 text-white"
                        : errors.buyIntent
                          ? "border-red-200 bg-red-50 text-slate-700"
                          : "border-slate-100 bg-white text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    {intent}
                  </button>
                ))}
              </div>
              {errors.buyIntent && <p className="text-red-500 text-xs mt-2">{errors.buyIntent}</p>}
            </Card>

            {/* Contactgegevens */}
            <Card title="Contactgegevens">
              <div className="space-y-4">
                <Field label="Naam" required>
                  <Input
                    placeholder="Jan de Vries"
                    value={data.name}
                    onChange={e => { setField("name", e.target.value); setErrors(x => ({ ...x, name: undefined })); }}
                    className={errors.name ? "border-red-300" : ""}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </Field>
                <Field label="E-mailadres" required>
                  <Input
                    type="email"
                    placeholder="jan@voorbeeld.nl"
                    value={data.email}
                    onChange={e => { setField("email", e.target.value); setErrors(x => ({ ...x, email: undefined })); }}
                    className={errors.email ? "border-red-300" : ""}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  <p className="text-xs text-slate-400 mt-1">Je ontvangt een verificatiecode op dit adres.</p>
                </Field>
                <Field label="Postcode" required>
                  <Input
                    placeholder="1234 AB"
                    value={data.postcode}
                    onChange={e => { setField("postcode", e.target.value); setErrors(x => ({ ...x, postcode: undefined })); }}
                    className={errors.postcode ? "border-red-300" : ""}
                  />
                  {errors.postcode && <p className="text-red-500 text-xs mt-1">{errors.postcode}</p>}
                </Field>
                <Field label="Telefoonnummer" optional>
                  <Input
                    type="tel"
                    placeholder="+31 6 12345678"
                    value={data.phone}
                    onChange={e => setField("phone", e.target.value)}
                  />
                </Field>
                {/* Phone toggle */}
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <button
                    onClick={() => setField("sharePhone", !data.sharePhone)}
                    className={`w-10 h-6 rounded-full flex items-center transition-all flex-shrink-0 mt-0.5 ${data.sharePhone ? "bg-slate-900 justify-end" : "bg-slate-200 justify-start"}`}
                  >
                    <span className="w-4 h-4 bg-white rounded-full mx-1 shadow-sm" />
                  </button>
                  <div className="text-sm">
                    <div className="font-medium text-slate-900">Telefoonnummer tonen aan dealers</div>
                    <div className="text-slate-500 mt-0.5 text-xs">Standaard verborgen. Dealers kunnen je alleen e-mailen totdat jij het deelt.</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Leadscore preview */}
            <LeadScoreCard score={leadScore} info={scoreInfo} data={data} />

            {/* Overzicht */}
            <Card title="Overzicht jouw aanvraag">
              <div className="grid grid-cols-2 gap-3 text-sm">
                {data.brands.length > 0 && <SumItem k="Merk" v={data.brands.join(", ")} />}
                {data.models.length > 0 && <SumItem k="Model" v={data.models.join(", ")} />}
                {data.bodyTypes.length > 0 && <SumItem k="Carrosserie" v={data.bodyTypes.join(", ")} />}
                {data.fuelTypes.length > 0 && <SumItem k="Brandstof" v={data.fuelTypes.join(", ")} />}
                {data.transmissions.length > 0 && <SumItem k="Transmissie" v={data.transmissions.join(", ")} />}
                {data.driveTypes.length > 0 && <SumItem k="Aandrijving" v={data.driveTypes.join(", ")} />}
                {(data.priceMin || data.priceMax) && <SumItem k="Budget" v={`€ ${data.priceMin || "–"} t/m € ${data.priceMax || "∞"}`} />}
                {(data.yearMin || data.yearMax) && <SumItem k="Bouwjaar" v={`${data.yearMin || "–"} – ${data.yearMax || "heden"}`} />}
                {data.mileageMax && <SumItem k="Max. km" v={`${parseInt(data.mileageMax).toLocaleString("nl-NL")} km`} />}
                {data.buyIntent && <SumItem k="Kooptermijn" v={data.buyIntent} />}
                {data.hasTradeIn !== null && (
                  <SumItem k="Inruil" v={data.hasTradeIn ? `Ja${data.tradeInLicense ? ` (${data.tradeInLicense})` : ""}` : "Nee"} />
                )}
                {data.openToAlternatives !== null && (
                  <SumItem k="Alternatieven" v={data.openToAlternatives ? "Ja" : "Nee"} />
                )}
                {Object.keys(data.options).filter(o => data.options[o] === "must-have").length > 0 && (
                  <div className="col-span-2">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Must Have opties</div>
                    <div className="flex flex-wrap gap-1">
                      {Object.keys(data.options).filter(o => data.options[o] === "must-have").map(o => (
                        <span key={o} className="text-xs bg-slate-900 text-white px-2 py-0.5 rounded-full">★ {o}</span>
                      ))}
                    </div>
                  </div>
                )}
                {data.extraWishes.trim() && (
                  <div className="col-span-2">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Specifieke wensen</div>
                    <p className="text-xs text-slate-600 leading-relaxed">{data.extraWishes}</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}

        {/* Navigatie */}
        <div className="mt-10 flex items-center justify-between pt-6 border-t border-slate-100">
          <Button
            variant="outline"
            onClick={() => setStep(s => typeof s === "number" ? Math.max(1, s - 1) as Step : 3)}
            disabled={step === 1}
            className="rounded-full"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Vorige
          </Button>

          {step < 3 ? (
            <Button
              onClick={() => setStep(s => (typeof s === "number" ? Math.min(3, s + 1) : 3) as Step)}
              disabled={step === 1 && data.brands.length === 0}
              className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6"
            >
              Volgende <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button
              onClick={() => { if (validateStep3()) setStep("verify"); }}
              className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8 shadow-lg"
            >
              <BadgeCheck className="w-4 h-4 mr-2" />
              Aanvraag versturen & e-mail verifiëren
            </Button>
          )}
        </div>

        {step === 1 && data.brands.length === 0 && (
          <p className="text-center text-sm text-slate-400 mt-3">Selecteer minimaal één merk om door te gaan</p>
        )}
      </div>
    </div>
  );
}

/* ─── Lead Score Card ─── */
function LeadScoreCard({ score, info, data }: { score: number; info: ReturnType<typeof getLeadScoreLabel>; data: FormData }) {
  const factors = [
    { label: "Merk geselecteerd", ok: data.brands.length > 0 },
    { label: "Model geselecteerd", ok: data.models.length > 0 },
    { label: "Budget ingevuld", ok: (parseInt(data.priceMax) || 0) > 0 },
    { label: "Koopintentie ingevuld", ok: !!data.buyIntent },
    { label: "Telefoonnummer ingevuld", ok: data.phone.trim().length > 5 },
    { label: "Inruilauto aanwezig", ok: !!data.hasTradeIn },
    { label: "Opties geselecteerd", ok: Object.keys(data.options).length >= 3 },
    { label: "Specifieke wensen ingevuld", ok: data.extraWishes.trim().length > 10 },
  ];

  return (
    <div className={`rounded-2xl border p-5 ${info.color}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wide opacity-70 mb-0.5">Jouw leadscore</div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black">{score}</span>
            <span className="text-sm font-medium opacity-70">/ 100</span>
            <span className="text-lg">{info.emoji}</span>
            <span className="font-bold text-sm">{info.label}</span>
          </div>
        </div>
        <Flame className="w-8 h-8 opacity-30" />
      </div>
      <div className="h-2 bg-black/10 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-current rounded-full transition-all duration-700"
          style={{ width: `${score}%`, opacity: 0.6 }}
        />
      </div>
      <div className="space-y-1.5">
        {factors.map(f => (
          <div key={f.label} className="flex items-center gap-2 text-xs">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${f.ok ? "bg-current opacity-80" : "bg-black/10"}`}>
              {f.ok && <Check className="w-2.5 h-2.5 text-white" />}
            </div>
            <span className={f.ok ? "font-medium" : "opacity-50"}>{f.label}</span>
          </div>
        ))}
      </div>
      <p className="text-xs mt-3 opacity-60">
        Een hogere score betekent dat jouw aanvraag meer aandacht krijgt van dealers.
      </p>
    </div>
  );
}

/* ─── Email Verify ─── */
function VerifyStep({ email, code, onCodeChange, onVerify, onBack, error }: {
  email: string; code: string; onCodeChange: (v: string) => void;
  onVerify: () => void; onBack: () => void; error: string;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50/50 p-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-100 shadow-xl p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-5">
          <BadgeCheck className="w-8 h-8 text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">E-mail verifiëren</h2>
        <p className="text-slate-500 mb-6">
          We hebben een code verstuurd naar <strong className="text-slate-700">{email}</strong>.
          Voer de code in om jouw aanvraag te publiceren.
        </p>
        <Input
          className="text-center text-2xl tracking-[0.3em] font-mono mb-3"
          placeholder="0000"
          maxLength={4}
          value={code}
          onChange={e => onCodeChange(e.target.value.replace(/\D/g, ""))}
          onKeyDown={e => e.key === "Enter" && onVerify()}
        />
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <p className="text-xs text-slate-400 mb-5">Demo: voer willekeurig 4 cijfers in.</p>
        <Button
          onClick={onVerify}
          disabled={code.length < 4}
          className="w-full bg-slate-900 text-white hover:bg-slate-800 rounded-full mb-3"
        >
          <Lock className="w-4 h-4 mr-2" /> Verifiëren & aanvraag plaatsen
        </Button>
        <button onClick={onBack} className="text-sm text-slate-400 hover:text-slate-600 transition-colors">
          ← Terug aanpassen
        </button>
      </div>
    </div>
  );
}

/* ─── Success ─── */
function SuccessScreen({ data, leadScore }: { data: FormData; leadScore: number }) {
  const info = getLeadScoreLabel(leadScore);
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50/50 p-4">
      <div className="max-w-lg w-full text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Aanvraag geplaatst!</h2>
        <p className="text-slate-500 text-lg mb-1">
          {data.name ? `Bedankt, ${data.name.split(" ")[0]}!` : "Bedankt!"} Je zoekopdracht is geverifieerd en live.
        </p>
        <p className="text-slate-400 mb-6">
          Aanbiedingen komen op <strong className="text-slate-700">{data.email}</strong>
        </p>

        {/* Score badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold mb-8 ${info.color}`}>
          <span className="text-base">{info.emoji}</span>
          Leadscore {leadScore}/100 · {info.label}
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-6 text-left mb-6">
          <div className="font-semibold text-slate-900 mb-4">Wat gebeurt er nu?</div>
          {[
            { label: "Aanvraag verstuurd", desc: "Jouw aanvraag is verstuurd naar relevante dealers in jouw regio.", done: true },
            { label: "Dealers matchen", desc: "Dealers met een passende auto reageren doorgaans binnen 18 uur.", done: false },
            { label: "Aanbiedingen bekijken", desc: "Je ontvangt aanbiedingen per e-mail. Jij beslist met wie je contact opneemt.", done: false },
          ].map((s, i) => (
            <div key={i} className="flex items-start gap-3 py-3 border-b border-slate-50 last:border-0">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${s.done ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                {s.done ? "✓" : i + 1}
              </div>
              <div>
                <div className={`font-medium text-sm ${s.done ? "text-green-700" : "text-slate-900"}`}>{s.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <Link href="/mijn-aanvraag">
          <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8 mb-3 w-full" size="lg">
            Bekijk mijn aanvraag &amp; aanbiedingen
          </Button>
        </Link>
        <Link href="/">
          <Button variant="ghost" className="text-slate-500 rounded-full w-full">Terug naar home</Button>
        </Link>
      </div>
    </div>
  );
}

/* ─── Helpers ─── */
function Section({ title, subtitle, required, children }: {
  title: string; subtitle?: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-3">
        <h3 className="font-semibold text-slate-900">
          {title}{required && <span className="text-red-500 ml-0.5">*</span>}
        </h3>
        {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5">
      <h3 className="font-semibold text-slate-900 mb-4">{title}</h3>
      {children}
    </div>
  );
}

function Field({ label, children, required, optional }: {
  label: string; children: React.ReactNode; required?: boolean; optional?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
        {optional && <span className="text-slate-400 text-xs ml-1 font-normal">(optioneel)</span>}
      </Label>
      {children}
    </div>
  );
}

function Chip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-2 rounded-lg border text-xs font-medium transition-all text-center ${
        selected
          ? "border-slate-900 bg-slate-900 text-white"
          : "border-slate-100 bg-white text-slate-700 hover:border-slate-300"
      }`}
    >
      {selected && <Check className="w-3 h-3 inline mr-1 -mt-0.5" />}{label}
    </button>
  );
}

function EuroInput({ placeholder, value, onChange }: {
  placeholder: string; value: string; onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">€</span>
      <Input type="number" className="pl-7" placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} />
    </div>
  );
}

function SumItem({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{k}</div>
      <div className="text-slate-900 font-medium mt-0.5 text-sm">{v}</div>
    </div>
  );
}

function RDWInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [rdwData, setRdwData] = useState<{ merk?: string; handelsbenaming?: string; bouwjaar?: string } | null>(null);
  const [rdwLoading, setRdwLoading] = useState(false);

  async function lookup(kenteken: string) {
    const clean = kenteken.replace(/[-\s]/g, "");
    if (clean.length < 6) return;
    setRdwLoading(true);
    try {
      const res = await fetch(`/api/rdw/${clean}`);
      if (res.ok) setRdwData(await res.json());
    } catch { /* ignore */ }
    setRdwLoading(false);
  }

  return (
    <div className="space-y-1.5">
      <div className="relative">
        <Input
          placeholder="AB-123-C"
          value={value}
          onChange={e => { onChange(e.target.value.toUpperCase()); setRdwData(null); }}
          onBlur={() => lookup(value)}
          className="uppercase font-mono tracking-widest pr-10"
        />
        {rdwLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-slate-300 border-t-slate-700 rounded-full animate-spin" />
        )}
      </div>
      {rdwData && (
        <div className="text-xs bg-green-50 border border-green-200 rounded-lg px-3 py-2 text-green-800 flex items-center gap-2">
          <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 text-green-600" />
          {rdwData.merk} {rdwData.handelsbenaming} · {rdwData.bouwjaar}
        </div>
      )}
    </div>
  );
}
