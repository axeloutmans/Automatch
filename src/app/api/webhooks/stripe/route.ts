import { NextRequest, NextResponse } from "next/server";
import { stripe, STRIPE_PRICES, type StripePriceId } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  if (!stripe) return NextResponse.json({ error: "Stripe niet geconfigureerd" }, { status: 503 });

  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;
  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as { metadata?: { dealer_id?: string; package_id?: string; credits?: string }; id?: string };
    const { dealer_id, package_id, credits } = session.metadata || {};
    if (!dealer_id || !credits) return NextResponse.json({ ok: true });

    const supabase = await createAdminClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = supabase as any;
    const creditCount = parseInt(credits);
    const { data: dealer } = await sb.from("dealers").select("credits").eq("id", dealer_id).single();
    if (dealer) {
      await sb.from("dealers").update({ credits: dealer.credits + creditCount }).eq("id", dealer_id);
      await sb.from("credit_transactions").insert({
        dealer_id, amount: creditCount, reason: "purchase",
        stripe_payment_id: session.id, meta: { package_id },
      });
    }
  }

  return NextResponse.json({ ok: true });
}
