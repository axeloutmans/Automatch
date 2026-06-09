import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/shared/CookieBanner";
import { DUMMY_LEADS, getLeadScoreLabel, formatCurrency, getBuyIntentUrgency } from "@/lib/data";
import {
  ArrowRight, Search, Zap, Shield, Star, CheckCircle,
  Car, TrendingUp, ChevronRight, ArrowUpRight,
  Clock, MapPin, ShieldCheck, Lock, BadgeCheck,
  Sparkles, X
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <CookieBanner />

      {/* Hero */}
      <section className="relative pt-24 pb-16 md:pt-36 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 to-white" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(59,130,246,0.06),transparent)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-slate-700 text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Platform live · Gratis te gebruiken voor kopers
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <h1 className="text-5xl md:text-[72px] font-bold text-slate-900 mb-6 leading-[1.05] tracking-tight text-balance">
              Vind jouw volgende auto{" "}
              <span className="gradient-blue">zonder eindeloos</span>{" "}
              te zoeken.
            </h1>

            <p className="text-xl md:text-2xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
              Plaats één zoekopdracht en ontvang aanbiedingen van aangesloten autobedrijven.
              <span className="text-slate-700 font-medium"> Gratis voor kopers. Altijd.</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/zoeken">
                <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8 py-6 text-base font-semibold shadow-xl shadow-slate-900/15 transition-all hover:-translate-y-0.5">
                  <Search className="w-4 h-4 mr-2" />
                  Gratis zoekopdracht plaatsen
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/voor-dealers">
                <Button variant="ghost" size="lg" className="text-slate-600 hover:text-slate-900 rounded-full px-6 py-6 text-base">
                  Voor dealers <ArrowUpRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-green-500" /> GDPR-conform</span>
              <span className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-blue-500" /> Privacy gegarandeerd</span>
              <span className="flex items-center gap-1.5"><BadgeCheck className="w-4 h-4 text-slate-600" /> Geverifieerde dealers</span>
              <span className="flex items-center gap-1.5"><X className="w-4 h-4 text-slate-400" /> Geen verborgen kosten</span>
            </div>
          </div>

          {/* Live lead cards */}
          <div className="mt-20 relative max-w-5xl mx-auto">
            <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
            <div className="text-center mb-5">
              <span className="inline-flex items-center gap-2 text-sm text-slate-500 bg-white border border-slate-100 rounded-full px-4 py-1.5 shadow-sm">
                <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                Recent geplaatste zoekopdrachten
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {DUMMY_LEADS.filter(l => l.verified).slice(0, 3).map((lead) => {
                const score = getLeadScoreLabel(lead.score);
                const intent = getBuyIntentUrgency(lead.buyIntent);
                return (
                  <div key={lead.id} className="bg-white rounded-2xl border border-slate-100 shadow-md p-5 hover:shadow-lg transition-all hover:-translate-y-0.5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-semibold text-slate-900">{lead.brand} {lead.model}</div>
                        <div className="text-sm text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3" />{lead.location}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${score.color}`}>
                          {score.emoji} {lead.score}%
                        </span>
                        {lead.verified && (
                          <span className="text-xs text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                            <BadgeCheck className="w-3 h-3" /> Geverifieerd
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="font-semibold text-slate-900">{formatCurrency(lead.budgetMin)} – {formatCurrency(lead.budgetMax)}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${intent.color}`}>{intent.label}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-50 pt-3">
                      <div className="flex flex-wrap gap-1">
                        {lead.mustHaveOptions.slice(0, 2).map(o => (
                          <span key={o} className="bg-slate-50 text-slate-600 border border-slate-100 px-2 py-0.5 rounded-full">{o}</span>
                        ))}
                      </div>
                      <span className="flex items-center gap-1 flex-shrink-0 ml-2"><Clock className="w-3 h-3" />{lead.date}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="hoe-werkt-het" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-blue-600 border-blue-200 bg-blue-50">Hoe werkt het</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">In 3 stappen aan jouw auto</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">AutoMatch draait de automarkt om. Jij stelt de eisen, dealers komen naar jou.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Plaats jouw zoekopdracht", desc: "Geef aan welke auto je zoekt: merk, model, budget, opties. Duurt minder dan 3 minuten. Volledig gratis. Je e-mailadres wordt geverifieerd zodat jij alleen echte aanbiedingen ontvangt.", icon: Search, color: "bg-blue-600", sub: "E-mailverificatie inbegrepen" },
              { step: "02", title: "Wij matchen met dealers", desc: "Ons algoritme matcht jouw wensen met de voorraad van aangesloten dealers. Must-have opties wegen zwaarder. Alleen relevante dealers ontvangen jouw aanvraag.", icon: Zap, color: "bg-slate-900", sub: "Gemiddeld 3,4 aanbiedingen" },
              { step: "03", title: "Kies met wie je praat", desc: "Dealers sturen een aanbieding. Jij beslist met wie je contact opneemt. Jouw telefoonnummer blijft verborgen totdat jij dat wilt. Geen ongewenste bellers.", icon: Shield, color: "bg-green-600", sub: "Jij hebt altijd de controle" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 p-8 hover:border-slate-200 hover:shadow-lg transition-all group">
                <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-xs font-bold text-slate-400 mb-2 tracking-widest">STAP {item.step}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-4">{item.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full">
                  <CheckCircle className="w-3.5 h-3.5" />{item.sub}
                </span>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/zoeken">
              <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8">
                Start gratis zoekopdracht <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why AutoMatch */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="outline" className="mb-4 text-blue-600 border-blue-200 bg-blue-50">Waarom AutoMatch</Badge>
              <h2 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">
                Stop met eindeloos scrollen.<br />
                <span className="gradient-blue">Laat dealers naar jou komen.</span>
              </h2>
              <p className="text-lg text-slate-500 mb-8 leading-relaxed">
                Marktplaats en AutoScout24 tonen je wat er is. AutoMatch zorgt dat jij krijgt wat je zoekt.
              </p>
              <div className="space-y-5">
                {[
                  { icon: Lock, title: "Jouw nummer blijft verborgen", desc: "Telefoonnummer niet zichtbaar totdat jij contact initieert. Geen ongewenste bellers." },
                  { icon: Zap, title: "Slimme matching op 50+ criteria", desc: "Must-have opties wegen 5× zwaarder. Dealers zonder passende auto reageren niet." },
                  { icon: BadgeCheck, title: "Alle dealers geverifieerd", desc: "KvK-check, beoordeling door kopers, actieve RDW-erkenning. Geen cowboys." },
                  { icon: TrendingUp, title: "Aanbiedingen binnen 24 uur", desc: "Gemiddeld ontvangt een koper 3,4 aanbiedingen binnen 18 uur na plaatsing." },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <item.icon className="w-5 h-5 text-slate-700" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{item.title}</div>
                      <div className="text-sm text-slate-500 mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Match preview */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl shadow-slate-100 p-8">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">Uw zoekopdracht</div>
                  <div className="text-2xl font-bold text-slate-900">Audi Q5</div>
                </div>
                <div className="text-center bg-green-50 border border-green-200 rounded-2xl px-4 py-2">
                  <div className="text-3xl font-bold text-green-700">96%</div>
                  <div className="text-xs text-green-600 font-medium">Match</div>
                </div>
              </div>
              <div className="space-y-2.5 mb-5">
                {[
                  "Merk & model match",
                  "Budget binnen range",
                  "Bouwjaar 2022 ✓",
                  "Apple CarPlay aanwezig (Must Have)",
                  "Panoramadak aanwezig (Must Have)",
                  "Dealer op 23 km afstand",
                ].map((label, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                    </div>
                    <span className="text-sm text-slate-700">{label}</span>
                  </div>
                ))}
              </div>
              <div className="bg-slate-900 rounded-2xl p-4 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <BadgeCheck className="w-4 h-4 text-blue-400" />
                  <span className="text-xs text-slate-400">Geverifieerde dealer</span>
                </div>
                <div className="font-semibold">Audi Q5 50 TFSI e · 2022 · 38.400 km</div>
                <div className="flex items-center justify-between mt-3">
                  <div>
                    <div className="text-2xl font-bold">€ 47.950</div>
                    <div className="text-xs text-slate-500 mt-0.5">Marktwaarde: € 44.500 gem.</div>
                  </div>
                  <Button size="sm" className="bg-white text-slate-900 hover:bg-slate-100 rounded-full text-xs">
                    Bekijk aanbieding
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof — real cases */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Wat kopers en dealers zeggen</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Echte ervaringen van echte gebruikers. Geverifieerd na aankoop.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Thomas van den Berg",
                role: "Koper · Amsterdam",
                avatar: "TB",
                text: "Binnen 24 uur 4 aanbiedingen voor de Audi Q5 die ik zocht. Één ervan was €3.200 onder de vraagprijs elders. Het scheelde mij weken.",
                car: "Audi Q5 · € 47.950",
                stars: 5,
              },
              {
                name: "Marieke de Vries",
                role: "Dealer · Auto Palace Rotterdam",
                avatar: "MV",
                text: "De lead-kwaliteit is structureel beter dan Marktplaats. Mensen die via AutoMatch komen zijn koopbereid. Mijn conversieratio is 22% tegenover 8% voorheen.",
                car: "Sloot 14 deals via AutoMatch",
                stars: 5,
              },
              {
                name: "Jeroen Bakker",
                role: "Koper · Utrecht",
                avatar: "JB",
                text: "Ik heb mijn telefoonnummer pas gedeeld nadat ik de aanbieding had gezien. Geen ongewenste bellers. Precies zoals ik het wil.",
                car: "VW Golf · € 27.400",
                stars: 5,
              },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-md transition-all">
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({length: t.stars}).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed mb-5 text-[15px]">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold text-slate-600">{t.avatar}</div>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">{t.name}</div>
                      <div className="text-xs text-slate-500">{t.role}</div>
                    </div>
                  </div>
                  <span className="text-xs bg-slate-50 text-slate-600 border border-slate-100 px-2.5 py-1 rounded-full">{t.car}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For dealers CTA */}
      <section id="voor-dealers" className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-white/10 text-white border-white/20 hover:bg-white/10">Voor autobedrijven</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Kwalitatieve leads op autopilot</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Geverifieerde kopers die actief zoeken. Geen cold traffic, geen oriënteerders.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { metric: "22%", label: "Gemiddeld conversieratio", sub: "Tegenover 8% bij traditionele leads", icon: TrendingUp },
              { metric: "5 credits", label: "Gratis bij aanmelding", sub: "Geen creditcard vereist", icon: Sparkles },
              { metric: "18 uur", label: "Gemiddelde reactietijd koper", sub: "Op een aanbieding van een dealer", icon: Clock },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/8 transition-colors">
                  <Icon className="w-6 h-6 text-blue-400 mb-4" />
                  <div className="text-4xl font-bold text-white mb-2">{item.metric}</div>
                  <div className="font-medium text-white/80 mb-1">{item.label}</div>
                  <div className="text-sm text-slate-500">{item.sub}</div>
                </div>
              );
            })}
          </div>
          <div className="text-center flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/voor-dealers">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 rounded-full px-8">
                <Car className="w-4 h-4 mr-2" />
                Meer informatie voor dealers
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/dealer/registreren">
              <Button variant="ghost" size="lg" className="text-slate-400 hover:text-white rounded-full px-6">
                Gratis aanmelden →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Veelgestelde vragen</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "Is AutoMatch gratis voor kopers?", a: "Volledig gratis. AutoMatch verdient uitsluitend aan dealers die credits gebruiken om leads te openen. Er zijn geen verborgen kosten of abonnementen voor kopers." },
              { q: "Wie ziet mijn contactgegevens?", a: "Alleen dealers die credits uitgeven om jouw aanvraag te openen. Jouw telefoonnummer is niet zichtbaar totdat jij zelf contact initieert via ons platform." },
              { q: "Wordt mijn e-mailadres geverifieerd?", a: "Ja. Na het plaatsen van een aanvraag ontvang je een verificatiemail. Pas na verificatie is je aanvraag zichtbaar voor dealers. Dit garandeert kwaliteit voor alle partijen." },
              { q: "Kan ik mijn aanvraag intrekken?", a: "Ja. Via jouw portaal kun je een aanvraag op elk moment pauzeren of verwijderen. Dealers ontvangen dan geen toegang meer." },
              { q: "Wat als ik geen aanbiedingen ontvang?", a: "Als je na 48 uur geen enkele reactie hebt ontvangen, neemt ons team contact met je op om je aanvraag te optimaliseren of te verwijzen naar een specifieke dealer in jouw regio." },
              { q: "Zijn alle dealers betrouwbaar?", a: "Dealers worden geverifieerd op KvK-inschrijving, RDW-erkenning en beoordeling door eerdere kopers. Dealers met een slechte beoordeling worden van het platform verwijderd." },
            ].map((faq, i) => (
              <details key={i} className="group bg-white rounded-2xl border border-slate-100 overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-slate-900 hover:bg-slate-50 transition-colors list-none">
                  {faq.q}
                  <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-6 pb-6 text-slate-500 leading-relaxed text-[15px]">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Klaar om jouw droomauto te vinden?</h2>
          <p className="text-xl text-slate-500 mb-10">Gratis, privacyveilig en effectief.</p>
          <Link href="/zoeken">
            <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-10 py-6 text-lg shadow-2xl shadow-slate-900/15">
              Start gratis zoekopdracht <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-500" /> Gratis voor kopers</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-500" /> Geen verplichtingen</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-500" /> GDPR-conform</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-500" /> Geverifieerde dealers</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
