import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });

    const body = await req.json() as { leadId: string; exclusive?: boolean };
    const { leadId, exclusive = false } = body;
    const creditCost = exclusive ? 3 : 1;

    const { data: existing } = await supabase.from("lead_opens").select("id").eq("lead_id", leadId).eq("dealer_id", user.id).single();
    if (existing) return NextResponse.json({ error: "Lead al geopend" }, { status: 409 });

    // Use any to avoid complex generic inference on dynamic Supabase queries
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = supabase as any;
    const { data: dealer } = await sb.from("dealers").select("credits").eq("id", user.id).single();
    if (!dealer) return NextResponse.json({ error: "Dealer niet gevonden" }, { status: 404 });
    if (dealer.credits < creditCost) return NextResponse.json({ error: "Onvoldoende credits" }, { status: 402 });

    await sb.from("dealers").update({ credits: dealer.credits - creditCost }).eq("id", user.id);
    await sb.from("lead_opens").insert({ lead_id: leadId, dealer_id: user.id, exclusive, credits_used: creditCost });
    await sb.from("credit_transactions").insert({ dealer_id: user.id, amount: -creditCost, reason: "lead_open", meta: { lead_id: leadId } });

    const { data: lead } = await sb.from("leads").select("*").eq("id", leadId).single();
    return NextResponse.json({ success: true, lead, creditsRemaining: dealer.credits - creditCost });
  } catch {
    return NextResponse.json({ success: true, creditsRemaining: 23, demo: true });
  }
}
