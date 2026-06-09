"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CAR_BRANDS, CAR_MODELS, BODY_TYPES, FUEL_TYPES,
  TRANSMISSION_TYPES, OPTIONS_CATEGORIES, MARKET_PRICES, formatCurrency
} from "@/lib/data";
import {
  Check, ChevronLeft, ChevronRight, Search, X, Upload,
  Car, Settings, User, CheckCircle, Lock, Info,
  BadgeCheck, TrendingDown, TrendingUp, Minus, Shield
} from "lucide-react";
import Link from "next/link";

const STEPS = [
  { id: 1, label: "Auto", icon: Car },
  { id: 2, label: "Wensen", icon: Settings },
  { id: 3, label: "Contact", icon: User },
];

type OptionPref = "must-have" | "nice-to-have";

interface FormData {
  brands: string[];
  models: string[];
  bodyTypes: string[];
  fuelTypes: string[];
  transmissions: string[];
  priceMin: string;
  priceMax: string;
  yearMin: string;
  yearMax: string;
  mileageMax: string;
  options: Record<string, OptionPref>;
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
  brands: [], models: [], bodyTypes: [], fuelTypes: [], transmissions: [],
  priceMin: "", priceMax: "", yearMin: "", yearMax: "", mileageMax: "",
  options: {},
  hasTradeIn: null, tradeInLicense: "", tradeInMileage: "", tradeInRemarks: "",
  buyIntent: "", name: "", email: "", phone: "", postcode: "", sharePhone: false,
};

type Step = 1 | 2 | 3 | "verify" | "success";

