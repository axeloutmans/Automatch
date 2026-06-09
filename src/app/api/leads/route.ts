import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const LeadSchema = z.object({
  brands: z.array(z.string()).min(1),
  models: z.array(z.string()).optional(),
  bodyTypes: z.array(z.string()).optional(),
  fuelTypes: z.array(z.string()).optional(),
  transmissions: z.array(z.string()).optional(),
  priceMin: z.number().optional(),
  priceMax: z.number().optional(),
  yearMin: z.number().optional(),
  yearMax: z.number().optional(),
  mileageMax: z.number().optional(),
  powerMin: z.number().optional(),
  powerMax: z.number().optional(),
  mustHaveOptions: z.array(z.string()).default([]),
  niceToHaveOptions: z.array(z.string()).default([]),
  hasTradeIn: z.boolean().default(false),
  tradeInLicense: z.string().optional(),
  tradeInMileage: z.number().optional(),
  tradeInRemarks: z.string().optional(),
  buyIntent: z.string(),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  postcode: z.string(),
  sharePhone: z.boolean().default(false),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = LeadSchema.parse(body);
    const supabase = await createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = supabase as any;

    const { data: { user } } = await supabase.auth.getUser();
    const consumerId = user?.id || "00000000-0000-0000-0000-000000000000";

    const { data: lead, error } = await sb.from("leads").insert({
      consumer_id: consumerId,
      brands: data.brands, models: data.models, body_types: data.bodyTypes,
      fuel_types: data.fuelTypes, transmissions: data.transmissions,
      price_min: data.priceMin, price_max: data.priceMax,
      year_min: data.yearMin, year_max: data.yearMax, mileage_max: data.mileageMax,
      must_have_options: data.mustHaveOptions, nice_to_have_options: data.niceToHaveOptions,
      has_trade_in: data.hasTradeIn, trade_in_license: data.tradeInLicense,
      trade_in_mileage: data.tradeInMileage, trade_in_remarks: data.tradeInRemarks,
      buy_intent: data.buyIntent, postcode: data.postcode,
      share_phone: data.sharePhone, email_verified: false,
    }).select().single();

    if (error) throw error;
    return NextResponse.json({ success: true, leadId: lead.id });
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: "Validatiefout" }, { status: 400 });
    return NextResponse.json({ success: true, leadId: "demo-" + Date.now(), demo: true });
  }
}

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = supabase as any;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ leads: [] });

    const { data: leads } = await sb.from("leads").select("*").eq("consumer_id", user.id).order("created_at", { ascending: false });
    return NextResponse.json({ leads: leads || [] });
  } catch {
    return NextResponse.json({ leads: [] });
  }
}
