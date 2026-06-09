import Link from "next/link";
import { Car } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white mb-4">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <Car className="w-4 h-4 text-white" />
              </div>
              AutoMatch
            </Link>
            <p className="text-sm leading-relaxed text-slate-500 max-w-xs">
              Het slimste platform om vraag en aanbod in de automarkt samen te brengen. Gratis voor kopers. Transparant voor dealers.
            </p>
            <div className="mt-4 text-xs text-slate-600">GDPR-conform · KvK 87654321</div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Consumenten</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/zoeken" className="hover:text-white transition-colors">Auto zoeken</Link></li>
              <li><Link href="/#hoe-werkt-het" className="hover:text-white transition-colors">Hoe werkt het</Link></li>
              <li><Link href="/mijn-aanvraag" className="hover:text-white transition-colors">Mijn aanvraag</Link></li>
              <li><Link href="/#faq" className="hover:text-white transition-colors">Veelgestelde vragen</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Dealers</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/voor-dealers" className="hover:text-white transition-colors">Dealer worden</Link></li>
              <li><Link href="/voor-dealers#prijzen" className="hover:text-white transition-colors">Prijzen & abonnementen</Link></li>
              <li><Link href="/dealer/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Bedrijf</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/over-ons" className="hover:text-white transition-colors">Over ons</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacybeleid</Link></li>
              <li><Link href="/voorwaarden" className="hover:text-white transition-colors">Algemene voorwaarden</Link></li>
              <li><a href="mailto:info@automatch.nl" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Popular searches */}
        <div className="border-t border-slate-800 mt-12 pt-8 mb-4">
          <div className="text-xs text-slate-600 mb-3">Populaire zoekopdrachten:</div>
          <div className="flex flex-wrap gap-2">
            {["Audi Q5","BMW X3","VW Golf","Tesla Model Y","Cupra Formentor","Volvo XC60","Mercedes GLC","Kia Sportage"].map(car => (
              <Link
                key={car}
                href={`/${car.toLowerCase().replace(/\s+/g, "-").replace(/\//g,"")}-gezocht`}
                className="text-xs text-slate-600 hover:text-white transition-colors bg-slate-800 px-2.5 py-1 rounded-full"
              >
                {car} gezocht
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-600 pt-4 border-t border-slate-800">
          <p>© 2025 AutoMatch B.V. Alle rechten voorbehouden.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">Privacy</Link>
            <Link href="/voorwaarden" className="hover:text-slate-400 transition-colors">Voorwaarden</Link>
            <Link href="/sitemap.xml" className="hover:text-slate-400 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
