"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CREDIT_PACKAGES } from "@/lib/data";
import { CreditCard, Zap, ArrowRight, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";

const HISTORY = [
  { date:"9 jun 2025", desc:"Lead geopend — Audi Q5", credits:-1, balance:24 },
  { date:"9 jun 2025", desc:"Lead geopend — BMW X3", credits:-1, balance:25 },
  { date:"8 jun 2025", desc:"Lead geopend — Cupra Formentor", credits:-1, balance:26 },
  { date:"5 jun 2025", desc:"Credits gekocht — 25 pack", credits:+25, balance:27 },
  { date:"4 jun 2025", desc:"Lead geopend — VW Golf", credits:-1, balance:2 },
  { date:"3 jun 2025", desc:"Credit teruggestort — geen reactie consument", credits:+1, balance:3 },
];

export default function CreditsPage() {
  const [selected, setSelected] = useState<string>("25");
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId: `credits_${selected}` }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else if (data.demo) {
        toast.success("Demo modus: Stripe niet geconfigureerd. Credits worden gesimuleerd.");
        setLoading(false);
      } else {
        toast.error(data.error || "Checkout mislukt");
        setLoading(false);
      }
    } catch {
      toast.error("Verbindingsfout. Probeer opnieuw.");
      setLoading(false);
    }
  }

  const selectedPkg = CREDIT_PACKAGES.find(p => p.id === selected);

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8"><h1 className="text-2xl font-bold text-slate-900">Credits</h1><p className="text-slate-500 mt-1">1 credit = 1 lead openen. Credits vervallen niet. Refund bij geen reactie binnen 48 uur.</p></div>

      {/* Balance card */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-700 rounded-2xl p-6 text-white mb-8 flex items-center justify-between">
        <div>
          <div className="text-sm text-slate-400 mb-1">Huidig saldo</div>
          <div className="text-5xl font-bold">24</div>
          <div className="text-slate-400 mt-1">credits</div>
          <div className="mt-4 h-2 bg-white/10 rounded-full w-48 overflow-hidden"><div className="h-full bg-blue-400 rounded-full" style={{width:"24%"}}/></div>
          <div className="flex justify-between text-xs text-slate-500 mt-1 w-48"><span>0</span><span>100</span></div>
        </div>
        <CreditCard className="w-12 h-12 text-slate-500" />
      </div>

      {/* Packages */}
      <h2 className="text-lg font-bold text-slate-900 mb-4">Credits kopen</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {CREDIT_PACKAGES.map(pkg => (
          <button key={pkg.id} onClick={() => setSelected(pkg.id)} className={`relative rounded-2xl p-5 border-2 text-left transition-all ${selected===pkg.id?"border-slate-900 bg-slate-50":"border-slate-100 bg-white hover:border-slate-300"}`}>
            {pkg.badge && <div className={`absolute -top-2.5 left-4 text-xs font-bold px-2.5 py-1 rounded-full ${pkg.popular?"bg-blue-600 text-white":"bg-green-100 text-green-700"}`}>{pkg.badge}</div>}
            {selected===pkg.id && <div className="absolute top-3 right-3 w-5 h-5 bg-slate-900 rounded-full flex items-center justify-center"><Check className="w-3 h-3 text-white"/></div>}
            <div className="text-3xl font-bold text-slate-900 mb-0.5">{pkg.credits}</div>
            <div className="text-sm text-slate-500 mb-3">credits</div>
            <div className="text-xl font-bold text-slate-900 mb-0.5">€ {pkg.price}</div>
            <div className="text-xs text-slate-400">€ {pkg.pricePerCredit.toFixed(2)} p/c</div>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4 mb-10">
        <Button onClick={handleCheckout} disabled={loading || !selected} className="bg-slate-900 text-white hover:bg-slate-800 rounded-full px-8 gap-2">
          {loading ? <Loader2 className="w-4 h-4 animate-spin"/> : <Zap className="w-4 h-4"/>}
          {selectedPkg ? `${selectedPkg.credits} credits kopen — € ${selectedPkg.price}` : "Selecteer een pakket"}
          <ArrowRight className="w-4 h-4"/>
        </Button>
        <span className="text-sm text-slate-400 flex items-center gap-1.5"><CreditCard className="w-4 h-4"/>Veilig betalen via Stripe · iDEAL & creditcard</span>
      </div>

      {/* History */}
      <h2 className="text-lg font-bold text-slate-900 mb-4">Credithistorie</h2>
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="grid grid-cols-4 text-xs font-semibold text-slate-500 uppercase tracking-wide px-5 py-3 border-b bg-slate-50">
          <div>Datum</div><div className="col-span-2">Omschrijving</div><div className="text-right">Credits</div>
        </div>
        {HISTORY.map((row, i) => (
          <div key={i} className="grid grid-cols-4 items-center px-5 py-3.5 border-b border-slate-50 hover:bg-slate-50 last:border-0">
            <div className="text-sm text-slate-500">{row.date}</div>
            <div className="col-span-2 text-sm text-slate-900 font-medium">{row.desc}</div>
            <div className={`text-sm font-bold text-right ${row.credits>0?"text-green-600":"text-slate-700"}`}>{row.credits>0?`+${row.credits}`:row.credits}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
