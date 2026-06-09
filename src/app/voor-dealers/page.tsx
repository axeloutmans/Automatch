import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle, ArrowRight, BadgeCheck, Shield, Zap, TrendingUp,
  Users, MapPin, Filter, Bell, BarChart3, Star, X
} from "lucide-react";

export const metadata = {
  title: "Voor dealers | AutoMatch — Kwalitatieve leads op autopilot",
  description: "Ontvang geverifieerde leads van consumenten die actief zoeken naar een auto uit jouw voorraad. Gratis aanmelden.",
};

export default function VoorDealersPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 pb-20 md:pt-36 md:pb-28 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-white/10 text-white border-white/20 hover:bg-white/10">
            Voor autobedrijven
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-balance">
            Kwalitatieve leads.<br />
            <span className="text-blue-400">Geverifieerde kopers.</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            Stop met betalen voor clicks van mensen die niet kopen. AutoMatch stuurt je leads
            van consumenten die actief en koopklaar zijn — geverifieerd per aanvraag.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dealer/registreren">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 rounded-full px-8 font-semibold">
                Gratis aanmelden — 5 credits cadeau
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-slate-500">Geen creditcard vereist. Gratis 5 credits bij aanmelding.</p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "22%", label: "Gemiddeld conversieratio" },
            { value: "18 uur", label: "Gem. reactietijd koper op aanbieding" },
            { value: "3,4×", label: "Aanbiedingen per aanvraag gemiddeld" },
            { value: "100%", label: "Geverifieerde e-mailadressen" },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-3xl font-bold text-slate-900 mb-1">{s.value}</div>
              <div className="text-sm text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-blue-600 border-blue-200 bg-blue-50">Voordelen</Badge>
            <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Alles wat jij als dealer nodig hebt</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: BadgeCheck, title: "Geverifieerde leads", desc: "Elk e-mailadres en telefoonnummer wordt geverifieerd vóór publicatie. Geen nep-aanvragen, geen tijdverspilling." },
              { icon: MapPin, title: "Geografische filtering", desc: "Stel een radius in (25–150 km). Ontvang alleen leads uit jouw werkgebied. Geen leads uit regio's waar jij niet actief bent." },
              { icon: Filter, title: "Merk & model filters", desc: "BMW-dealer? Ontvang alleen BMW-leads. Stel in voor welke merken en modellen jij aanbiedingen wilt doen." },
              { icon: Zap, title: "Exclusieve leads", desc: "Optioneel: betaal 3 credits voor een exclusieve lead die alleen jij ontvangt. Maximale kans op conversie." },
              { icon: Bell, title: "Realtime notificaties", desc: "Nieuwe lead die past? Direct een bericht via e-mail of WhatsApp. Reageer als eerste en vergroot je kansen." },
              { icon: BarChart3, title: "ROI dashboard", desc: "Zie exact hoeveel je hebt geïnvesteerd, hoeveel leads je hebt geopend en hoeveel deals je hebt gesloten. Per maand." },
              { icon: Shield, title: "Lead kwaliteitsscore", desc: "Elke lead heeft een gedetailleerde score op koopintentie, budget-realisme, verificatiestatus en afstand." },
              { icon: TrendingUp, title: "Matching op voorraad", desc: "Koppel jouw VWE of Mobilox voorraad. AutoMatch matcht automatisch op wat jij daadwerkelijk beschikbaar hebt." },
              { icon: Users, title: "Dealer reviews", desc: "Opgebouwde reviews van kopers verbeteren jouw zichtbaarheid en conversie. Bouw reputatie op het platform." },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="bg-white rounded-2xl border border-slate-100 p-6 hover:border-slate-200 hover:shadow-lg transition-all">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-slate-700" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">AutoMatch vs. de rest</h2>
            <p className="text-slate-500">Waarom AutoMatch betere leads oplevert dan traditionele kanalen.</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
            <div className="grid grid-cols-4 text-sm font-semibold border-b border-slate-100">
              <div className="p-4 text-slate-500">Eigenschap</div>
              <div className="p-4 text-center bg-slate-900 text-white">AutoMatch</div>
              <div className="p-4 text-center text-slate-600">Marktplaats</div>
              <div className="p-4 text-center text-slate-600">AutoScout24</div>
            </div>
            {[
              ["Koopklare leads", true, false, false],
              ["Geverifieerde contactgegevens", true, false, false],
              ["Geografische filtering", true, false, true],
              ["Merk/model filtering", true, false, true],
              ["Matchscore op voorraad", true, false, false],
              ["Exclusieve leads mogelijk", true, false, false],
              ["Betaal per lead (geen abonnement)", true, false, false],
              ["ROI dashboard", true, false, true],
            ].map(([label, am, mp, as24], i) => (
              <div key={i} className="grid grid-cols-4 text-sm border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <div className="p-4 text-slate-700 font-medium">{label}</div>
                {[am, mp, as24].map((val, j) => (
                  <div key={j} className={`p-4 text-center ${j === 0 ? "bg-slate-50" : ""}`}>
                    {val
                      ? <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                      : <X className="w-5 h-5 text-slate-300 mx-auto" />}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial dealer */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-0.5 mb-4">
            {Array.from({length:5}).map((_,i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
          </div>
          <blockquote className="text-2xl font-medium text-slate-900 mb-6 leading-relaxed">
            &ldquo;De lead-kwaliteit is structureel beter dan wat ik gewend was van Marktplaats. Mijn conversieratio ging van 8% naar 22% in twee maanden.&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">MV</div>
            <div className="text-left">
              <div className="font-semibold text-slate-900">Marieke de Vries</div>
              <div className="text-sm text-slate-500">Directeur, Auto Palace Rotterdam</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4 tracking-tight">Klaar om te starten?</h2>
          <p className="text-slate-400 mb-8 text-lg">Meld je gratis aan en ontvang direct 5 credits om de eerste leads te openen.</p>
          <Link href="/dealer/registreren">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 rounded-full px-10">
              Gratis aanmelden als dealer <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
