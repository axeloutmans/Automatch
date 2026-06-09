import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ kenteken: string }> }) {
  const { kenteken } = await params;
  const clean = kenteken.replace(/-/g, "").toUpperCase();
  try {
    const res = await fetch(
      `https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken=${clean}`,
      { headers: { Accept: "application/json" }, next: { revalidate: 3600 } }
    );
    if (!res.ok) return NextResponse.json({ error: "RDW niet beschikbaar" }, { status: 502 });
    const data = await res.json();
    if (!data.length) return NextResponse.json({ error: "Kenteken niet gevonden" }, { status: 404 });
    const v = data[0];
    return NextResponse.json({
      kenteken: v.kenteken, merk: v.merk, handelsbenaming: v.handelsbenaming,
      bouwjaar: v.datum_eerste_toelating?.slice(0, 4),
      brandstof: v.brandstof_omschrijving, kleur: v.eerste_kleur,
    });
  } catch {
    return NextResponse.json({ error: "RDW service niet bereikbaar" }, { status: 502 });
  }
}
