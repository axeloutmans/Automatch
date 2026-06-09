import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MARKET_PRICES, formatCurrency } from "@/lib/data";
import { ArrowRight, CheckCircle, Search, BadgeCheck, TrendingUp, MapPin } from "lucide-react";

type Props = { params: Promise<{ zoekterm: string }> };

function parseZoekterm(slug: string) {
  const clean = slug.replace(/-gezocht$/, "").replace(/-/g, " ");
  return clean.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export async function generateMetadata({ params }: Props) {
  const { zoekterm } = await params;
  const car = parseZoekterm(zoekterm);
  return {
    title: `${car} kopen? Ontvang aanbiedingen via AutoMatch`,
    description: `Zoek jij een ${car}? Plaats gratis jouw zoekopdracht op AutoMatch. Dealers met een ${car} reageren direct. Geverifieerde leads, privacy gegarandeerd.`,
    openGraph: {
      title: `${car} gezocht | AutoMatch`,
      description: `Ontvang aanbiedingen van gecertificeerde dealers die een ${car} in hun voorraad hebben.`,
    },
  };
}

const DEALERS_IN_REGION = [
  { name: "AutoHuis Amsterdam", dist: "3 km", rating: 4.8, reviews: 142, verified: true },
  { name: "Garage Westside", dist: "7 km", rating: 4.5, reviews: 89, verified: true },
  { name: "Premium Cars NL", dist: "12 km", rating: 4.7, reviews: 201, verified: true },
];

export default async function ZoektermPage({ params }: Props) {
  const { zoekterm } = await params;
  const car = parseZoekterm(zoekterm);
  const marketData = MARKET_PRICES[car] || null;

  // Structured data (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${car} gezocht`,
    description: `Vind jouw ${car} via AutoMatch. Dealers reageren direct op jouw zoekopdracht.`,
    url: `https://automatch.nl/${zoekterm}`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "AutoMatch", item: "https://automatch.nl" },
        { "@type": "ListItem", position: 2, name: `${car} gezocht`, item: `https://automatch.nl/${zoekterm}` },
      ]
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />

      <div className="pt-20 pb-16 max-w-4xl mx-auto px-4">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-6 pt-4">
          <Link href="/" className="hover:text-slate-600 transition-colors">AutoMatch</Link>
          <span>/</span>
          <span className="text-slate-700">{car} gezocht</span>
        </div>

        {/* Hero */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-blue-600 border-blue-200 bg-blue-50">
            Populaire zoekopdracht
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Op zoek naar een {car}?
          </h1>
          <p className="text-xl text-slate-500 max-w-xl mx-auto mb-8">
            Plaats jouw zoekopdracht gratis op AutoMatch en ontvang aanbiedingen van
            gecertificeerde dealers die een {car} in hun voorraad hebben.
          </p>
          <Link href="/zoeken">
            <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8 shadow-xl shadow-slate-900/15">
              <Search className="w-4 h-4 mr-2" />
              Gratis {car} zoeken
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-green-500" /> Gratis</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-green-500" /> Privacy gegarandeerd</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-green-500" /> Geverifieerde dealers</span>
          </div>
        </div>

        {/* Market data */}
        {marketData && (
          <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6 mb-10">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h2 className="font-bold text-slate-900">Marktinformatie {car} (Nederland, 2025)</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-white rounded-xl p-4 border border-slate-100">
                <div className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">Gemiddelde prijs</div>
                <div className="text-xl font-bold text-slate-900">{formatCurrency(marketData.avg)}</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-100">
                <div className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">Prijsrange</div>
                <div className="text-lg font-bold text-slate-900">{formatCurrency(marketData.min)} – {formatCurrency(marketData.max)}</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-100">
                <div className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">Gem. bouwjaar</div>
                <div className="text-xl font-bold text-slate-900">{marketData.avgYear}</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-100">
                <div className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">Gem. km-stand</div>
                <div className="text-xl font-bold text-slate-900">{marketData.avgKm.toLocaleString("nl-NL")} km</div>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-3">* Gebaseerd op actuele marktdata van AutoMatch. Prijzen zijn indicatief.</p>
          </div>
        )}

        {/* How */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-5">Hoe werkt het?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { step: "1", title: "Zoekopdracht plaatsen", desc: `Geef aan welk type ${car} je zoekt: budget, bouwjaar, opties. Duurt 3 minuten.` },
              { step: "2", title: "Dealers reageren", desc: "Dealers met een passende auto ontvangen jouw aanvraag en sturen een aanbieding." },
              { step: "3", title: "Jij kiest", desc: "Vergelijk aanbiedingen en kies met welke dealer je contact opneemt. Jij hebt de controle." },
            ].map((s, i) => (
              <div key={i} className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white text-sm font-bold flex items-center justify-center mb-3">{s.step}</div>
                <div className="font-semibold text-slate-900 mb-1">{s.title}</div>
                <div className="text-sm text-slate-500">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Dealers in region */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-5">Dealers die reageren op {car}-zoekopdrachten</h2>
          <div className="space-y-3">
            {DEALERS_IN_REGION.map((d, i) => (
              <div key={i} className="flex items-center justify-between bg-white border border-slate-100 rounded-xl p-4 hover:border-slate-200 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-sm">
                    {d.name.split(" ").map(n => n[0]).join("").slice(0,2)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                      {d.name}
                      {d.verified && <BadgeCheck className="w-4 h-4 text-blue-500" />}
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-2">
                      <span>{"★".repeat(Math.round(d.rating))} {d.rating}</span>
                      <span>·</span>
                      <span>{d.reviews} beoordelingen</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <MapPin className="w-3.5 h-3.5" />{d.dist}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA block */}
        <div className="bg-slate-900 rounded-3xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-3">Klaar om jouw {car} te vinden?</h2>
          <p className="text-slate-400 mb-6">Gratis zoekopdracht plaatsen. Dealers reageren doorgaans binnen 18 uur.</p>
          <Link href="/zoeken">
            <Button className="bg-white text-slate-900 hover:bg-slate-100 rounded-full px-8">
              Gratis aanvraag plaatsen <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
