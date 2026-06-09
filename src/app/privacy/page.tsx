import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Privacybeleid | AutoMatch",
  description: "Hoe AutoMatch omgaat met jouw persoonsgegevens conform de AVG/GDPR.",
};

export default function PrivacyPage() {
  const sections = [
    {
      title: "1. Wie is verantwoordelijk?",
      content: `AutoMatch B.V., gevestigd in Nederland (KvK: 87654321), is verwerkingsverantwoordelijke voor de verwerking van persoonsgegevens zoals beschreven in dit beleid.

Contact: privacy@automatch.nl`
    },
    {
      title: "2. Welke gegevens verzamelen wij?",
      content: `Van consumenten verzamelen wij: naam, e-mailadres, postcode, telefoonnummer (optioneel), en de inhoud van de autozoekopdracht (merk, model, budget, opties, koopintentie).

Van dealers verzamelen wij: bedrijfsnaam, KvK-nummer, contactpersoon, e-mailadres en facturatiegegevens.`
    },
    {
      title: "3. Waarvoor gebruiken wij jouw gegevens?",
      content: `Wij verwerken persoonsgegevens uitsluitend voor:
• Het matchen van consumentenzoekopdrachten met relevante dealers
• Het verzenden van aanbiedingen en notificaties
• Het verifiëren van e-mailadressen en dealeridentiteiten
• Facturering en creditbeheer voor dealers
• Het naleven van wettelijke verplichtingen`
    },
    {
      title: "4. Wie ontvangt jouw gegevens?",
      content: `Jouw e-mailadres en naam worden alleen gedeeld met dealers die actief credits hebben besteed om jouw aanvraag te openen. Jouw telefoonnummer blijft verborgen tenzij jij expliciet kiest om het te delen.

Wij verkopen nooit persoonsgegevens aan derden. Wij maken gebruik van verwerkers (zoals Supabase voor hosting en Stripe voor betalingen) die gebonden zijn aan verwerkersovereenkomsten.`
    },
    {
      title: "5. Hoe lang bewaren wij jouw gegevens?",
      content: `Consumentenzoekopdrachten worden bewaard totdat de consument ze verwijdert, met een maximum van 90 dagen na de laatste activiteit. Facturatiegegevens bewaren wij 7 jaar conform de wettelijke bewaartermijn.`
    },
    {
      title: "6. Jouw rechten (AVG/GDPR)",
      content: `Op grond van de AVG heb jij de volgende rechten:
• Recht op inzage in jouw persoonsgegevens
• Recht op rectificatie van onjuiste gegevens
• Recht op verwijdering ("recht op vergetelheid")
• Recht op beperking van verwerking
• Recht op gegevensoverdraagbaarheid
• Recht op bezwaar

Dien een verzoek in via privacy@automatch.nl. Wij reageren binnen 30 dagen.`
    },
    {
      title: "7. Cookies",
      content: `Wij gebruiken functionele cookies voor het werken van het platform (sessie, login-status). Analytische cookies plaatsen wij alleen na jouw toestemming. Wij plaatsen geen tracking- of advertentiecookies zonder expliciete toestemming.`
    },
    {
      title: "8. Beveiliging",
      content: `Alle gegevensoverdrachten zijn versleuteld via TLS/HTTPS. Persoonsgegevens worden opgeslagen in een beveiligde omgeving met toegangscontrole. Bij een datalek melden wij dit binnen 72 uur bij de Autoriteit Persoonsgegevens.`
    },
    {
      title: "9. Klachten",
      content: `Indien je niet tevreden bent met de wijze waarop wij met jouw gegevens omgaan, kun je een klacht indienen bij de Autoriteit Persoonsgegevens (autoriteitpersoonsgegevens.nl).`
    },
    {
      title: "10. Wijzigingen",
      content: `Dit privacybeleid is voor het laatst bijgewerkt op 9 juni 2025. Wezenlijke wijzigingen communiceren wij via e-mail aan geregistreerde gebruikers.`
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 pt-24 pb-20">
        <div className="mb-10">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Juridisch</div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">Privacybeleid</h1>
          <p className="text-slate-500">Versie 1.0 · Ingangsdatum 9 juni 2025 · AutoMatch B.V.</p>
        </div>

        <div className="prose max-w-none">
          {sections.map((s, i) => (
            <div key={i} className="mb-8 pb-8 border-b border-slate-100 last:border-0">
              <h2 className="text-lg font-bold text-slate-900 mb-3">{s.title}</h2>
              <div className="text-slate-600 leading-relaxed whitespace-pre-line text-[15px]">{s.content}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 p-5 bg-slate-50 rounded-2xl border border-slate-100 text-sm text-slate-600">
          <strong className="text-slate-900">Vragen over dit beleid?</strong><br />
          Neem contact op via <a href="mailto:privacy@automatch.nl" className="text-blue-600 underline">privacy@automatch.nl</a> of schrijf naar AutoMatch B.V., Postbus 1234, 1000 AA Amsterdam.
        </div>
      </div>
      <Footer />
    </div>
  );
}
