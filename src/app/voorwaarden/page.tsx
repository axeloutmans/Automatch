import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = { title: "Algemene voorwaarden | AutoMatch" };

export default function VoorwaardenPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 pt-24 pb-20">
        <div className="mb-10">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Juridisch</div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">Algemene voorwaarden</h1>
          <p className="text-slate-500">Versie 1.0 · Ingangsdatum 9 juni 2025</p>
        </div>
        <div className="prose max-w-none space-y-6 text-[15px] text-slate-600 leading-relaxed">
          {[
            { title: "1. Toepasselijkheid", content: "Deze algemene voorwaarden zijn van toepassing op alle overeenkomsten tussen AutoMatch B.V. en haar gebruikers (zowel consumenten als dealers)." },
            { title: "2. Credits", content: "Credits zijn niet-overdraagbaar en niet-inwisselbaar voor geld. Credits die niet zijn gebruikt vervallen niet. Bij opzegging worden ongebruikte credits niet gerestitueerd tenzij anders bepaald." },
            { title: "3. Creditrestitutie", content: "Indien een geopende lead aantoonbaar nep of inactief blijkt (geen reactie van consument binnen 48 uur na opening), wordt het gebruikte credit automatisch gecrediteerd op het dealeracccount." },
            { title: "4. Aansprakelijkheid", content: "AutoMatch is niet aansprakelijk voor de kwaliteit, juistheid of volledigheid van door consumenten ingediende aanvragen, noch voor de inhoud van aanbiedingen van dealers. AutoMatch faciliteert uitsluitend het matchingproces." },
            { title: "5. Gebruik platform", content: "Gebruikers mogen het platform niet gebruiken voor frauduleuze of misleidende doeleinden. AutoMatch behoudt zich het recht voor accounts te blokkeren bij misbruik." },
            { title: "6. Toepasselijk recht", content: "Op deze voorwaarden is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter te Amsterdam." },
          ].map((s, i) => (
            <div key={i} className="pb-5 border-b border-slate-100 last:border-0">
              <h2 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h2>
              <p>{s.content}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
