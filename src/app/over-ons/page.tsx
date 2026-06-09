import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Over AutoMatch | Het verhaal achter het platform",
  description: "AutoMatch is gebouwd om de Nederlandse automarkt eerlijker te maken. Lees ons verhaal.",
};

export default function OverOnsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 pt-24 pb-20">
        <div className="mb-10">
          <Badge variant="outline" className="mb-4 text-blue-600 border-blue-200 bg-blue-50">Over ons</Badge>
          <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Waarom AutoMatch bestaat</h1>
          <p className="text-xl text-slate-500 leading-relaxed">
            De automarkt was broken. Wij bouwen iets beters.
          </p>
        </div>

        <div className="prose max-w-none space-y-8 text-[15px] text-slate-600 leading-relaxed">
          <p>
            AutoMatch is in 2025 opgericht met één doel: de automarkt eerlijker maken voor zowel kopers als dealers.
            De traditionele aanpak — uren scrollen op Marktplaats, eindeloos bellen, onduidelijke prijzen — werkt niet meer.
          </p>

          <p>
            Kopers zijn moe van irrelevante aanbiedingen. Dealers betalen maandelijks duizenden euro&apos;s voor platforms
            die geen koopklare leads leveren. Beiden verdienen beter.
          </p>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 my-8">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Onze missie</h2>
            <p className="text-slate-700 font-medium">
              &ldquo;Elke autokopers in Nederland toegang geven tot de best passende aanbieding — snel, privacyveilig en zonder gedoe.&rdquo;
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900">Hoe het werkt</h2>
          <p>
            AutoMatch draait het model om. In plaats van dat jij door duizenden advertenties bladert,
            plaatsen jij jouw wensen en komen dealers naar jou. Ons matchingalgoritme beoordeelt de voorraad
            van aangesloten dealers en koppelt alleen dealers die echt een passende auto hebben.
          </p>

          <h2 className="text-2xl font-bold text-slate-900">Privacy en vertrouwen</h2>
          <p>
            Jouw persoonsgegevens worden nooit verkocht. Jouw telefoonnummer blijft verborgen totdat jij
            zelf het initiatief neemt. Alle dealers zijn geverifieerd op KvK-inschrijving en RDW-erkenning.
          </p>

          <div className="grid grid-cols-3 gap-4 my-8">
            {[
              { value: "2025", label: "Opgericht" },
              { value: "NL", label: "Actief in Nederland" },
              { value: "AVG", label: "Volledig GDPR-conform" },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-100 p-4 text-center">
                <div className="text-2xl font-bold text-slate-900">{s.value}</div>
                <div className="text-sm text-slate-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-slate-900">Contact</h2>
          <p>
            Vragen, feedback of samenwerken? Stuur een e-mail naar{" "}
            <a href="mailto:info@automatch.nl" className="text-blue-600 underline">info@automatch.nl</a>.
          </p>
          <p className="text-sm text-slate-400">
            AutoMatch B.V. · KvK: 87654321 · Postbus 1234, 1000 AA Amsterdam
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
