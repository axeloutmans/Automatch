import { Resend } from "resend";

const key = process.env.RESEND_API_KEY;
export const resend = key ? new Resend(key) : null;
const FROM = process.env.RESEND_FROM_EMAIL || "noreply@automatch.nl";

export async function sendVerificationEmail(email: string, name: string, code: string) {
  if (!resend) { console.log(`[DEV] Verification code for ${email}: ${code}`); return; }
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Verifieer jouw e-mailadres — AutoMatch",
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px">
        <h1 style="font-size:24px;font-weight:700;color:#0f172a">AutoMatch</h1>
        <p style="color:#475569">Hallo ${name},</p>
        <p style="color:#475569">Gebruik de onderstaande code om jouw e-mailadres te bevestigen:</p>
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:24px;text-align:center;margin:24px 0">
          <span style="font-size:36px;font-weight:700;letter-spacing:0.3em;color:#0f172a">${code}</span>
        </div>
        <p style="color:#94a3b8;font-size:13px">Deze code is 15 minuten geldig. Heb jij dit niet aangevraagd? Dan kun je deze e-mail negeren.</p>
      </div>
    `,
  });
}

export async function sendNewOfferEmail(email: string, consumerName: string, brand: string, model: string, dealer: string, price: number) {
  if (!resend) { console.log(`[DEV] New offer email to ${email}`); return; }
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: `Nieuwe aanbieding voor jouw ${brand} ${model} — AutoMatch`,
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px">
        <h1 style="font-size:24px;font-weight:700;color:#0f172a">AutoMatch</h1>
        <p style="color:#475569">Hallo ${consumerName},</p>
        <p style="color:#475569"><strong>${dealer}</strong> heeft een aanbieding gestuurd voor jouw ${brand} ${model} zoekopdracht.</p>
        <div style="background:#0f172a;border-radius:12px;padding:20px;margin:24px 0;color:white">
          <div style="font-size:13px;color:#94a3b8;margin-bottom:4px">Vraagprijs</div>
          <div style="font-size:28px;font-weight:700">€ ${price.toLocaleString("nl-NL")}</div>
        </div>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/portaal/aanbiedingen" style="display:inline-block;background:#0f172a;color:white;padding:12px 24px;border-radius:100px;text-decoration:none;font-weight:600">
          Bekijk aanbieding →
        </a>
        <p style="color:#94a3b8;font-size:12px;margin-top:24px">Je ontvangt dit bericht omdat je een zoekopdracht hebt geplaatst op AutoMatch. Beheer jouw meldingen via jouw portaal.</p>
      </div>
    `,
  });
}

export async function sendNewLeadEmail(email: string, dealerName: string, brand: string, model: string, score: number) {
  if (!resend) { console.log(`[DEV] New lead email to ${email}`); return; }
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: `Nieuwe ${score >= 90 ? "🔥 Hot Lead" : "lead"}: ${brand} ${model} — AutoMatch`,
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px">
        <h1 style="font-size:24px;font-weight:700;color:#0f172a">AutoMatch</h1>
        <p style="color:#475569">Hallo ${dealerName},</p>
        <p style="color:#475569">Er is een nieuwe zoekopdracht binnengekomen die past bij jouw profiel.</p>
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:20px;margin:24px 0">
          <div style="font-size:18px;font-weight:700;color:#0f172a">${brand} ${model}</div>
          <div style="margin-top:8px;display:flex;gap:8px">
            <span style="background:${score >= 90 ? "#fff7ed" : "#f0fdf4"};color:${score >= 90 ? "#c2410c" : "#15803d"};padding:4px 10px;border-radius:100px;font-size:13px;font-weight:700">
              ${score >= 90 ? "🔥" : "✅"} ${score}% match
            </span>
          </div>
        </div>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dealer/leads" style="display:inline-block;background:#0f172a;color:white;padding:12px 24px;border-radius:100px;text-decoration:none;font-weight:600">
          Bekijk lead → (1 credit)
        </a>
      </div>
    `,
  });
}

export async function sendDealerWelcomeEmail(email: string, name: string, credits: number) {
  if (!resend) { console.log(`[DEV] Welcome email to ${email}`); return; }
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: `Welkom bij AutoMatch, ${name}! Jouw ${credits} gratis credits staan klaar.`,
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px">
        <h1 style="font-size:24px;font-weight:700;color:#0f172a">Welkom bij AutoMatch</h1>
        <p style="color:#475569">Hallo ${name},</p>
        <p style="color:#475569">Jouw dealerAccount is aangemaakt. Je hebt <strong>${credits} gratis credits</strong> ontvangen om de eerste leads te openen.</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dealer/dashboard" style="display:inline-block;background:#0f172a;color:white;padding:12px 24px;border-radius:100px;text-decoration:none;font-weight:600;margin-top:16px">
          Ga naar jouw dashboard →
        </a>
      </div>
    `,
  });
}
