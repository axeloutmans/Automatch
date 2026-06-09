import { NextRequest, NextResponse } from "next/server";
import { stripe, STRIPE_PRICES, type StripePriceId } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const Schema = z.object({ packageId: z.string() });

export async function POST(req: NextRequest) {
  if (!stripe) return NextResponse.json({ error: "Stripe niet geconfigureerd" }, { status: 503 });

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });

    const { packageId } = Schema.parse(await req.json());
    const pkg = STRIPE_PRICES[packageId as StripePriceId];
    if (!pkg) return NextResponse.json({ error: "Ongeldig pakket" }, { status: 400 });

    const { data: dealer } = await supabase.from("dealers").select("email, company_name").eq("id", user.id).single();
    const customerEmail: string | undefined = (dealer as { email?: string } | null)?.email || user.email || undefined;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "ideal"],
      mode: "payment",
      customer_email: customerEmail,
      line_items: [{
        price_data: {
          currency: "eur",
          unit_amount: pkg.price,
          product_data: { name: pkg.name },
        },
        quantity: 1,
      }],
      metadata: { dealer_id: user.id, package_id: packageId, credits: pkg.credits },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dealer/credits?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dealer/credits`,
      invoice_creation: { enabled: true },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("POST /api/checkout:", err);
    return NextResponse.json({ error: "Checkout mislukt" }, { status: 500 });
  }
}
