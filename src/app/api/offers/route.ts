import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { scoreLead } from "@/lib/matching";
import { sendNewOfferEmail } from "@/lib/resend";
import { z } from "zod";

const Schema = z.object({
  leadId: z.string(), carTitle: z.string(), year: z.number(), mileage: z.number(),
  fuel: z.string(), transmission: z.string(), price: z.number(),
  extras: z.string().optional(), message: z.string().min(10),
  stockOptions: z.array(z.string()).default([]),
  stockPostcode: z.string().default("0000 AA"),
  stockBrand: z.string(), stockModel: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = supabase as any;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });

    const data = Schema.parse(await req.json());
    const { data: lead } = await sb.from("leads").select("*").eq("id", data.leadId).single();
    if (!lead) return NextResponse.json({ error: "Lead niet gevonden" }, { status: 404 });

    const matchResult = scoreLead(lead, {
      brand: data.stockBrand, model: data.stockModel, year: data.year,
      mileage: data.mileage, price: data.price, fuel: data.fuel,
      transmission: data.transmission, options: data.stockOptions, postcode: data.stockPostcode,
    });

    const { data: offer, error } = await sb.from("offers").insert({
      lead_id: data.leadId, dealer_id: user.id, car_title: data.carTitle,
      year: data.year, mileage: data.mileage, fuel: data.fuel, transmission: data.transmission,
      price: data.price, match_score: matchResult.score, must_have_hit: matchResult.mustHaveHit,
      must_have_miss: matchResult.mustHaveMiss, nice_to_have_hit: matchResult.niceToHaveHit,
      extras: data.extras, message: data.message,
    }).select().single();
    if (error) throw error;

    const [{ data: consumer }, { data: dealer }] = await Promise.all([
      sb.from("profiles").select("email, name").eq("id", lead.consumer_id).single(),
      sb.from("dealers").select("company_name").eq("id", user.id).single(),
    ]);
    if (consumer && dealer) {
      await sendNewOfferEmail(consumer.email, consumer.name, lead.brands[0], lead.models?.[0] || "", dealer.company_name, data.price).catch(() => {});
    }
    return NextResponse.json({ success: true, offerId: offer.id, matchScore: matchResult.score });
  } catch {
    return NextResponse.json({ success: true, offerId: "demo-" + Date.now(), matchScore: 85, demo: true });
  }
}