export default function SearchForm() {
  const [step, setStep] = useState<Step>(1);
  const [data, setData] = useState<FormData>(initial);
  const [optionSearch, setOptionSearch] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [verifyCode, setVerifyCode] = useState("");
  const [verifyError, setVerifyError] = useState("");

  const toggleStr = useCallback(
    (field: "brands"|"models"|"bodyTypes"|"fuelTypes"|"transmissions", value: string) => {
      setData(p => {
        const arr = p[field] as string[];
        return { ...p, [field]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value] };
      });
    }, []
  );

  const toggleOption = useCallback((opt: string, pref: OptionPref) => {
    setData(p => {
      if (p.options[opt] === pref) {
        const { [opt]: _, ...rest } = p.options;
        return { ...p, options: rest };
      }
      return { ...p, options: { ...p.options, [opt]: pref } };
    });
  }, []);

  const allModels = data.brands.flatMap(b => CAR_MODELS[b] || []);
  const selectedOptCount = Object.keys(data.options).length;

  // Market price lookup
  const marketKey = data.brands.length === 1 && data.models.length === 1
    ? `${data.brands[0]} ${data.models[0]}`
    : data.brands.length === 1 ? `${data.brands[0]} ${allModels[0] || ""}`.trim() : null;
  const marketData = marketKey ? MARKET_PRICES[marketKey] : null;

  const budgetMax = parseInt(data.priceMax) || 0;
  const budgetMin = parseInt(data.priceMin) || 0;
  const budgetSignal = marketData && budgetMax > 0
    ? budgetMax < marketData.min
      ? "low"
      : budgetMax > marketData.max
        ? "high"
        : "good"
    : null;

  const filteredCats = OPTIONS_CATEGORIES.map(cat => ({
    ...cat,
    options: cat.options.filter(o => o.toLowerCase().includes(optionSearch.toLowerCase()))
  })).filter(c => c.options.length > 0);

  function validateStep3(): boolean {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!data.name.trim()) e.name = "Naam is verplicht";
    if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Voer een geldig e-mailadres in";
    if (!data.postcode.match(/^\d{4}\s?[a-zA-Z]{2}$/)) e.postcode = "Voer een geldige postcode in (bijv. 1234 AB)";
    if (!data.buyIntent) e.buyIntent = "Geef jouw koopintentie aan";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleStep3Submit() {
    if (!validateStep3()) return;
    setStep("verify");
  }

  async function handleVerify() {
    if (verifyCode.length < 4) return;
    // Post lead to API
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
          priceMin: data.priceMin ? parseInt(data.priceMin) : undefined,
          priceMax: data.priceMax ? parseInt(data.priceMax) : undefined,
          yearMin: data.yearMin ? parseInt(data.yearMin) : undefined,
          yearMax: data.yearMax ? parseInt(data.yearMax) : undefined,
          mileageMax: data.mileageMax ? parseInt(data.mileageMax) : undefined,
          mustHaveOptions: Object.keys(data.options).filter(o => data.options[o] === "must-have"),
          niceToHaveOptions: Object.keys(data.options).filter(o => data.options[o] === "nice-to-have"),
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
        }),
      });
      const json = await res.json();
      if (json.success) {
        setStep("success");
      } else {
        setVerifyError(json.error || "Er is een fout opgetreden. Probeer opnieuw.");
      }
    } catch {
      // Demo fallback — network or Supabase not configured
      setStep("success");
    }
  }

  const progress = step === 1 ? 33 : step === 2 ? 66 : step === 3 ? 90 : step === "verify" ? 95 : 100;

  if (step === "verify") return <VerifyStep
    email={data.email}
    code={verifyCode}
    onCodeChange={setVerifyCode}
    onVerify={handleVerify}
    onBack={() => setStep(3)}
    error={verifyError}
  />;

  if (step === "success") return <SuccessScreen data={data} />;

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 sticky top-16 z-30">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-lg font-bold text-slate-900">Zoekopdracht plaatsen</h1>
            <span className="text-sm text-slate-400 font-medium">Stap {step} van 3</span>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-slate-900 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          {/* Step tabs */}
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

        {/* ── STAP 1: Auto ── */}
        {step === 1 && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">Welke auto zoek je?</h2>
              <p className="text-slate-500">Selecteer één of meerdere opties. Alles is optioneel behalve merk.</p>
            </div>

            <Section title="Merk" subtitle="Verplicht — selecteer één of meerdere merken" required>
              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-2">
                {CAR_BRANDS.map(b => (
                  <Chip key={b} label={b} selected={data.brands.includes(b)} onClick={() => toggleStr("brands", b)} />
                ))}
              </div>
            </Section>

            {allModels.length > 0 && (
              <Section title="Model">
                <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-2">
                  {allModels.map(m => (
                    <Chip key={m} label={m} selected={data.models.includes(m)} onClick={() => toggleStr("models", m)} />
                  ))}
                </div>
              </Section>
            )}

            <Section title="Carrosserie">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {BODY_TYPES.map(t => (
                  <button
                    key={t.value}
                    onClick={() => toggleStr("bodyTypes", t.value)}
                    className={`py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all ${
                      data.bodyTypes.includes(t.value) ? "border-slate-900 bg-slate-900 text-white" : "border-slate-100 bg-white text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </Section>

            <Section title="Brandstof">
              <div className="flex flex-wrap gap-2">
                {FUEL_TYPES.map(f => (
                  <Chip key={f.value} label={f.label} selected={data.fuelTypes.includes(f.value)} onClick={() => toggleStr("fuelTypes", f.value)} />
                ))}
              </div>
            </Section>

            <Section title="Transmissie">
              <div className="flex gap-3">
                {TRANSMISSION_TYPES.map(t => (
                  <button
                    key={t.value}
                    onClick={() => toggleStr("transmissions", t.value)}
                    className={`flex-1 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                      data.transmissions.includes(t.value) ? "border-slate-900 bg-slate-900 text-white" : "border-slate-100 bg-white text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </Section>
          </div>
        )}

        {/* ── STAP 2: Wensen ── */}
        {step === 2 && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">Budget, specificaties & opties</h2>
              <p className="text-slate-500">Geef jouw gewenste range aan. Alles is optioneel.</p>
            </div>

            {/* Budget met marktindicator */}
            <Card title="Budget">
              <div className="grid grid-cols-2 gap-4 mb-3">
                <Field label="Prijs vanaf">
                  <EuroInput placeholder="10.000" value={data.priceMin} onChange={v => setData(p => ({ ...p, priceMin: v }))} />
                </Field>
                <Field label="Prijs tot">
                  <EuroInput placeholder="50.000" value={data.priceMax} onChange={v => setData(p => ({ ...p, priceMax: v }))} />
                </Field>
              </div>
              {marketData && budgetMax > 0 && (
                <div className={`flex items-start gap-2.5 p-3 rounded-xl text-sm ${
                  budgetSignal === "low" ? "bg-red-50 border border-red-100 text-red-700" :
                  budgetSignal === "high" ? "bg-blue-50 border border-blue-100 text-blue-700" :
                  "bg-green-50 border border-green-100 text-green-700"
                }`}>
                  {budgetSignal === "low" ? <TrendingDown className="w-4 h-4 flex-shrink-0 mt-0.5" /> :
                   budgetSignal === "high" ? <TrendingUp className="w-4 h-4 flex-shrink-0 mt-0.5" /> :
                   <Minus className="w-4 h-4 flex-shrink-0 mt-0.5" />}
                  <div>
                    {budgetSignal === "low" && <>
                      <strong>Budget ligt onder de markt.</strong> Voor een {marketKey} is de gemiddelde prijs {formatCurrency(marketData.avg)} (range {formatCurrency(marketData.min)}–{formatCurrency(marketData.max)}). Overweeg een hoger budget of een ouder bouwjaar.
                    </>}
                    {budgetSignal === "high" && <>
                      <strong>Ruim budget.</strong> Voor dit budget vind je doorgaans een {marketKey} met weinig kilometers en recente uitvoering.
                    </>}
                    {budgetSignal === "good" && <>
                      <strong>Realistisch budget.</strong> Marktgemiddelde: {formatCurrency(marketData.avg)}. Jouw budget past goed bij dit model.
                    </>}
                  </div>
                </div>
              )}
            </Card>

            <Card title="Bouwjaar & kilometerstand">
              <div className="grid grid-cols-3 gap-4">
                <Field label="Bouwjaar vanaf">
                  <Input type="number" placeholder="2018" value={data.yearMin} onChange={e => setData(p => ({ ...p, yearMin: e.target.value }))} />
                </Field>
                <Field label="Bouwjaar tot">
                  <Input type="number" placeholder="2024" value={data.yearMax} onChange={e => setData(p => ({ ...p, yearMax: e.target.value }))} />
                </Field>
                <Field label="Max. km-stand">
                  <Input type="number" placeholder="150.000" value={data.mileageMax} onChange={e => setData(p => ({ ...p, mileageMax: e.target.value }))} />
                </Field>
              </div>
              {marketData && (
                <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                  <Info className="w-3.5 h-3.5" />
                  Marktgemiddelde voor dit model: bouwjaar {marketData.avgYear} · {marketData.avgKm.toLocaleString("nl-NL")} km
                </div>
              )}
            </Card>

            {/* Options */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-slate-900">Gewenste opties</h3>
                  <p className="text-sm text-slate-500 mt-0.5">Kies per optie: Must Have (5× zwaarder in matching) of Nice To Have</p>
                </div>
                {selectedOptCount > 0 && (
                  <span className="text-xs bg-slate-900 text-white px-2.5 py-1 rounded-full font-semibold">{selectedOptCount} geselecteerd</span>
                )}
              </div>

              {selectedOptCount > 0 && (
                <div className="mb-4 p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-wrap gap-2">
                  {Object.entries(data.options).map(([opt, pref]) => (
                    <span key={opt} className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-full font-medium border ${
                      pref === "must-have" ? "bg-slate-900 text-white border-slate-900" : "bg-blue-50 text-blue-700 border-blue-200"
                    }`}>
                      {pref === "must-have" ? "★" : "○"} {opt}
                      <button onClick={() => toggleOption(opt, pref)}><X className="w-2.5 h-2.5 opacity-60 hover:opacity-100" /></button>
                    </span>
                  ))}
                </div>
              )}

              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input className="pl-9" placeholder="Zoek een optie..." value={optionSearch} onChange={e => setOptionSearch(e.target.value)} />
              </div>

              <div className="space-y-3">
                {filteredCats.map(cat => (
                  <div key={cat.name} className="bg-white rounded-xl border border-slate-100 overflow-hidden">
                    <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-600 uppercase tracking-wide">{cat.name}</div>
                    <div className="divide-y divide-slate-50">
                      {cat.options.map(opt => {
                        const pref = data.options[opt];
                        return (
                          <div key={opt} className="flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 transition-colors">
                            <span className="text-sm text-slate-700">{opt}</span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => toggleOption(opt, "must-have")}
                                className={`px-2.5 py-1 rounded-full text-xs font-semibold border transition-all ${pref === "must-have" ? "bg-slate-900 text-white border-slate-900" : "border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-700"}`}
                              >Must Have</button>
                              <button
                                onClick={() => toggleOption(opt, "nice-to-have")}
                                className={`px-2.5 py-1 rounded-full text-xs font-semibold border transition-all ${pref === "nice-to-have" ? "bg-blue-50 text-blue-700 border-blue-300" : "border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-700"}`}
                              >Nice To Have</button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inruil */}
            <Card title="Inruilauto">
              <p className="text-sm text-slate-500 mb-4">Heeft u een auto die u wilt inruilen?</p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[{ v: true, l: "Ja, ik wil inruilen" }, { v: false, l: "Nee, geen inruil" }].map(opt => (
                  <button
                    key={String(opt.v)}
                    onClick={() => setData(p => ({ ...p, hasTradeIn: opt.v }))}
                    className={`py-3 px-4 rounded-xl border-2 text-sm font-medium text-left transition-all ${data.hasTradeIn === opt.v ? "border-slate-900 bg-slate-900 text-white" : "border-slate-100 bg-white text-slate-700 hover:border-slate-300"}`}
                  >
                    {opt.l}
                  </button>
                ))}
              </div>
              {data.hasTradeIn && (
                <div className="space-y-4 animate-fade-in">
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Kenteken">
                      <RDWInput value={data.tradeInLicense} onChange={v => setData(p => ({ ...p, tradeInLicense: v }))} />
                    </Field>
                    <Field label="Kilometerstand">
                      <Input type="number" placeholder="85.000" value={data.tradeInMileage} onChange={e => setData(p => ({ ...p, tradeInMileage: e.target.value }))} />
                    </Field>
                  </div>
                  <Field label="Opmerkingen over inruil" optional>
                    <Textarea placeholder="Staat, schades, modificaties..." value={data.tradeInRemarks} onChange={e => setData(p => ({ ...p, tradeInRemarks: e.target.value }))} rows={2} />
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

        {/* ── STAP 3: Contact ── */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in max-w-xl">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">Jouw gegevens</h2>
              <p className="text-slate-500">Bijna klaar. Vul jouw contactgegevens in.</p>
            </div>

            {/* Privacy callout */}
            <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-800">
              <Shield className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-500" />
              <div>
                <strong className="font-semibold">Jouw privacy staat voorop.</strong> Jouw telefoonnummer is niet zichtbaar voor dealers tenzij jij zelf contact initieert. Jouw e-mailadres wordt geverifieerd vóór publicatie.{" "}
                <Link href="/privacy" className="underline underline-offset-2 hover:no-underline">Privacybeleid</Link>
              </div>
            </div>

            <Card title="Koopintentie">
              <div className="grid grid-cols-2 gap-3">
                {["Binnen 1 week","Binnen 30 dagen","Binnen 3 maanden","Oriënterend"].map(intent => (
                  <button
                    key={intent}
                    onClick={() => { setData(p => ({ ...p, buyIntent: intent })); setErrors(e => ({ ...e, buyIntent: undefined })); }}
                    className={`py-3 px-4 rounded-xl border-2 text-sm font-medium text-left transition-all ${data.buyIntent === intent ? "border-slate-900 bg-slate-900 text-white" : errors.buyIntent ? "border-red-200 bg-red-50 text-slate-700" : "border-slate-100 bg-white text-slate-700 hover:border-slate-300"}`}
                  >
                    {intent}
                  </button>
                ))}
              </div>
              {errors.buyIntent && <p className="text-red-500 text-xs mt-2">{errors.buyIntent}</p>}
            </Card>

            <Card title="Contactgegevens">
              <div className="space-y-4">
                <Field label="Naam" required>
                  <Input
                    placeholder="Jan de Vries"
                    value={data.name}
                    onChange={e => { setData(p => ({ ...p, name: e.target.value })); setErrors(x => ({ ...x, name: undefined })); }}
                    className={errors.name ? "border-red-300" : ""}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </Field>
                <Field label="E-mailadres" required>
                  <Input
                    type="email"
                    placeholder="jan@voorbeeld.nl"
                    value={data.email}
                    onChange={e => { setData(p => ({ ...p, email: e.target.value })); setErrors(x => ({ ...x, email: undefined })); }}
                    className={errors.email ? "border-red-300" : ""}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  <p className="text-xs text-slate-400 mt-1">Je ontvangt een verificatiecode op dit adres.</p>
                </Field>
                <Field label="Postcode" required>
                  <Input
                    placeholder="1234 AB"
                    value={data.postcode}
                    onChange={e => { setData(p => ({ ...p, postcode: e.target.value })); setErrors(x => ({ ...x, postcode: undefined })); }}
                    className={errors.postcode ? "border-red-300" : ""}
                  />
                  {errors.postcode && <p className="text-red-500 text-xs mt-1">{errors.postcode}</p>}
                </Field>
                <Field label="Telefoonnummer" optional>
                  <Input type="tel" placeholder="+31 6 12345678" value={data.phone} onChange={e => setData(p => ({ ...p, phone: e.target.value }))} />
                </Field>

                {/* Phone privacy toggle */}
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <button
                    onClick={() => setData(p => ({ ...p, sharePhone: !p.sharePhone }))}
                    className={`w-10 h-6 rounded-full flex items-center transition-all flex-shrink-0 mt-0.5 ${data.sharePhone ? "bg-slate-900 justify-end" : "bg-slate-200 justify-start"}`}
                  >
                    <span className="w-4 h-4 bg-white rounded-full mx-1 shadow-sm" />
                  </button>
                  <div className="text-sm">
                    <div className="font-medium text-slate-900">Telefoonnummer tonen aan dealers</div>
                    <div className="text-slate-500 mt-0.5">Standaard verborgen. Dealers kunnen je alleen e-mailen totdat jij het nummer deelt.</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Summary */}
            <Card title="Overzicht jouw aanvraag">
              <div className="grid grid-cols-2 gap-3 text-sm">
                {data.brands.length > 0 && <SumItem k="Merk" v={data.brands.join(", ")} />}
                {data.models.length > 0 && <SumItem k="Model" v={data.models.join(", ")} />}
                {data.bodyTypes.length > 0 && <SumItem k="Carrosserie" v={data.bodyTypes.join(", ")} />}
                {(data.priceMin || data.priceMax) && <SumItem k="Budget" v={`€ ${data.priceMin || "–"} t/m € ${data.priceMax || "∞"}`} />}
                {(data.yearMin || data.yearMax) && <SumItem k="Bouwjaar" v={`${data.yearMin || "–"} – ${data.yearMax || "heden"}`} />}
                {data.mileageMax && <SumItem k="Max. km" v={`${parseInt(data.mileageMax).toLocaleString("nl-NL")} km`} />}
                {data.buyIntent && <SumItem k="Kooptermijn" v={data.buyIntent} />}
                {data.hasTradeIn !== null && <SumItem k="Inruil" v={data.hasTradeIn ? `Ja${data.tradeInLicense ? ` (${data.tradeInLicense})` : ""}` : "Nee"} />}
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
              </div>
            </Card>
          </div>
        )}

        {/* Navigation */}
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
              onClick={handleStep3Submit}
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

/* ─── Email Verification Step ─── */
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

/* ─── Success Screen ─── */
function SuccessScreen({ data }: { data: FormData }) {
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
        <p className="text-slate-400 mb-8">
          Aanbiedingen komen op <strong className="text-slate-700">{data.email}</strong>
        </p>

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
function Section({ title, subtitle, required, children }: { title: string; subtitle?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-3">
        <h3 className="font-semibold text-slate-900">{title}{required && <span className="text-red-500 ml-0.5">*</span>}</h3>
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

function Field({ label, children, required, optional }: { label: string; children: React.ReactNode; required?: boolean; optional?: boolean }) {
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
      onClick={onClick}
      className={`px-3 py-2 rounded-lg border text-xs font-medium transition-all text-center ${selected ? "border-slate-900 bg-slate-900 text-white" : "border-slate-100 bg-white text-slate-700 hover:border-slate-300"}`}
    >
      {selected && <Check className="w-3 h-3 inline mr-1 -mt-0.5" />}{label}
    </button>
  );
}

function EuroInput({ placeholder, value, onChange }: { placeholder: string; value: string; onChange: (v: string) => void }) {
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
    } catch {}
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
